import { Icons } from "../../assets/icons/IconProvider";
import { Images } from "../../assets/images/ImagesProvider";

const { ImageMountainBg } = Images;
const { IconStarOrange, IconCheckGreen } = Icons;

export const CardInfoObjective = () => {
  return (
    <div className="bg-white sm:w-[580px] w-full h-full rounded-lg shadow-xl relative overflow-hidden sm:p-10 p-5">
      <div className="flex justify-between flex-wrap">
        <div className="  ">
          <p className="text-gray-custom-text font-bold sm:text-xl text-base">
            Conocer mi sobrino
          </p>
          <p className="text-gray-custom-text font-bold sm:text-base text-sm">
            Categoría: Bienestar
          </p>
        </div>
        <div>
          <button className="underline text-primary-custom font-semibold text-base hover:text-primary-hover-custom transition ease-in duration-150 cursor-pointer">
            Revisar objetivo
          </button>
        </div>
      </div>
      <div className="mt-5 flex flex-wrap gap-5 lg:justify-between justify-center">
        <div className=" ">
          <p className="text-base text-gray-custom-text text-center mb-1">
            En esta fecha:
          </p>
          <p className="text-base text-gray-custom-text font-bold bg-blue-light-custom px-2 py-1 rounded-lg min-w-[130px]">
            Diciembre/2022
          </p>
        </div>
        <div>
          <p className="text-base text-gray-custom-text text-center mb-1">
            Lograrás:
          </p>
          <p className="text-base text-gray-custom-text font-bold bg-yellow-custom px-2 py-1 rounded-lg min-w-[130px] text-center">
            $6.000.000
          </p>
        </div>
        <div>
          <div className="flex items-center mb-1 gap-1">
            <img src={IconStarOrange} alt="icon_star" />
            <p className="text-base text-gray-custom-text text-center ">
              Ya cuentas con:
            </p>
          </div>
          <p className="text-base text-gray-custom-text font-bold bg-green-light-custom px-2 py-1 rounded-lg min-w-[130px] text-center">
            $0
          </p>
        </div>
      </div>
      <div className=" flex items-start mt-5 mb-24 gap-1">
        <img className="mt-1" src={IconCheckGreen} alt="icon_check" />
        <button
          className="text-base underline text-primary-custom font-semibold text-center hover:text-primary-hover-custom transition ease-in duration-150 cursor-pointer"
        >
          ¡Asocia productos para monitorear tú progreso!
        </button>
      </div>
   
      <img
        className=" w-30 absolute bottom-0 right-0"
        src={ImageMountainBg}
        alt=""
      />
    </div>
  );
};
