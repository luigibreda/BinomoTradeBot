import { useState } from "react";
import { useAuth } from "../../../contexts/AuthContext";
import { useForm } from "react-hook-form";

export const useLogin = () => {
  const [error, setError] = useState<string | null>(null);
  const { register, handleSubmit } = useForm();
  const { login } = useAuth();

  const onSubmit = async (data: any) => {
    setError(null);
    try {
      await login(data);
    } catch (error: any) {
      setError(error.message);
    }
  };

  const handleLogin = handleSubmit(onSubmit);

  return {
    register,
    handleLogin,
    error,
  };
};
