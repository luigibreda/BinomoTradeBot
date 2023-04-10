import { useOnlineUsers } from "../../hooks/useOnlineUsers";
import { useExtensionStore } from "../../store/extensionStore";
import { Actions } from "./components/Actions";
import { Statistics } from "./components/Statistics";

export const AdminPage = () => {
  const onlineUsers = useOnlineUsers();
  const startedMirroring = useExtensionStore((state) => state.startedMirroring);
  const plays = useExtensionStore((state) => state.plays);

  return (
    <div className="mt-2 flex flex-col gap-20">
      <div>
        <div>
          <h1 className="font-bold text-lg">Binomo CopyTrader</h1>
          <p className="text-sm font-light text-neutral-400">Area do Admin</p>
        </div>
        <Statistics
          onlineUsers={onlineUsers}
          startedMirroring={startedMirroring}
          plays={plays}
        />
      </div>
      <Actions startedMirroring={startedMirroring} />
    </div>
  );
};
