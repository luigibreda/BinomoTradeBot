import { ActionButton } from "../../../components/ActionButton";
import { BsFillCaretRightFill, BsFillPauseFill } from "react-icons/bs";

type OperationToggleProps = {
  type: "auto" | "manual";
  operatorOnline: boolean;
  isWatching: boolean;
  onToggle: () => void;
  handleWatch: () => void;
};

export function OperationToggle({
  type,
  operatorOnline,
  onToggle,
  isWatching = false,
  handleWatch,
}: OperationToggleProps) {
  return (
    <div className="flex gap-2">
      <div className="bg-dark-900 flex text-xs items-center justify-between rounded-xl w-full py-3 px-4">
        <p className="text-neutral-400">Modo de operação</p>
        <div className="flex gap-2">
          <p>Bot {type == "auto" ? "Automático" : "Manual"}</p>
          {type == "manual" && (
            <p>
              {operatorOnline ? (
                <p className="text-green-500">Online</p>
              ) : (
                <p className="font-bold text-red-500">Offline</p>
              )}
            </p>
          )}
        </div>
        <p
          className="text-primary font-bold cursor-pointer hover:opacity-80"
          onClick={onToggle}
        >
          Alterar
        </p>
      </div>
      <div className="w-1/3">
        <ActionButton
          onClick={handleWatch}
          color={!isWatching ? "primary" : "rose-500"}
          placeholder={!isWatching ? "START" : "STOP"}
          icon={
            isWatching ? (
              <BsFillPauseFill size={26} color="black" />
            ) : (
              <BsFillCaretRightFill size={26} color="black" />
            )
          }
        />
      </div>
    </div>
  );
}
