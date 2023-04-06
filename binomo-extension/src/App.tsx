import { useEffect, useState } from "react";
import { ExtensionWrapper } from "./components/ExtensionWrapper";

function App() {
  const [startedListening, setStartedListening] = useState<boolean | null>();

  useEffect(() => {
    chrome.runtime.sendMessage({ type: "GET_STATUS" }, (response) => {
      console.log(response);
      setStartedListening(response.startedListening);
    });
  }, []);

  const handleButtonClick = (e: any) => {
    e.preventDefault();
    setStartedListening(!startedListening);
    startedListening
      ? chrome.runtime.sendMessage({ type: "STOP" })
      : chrome.runtime.sendMessage({ type: "START" });
  };

  return (
    <ExtensionWrapper>
      <button
        className="
        bg-green-500
        hover:bg-green-700
        text-white
        font-bold
        py-2
        px-4
        rounded
      "
        onClick={handleButtonClick}
      >
        {startedListening ? "Stop" : "Start"} listening
      </button>
    </ExtensionWrapper>
  );
}

export default App;
