import { useNavigate } from "react-router-dom";
import logo from "../../assets/cashalien-logo.jpg";
import { FaHistory, FaInfo } from "react-icons/fa";

export const Header = () => {
  const navigate = useNavigate();

  return (
    <div className="flex items-center justify-around p-3 h-16">
      <div>
        {/* <FaInfo size={21} /> */}
      </div>
      <div className="w-1/4 flex items-center justify-center">
        <img
          onClick={() => navigate("/")}
          className="w-full cursor-pointer"
          src={logo}
          alt="Logo"
        />
      </div>
      <div>
        {/* <FaHistory
          cursor={"pointer"}
          size={21}
          onClick={() => navigate("/history")}
        /> */}
        <button onClick={() => navigate("/history")} className="cursor-pointer">
          <svg
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
            className="inline-block w-5 h-5 mr-1 align-text-bottom"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M8.25 6.75h12M8.25 12h12m-12 5.25h12M3.75 6.75h.007v.008H3.75V6.75zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zM3.75 12h.007v.008H3.75V12zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm-.375 5.25h.007v.008H3.75v-.008zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
            ></path>
          </svg>
        </button>
      </div>
    </div>
  );
};
