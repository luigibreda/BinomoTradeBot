import moment from "moment";

export function daysDifference(date: any) {
  const suppliedDate = moment(date);
  const today = moment();
  const diffInDays = suppliedDate.diff(today, "days");

  if (diffInDays > 0) {
    return `em ${diffInDays} dias`;
  } else if (diffInDays < 0) {
    return `${Math.abs(diffInDays)} dias atrás`;
  } else {
    return "hoje";
  }
}

export const sendMessageToCurrentTab = async (message: any) => {
  const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  if (!tab) throw new Error("No active tab found");
  const response = await chrome.tabs.sendMessage(tab.id as number, message);
  return response;
};
