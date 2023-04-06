import { ActionButton } from "./components/ActionButton";
import { Statistics } from "./components/Statistics";
import { useAdmin } from "./hooks/useAdmin";

export const AdminPage = () => {
  const { startedMirroring, handleMirror, isInBinomoTradingPage } = useAdmin();

  return (
    <div className="mt-2 flex flex-col gap-20">
      <div>
        <div>
          <h1 className="font-bold text-lg">Binomo CopyTrader</h1>
          <p className="text-sm font-light text-neutral-400">Area do Admin</p>
        </div>
        <Statistics />
      </div>
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
    </div>
  );
};
