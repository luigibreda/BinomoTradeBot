import { DirectionsList } from "../../components/DirectionList";
import { useHistory } from "./hooks/useHistory";

export const History = () => {
  const { data } = useHistory();

  return (
    <div className="pt-2">
      <h2 className="text-sm text-neutral-500 font-normal text-slate-100">As últimas 50 entradas:</h2>
      <DirectionsList lastOperations={data} />
    </div>
  );
};
