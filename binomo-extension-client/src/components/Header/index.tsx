import { useNavigate } from "react-router-dom";
import logoBinomo from "../../assets/binomo.png";
import { FaHistory, FaInfo } from "react-icons/fa";

export const Header = () => {
  const navigate = useNavigate();

  return (
    <div className="flex items-center justify-around p-3 h-16">
      <div>
        <FaInfo size={21} />
      </div>
      <div className="w-1/4 flex items-center justify-center">
        <img
          onClick={() => navigate("/")}
          className="w-3/4 cursor-pointer"
          src={logoBinomo}
          alt="Logo"
        />
      </div>
      <div>
        <FaHistory
          cursor={"pointer"}
          size={21}
          onClick={() => navigate("/history")}
        />
      </div>
    </div>
  );
};
