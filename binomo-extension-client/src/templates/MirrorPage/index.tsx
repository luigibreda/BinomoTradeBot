import useMe from "../../hooks/useMe";
import { useMirror } from "./hooks/useMirror";
import { Loading } from "../Loading";
import { DirectionsList } from "../../components/DirectionList";
import { OperationToggle } from "./components/OperationToggle";
import { HistoryList } from "../../components/HistoryList";

export const MirrorPage = () => {
  const { data, isLoading } = useMe();
  const mirror = useMirror();

  console.log(data);

  if (isLoading) return <Loading />;

  return (
    <div className="text-sm pt-4 h-full flex flex-col gap-2">
      <OperationToggle
        type={mirror.type}
        operatorOnline={mirror.operatorIsOnline}
        onToggle={mirror.toggleType}
        handleWatch={mirror.handleWatch}
        isWatching={mirror.isWatching}
      />
      <div className="flex flex-col gap-2">
        <h1 className="text-base text-neutral-400 font-bold">
          Ultimas operações
        </h1>
        <div>
          <DirectionsList lastOperations={data.entries} limited />
        </div>
      </div>
      <div className="flex flex-col gap-2">
        <h1 className="text-base text-neutral-400 font-bold">
          Historico de ganhos/perdas
        </h1>
        <div>
          <HistoryList history={data.history} />
        </div>
      </div>
    </div>
  );
};
