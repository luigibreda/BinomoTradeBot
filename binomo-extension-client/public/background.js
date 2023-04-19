const sendMessageToCurrentTab = async (message) => {
  const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  const response = await chrome.tabs.sendMessage(tab.id, message);
  return response;
};

const actions = {
  DIRECTION: async (data) => {
    await sendMessageToCurrentTab({
      type: "EXECUTE",
      data,
    });
  },
  MARTINGALE: async () => {
    await sendMessageToCurrentTab({
      type: "MARTINGALE",
    });
  },
};

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  try {
    const { type, data } = request;
    const callback = actions[type];
    if (!callback) return;
    callback(data).then((result) => {
      sendResponse(result);
    });
  } catch (error) {
    console.log("Error in background.js", error);
  }
});
