import logoBinomo from "../../assets/binomo.png";

export const Header = () => {
  const openBinomo = () => {
    chrome.runtime.sendMessage({ type: "OPEN_BINOMO" });
  };

  return (
    <div className="flex items-center p-2 justify-center h-16">
      <div className="w-1/4">
        <img
          onClick={openBinomo}
          className="w-3/4 cursor-pointer"
          src={logoBinomo}
          alt="Logo"
        />
      </div>
    </div>
  );
};
