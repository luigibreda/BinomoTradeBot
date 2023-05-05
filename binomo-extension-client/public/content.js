console.log("Hello from client extension binomo");

// utils

const sendMessageToBackground = async (message) => {
  const response = await chrome.runtime.sendMessage(message);
  return response;
};

const clearInput = (element) => {
  return new Promise((resolve) => {
    element.value = " ";
    const eventInput = new Event("input", { bubbles: true });
    element.dispatchEvent(eventInput);

    const eventMasked = new Event("masked", { bubbles: true });
    element.dispatchEvent(eventMasked);
    resolve();
  });
};

const writeInput = (element, newValue) => {
  return new Promise((resolve) => {
    element.value = String(newValue);

    const eventInput = new Event("input", { bubbles: true });
    element.dispatchEvent(eventInput);

    const eventMasked = new Event("masked", { bubbles: true });
    element.dispatchEvent(eventMasked);
    resolve();
  });
};

const type = async (element, newValue) => {
  await clearInput(element);
  await writeInput(element, newValue);
};

function extractNumbers(str) {
  const regex = /[\d.]+/g;
  const numbers = str.match(regex)[0].replace(".", "").replace(",", ".");
  return parseFloat(numbers);
}

function waitForElement(selector) {
  return new Promise((resolve) => {
    let counter = 0;
    const interval = setInterval(() => {
      const element = document.querySelector(selector);
      counter += 1;
      if (counter > 100) {
        clearInterval(interval);
        resolve(null);
      }
      if (element && element.clientHeight > 0) {
        clearInterval(interval);
        resolve(element);
      }
    }, 100);
  });
}

// funcitions to be executed in the page

const makeMartingale = async () => {
  const input = document.querySelector(
    ".input_input-helper__17cT2 .hydrated input"
  );
  const currentBalance = extractNumbers(
    document.querySelector("#qa_trading_balance").textContent
  );
  const currentValue = Number(input.value);

  const martingaleValue = currentValue * 2;
  if (martingaleValue > currentBalance) return;

  console.log("MARTINGALE", Number(martingaleValue));

  await type(input, martingaleValue);
};

const changeTime = async (minutes) => {
  const buttons = document.querySelectorAll(".number_icon__1HoIp");
  const upBtn = buttons[2];
  const downBtn = buttons[3];

  const { response } = await chrome.runtime.sendMessage({
    type: "GET_CURRENT_TIME",
  });

  console.log(response);

  const hourNow = response.hour;

  const hourShouldBe = new Date(
    response.timestamp + Number(minutes.slice(0, -1)) * 60000
  ).toLocaleTimeString("en-US", {
    hour12: false,
    hour: "numeric",
    minute: "numeric",
  });

  const currentHour = document.querySelectorAll(
    ".input_input-helper__17cT2 .hydrated input"
  )[1].value;

  const isSameTime = hourNow === hourShouldBe;
  if (currentHour == hourShouldBe) return;
  if (isSameTime) return;

  const distance = Math.abs(
    Number(currentHour.replace(":", "")) - Number(hourShouldBe.replace(":", ""))
  );

  console.log({ distance, currentHour, hourShouldBe, hourNow });

  for (let i = 0; i < distance; i++) {
    if (
      Number(currentHour.replace(":", "")) >
      Number(hourShouldBe.replace(":", ""))
    ) {
      downBtn.click();
    } else {
      upBtn.click();
    }
  }

  return new Promise((resolve) => {
    resolve();
  });
};

const changeTradingAsset = async (tradingAsset) => {
  const tradingAssetButton = await waitForElement("#asset-0 > button");
  if (!tradingAssetButton) return;
  const currentTradeAsset =
    tradingAssetButton.querySelector("span").textContent;
  const tradingAssetLowerCase = tradingAsset.toLowerCase();
  const isSameAsset = currentTradeAsset
    .toLowerCase()
    .includes(tradingAssetLowerCase);

  if (isSameAsset) return;

  tradingAssetButton.click();

  const menuItems = await waitForElement(".asset-body");
  if (!menuItems) return;
  const itemToClick = Array.from(menuItems.children).find((item) =>
    item.textContent.toLowerCase().includes(tradingAssetLowerCase)
  );

  if (itemToClick) {
    itemToClick.click();
  }
};

const makeEntry = async (direction) => {
  const directionFormated =
    direction[0].toUpperCase() + direction.slice(1).toLowerCase();
  const element = document.querySelector(
    `#qa_trading_deal${directionFormated}Button`
  );
  if (!element) return;
  element.click();
};

const execute = async (data) => {
  await changeTime(data.time);
  await changeTradingAsset(data.tradingAsset);
  await makeEntry(data.direction);
};

////////////////////////

const actions = {
  EXECUTE: async (data) => {
    console.log("EXECUTE", data);
    await execute(data);
  },
  MARTINGALE: async () => {
    console.log("MARTINGALE");
    await makeMartingale();
  },
  GET_CURRENT_BALANCE: async () => {
    const currentBalance = await extractNumbers(
      document.querySelector("#qa_trading_balance").textContent
    );
    console.log("GET_CURRENT_BALANCE", currentBalance);
    return currentBalance;
  },
};

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  try {
    const { type, data } = request;
    const callback = actions[type];
    if (!callback) return;
    callback(data).then((result) => {
      sendResponse({
        balance: result,
      });
    });
  } catch (error) {
    console.log(error);
  }
});
