import { ActionButton } from "../../components/ActionButton";
import { Direction, DirectionsList } from "../../components/DirectionList";

type AutomaticProps = {
  lastOperations: Direction[];
  isWatching: boolean;
  handleWatch: () => void;
};

export const Automatic = ({
  lastOperations,
  isWatching,
  handleWatch,
}: AutomaticProps) => {
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
