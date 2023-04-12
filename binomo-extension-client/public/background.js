const sendMessageToCurrentTab = async (message) => {
  const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  const response = await chrome.tabs.sendMessage(tab.id, message);
  return response;
};

const actions = {
  DIRECTION: async (direction) => {
    await sendMessageToCurrentTab({
      type: "DIRECTION",
      data: direction,
    });
  },
};

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  try {
    const { type, data } = request;
    const callback = actions[type];
    callback(data);
  } catch (error) {
    console.log("Error in background.js", error);
  }
});
