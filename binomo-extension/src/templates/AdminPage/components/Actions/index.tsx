import { ActionButton } from "../../../../components/ActionButton";
import { useActions } from "./hooks/useActions";

type ActionsProps = {
  startedMirroring: boolean;
};

export const Actions = ({ startedMirroring }: ActionsProps) => {
  const { isInBinomoTradingPage, handleMirror } = useActions();

  return (
    <div className="flex flex-col gap-3">
      <ActionButton
        disabled={!isInBinomoTradingPage}
        onClick={handleMirror}
        color={startedMirroring ? "rose" : "emerald"}
        placeholder={
          startedMirroring ? "Parar espelhamento" : "Iniciar espelhamento"
        }
      />
      <p className="text-xs font-light text-neutral-400">
        {!isInBinomoTradingPage
          ? "Você precisa estar na página de negociação do Binomo para inicia o espelhamento. (caso não esteja, clique no icone do Binomo CopyTrader)"
          : "Clique no botão para iniciar o espelhamento."}
      </p>
    </div>
  );
};
