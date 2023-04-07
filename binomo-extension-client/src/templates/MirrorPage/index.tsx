import { useEffect, useState } from "react";
import { socket } from "../../libs/socket";
import { ActionButton } from "../../components/ActionButton";
import { DirectionsList } from "./components/DirectionList";
import { useExtensionStore } from "../../store/extensionStore";
import { Bagde } from "../../components/Bagde";

type Direction = {
  message: string;
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
      data: direction.message,
    });
  };

  const handleWatch = () => {
    setIsWatching(!isWatching);
    setLastOperations([]);
  };

  useEffect(() => {
    if (isWatching) {
      socket.on("direction", handleDirection);
    }

    return () => {
      socket.off("direction", handleDirection);
    };
  }, [isWatching]);

  return (
    <div className="flex flex-col gap-2">
      {operatorIsOnline ? (
        <Bagde color="emerald" placeholder="Operador online" />
      ) : (
        <Bagde color="rose" placeholder="Operador offline" />
      )}
      <ActionButton
        color={isWatching ? "rose" : "emerald"}
        onClick={handleWatch}
        placeholder={isWatching ? "Parar" : "Iniciar"}
      />
      <DirectionsList lastOperations={lastOperations} />
    </div>
  );
};
