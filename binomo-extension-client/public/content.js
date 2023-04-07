console.log("Hello from content.js");

const notifyBackground = (data) => {
  chrome.runtime.sendMessage({
    type: "NOTIFY",
    data,
  });
};

const buttons = {
  UP: {
    query: "#qa_trading_dealUpButton",
  },
  DOWN: {
    query: "#qa_trading_dealDownButton",
  },
};

const actions = {
  UP: () => {
    const button = buttons["UP"];
    const element = document.querySelector(button.query);
    element.click();
  },
  DOWN: () => {
    const button = buttons["DOWN"];
    const element = document.querySelector(button.query);
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
