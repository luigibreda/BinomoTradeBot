console.log("Hello from content.js");

const notifyBackground = (data) => {
  chrome.runtime.sendMessage({
    type: "NOTIFY",
    data,
  });
};

const buttons = [
  {
    query: "#qa_trading_dealUpButton",
    callback: () => {
      notifyBackground({
        direction: "UP",
        tradingAsset: document.querySelector(".title").innerText,
        time: document.querySelector("#qa_chartTimeButton > span").textContent,
      });
    },
  },
  {
    query: "#qa_trading_dealDownButton",
    callback: () => {
      notifyBackground({
        direction: "DOWN",
        tradingAsset: document.querySelector(".title").innerText,
        time: document.querySelector("#qa_chartTimeButton > span").textContent,
      });
    },
  },
];

const actions = {
  START: () => {
    buttons.forEach((button) => {
      console.log("Adding event listener to button");
      const element = document.querySelector(button.query);
      element.addEventListener("click", button.callback);
    });
  },
  STOP: () => {
    buttons.forEach((button) => {
      console.log("Removing event listener from button");
      const element = document.querySelector(button.query);
      element.removeEventListener("click", button.callback);
    });
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
