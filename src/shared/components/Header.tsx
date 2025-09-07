import { Icons } from "../../assets/icons/IconProvider";
import { IconMenuBurguerComponent } from "./iconMenuBurguer/IconMenuBurguerComponent";

const { LogoWeb, IconHelpOrange, IconFaceHappy, IconHandPrice } = Icons;

interface Props {
  actionMenuBurguer: () => void;
  openModal: () => void;
}

export const Header = ({ actionMenuBurguer, openModal }: Props) => {
  return (
    <header className="w-full bg-white h-[80px] fixed z-50 shadow">
      <nav className="flex justify-between items-center px-3 h-full">
        <div className="flex-1 flex items-center  ">
          <IconMenuBurguerComponent actionMenuBurguer={actionMenuBurguer} />
        </div>
        <div className="lg:flex-2 flex-1 flex items-center  gap-2  justify-center">
          <button className="active:opacity-50 transition-all ease-in duration-150">
            <img src={LogoWeb} alt="logo_web" />
          </button>
          <div className="lg:flex items-center hidden">
            <p className="text-gray-custom-text xl:text-lg text-base">
              <b className="font-bold text-3xl">|</b> Plan Financiero Digital -
              FPX{" "}
            </p>
          </div>
        </div>
        <div className="lg:flex-2 flex-1 flex items-center justify-end  gap-5 lg:pr-10 ">
          <div className="lg:flex items-center hidden gap-4">
            <div className="flex items-end gap-3">
              <img className="w-7" src={IconFaceHappy} alt="icon_face_happy" />
              <button className=" text-primary-custom font-semibold underline cursor-pointer hover:text-primary-hover-custom transition ease-in duration-150">
                Tu Financial Planner
              </button>
            </div>
            <div className="flex items-end gap-3">
              <img className="w-7" src={IconHandPrice} alt="icon_hand_price" />
              <button className="text-primary-custom font-semibold underline hover:text-primary-hover-custom transition ease-in duration-150 cursor-pointer">
                Aportes
              </button>
            </div>
          </div>
          <button
            onClick={() => openModal()}
            className="active:opacity-50 transition-all ease-in duration-150  "
          >
            <img className="w-[32px]" src={IconHelpOrange} alt="icon_help" />
          </button>
        </div>
      </nav>
    </header>
  );
};
