const urls = {
  DEV: "http://localhost:3000",
  PROD: "https://binomotradebot-production.up.railway.app",
};

const sendMessageToCurrentTab = async (message) => {
  const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  const response = await chrome.tabs.sendMessage(tab.id, message);
  return response;
};

const getCurrentTime = async () => {
  const response = await fetch(`${urls.PROD}/api/currenttime`);
  const data = await response.json();
  return data;
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
  GET_CURRENT_TIME: async () => {
    const data = await getCurrentTime();

    console.log("GET_CURRENT_TIME", data);
    return data;
  },
};

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  try {
    (async () => {
      const { type, data } = request;
      const callback = actions[type];
      const result = await callback(data);
      console.log("result", result);
      sendResponse({
        response: result,
      });
    })();
    return true;
  } catch (error) {
    console.log("Error in background.js", error);
  }
});
