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

export const Skeleton = () => (
  <div className={`flex flex-col gap-2 h-full overflow-y-auto`}>
    {[1, 2].map((item) => (
      <div
        key={item}
        className={`border animate-pulse flex justify-between border-neutral-600 px-2 py-2 rounded-md`}
      >
        <div>
          <div className="flex items-center gap-2">
            <span className="font-bold text-neutral-500 text-sm">Asset:</span>{" "}
            <div className="w-20 h-2 bg-neutral-600 rounded-md"></div>
          </div>
          <div className="flex items-center gap-2">
            <span className="font-bold text-neutral-500 text-sm">
              Direction:{" "}
            </span>
            <div className="w-20 h-2 bg-neutral-600 rounded-md"></div>
          </div>
        </div>
        <div className="flex flex-col justify-end items-end">
          <Bagde color="emerald" placeholder="..." />
          <p className="text-xs text-neutral-400">...</p>
        </div>
      </div>
    ))}
  </div>
);

export const DirectionsList = ({ lastOperations, limited = false }: Props) => {
  const operations = limited ? lastOperations.slice(0, 2) : lastOperations;

  if (!operations || operations.length == 0) return <Skeleton />;

  return (
    <div className={`flex flex-col gap-2 h-full overflow-y-auto`}>
      {operations.map((operation: any, index: number) => (
        <div
          key={operation._id}
          className={`border flex text-sm items-center justify-between border-neutral-600 px-2 py-2 rounded-md`}
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
            <p className="text-xs font-bold text-neutral-500">
              {moment(operation.createdAt).locale("pt-br").fromNow()}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};
