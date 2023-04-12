import { useEffect, useState } from "react";
import { socket } from "../../libs/socket";
import { ActionButton } from "../../components/ActionButton";
import { DirectionsList } from "./components/DirectionList";
import { useExtensionStore } from "../../store/extensionStore";
import { Bagde } from "../../components/Bagde";

type Direction = {
  direction: string;
  time: string;
  tradingAsset: string;
};

export const MirrorPage = () => {
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

  return (
    <div className="flex flex-col gap-2">
      <Bagde
        color={operatorIsOnline ? "emerald" : "rose"}
        placeholder={operatorIsOnline ? "Operador online" : "Operador offline"}
      />
      <ActionButton
        color={isWatching ? "rose" : "emerald"}
        onClick={handleWatch}
        placeholder={isWatching ? "Parar" : "Iniciar"}
      />
      <DirectionsList lastOperations={lastOperations} />
    </div>
  );
};
