import { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { Icons } from "../../assets/icons/IconProvider";
import { AnimatePresence, motion } from "framer-motion";
import { useScreenSize } from "../../product/hooks/useScreenSize";
const {
  IconHomeActive,
  IconHomeInactive,
  IconContractActive,
  IconContractInactive,
} = Icons;

interface Props {
  isOpenAside: boolean;
}

export const Aside = ({ isOpenAside }: Props) => {
  const [indexIconsAside, setIndexIconAside] = useState<number | null>(null);
  const { isMobile } = useScreenSize();
  const { pathname } = useLocation();
  const routes = [
    {
      to: "/",
      text: "Inicio",
      activeIcon: IconHomeActive,
      inactiveIcon: IconHomeInactive,
    },
    {
      to: "/contracts",
      text: "Contratos",
      activeIcon: IconContractActive,
      inactiveIcon: IconContractInactive,
    },
  ];

  return (
    <AnimatePresence>
      <div className=" lg:w-[60px] w-0 overflow-hidden lg:flex flex-col">
        <motion.div
          key="aside"
          initial={{ width: 60 }}
          animate={{
            width: isOpenAside ? 180 : isMobile ? 0 : 60,
          }}
          exit={{ width: 60 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          className="bg-gray3-custom flex-1 fixed h-full w-[60px] z-50 overflow-hidden"
        >
          <div className="flex flex-col">
            {routes.map(({ to, text, activeIcon, inactiveIcon }, i) => (
              <NavLink
                onMouseEnter={() => setIndexIconAside(i)}
                onMouseLeave={() => setIndexIconAside(null)}
                className={`${
                  pathname === to && "bg-primary-custom"
                } hover:bg-primary-custom transition ease-in duration-200 flex items-center py-4 ${
                  isOpenAside ? " justify-start pl-4" : "justify-center"
                } gap-3 `}
                key={to}
                to={to}
              >
                <img
                  className="w-5"
                  src={
                    indexIconsAside === i || pathname === to
                      ? activeIcon
                      : inactiveIcon
                  }
                  alt=""
                />
                <p
                  className={`${isOpenAside ? " flex" : " hidden"} ${
                    indexIconsAside === i || pathname === to
                      ? "text-white"
                      : "text-gray-custom-text"
                  }`}
                >
                  {text}
                </p>
              </NavLink>
            ))}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
