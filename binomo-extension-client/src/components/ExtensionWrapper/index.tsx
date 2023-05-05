import { Outlet } from "react-router-dom";
import { Footer } from "../Footer";
import { Header } from "../Header";

export const ExtensionWrapper = ({
  header = true,
}: {
  children?: React.ReactNode;
  header?: boolean;
}) => (
  <div className="w-[540px] font-poppins flex justify-between flex-col text-slate-50 min-h-[600px] h-[600px] bg-black">
    {header && <Header />}
    <div className="mx-5 min-h-[480px] overflow-auto">
      <Outlet />
    </div>
    <Footer />
  </div>
);
