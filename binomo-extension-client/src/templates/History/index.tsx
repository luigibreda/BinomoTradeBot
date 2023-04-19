import { DirectionsList } from "../../components/DirectionList";
import { useHistory } from "./hooks/useHistory";

export const History = () => {
  const { data } = useHistory();

  return (
    <div className="pt-2">
      <h2 className="text-neutral-400 font-bold">As ultimas 50 entradas</h2>
      <DirectionsList lastOperations={data} />
    </div>
  );
};
