import { Icons } from "../../assets/icons/IconProvider";

const { IconMenuBurguer , LogoWeb , IconHelpOrange } = Icons;

export const Header = () => {
  return (
    <header className="w-full bg-white h-13">
      <nav className="flex justify-between items-center px-3 h-full">
        <button className="active:opacity-50 transition-all ease-in duration-150">
          <img
            className="w-7 h-7"
            src={IconMenuBurguer}
            alt="icon_menu_burguer"
          />
        </button>
        <button className="active:opacity-50 transition-all ease-in duration-150">
          <img src={LogoWeb} alt="logo_web"/>
        </button>
        <button className="active:opacity-50 transition-all ease-in duration-150">
          <img src={IconHelpOrange} alt="icon_help" />
        </button>
      </nav>
    </header>
  );
};
