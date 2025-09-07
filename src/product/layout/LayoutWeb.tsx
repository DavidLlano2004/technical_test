import { Outlet } from "react-router-dom";
import { Header } from "../../shared/components/Header";
import { Footer } from "../../shared/components/Footer";
import { Images } from "../../assets/images/ImagesProvider";
import { Aside } from "../../shared/components/Aside";
import { useState } from "react";
import { Modal } from "../../shared/components/Modal";

const { ImageBgHome } = Images;

export const LayoutWeb = () => {
  const [isOpenAside, setIsOpenAside] = useState(false);
  const [isOpenModal, setIsOpenModal] = useState(false);

  const openAsideAction = () => {
    setIsOpenAside((prev) => !prev);
  };

  const openModal = () => {
    setIsOpenModal(true);
  };

  return (
    <div className="w-full min-h-screen flex flex-col">
      <Header actionMenuBurguer={openAsideAction} openModal={openModal} />
      <div className="mt-20 flex flex-1">
        <Aside isOpenAside={isOpenAside} />
        <div
          className=" flex-1 flex flex-col overflow-hidden"
          style={{
            backgroundImage: `url(${ImageBgHome})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundAttachment: "fixed",
          }}
        >
          <div className="flex-1 flex flex-col justify-between">
            <div className="overflow-y-auto">
              <Outlet />
            </div>
            <Footer />
          </div>
        </div>
      </div>
      <Modal
        isopenModal={isOpenModal}
        setViewMenuSm={() => setIsOpenModal(false)}
      />
    </div>
  );
};
