import { Images } from "../../assets/images/ImagesProvider";

const { ImagePeopleHug } = Images;

interface Props {
  actionButtonExplore: () => void;
}

export const CardExploreProducts = ({ actionButtonExplore }: Props) => {
  return (
    <div className="w-full bg-white h-[400px] rounded-lg flex-col flex justify-between overflow-hidden border-[0.5px] border-[#d8d8d8]">
      <div
        className="flex-1 flex-col flex justify-end items-end p-3"
        style={{
          background: `url(${ImagePeopleHug})`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          backgroundPosition: "top",
        }}
      >
        <div>
          <button
            onClick={actionButtonExplore}
            className="text-white underline bg-primary-custom hover:bg-primary-hover-custom cursor-pointer px-5 py-1 w-auto rounded-2xl text-lg active:opacity-80 transition-all ease-in duration-200"
          >
            Explora ahora
          </button>
        </div>
      </div>
      <div className={`h-1.5 bg-orange-light-custom`}></div>
    </div>
  );
};
