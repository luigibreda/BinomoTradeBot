import moment from "moment";
import { Bagde } from "../Bagde";

export type Direction = {
  direction: string;
  time: string;
  tradingAsset: string;
  type: string;
  createdAt: string;
};

type Props = {
  lastOperations: Direction[];
  limited?: boolean;
};

export const DirectionsList = ({ lastOperations, limited = false }: Props) => {
  const oprations = limited ? lastOperations.slice(0, 2) : lastOperations;

  return (
    <div className={`flex flex-col gap-2 h-full overflow-y-auto`}>
      {oprations.map((operation: any, index: number) => (
        <div
          key={operation._id}
          className={`border flex justify-between border-neutral-600 px-2 py-2 rounded-md`}
        >
          <div>
            <div className="border-b-neutral-600">
              <span className="font-bold text-neutral-500 text-sm">Asset:</span>{" "}
              {operation.tradingAsset}
            </div>
            <div>
              <span className="font-bold text-neutral-500 text-sm">
                Direction:{" "}
              </span>
              {operation.direction}
            </div>
          </div>
          <div className="flex flex-col justify-end items-end">
            <Bagde color="emerald" placeholder={operation.type.toUpperCase()} />
            <p className="text-xs text-neutral-400">
              {moment(operation.createdAt).locale("pt-br").fromNow()}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};
