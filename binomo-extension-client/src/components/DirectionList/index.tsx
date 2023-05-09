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
  <div
    className={`flex rounded-xl flex-col bg-dark-900 gap-3 h-full overflow-y-auto py-2 `}
  >
    {[1, 2].map((item) => (
      <div className="flex items-center justify-between px-4 py-3">
        <div className="w-full gap-3 flex items-center ">
          <div className="flex items-center gap-2 w-[125px]">
            <BsFillCaretDownFill size={22} color="red" />

            <div className="w-12 bg-white h-3 animate-pulse rounded-lg"></div>
          </div>

          <div>
            <div className="w-16 h-3 bg-neutral-400 animate-pulse rounded-lg"></div>
          </div>
        </div>
        <div>
          <div className="w-16 h-3 bg-primary animate-pulse rounded-lg"></div>
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
