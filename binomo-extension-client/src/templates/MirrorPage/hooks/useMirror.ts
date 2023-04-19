import { useEffect, useRef, useState } from "react";
import { useExtensionStore } from "../../../store/extensionStore";
import { socket } from "../../../libs/socket";
import { entryServices } from "../../../services/http/entry";
import { useQueryClient } from "@tanstack/react-query";
import { v4 } from "uuid";
import { useRegHistory } from "./useRegHistory";

type Direction = {
  direction: string;
  time: string;
  tradingAsset: string;
};

export const useMirror = () => {
  const [isWatching, setIsWatching] = useState(false);
  const queryClient = useQueryClient();
  const operatorIsOnline = useExtensionStore((state) => state.operatorIsOnline);
  const [type, setType] = useState<"auto" | "manual">("auto");
  const { initReg, finishReg, incrementReg } = useRegHistory();

  const handleDirection = async (direction: Direction) => {
    try {
      incrementReg();
      const id = v4();
      queryClient.setQueryData(["me"], (oldData: any) => {
        return {
          ...oldData,
          entries: [
            {
              ...direction,
              type,
              createdAt: new Date().toISOString(),
              _id: id,
            },
            ...oldData.entries,
          ],
        };
      });
      chrome.runtime.sendMessage({
        type: "DIRECTION",
        data: direction,
      });
      await entryServices.registerEntry({
        ...direction,
        type,
        _id: id,
      });
    } catch (error) {
      console.log(error);
    }
  };

  const handleWatch = () => {
    if (!isWatching) {
      initReg();
    } else {
      finishReg();
    }
    setIsWatching((isWatching) => !isWatching);
  };

  useEffect(() => {
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
    operatorIsOnline,
    type,
    setType,
  };
};
