import { useState } from "react";
import { Icons } from "../../assets/icons/IconProvider";
import { Images } from "../../assets/images/ImagesProvider";
import { CardInfoObjective } from "../components/CardInfoObjective";
import { Carousel } from "../components/carousel/Carousel";
import { useProducts } from "../hooks/useProducts";
import { AnimatePresence, motion } from "framer-motion";
import { CarouselRecommendProducts } from "../components/carousel/CarouselRecommendProducts";
import { Loader } from "../../shared/components/Loader";
const { ImageStarsBg, ImagePeopleHug } = Images;
const { IconHelpGreen } = Icons;

const productIconMap: Record<string, string> = {
  MFUND: "IconMFUND",
  CREA: "IconCREA",
  FICS: "IconFICS",
  BOLT: "IconBOLT",
};

export const Home = () => {
  const { productsQuery } = useProducts();
  const [isProductShow, setIsProductShow] = useState(false);

  if (productsQuery.isLoading) return <Loader />;

  const productsWithIcons =
    productsQuery.data?.listCard?.map((product) => ({
      ...product,
      iconProduct: productIconMap[product.nameProduct] || "IconDefault",
    })) || [];

  const showRecommendedProducts = () => {
    setIsProductShow(true);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2, ease: "easeInOut" }}
    >
      <div
        className=" w-full sm:h-[250px] h-[280px] flex flex-col items-center pt-10 px-2"
        style={{
          background: ` url(${ImageStarsBg})`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          backgroundPosition: "top",
        }}
      >
        <h2 className="text-white font-bold sm:text-3xl text-lg text-center">
          ¡Tú objetivo ha sido agregado exitosamente
        </h2>
        <p className="text-white sm:text-xl text-base text-center">
          ¡Te hemos enviado un correo con la notificación!
        </p>
      </div>
      <div className=" w-full sm:h-[280px] min-h-[250px] h-auto px-3 -mt-32 flex justify-center">
        <CardInfoObjective />
      </div>
      <div className="px-3 mt-8 flex flex-col gap-3">
        <p className="text-center text-gray-custom-text font-bold sm:text-2xl text-lg">
          ¡Vamos por esos
          <b className="font-bold text-orange-dark-custom">
            {" "}
            $6.000.000
          </b> para{" "}
          <b className="font-bold text-orange-dark-custom">
            {" "}
            Conocer mi sobrino{" "}
          </b>
          !
        </p>
        <p className="text-gray-custom-text text-center text-base sm:text-lg">
          ¡A través de tus productos y nuestros rendimientos podremos lograrlo!
        </p>
        <div className="flex items-center gap-2 flex-wrap justify-center">
          <p className="text-gray-custom-text text-center font-bold text-base sm:text-lg">
            Asocia tus productos o adquiere uno nuevo.
          </p>
          <button className="cursor-pointer hover:shadow hover:scale-105 transition ease-in duration-150">
            <img src={IconHelpGreen} alt="icon_help" />
          </button>
        </div>
      </div>
      <div className="my-10 px-10">
        <Carousel
          products={productsWithIcons}
          actionButtonExplore={() => showRecommendedProducts()}
        />
      </div>
      <div className="w-full flex justify-center mb-10">
        <button className=" bg-gray3-custom hover:bg-[#CFCFCF] cursor-pointer transition ease-in duration-150 px-6 py-2 w-auto rounded-3xl font-semibold text-gray-custom-text text-lg">
          Asociar a objetivo
        </button>
      </div>
      <div>
        <AnimatePresence>
          {isProductShow && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              style={{ overflow: "hidden" }}
            >
              <div
                className="h-auto sm:h-[600px] sm:pt-5 pt-16 flex justify-end sm:pr-30 items-center"
                style={{
                  background: `url(${ImagePeopleHug})`,
                  backgroundRepeat: "no-repeat",
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
              >
                <div className="h-[440px] sm:w-[550px] w-full">
                  <CarouselRecommendProducts />
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};
