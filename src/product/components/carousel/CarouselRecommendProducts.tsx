import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import "./Carousel.css";

import { Keyboard, Pagination, Navigation } from "swiper/modules";
import { CardRecommendProduct } from "../CardRecommendProduct";

export const CarouselRecommendProducts = () => {
  return (
    <>
      <Swiper
        slidesPerView={1}
        spaceBetween={20}
        keyboard={{
          enabled: true,
        }}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        modules={[Keyboard, Pagination, Navigation]}
        className="swiperProductsRecommend"
      >
        <SwiperSlide>
            <CardRecommendProduct/>
        </SwiperSlide>
        <SwiperSlide>
            <CardRecommendProduct/>
        </SwiperSlide>
        
      </Swiper>
    </>
  );
};
