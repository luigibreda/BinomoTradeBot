import { useEffect } from "react";
import { useExtensionStore } from "../store/extensionStore";
import { socket } from "../libs/socket";

export const useOnlineUsers = () => {
  const setOnlineUsers = useExtensionStore((state) => state.setOnlineUsers);

  useEffect(() => {
    socket.on("online-users", setOnlineUsers);

    return () => {
      socket.off("online-users", setOnlineUsers);
    };
  }, []);
};
