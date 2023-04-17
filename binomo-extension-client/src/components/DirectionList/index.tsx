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
};

export const DirectionsList = ({ lastOperations }: Props) => {
  return (
    <div className="flex mt-4 flex-col gap-2">
      {lastOperations.map((operation: any, index: number) => (
        <div
          key={operation._id}
          className="border flex justify-between border-neutral-600 px-2 py-2 rounded-md"
        >
          <div>
            <div className="border-b-neutral-600">
              <span className="font-bold text-sm">Asset:</span>{" "}
              {operation.tradingAsset}
            </div>
            <div>
              <span className="font-bold text-sm">Direction: </span>
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
