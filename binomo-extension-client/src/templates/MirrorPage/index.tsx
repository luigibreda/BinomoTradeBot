import useMe from "../../hooks/useMe";
import { useMirror } from "./hooks/useMirror";
import { Loading } from "../Loading";
import { daysDifference } from "../../functions";
import { Automatic } from "../Automatic";
import { Manual } from "../Manual";

type OptionProps = {
  placeholder: string;
  isActive?: boolean;
  onClick?: () => void;
};

const Option = ({ placeholder, onClick, isActive }: OptionProps) => {
  return (
    <div
      onClick={onClick}
      className={`flex cursor-pointer ${isActive && "bg-cyan-500"} px-2 py-1
        transition-colors duration-200
      rounded-full border-2 border-neutral-700`}
    >
      <p className="opacity-100">{placeholder}</p>
    </div>
  );
};

export const MirrorPage = () => {
  const { data, isLoading } = useMe();
  const mirror = useMirror();

  if (isLoading) return <Loading />;

  return (
    <div className="flex flex-col gap-2">
      <div className="flex gap-2">
        <Option
          isActive={mirror.type === "auto"}
          onClick={() => mirror.setType("auto")}
          placeholder="Automatico"
        />
        <Option
          isActive={mirror.type === "manual"}
          onClick={() => mirror.setType("manual")}
          placeholder="Manual"
        />
      </div>

      {data && (
        <p className="text-sm italic text-neutral-500">
          Sua assinatura expira
          <span className="font-bold"> {daysDifference(data.expiresAt)}</span>
        </p>
      )}

      {mirror.type === "auto" && <Automatic {...mirror} />}
      {mirror.type === "manual" && <Manual {...mirror} />}
    </div>
  );
};
