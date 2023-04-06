import { Bagde } from "../../../../../../components/Bagde";

type LabelProps = {
  label: string;
  value: string | number;

  isBagde?: boolean;
  bagdeColor?: string;
};

export const Label = ({
  label,
  value,
  isBagde,
  bagdeColor = "rose",
}: LabelProps) => {
  return (
    <div className="w-1/2">
      <label className="text-sm font-light text-neutral-400">{label}</label>
      {isBagde ? (
        <Bagde color={bagdeColor} placeholder={value} />
      ) : (
        <p className="font-bold text-neutral-300">{value}</p>
      )}
    </div>
  );
};
