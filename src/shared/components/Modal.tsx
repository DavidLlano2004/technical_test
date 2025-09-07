import { AnimatePresence, motion } from "framer-motion";
import { Icons } from "../../assets/icons/IconProvider";

const { IconClose, IconFaceHappy, IconHandPrice, IconHelpOrange } = Icons;

interface ViewInfoAffliateProps {
  isopenModal: boolean;
  setViewMenuSm: () => void;
}

export const Modal = ({
  isopenModal,
  setViewMenuSm,
}: ViewInfoAffliateProps) => {
  const variants = {
    enter: () => ({
      x: 400, // Entra desde el lado indicado
    }),
    center: {
      x: 0, // Posición actual
    },
    exit: () => ({
      x: 400, // Sale hacia el lado indicado
    }),
  };

  return (
    <AnimatePresence>
      {isopenModal && (
        <>
          <motion.div
            onClick={setViewMenuSm}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2, ease: "easeInOut" }}
            className="w-full fixed inset-0 bg-[#202020]/30 backdrop-blur-[1px] h-[100dvh] z-50 flex flex-row justify-end"
          >
            <motion.div
              initial="enter"
              animate="center"
              exit="exit"
              onClick={(e) => e.stopPropagation()}
              variants={variants}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="bg-white w-full flex z-50 flex-col"
            >
              <button
                onClick={setViewMenuSm}
                className="bg-white border active:opacity-70 border-gray-light-custom h-7 w-7 right-2 top-2 rounded-full absolute sm:hidden grid place-items-center"
              >
                <img className="w-2" src={IconClose} alt="Cerrar" />
              </button>
              <div className="  mt-12 px-8 flex flex-col gap-5">
                <div className="flex items-end gap-3">
                  <img
                    className="w-7"
                    src={IconFaceHappy}
                    alt="icon_face_happy"
                  />
                  <button className=" text-primary-custom text-base font-semibold underline cursor-pointer hover:text-primary-hover-custom transition ease-in duration-150">
                    Tu Financial Planner
                  </button>
                </div>
                <div className="flex items-end gap-3">
                  <img
                    className="w-7"
                    src={IconHandPrice}
                    alt="icon_hand_price"
                  />
                  <button className="text-primary-custom text-base font-semibold underline hover:text-primary-hover-custom transition ease-in duration-150 cursor-pointer">
                    Aportes
                  </button>
                </div>
                <div className="flex items-end gap-3">
                  <img
                    className="w-7"
                    src={IconHelpOrange}
                    alt="icon_help_orange"
                  />
                  <button className="text-primary-custom text-base font-semibold underline hover:text-primary-hover-custom transition ease-in duration-150 cursor-pointer">
                    Preguntas frecuentes
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
