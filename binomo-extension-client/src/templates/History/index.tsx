import { DirectionsList } from "../../components/DirectionList";
import { useHistory } from "./hooks/useHistory";

export const History = () => {
  const { data } = useHistory();

  return (
    <div className="pt-2">
      <h2 className="text-xl font-bold text-center pb-2">Últimas operações</h2>
      <DirectionsList lastOperations={data} />
    </div>
  );
};
