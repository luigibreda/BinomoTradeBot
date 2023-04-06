import { useEffect, useState } from "react";
import { socket } from "../../libs/socket";
import { ActionButton } from "../../components/ActionButton";
import { DirectionsList } from "./components/DirectionList";

type Direction = {
    message: string;
    tradingAsset: string;
};

export const MirrorPage = () => {
  const [isWatching, setIsWatching] = useState(false);
  const [lastOperations, setLastOperations] = useState<Direction[]>([]);

  const handleDirection = (direction: any) => {
    setLastOperations((lastOperations) => [...lastOperations, direction]);
  };

  const handleWatch = () => {
    setIsWatching(!isWatching);
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
    <div>
      <ActionButton
        color={isWatching ? "rose" : "emerald"}
        onClick={handleWatch}
        placeholder={isWatching ? "Parar" : "Iniciar"}
      />
      <DirectionsList lastOperations={lastOperations} />
    </div>
  );
};
