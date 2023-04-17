import useMe from "../../hooks/useMe";
import { useMirror } from "./hooks/useMirror";
import { Loading } from "../Loading";
import { daysDifference } from "../../functions";
import { Option } from "./components/Option";
import { DirectionsList } from "../../components/DirectionList";
import { ActionButton } from "../../components/ActionButton";
import { Bagde } from "../../components/Bagde";

export const MirrorPage = () => {
  const { data, isLoading } = useMe();
  const mirror = useMirror();

  if (isLoading) return <Loading />;

  return (
    <div className="flex flex-col gap-2 pt-3">
      <div className="flex gap-2">
        <Option
          isActive={mirror.type === "auto"}
          onClick={() => mirror.setType("auto")}
          placeholder="Automatico"
        />
        <Option
          isActive={mirror.type === "manual"}
          onClick={() => mirror.setType("manual")}
          placeholder="Manual"
        />
      </div>
      <p className="text-sm italic text-neutral-500">
        Sua assinatura expira
        <span className="font-bold"> {daysDifference(data.expiresAt)}</span>
      </p>
      {mirror.type === "manual" && (
        <Bagde
          color={mirror.operatorIsOnline ? "emerald" : "rose"}
          placeholder={
            mirror.operatorIsOnline ? "Operador online" : "Operador offline"
          }
        />
      )}
      <ActionButton
        color={mirror.isWatching ? "rose" : "emerald"}
        onClick={mirror.handleWatch}
        placeholder={mirror.isWatching ? "Parar" : "Iniciar"}
      />
      <DirectionsList lastOperations={data.entries} />
    </div>
  );
};
