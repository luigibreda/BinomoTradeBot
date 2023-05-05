import { Outlet } from "react-router-dom";
import { Footer } from "../Footer";
import { Header } from "../Header";

export const ExtensionWrapper = ({
  header = true,
}: {
  children?: React.ReactNode;
  header?: boolean;
}) => (
  <div className="w-[540px] font-poppins flex justify-between flex-col text-slate-50 h-[780px] bg-black">
    {header && <Header />}
    <div className="mx-5 min-h-[480px] overflow-auto">
      <Outlet />
      <div className="my-5 text-sm text-gray-500">
        <p className="text-stone-300 text-center">
          Se você estiver enfrentando problemas de acesso ou precisar de suporte
          técnico, entre em contato com nossa equipe em: <br />
          <a
            className="font-bold text-lg"
            href="https://api.whatsapp.com/send/?phone=553899257045&text&type=phone_number&app_absent=0"
          >
            Whatsapp: +55 (38) 9925-7045
          </a>
          .
        </p>
      </div>
    </div>
    <Footer />
  </div>
);
