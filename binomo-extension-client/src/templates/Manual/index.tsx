import { ActionButton } from "../../components/ActionButton";
import { Bagde } from "../../components/Bagde";
import { Direction, DirectionsList } from "../../components/DirectionList";

type ManualProps = {
  lastOperations: Direction[];
  isWatching: boolean;
  operatorIsOnline: boolean;
  handleWatch: () => void;
};

export const Manual = ({
  lastOperations,
  isWatching,
  handleWatch,
  operatorIsOnline,
}: ManualProps) => {
  return (
    <>
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
    </>
  );
};
