let currentStatus = {
  startedListening: false,
};

const set = (newState) => {
  currentStatus = { ...currentStatus, ...newState };
};
const getAllState = () => currentStatus;
const get = (key) => currentStatus[key];

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

const sendMessageToCurrentTab = (message) => {
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    chrome.tabs.sendMessage(tabs[0].id, message);
  });
};

const actions = {
  START: () => {
    sendMessageToCurrentTab({ type: "START" });
    set({ startedListening: true });
  },
  STOP: () => {
    sendMessageToCurrentTab({ type: "STOP" });
    set({ startedListening: false });
  },
  GET_STATUS: (data, sendResponse) => {
    sendResponse(getAllState());
  },
  NOTIFY: (data) => {
    notifyWebhook(data);
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
