import { ExtensionWrapper } from "./components/ExtensionWrapper";
import { useOperatorOnline } from "./hooks/useOperatorOnline";
import { MirrorPage } from "./templates/MirrorPage";

function App() {
  useOperatorOnline();
  return (
    <ExtensionWrapper>
      <MirrorPage />
    </ExtensionWrapper>
  );
}

export default App;
