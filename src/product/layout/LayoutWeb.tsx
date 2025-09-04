import { Outlet } from "react-router-dom";
import { Header } from "../../shared/components/Header";
import { MenuWebLg } from "../../shared/components/MenuWebLg";
import { Footer } from "../../shared/components/Footer";

export const LayoutWeb = () => {
  return (
    <div className=" bg-yellow-500 w-full min-h-screen flex flex-col">
      <Header />
      <div className="flex flex-col flex-1">
        {/* <div>
          <MenuWebSm />
        </div> */}
        <MenuWebLg />
        <div className="flex flex-col flex-1 border border-red-800">
          <div className="flex-1">
            <Outlet />
          </div>
          <Footer />
        </div>
      </div>
    </div>
  );
};
