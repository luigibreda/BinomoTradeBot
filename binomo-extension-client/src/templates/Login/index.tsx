import { ActionButton } from "../../components/ActionButton";
import { Input } from "../../components/Inputs";
import { useLogin } from "./hooks/useLogin";

export const Login = () => {
  const { error, handleLogin, register } = useLogin();

  return (
    <form onSubmit={handleLogin} className="flex pt-8 flex-col gap-2">
      <Input
        label="Nome de usuário:"
        placeholder="Usuário"
        id="username"
        register={register}
      />
      <Input
        label="Sua senha:"
        id="password"
        placeholder="Senha"
        type="password"
        register={register}
      />
      <ActionButton color="lime" placeholder="Entrar" />
      {error && <p className="text-red-500 text-sm mx-auto">{error}</p>}
      <a className="text-sm text-lime-400 font-normal" href="https://cashalien.com.br/" target="_blank" rel="noopener noreferrer">Clique aqui para comprar o acesso ao Robô!</a>
    </form>
  );
};
