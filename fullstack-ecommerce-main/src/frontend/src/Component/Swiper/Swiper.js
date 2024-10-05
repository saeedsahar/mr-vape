import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Autoplay } from "swiper/modules";
import Avatar from "@mui/material/Avatar";
import { useNavigate } from "react-router-dom";

function SwiperComponent(props) {
  let navigate = useNavigate();
  return (
    <Swiper
      slidesPerView={props.slidesPerView}
      spaceBetween={50}
      // pagination={{
      //   clickable: true,
      // }}
      breakpoints={{
        320: {
          slidesPerView: 1,
          spaceBetween: 20,
        },
        640: {
          slidesPerView: 2,
          spaceBetween: 20,
        },
        768: {
          slidesPerView: 2,
          spaceBetween: 20,
        },
        1024: {
          slidesPerView: 4,
          spaceBetween: 25,
        },
        1366: {
          slidesPerView: 5,
          spaceBetween: 25,
        },
      }}
      autoplay={{
        delay: 2500,
        disableOnInteraction: false,
      }}
      loop={true}
      modules={[Autoplay]}
      className="mySwiper"
    >
      {props.swiperProduct?.map((product) => {
        return (
          <>
            <SwiperSlide>
              {" "}
              <div
                className="category__item category-two__item text-center pointer"
                onClick={() => navigate(`/products/${product.id}`)}
              >
                <a className="category__image d-block">
                  <Avatar
                    alt="Remy Sharp"
                    src={product.image}
                    sx={{ width: 210, height: 210 }}
                  />
                </a>
                <h4 className="mt-30">
                  <a>{product.name}</a>
                </h4>
              </div>
            </SwiperSlide>
          </>
        );
      })}
    </Swiper>
  );
}

export const SwiperComponentCustom = (props) => {
  return (
    <Swiper
      slidesPerView={props.slidesPerView}
      spaceBetween={50}
      // pagination={{
      //   clickable: true,
      // }}
      breakpoints={{
        320: {
          slidesPerView: 1,
          spaceBetween: 20,
        },
        640: {
          slidesPerView: 2,
          spaceBetween: 20,
        },
        768: {
          slidesPerView: 2,
          spaceBetween: 20,
        },
        1024: {
          slidesPerView: 4,
          spaceBetween: 25,
        },
        1366: {
          slidesPerView: 5,
          spaceBetween: 25,
        },
      }}
      autoplay={{
        delay: 2500,
        disableOnInteraction: false,
      }}
      loop={true}
      modules={[Autoplay]}
      className="mySwiper"
    >
      {props.swiperProduct?.map((product) => {
        return props.customSwiperProduct(product);
      })}
    </Swiper>
  );
};

export default SwiperComponent;
