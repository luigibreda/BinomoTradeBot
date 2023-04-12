type Direction = {
  direction: string;
  time: string;
  tradingAsset: string;
};

type Props = {
  lastOperations: Direction[];
};

export const DirectionsList = ({ lastOperations }: Props) => {
  return (
    <div className="flex mt-4 flex-col gap-2">
      {lastOperations.map((operation: any, index: number) => (
        <div
          key={index}
          className="border border-neutral-600 px-2 py-2 rounded-md"
        >
          <div className="border-b-neutral-600">
            <span className="font-bold">Asset:</span> {operation.tradingAsset}
          </div>
          <div>
            <span className="font-bold">Direction: </span>
            {operation.direction}
          </div>
        </div>
      ))}
    </div>
  );
};
