import { Counter } from "./components/Counter";
import { Label } from "../../../../components/Label";

type StatisticsProps = {
  onlineUsers: number;
  startedMirroring: boolean;
  plays: number;
};

export const Statistics = ({
  onlineUsers,
  startedMirroring,
  plays,
}: StatisticsProps) => (
  <div className="flex flex-col mt-4">
    <div className="flex flex-col gap-4">
      <div className="flex justify-between">
        <Counter />
        <Label label="Jogadas realizadas" value={plays} />
      </div>
      <div className="flex justify-between">
        <Label label="Online" value={onlineUsers} />
        <Label
          isBagde
          label="Status"
          bagdeColor={startedMirroring ? "emerald" : "rose"}
          value={startedMirroring ? "Espelhando" : "Inativo"}
        />
      </div>
    </div>
  </div>
);
