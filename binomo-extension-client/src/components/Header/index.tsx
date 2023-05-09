import { useNavigate } from "react-router-dom";
import logo from "../../assets/logo.png";
import { BsFillCaretRightFill } from "react-icons/bs";

export const Header = () => {
  const navigate = useNavigate();

  return (
    <div className="flex items-center justify-between mt-3 h-16">
      <div className="w-1/4 flex items-center justify-center">
        <img
          onClick={() => navigate("/")}
          className="w-[85px] cursor-pointer"
          src={logo}
          alt="Logo"
        />
      </div>
      <div>
        <button
          onClick={() => navigate("/history")}
          className="cursor-pointer border-2 border-[#494949] py-3 px-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2"
        >
          Últimas movimentações
          <BsFillCaretRightFill color="#8FCE00" />
        </button>
      </div>
    </div>
  );
};
