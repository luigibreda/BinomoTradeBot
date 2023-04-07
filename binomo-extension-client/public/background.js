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
  DIRECTION: (data) => {
    sendMessageToCurrentTab({ type: data });
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
