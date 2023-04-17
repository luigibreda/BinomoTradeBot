import { Outlet } from "react-router-dom";
import { Footer } from "../Footer";
import { Header } from "../Header";

export const ExtensionWrapper = ({
  header = true,
}: {
  children?: React.ReactNode;
  header?: boolean;
}) => (
  <div className="w-80 font-poppins flex justify-between flex-col text-white h-[530px] bg-binomo">
    {header && <Header />}
    <div className="mx-5 min-h-[400px] overflow-auto ">
      <Outlet />
    </div>
    <Footer />
  </div>
);
