import { Icons } from "../../assets/icons/IconProvider";
const { LogoWeb, IconFacebook, IconYoutube, IconTwitter } = Icons;
export const Footer = () => {
  return (
    <div className="bg-white sm:px-20 px-3 py-10 shadow-xl">
      <button className="active:opacity-50 transition-all ease-in duration-150">
        <img src={LogoWeb} alt="logo_web" />
      </button>
      <div className=" flex sm:flex-row flex-wrap justify-between flex-col mt-5 gap-12">
        <div className="flex-1">
          <p className="text-gray-custom-text mb-5">© 2019 Skandia</p>
          <p className="text-gray-custom-text">
            PBX: <b className="text-primary-custom">658 4000</b> /{" "}
            <b className="text-primary-custom">484 1300</b>
          </p>
          <p className="text-gray-custom-text">
            Línea nacional{" "}
            <b className="text-primary-custom">01 8000 517 526</b>
          </p>
          <p className="text-gray-custom-text">Línea Corporativa 658 4123</p>
          <p className="text-gray-custom-text">Av. 19 # 109A - 30</p>
          <p className="text-gray-custom-text">Bogotá D.C., Colombia</p>
          <p className="text-gray-custom-text">
            <b>Oficinas a nivel nacional</b>
          </p>
        </div>
        <div className="flex flex-col flex-1 min-w-[200px] border border-red-800">
          <a href="/" className=" text-gray-custom-text underline">
            Términos y Condiciones Canales de Servicio
          </a>
          <a href="/" className="text-gray-custom-text underline">
            Defensoría del Consumidor Financiero
          </a>
          <a href="/" className="text-gray-custom-text underline">
            Protección de Datos
          </a>
          <a href="/" className="text-gray-custom-text underline">
            Definiciones Generales - Auto declaración FATCA y CRS
          </a>
          <a href="/" className="text-gray-custom-text underline">
            Recomendaciones de Seguridad
          </a>
          <a href="/" className="text-gray-custom-text underline">
            Ley de Transparencia
          </a>
          <a href="/" className="text-gray-custom-text underline">
            Mapa del sitio
          </a>
        </div>
        <div className="flex justify-center items-center gap-10 flex-1 sm:self-end self-center">
          <button className=" active:opacity-50 transition-all ease-in duration-150">
            <img className="w-7 h-7" src={IconFacebook} alt="icon_facebook" />
          </button>
          <button className=" active:opacity-50 transition-all ease-in duration-150">
            <img className="w-7 h-7" src={IconYoutube} alt="icon_youtube" />
          </button>
          <button className=" active:opacity-50 transition-all ease-in duration-150 ">
            <img className="w-7 h-7" src={IconTwitter} alt="icon_twitter" />
          </button>
        </div>
      </div>
    </div>
  );
};
