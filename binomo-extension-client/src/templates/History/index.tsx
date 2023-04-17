import { DirectionsList } from "../../components/DirectionList";
import { Loading } from "../Loading";
import { useHistory } from "./hooks/useHistory";

export const History = () => {
  const { data, isLoading } = useHistory();

  if (isLoading) return <Loading />;

  return (
    <div className="pt-2">
      <h2 className="text-neutral-400 font-bold">As ultimas 50 entradas</h2>
      <DirectionsList lastOperations={data} />
    </div>
  );
};
