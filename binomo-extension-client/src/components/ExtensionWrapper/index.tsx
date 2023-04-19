import { Outlet } from "react-router-dom";
import { Footer } from "../Footer";
import { Header } from "../Header";

export const ExtensionWrapper = ({
  header = true,
}: {
  children?: React.ReactNode;
  header?: boolean;
}) => (
  <div className="w-[340px] font-poppins flex justify-between flex-col text-white h-[580px] bg-zinc-950">
    {header && <Header />}
    <div className="mx-5 min-h-[480px] overflow-auto">
      <Outlet />
    </div>
    <Footer />
  </div>
);
