import { Outlet } from "react-router-dom";
import { Header } from "../Header";

export const ExtensionWrapper = ({
  header = true,
}: {
  children?: React.ReactNode;
  header?: boolean;
}) => (
  <div className="w-[548px] font-poppins px-10 flex flex-col text-slate-50 h-[600px] bg-dark-700">
    {header && <Header />}
    <div className="px-1 h-[500px] overflow-auto">
      <Outlet />
    </div>
  </div>
);
