import { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import { CardProduct } from "../CardProduct";
import type { Product } from "../../interfaces/product";
import { CardExploreProducts } from "../CardExploreProducts";

import "./Carousel.css";
import "swiper/css/navigation";
import "swiper/css";

interface Props {
  products: Product[];
  actionButtonExplore: () => void;
}

export const Carousel = ({ products, actionButtonExplore }: Props) => {
  
  const [selectedProductId, setSelectedProductId] = useState<string>("");

  const handleProductSelect = (productId: string) => {
    setSelectedProductId(selectedProductId === productId ? "" : productId);
  };

  return (
    <>
      <Swiper
        slidesPerView={1}
        breakpoints={{
          426: {
            slidesPerView: 2,
          },
          1024: {
            slidesPerView: 3,
          },
        }}
        spaceBetween={20}
        navigation={true}
        modules={[Navigation]}
        className="mySwiper"
      >
        {products.map((product) => (
          <SwiperSlide key={product.numberProduct}>
            <CardProduct
              product={product}
              isSelected={selectedProductId === product.numberProduct}
              onSelect={handleProductSelect}
            />
          </SwiperSlide>
        ))}
        <SwiperSlide>
          <CardExploreProducts actionButtonExplore={actionButtonExplore} />
        </SwiperSlide>
      </Swiper>
    </>
  );
};
