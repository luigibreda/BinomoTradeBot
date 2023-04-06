import { Label } from "../Label";
import { useCounter } from "./hooks/useCounter";

export const Counter = () => {
  const { elapsedTime } = useCounter();
  return <Label label="Tempo decorrido" value={elapsedTime} />;
};
