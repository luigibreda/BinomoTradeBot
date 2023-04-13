import { ActionButton } from "../../components/ActionButton";
import { Direction, DirectionsList } from "../../components/DirectionList";

type ManualProps = {
  lastOperations: Direction[];
  isWatching: boolean;
  handleWatch: () => void;
};

export const Manual = ({
  lastOperations,
  isWatching,
  handleWatch,
}: ManualProps) => {
  return (
    <>
      <ActionButton
        color={isWatching ? "rose" : "emerald"}
        onClick={handleWatch}
        placeholder={isWatching ? "Parar" : "Iniciar"}
      />
      <DirectionsList lastOperations={lastOperations} />
    </>
  );
};
