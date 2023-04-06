const notifyWebhook = (data) => {
  try {
    fetch("http://localhost:3000/webhook", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
  } catch (error) {
    console.log(error);
  }
};

const sendMessageToCurrentTab = async (message) => {
  const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  const response = await chrome.tabs.sendMessage(tab.id, message);
  return response;
};

const actions = {
  OPEN_BINOMO: () => {
    chrome.tabs.create({ url: "https://binomo.com/trading" });
  },
  ADD_LISTENER: () => {
    sendMessageToCurrentTab({ type: "START" });
  },
  REMOVE_LISTENER: () => {
    sendMessageToCurrentTab({ type: "STOP" });
  },
  NOTIFY: (data) => {
    notifyWebhook(data);
    chrome.storage.session.get(["extensionStore"], (result) => {
      const allDataInJSObject = JSON.parse(result.extensionStore);

      const updatedData = {
        ...allDataInJSObject,
        state: {
          ...allDataInJSObject.state,
          plays: allDataInJSObject.state.plays + 1,
        },
      };

      chrome.storage.session.set(
        {
          extensionStore: JSON.stringify(updatedData),
        },
        () => {
          console.log("Data successfully saved");
        }
      );
    });
  },
};

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  try {
    const { type, data } = request;
    const callback = actions[type];
    callback(data, sendResponse);
  } catch (error) {
    console.log("Error in background.js", error);
  }
});
