import { ActionButton } from "../../components/ActionButton";
import { Bagde } from "../../components/Bagde";
import { Direction, DirectionsList } from "../../components/DirectionList";

type AutomaticProps = {
  lastOperations: Direction[];
  operatorIsOnline: boolean;
  isWatching: boolean;
  handleWatch: () => void;
};

export const Automatic = ({
  lastOperations,
  operatorIsOnline,
  isWatching,
  handleWatch,
}: AutomaticProps) => {
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
