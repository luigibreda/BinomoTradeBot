import { useEffect, useState } from "react";
import { useExtensionStore } from "../../../../../store/extensionStore";

export const useActions = () => {
  const [isInBinomoTradingPage, setIsInBinomoTradingPage] = useState(false);
  const startedMirroring = useExtensionStore((state) => state.startedMirroring);
  const setStartedMirroring = useExtensionStore(
    (state) => state.setStartedMirroring
  );

  const handleMirror = () => {
    const status = !startedMirroring;
    setStartedMirroring(status);
    if (status) {
      chrome.runtime.sendMessage({ type: "ADD_LISTENER" });
      return;
    }
    chrome.runtime.sendMessage({ type: "REMOVE_LISTENER" });
  };

  useEffect(() => {
    if (!chrome.tabs) return;
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      const url = tabs[0].url;

      if (url?.includes("binomo.com/trading")) {
        setIsInBinomoTradingPage(true);
        return;
      }
    });
  }, []);

  return { isInBinomoTradingPage, handleMirror, startedMirroring };
};
