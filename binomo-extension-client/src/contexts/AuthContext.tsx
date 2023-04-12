import { createContext, useContext, useEffect, useState } from "react";
import { UserServices } from "../services/http/user";
import { Credentials } from "../types";
import { api } from "../services/api";
import { Loading } from "../templates/Loading";
import { useExtensionStore } from "../store/extensionStore";
import { useQueryClient } from "@tanstack/react-query";

type AuthContextType = {
  isAuthenticated: boolean;
  login: (credentials: any) => Promise<void>;
  loading: boolean;
};

const AuthContext = createContext({} as AuthContextType);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [loading, setLoading] = useState(true);
  const token = useExtensionStore((state) => state.token);
  const setToken = useExtensionStore((state) => state.setToken);
  const queryClient = useQueryClient();

  useEffect(() => {
    const getUser = async () => {
      try {
        api.defaults.headers.Authorization = `Bearer ${token}`;
        if (!token) throw new Error("Token not found");
        const me = await UserServices.me();
        queryClient.setQueryData(["me"], me);
        setIsAuthenticated(true);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    getUser();
  }, []);

  const login = async (credentials: Credentials) => {
    try {
      const response = await UserServices.login(credentials);

      setToken(response.token);
      setIsAuthenticated(true);
      api.defaults.headers.Authorization = `Bearer ${response.token}`;
    } catch (error: any) {
      console.log(error);
      throw new Error(error.response.data.message);
    }
  };

  if (loading) return <Loading />;

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
