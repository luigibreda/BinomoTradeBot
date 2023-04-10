import { Label } from "../../../../../../components/Label";
import { useCounter } from "./hooks/useCounter";

export const Counter = () => {
  const { elapsedTime } = useCounter();
  return <Label label="Tempo decorrido" value={elapsedTime} />;
};
