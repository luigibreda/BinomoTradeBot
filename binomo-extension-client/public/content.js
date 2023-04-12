console.log("Hello from client extension binomo");

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

const changeTime = async (time) => {
  const timeButton = document.querySelector("#qa_chartTimeButton");
  const currentTime = timeButton.querySelector("span").textContent;

  if (currentTime.toLowerCase() === time.toLowerCase()) return;

  timeButton.click();

  const query = `#qa_${time.toLowerCase()}ChartTime`;
  const button = await waitForElement(query);
  if (!button) return;
  button.click();
};

const changeTradingAsset = async (tradingAsset) => {
  const tradingAssetLowerCase = tradingAsset.toLowerCase();
  const tradingAssetButton = document.querySelector("#asset-0 > button");
  const currentTradeAsset =
    tradingAssetButton.querySelector("span").textContent;
  const isSameAsset = currentTradeAsset.toLowerCase() === tradingAssetLowerCase;

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

const execute = async (data) => {
  await changeTime(data.time);
  await changeTradingAsset(data.tradingAsset);
};

execute({
  time: "1m",
  tradingAsset: "EUR/USD",
});

////////////////////////

const actions = {
  UP: () => {
    const element = document.querySelector("#qa_trading_dealUpButton");
    element.click();
  },
  DOWN: () => {
    const element = document.querySelector("#qa_trading_dealDownButton");
    element.click();
  },
  TIME: async (time) => {
    const timeButton = document.querySelector("#qa_chartTimeButton");
    const currentTime = timeButton.querySelector("span").textContent;

    if (currentTime.toLowerCase() === time.toLowerCase()) return;

    const query = `#qa_${time.toLowerCase()}ChartTime`;
    const button = waitForElement(query);
    console.log("button", button);
  },
  TRADDING_ASSET: async (tradingAsset) => {
    const tradingAssetLowerCase = tradingAsset.toLowerCase();
    const tradingAssetButton = document.querySelector("#asset-0 > button");
    const currentTradeAsset =
      tradingAssetButton.querySelector("span").textContent;
    const isSameAsset =
      currentTradeAsset.toLowerCase() === tradingAssetLowerCase;

    if (
      internalContentState.get("tradingAsset") === tradingAssetLowerCase ||
      isSameAsset
    )
      return;

    tradingAssetButton.click();

    const menuItems = await waitForElement(".asset-body");
    if (!menuItems) return;
    const itemToClick = Array.from(menuItems.children).find((item) =>
      item.textContent.toLowerCase().includes(tradingAssetLowerCase)
    );

    if (itemToClick) {
      itemToClick.click();
      internalContentState.set("tradingAsset", tradingAssetLowerCase);
    }
  },
};

const performAction = (action) => {
  try {
    const callback = actions[action];
    if (!callback) return;
    callback();
  } catch (error) {
    console.log("Error in content.js", error);
  }
};

chrome.runtime.onMessage.addListener((request, sender) => {
  performAction(request.type, request.data);
});
