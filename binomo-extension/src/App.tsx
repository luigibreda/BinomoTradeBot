import { ExtensionWrapper } from "./components/ExtensionWrapper";
import { AdminPage } from "./templates/AdminPage";
import { useOnlineUsers } from "./hooks/useOnlineUsers";

function App() {
  useOnlineUsers();
  return (
    <ExtensionWrapper>
      <AdminPage />
    </ExtensionWrapper>
  );
}

export default App;
