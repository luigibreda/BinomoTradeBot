import { ActionButton } from "../../components/ActionButton";
import { DirectionsList } from "./components/DirectionList";
import { Bagde } from "../../components/Bagde";
import useMe from "../../hooks/useMe";
import { useMirror } from "./hooks/useMirror";
import { Loading } from "../Loading";
import { daysDifference } from "../../functions";

export const MirrorPage = () => {
  const { data, isLoading } = useMe();
  const { handleWatch, isWatching, lastOperations, operatorIsOnline } =
    useMirror();

  if (isLoading) return <Loading />;

  return (
    <div className="flex flex-col gap-2">
      {data && (
        <p className="text-sm italic text-neutral-500">
          Sua assinatura expira
          <span className="font-bold"> {daysDifference(data.expiresAt)}</span>
        </p>
      )}
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
