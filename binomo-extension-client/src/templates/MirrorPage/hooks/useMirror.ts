import { useEffect, useState } from "react";
import { useExtensionStore } from "../../../store/extensionStore";
import { socket } from "../../../libs/socket";
import { entryServices } from "../../../services/http/entry";
import useMe from "../../../hooks/useMe";
import { useQueryClient } from "@tanstack/react-query";
import { v4 } from "uuid";

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

  const handleDirection = async (direction: Direction) => {
    try {
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
      const res = await entryServices.registerEntry({
        ...direction,
        type,
        _id: id,
      });
      chrome.runtime.sendMessage({
        type: "DIRECTION",
        data: direction,
      });
    } catch (error) {
      console.log(error);
    }
  };

  const handleWatch = () => {
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
