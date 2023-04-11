import { createContext, useEffect, useState } from "react";
import { UserServices } from "../services/http/user";

type AuthContextType = {
  userId: string;
  login: (credentials: any) => Promise<void>;
  loading: boolean;
};

const AuthContext = createContext({} as AuthContextType);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [userId, setUserId] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getUser = async () => {
      chrome.storage.sync.get(["token"], (result) => {
        try {
          const decodedToken = atob(result.token);
          const userId = JSON.parse(decodedToken).userId;
          if (!userId) throw new Error("User not found");
          setUserId(userId);
        } catch (error) {
          console.log(error);
        } finally {
          setLoading(false);
        }
      });
    };
    getUser();
  }, []);

  const login = async (credentials: any) => {
    try {
      const response = await UserServices.login(credentials);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <AuthContext.Provider value={{ userId, login, loading }}>
      {children}
    </AuthContext.Provider>
  );
};
