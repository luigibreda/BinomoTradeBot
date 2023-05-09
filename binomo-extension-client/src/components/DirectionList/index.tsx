import moment from "moment";
import { Bagde } from "../Bagde";
import { BsFillCaretDownFill, BsFillCaretUpFill } from "react-icons/bs";

export type Direction = {
  _id: string;
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
            <span className="font-thin text-neutral-500 text-sm">Asset:</span>{" "}
            <div className="w-20 h-2 bg-neutral-600 rounded-md"></div>
          </div>
          <div className="flex items-center gap-2">
            <span className="font-thin text-neutral-500 text-sm">
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
  const operations = limited ? lastOperations.slice(0, 3) : lastOperations;

  if (!operations || operations.length == 0) return <Skeleton />;

  return (
    <div
      className={`flex rounded-xl flex-col bg-dark-900 gap-3 h-full overflow-y-auto py-2`}
    >
      {operations.map((operation) => (
        <div className="flex items-center justify-between px-4 py-3">
          <div className="w-full gap-3 flex items-center">
            <div className="flex items-center gap-2 w-[125px]">
              {operation.direction == "UP" ? (
                <BsFillCaretDownFill size={22} color="red" />
              ) : (
                <BsFillCaretUpFill size={22} color="#A9EE00" />
              )}
              <p className="font-bold">{operation.tradingAsset}</p>
            </div>

            <div>
              <p className="text-xs font-bold text-neutral-400">
                {moment(operation.createdAt).fromNow()}
              </p>
            </div>
          </div>
          <div>
            <p className="text-primary font-bold">
              {operation.type.toUpperCase()}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};
