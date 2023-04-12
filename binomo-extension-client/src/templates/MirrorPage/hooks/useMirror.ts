import { useEffect, useState } from "react";
import { useExtensionStore } from "../../../store/extensionStore";
import { socket } from "../../../libs/socket";

type Direction = {
  direction: string;
  time: string;
  tradingAsset: string;
};

export const useMirror = () => {
  const [isWatching, setIsWatching] = useState(false);
  const [lastOperations, setLastOperations] = useState<Direction[]>([]);
  const operatorIsOnline = useExtensionStore((state) => state.operatorIsOnline);

  const handleDirection = (direction: Direction) => {
    setLastOperations((lastOperations) => [...lastOperations, direction]);
    chrome.runtime.sendMessage({
      type: "DIRECTION",
      data: direction,
    });
  };

  const handleWatch = () => {
    setIsWatching((isWatching) => !isWatching);
    setLastOperations([]);
  };

  useEffect(() => {
    if (isWatching) {
      socket.on("direction", handleDirection);
    } else {
      socket.off("direction", handleDirection);
    }

    return () => {
      socket.off("direction", handleDirection);
    };
  }, [isWatching]);

  return {
    isWatching,
    handleWatch,
    lastOperations,
    operatorIsOnline,
  };
};
