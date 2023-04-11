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
  TIME: () => {
    console.log('abre o menu')
    const chartTimeButton = document.querySelector("#qa_chartTimeButton");
    chartTimeButton.click();
    setTimeout(() => {
      const chartTimeButton2 = document.querySelector("#qa_1mChartTime");
      chartTimeButton2.click();
    }, 2500);
  },
  TIME_1M: () => {
    const element = document.querySelector("#qa_chartTimeButton");
    element.click();
    const timeOptions = document.querySelector("#time-frame-menu").querySelectorAll("li");
    const fiveSecondsOption = Array.from(timeOptions).find((option) => option.id === "qa_1mChartTime");
    if (fiveSecondsOption) {
      fiveSecondsOption.click();
    }
  },
  TIME_5M: () => {
    const element = document.querySelector("#qa_chartTimeButton");
    element.click();
    const timeOptions = document.querySelector("#time-frame-menu").querySelectorAll("li");
    const fiveSecondsOption = Array.from(timeOptions).find((option) => option.id === "qa_5mChartTime");
    if (fiveSecondsOption) {
      fiveSecondsOption.click();
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

setInterval(() => {
  performAction("TIME");
}, 5000);

chrome.runtime.onMessage.addListener((request, sender) => {
  performAction(request.type);
});
