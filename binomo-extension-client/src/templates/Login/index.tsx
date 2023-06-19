import { ActionButton } from "../../components/ActionButton";
import { Input } from "../../components/Inputs";
import { useLogin } from "./hooks/useLogin";
import { FaUser, FaLock } from "react-icons/fa";
import { IoHelpCircle } from "react-icons/io5";

export const Login = () => {
  const { error, handleLogin, register } = useLogin();

  const handleSignUpClick = () => {
    chrome.tabs.create({ url: "https://bit.ly/binomo_brazill" });
  };

  return (
    <div className="h-full  pt-5 relative">
      <h1 className="font-bold text-center text-xl">Faça login para entrar</h1>
      <form onSubmit={handleLogin} className="flex pt-8 flex-col gap-6">
        <div className="flex flex-col gap-3">
          <Input
            icon={<FaUser color="#A9EE00" />}
            placeholder="Insira seu nome de usuário"
            id="username"
            register={register}
          />
          <Input
            icon={<FaLock color="#A9EE00" />}
            id="password"
            placeholder="Insira sua senha"
            type="password"
            register={register}
          />
          {error && <p className="text-red-500 text-sm mx-auto">{error}</p>}
        </div>

        <div className="flex flex-col gap-3">
          <ActionButton color="primary" placeholder="Entrar" />
          <ActionButton
            color="primary"
            placeholder="Comprar acesso ao robô"
            outlined
            onClick={() =>
              chrome.tabs.create({ url: "https://cashalien.com.br" })
            }
          />
        </div>
        <div className="text-center ">
          <p className="font-bold">
            Não tem uma conta?{" "}
            {/* <span className="text-primary font-bold">Cadastre-se</span> */}
            <span
              className="text-primary font-bold hover:underline cursor-pointer"
              onClick={handleSignUpClick}
            >
              Cadastre-se
            </span>
          </p>

          <div
            className="flex text-[#6E757C] justify-center items-center gap-1 absolute bottom-6 
          left-1/2 transform -translate-x-1/2 w-[200px] h-[40px] rounded-xl px-4 cursor-pointer
          "
          >
            <p className="font-bold">Ajuda</p>
            <IoHelpCircle size={20} color="#6E757C" />
          </div>
        </div>
      </form>
    </div>
  );
};
