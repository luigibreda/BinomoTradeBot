import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ExtensionWrapper } from "./components/ExtensionWrapper";
import { AuthProvider } from "./contexts/AuthContext";
import { useOperatorOnline } from "./hooks/useOperatorOnline";
import { Router } from "./routes";
import "moment/dist/locale/pt-br";
import "moment/locale/pt-br";

const queryClient = new QueryClient();

function App() {
  useOperatorOnline();
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <Router />
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;
