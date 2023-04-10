console.log("Hello from client extension binomo");

const actions = {
  UP: () => {
    const element = document.querySelector("#qa_trading_dealUpButton");
    element.click();
  },
  DOWN: () => {
    const element = document.querySelector("#qa_trading_dealDownButton");
    element.click();
  },
};

chrome.runtime.onMessage.addListener((request, sender) => {
  try {
    const { type } = request;
    const callback = actions[type];
    if (!callback) return;
    callback();
  } catch (error) {
    console.log("Error in content.js", error);
  }
});
