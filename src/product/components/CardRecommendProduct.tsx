import { Icons } from "../../assets/icons/IconProvider";
import { Images } from "../../assets/images/ImagesProvider";

const { ImageFamilyPet } = Images;
const { IconWorldBlueSm, IconProfileBlueSm, IconHeartLikeGreen } = Icons;

export const CardRecommendProduct = () => {
  return (
    <div className="  w-[70%] h-[400px] rounded-lg overflow-hidden flex flex-col mx-auto">
      <div className="w-full h-40 relative">
        <div className="absolute w-full h-full top-0 p-3 flex justify-between items-start">
          <p className="text-xs sm:text-base bg-blue1-custom px-3 py-1 rounded-md font-semibold text-gray-custom-text">
            Ahorro e inversión
          </p>
          <div>
            <img className="w-7" src={IconHeartLikeGreen} alt="" />
          </div>
        </div>
        <img
          className="w-full h-full object-cover"
          src={ImageFamilyPet}
          alt="image_family"
        />
      </div>
      <div className="flex-1 bg-white flex flex-col justify-between">
        <div className="p-4">
          <p className="text-gray-custom-text text-sm sm:text-base">
            ¡Fondo de inversión Colectiva,{" "}
            <b>la acción para potenciar tu capital y hacer real tu objetivo!</b>
          </p>
          <p className="text-primary-custom underline text-sm my-3 sm:text-base hover:text-primary-hover-custom transition ease-in duration-150 cursor-pointer">
            Conoce más
          </p>
          <div className=" flex items-start gap-3">
            <img src={IconWorldBlueSm} alt="icon_world" />
            <p className="text-sm sm:text-base text-gray-custom-text">
              Rentabilidades mínimas del <b>3% anuales</b>
            </p>
          </div>
          <div className="mt-2 flex items-start gap-3">
            <img src={IconProfileBlueSm} alt="icon_profile" />
            <p className="text-sm sm:text-base text-gray-custom-text">
              <b>4.000 clientes</b> confían en este producto
            </p>
          </div>
        </div>
        <div className={`h-1.5 bg-gray4-custom`}></div>
      </div>
    </div>
  );
};
