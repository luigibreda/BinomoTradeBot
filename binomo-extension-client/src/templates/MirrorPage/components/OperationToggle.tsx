type OperationToggleProps = {
  type: "auto" | "manual";
  operatorOnline: boolean;
  onToggle: () => void;
};

export function OperationToggle({
  type,
  operatorOnline,
  onToggle,
}: OperationToggleProps) {
  return (
    <div className="bg-dark-900 flex justify-between rounded-xl w-full py-3 px-4">
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
  );
}
