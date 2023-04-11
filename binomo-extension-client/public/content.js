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
  TIME_5S: () => {
    console.log('Abre o menu de tempo')
    const chartTimeButton = document.querySelector("#qa_chartTimeButton");
    chartTimeButton.click();
    setTimeout(() => {
      console.log('Executa o clique no tempo desejado')
      const button = document.querySelector('#qa_5sChartTime');
      button.click();
    }, 500);
  },
  TIME_1M: () => {
    console.log('Abre o menu de tempo')
    const chartTimeButton = document.querySelector("#qa_chartTimeButton");
    chartTimeButton.click();
    setTimeout(() => {
      console.log('Executa o clique no tempo desejado')
      const button = document.querySelector('#qa_1mChartTime');
      button.click();
    }, 500);
  },
  TIME_5M: () => {
    console.log('Abre o menu de tempo')
    const chartTimeButton = document.querySelector("#qa_chartTimeButton");
    chartTimeButton.click();
    setTimeout(() => {
      console.log('Executa o clique no tempo desejado')
      const button = document.querySelector('#qa_5mChartTime');
      button.click();
    }, 500);
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
  performAction(request.type);
});
