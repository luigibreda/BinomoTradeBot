import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ExtensionWrapper } from "./components/ExtensionWrapper";
import { AuthProvider } from "./contexts/AuthContext";
import { useOperatorOnline } from "./hooks/useOperatorOnline";
import { Router } from "./routes";

const queryClient = new QueryClient();

function App() {
  useOperatorOnline();
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <ExtensionWrapper>
          <Router />
        </ExtensionWrapper>
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;
