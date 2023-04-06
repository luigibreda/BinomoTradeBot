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
        message: "UP",
      });
    },
  },
  {
    query: "#qa_trading_dealDownButton",
    callback: () => {
      notifyBackground({
        message: "DOWN",
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

chrome.runtime.onMessage.addListener((request) => {
  try {
    const { type } = request;
    const callback = actions[type];
    callback();
  } catch (error) {
    console.log("Error in content.js", error);
  }
});
