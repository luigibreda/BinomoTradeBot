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
  EUR_USD: () => {
    console.log("iniciou")
    const menuItems = document.querySelectorAll('#qa_trading_assetDialog > lib-platform-scroll > div > div > section > div'); // seleciona todos os itens do menu
    let itemToClick = null;
    
    // varre os itens do menu e encontra o item que contém o texto desejado
    for (let i = 0; i < menuItems.length; i++) {
      console.log(menuItems[i].textContent)
      if (menuItems[i].textContent === 'EUR/USD') {
        itemToClick = menuItems[i]; // atribui o item a ser clicado à variável
        break; // interrompe o loop assim que encontrar o item desejado
      }
    }
    
    if (itemToClick) {
      itemToClick.click(); // clica no item desejado
    }
  },
  ADA_USD: () => {
    console.log('Abre o menu de ativos')
    document.querySelector("#asset-0 > button").click()
    console.log('Cica no ativo ADA/USD')
    document.querySelector("#qa_trading_assetDialog > lib-platform-scroll > div > div > section > div:nth-child(4)").click()
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
  performAction("EUR_USD");
}, 3000);

chrome.runtime.onMessage.addListener((request, sender) => {
  performAction(request.type);
});
