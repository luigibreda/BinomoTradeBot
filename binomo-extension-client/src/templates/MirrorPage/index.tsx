import useMe from "../../hooks/useMe";
import { useMirror } from "./hooks/useMirror";
import { Loading } from "../Loading";
import { daysDifference } from "../../functions";
import { Option } from "./components/Option";
import { DirectionsList } from "../../components/DirectionList";
import { ActionButton } from "../../components/ActionButton";
import { Bagde } from "../../components/Bagde";
import moment from "moment";
import { Registry } from "./components/Registry";

export const MirrorPage = () => {
  const { data, isLoading } = useMe();
  const mirror = useMirror();

  if (isLoading) return <Loading />;

  return (
    <div className="flex h-full  flex-col gap-1">
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
        {mirror.type === "manual" && (
          <Bagde
            color={mirror.operatorIsOnline ? "emerald" : "rose"}
            placeholder={mirror.operatorIsOnline ? "OP online" : "OP offline"}
          />
        )}
      </div>
      <p className="text-sm italic text-neutral-500">
        Sua assinatura expira
        <span className="font-bold"> {daysDifference(data.expiresAt)}</span>
      </p>

      <div className="h-[525px] flex flex-col justify-center gap-3">
        <div className="overflow-y-hidden ">
          <p className="text-sm  text-neutral-500 font-normal text-slate-100">
            Últimas operações:
          </p>
          <DirectionsList limited={true} lastOperations={data.entries} />
        </div>
        <div className="h-1/2  overflow-y-auto">
          <p className="text-sm text-neutral-500 font-normal text-slate-100">
            Historico de ganhos/perdas:
          </p>
          <div className="flex flex-col gap-2">
            {data.history.map((item: any) => (
              <Registry item={item} />
            ))}
          </div>
        </div>
      </div>
      <ActionButton
        color={mirror.isWatching ? "rose" : "lime"}
        onClick={mirror.handleWatch}
        placeholder={mirror.isWatching ? "Parar" : "Iniciar"}
      />
    </div>
  );
};
