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
  const timeButton = await waitForElement("#qa_chartTimeButton");
  const currentTime = timeButton.querySelector("span").textContent;

  if (currentTime.toLowerCase() === time.toLowerCase()) return;

  timeButton.click();

  const query = `#qa_${time.toLowerCase()}ChartTime`;
  const button = await waitForElement(query);
  if (!button) return;
  button.click();
};

const changeTradingAsset = async (tradingAsset) => {
  const tradingAssetButton = await waitForElement("#asset-0 > button");
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
  const element = await waitForElement(
    `#qa_trading_deal${directionFormated}Button`
  );
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
    await execute(data);
  },
};

chrome.runtime.onMessage.addListener((request, sender) => {
  try {
    const { type, data } = request;
    const callback = actions[type];
    if (!callback) return;
    callback(data);
  } catch (error) {
    console.log(error);
  }
});
