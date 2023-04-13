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
  const [type, setType] = useState<"auto" | "manual">("auto");

  const handleDirection = (direction: Direction) => {
    setLastOperations((lastOperations) => [direction, ...lastOperations]);
    chrome.runtime.sendMessage({
      type: "DIRECTION",
      data: direction,
    });
  };

  const handleWatch = () => {
    setIsWatching((isWatching) => !isWatching);
  };

  useEffect(() => {
    setLastOperations([]);
    if (isWatching) {
      console.log(`watching-${type}`);
      socket.on(`direction-${type}`, handleDirection);
    }

    return () => {
      console.log(`unwatching-${type}`);
      socket.off(`direction-${type}`, handleDirection);
    };
  }, [isWatching, type]);

  return {
    isWatching,
    handleWatch,
    lastOperations,
    operatorIsOnline,
    type,
    setType,
  };
};
