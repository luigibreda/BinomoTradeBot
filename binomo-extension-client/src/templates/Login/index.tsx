import { useForm } from "react-hook-form";
import { ActionButton } from "../../components/ActionButton";
import { Input } from "../../components/Inputs";
import { useAuth } from "../../contexts/AuthContext";
import { useState } from "react";

export const Login = () => {
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

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex pt-8 flex-col gap-2"
    >
      <Input
        label="Nome de usuário"
        placeholder="Usuário"
        id="username"
        register={register}
      />
      <Input
        label="Sua senha"
        id="password"
        placeholder="Senha"
        type="password"
        register={register}
      />
      <ActionButton color="emerald" placeholder="Entrar" />
      {error && <p className="text-red-500 text-sm mx-auto">{error}</p>}
    </form>
  );
};
