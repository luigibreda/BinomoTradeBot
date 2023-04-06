type Direction = {
  message: string;
  tradingAsset: string;
};

type Props = {
  lastOperations: Direction[];
};

export const DirectionsList = ({ lastOperations }: Props) => {
  const operationsMock = [
    {
      message: "Compra de 1 BTC",
      tradingAsset: "BTC",
    },
    {
      message: "Venda de 1 BTC",
      tradingAsset: "BTC",
    },
  ];

  return (
    <div>
      {operationsMock.map((operation: any, index: number) => (
        <div key={index}>{operation.message}</div>
      ))}
    </div>
  );
};
