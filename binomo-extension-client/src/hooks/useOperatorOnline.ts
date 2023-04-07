import { useEffect } from "react";
import { useExtensionStore } from "../store/extensionStore";
import { socket } from "../libs/socket";

export const useOperatorOnline = () => {
  const setOperatorIsOnline = useExtensionStore(
    (state) => state.setOperatorIsOnline
  );

  const handleOperatorOnline = ({ online }: any) => {
    setOperatorIsOnline(online);

    console.log("operator-online", online);
  };

  useEffect(() => {
    socket.on("operator-online", handleOperatorOnline);

    return () => {
      socket.off("operator-online", handleOperatorOnline);
    };
  }, []);
};
