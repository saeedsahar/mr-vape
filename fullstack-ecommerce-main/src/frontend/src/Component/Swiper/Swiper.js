import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Autoplay, Navigation } from "swiper/modules";
import Avatar from "@mui/material/Avatar";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setBlog } from "../../Pages/Blog/BlogSlice";

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
              <div
                className="category__item category-two__item text-center pointer "
                onClick={() => navigate(`/products/${product.id}`)}
              >
                <a className="category__image d-block overflow-hidden">
                  <Avatar
                    alt="Remy Sharp"
                    src={product.image}
                    sx={{ width: 210, height: 210 }}
                  />
                </a>
                <h5 className="mt-30 text-uppercase">
                  <a>{product.name}</a>
                </h5>
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
      breakpoints={
        props.hideBreakPoint
          ? ""
          : props.breakpoints
          ? props.breakpoints
          : {
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
            }
      }
      autoplay={
        !props.stopAutoPlay && {
          delay: 2500,
          disableOnInteraction: false,
        }
      }
      navigation={props.navigation}
      loop={!props.stopAutoPlay}
      modules={[Autoplay, Navigation]}
      className="mySwiper"
    >
      {props.swiperProduct?.map((product) => {
        return props.customSwiperProduct(product);
      })}
    </Swiper>
  );
};

export const SwiperComponentNavigation = (props) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  return (
    <Swiper
      slidesPerView={props.slidesPerView}
      spaceBetween={50}
      // pagination={{
      //   clickable: true,
      // }}
      breakpoints={
        props.hideBreakPoint
          ? ""
          : props.breakpoints
          ? props.breakpoints
          : {
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
            }
      }
      autoplay={
        !props.stopAutoPlay && {
          delay: 2500,
          disableOnInteraction: false,
        }
      }
      navigation={props.navigation}
      loop={!props.stopAutoPlay}
      modules={[Autoplay, Navigation]}
      className="mySwiper"
      style={{ padding: "0px 40px" }}
    >
      {props.swiperProduct?.map((item) => {
        return (
          <SwiperSlide>
            {/* <div className="" style={{ paddingLeft: "10px", paddingRight: "10px" }}> */}
            <div
              className="product__item bor"
              onClick={() => {
                dispatch(setBlog(item));
                navigate(`/blog`);
              }}
            >
              <a className="wishlist">
                <i className="fa-regular fa-heart" />
              </a>
              <a className="product__image pt-20 d-block">
                <img
                  className="font-image img-fluid"
                  src={item.image}
                  alt="image"
                  style={{ maxHeight: "300px", minHeight: "300px" }}
                />
                <img
                  className="back-image img-fluid"
                  src={item.image}
                  alt="image"
                  style={{ maxHeight: "300px", minHeight: "300px" }}
                />
              </a>
              <div className="product__content">
                <h5 className="mb-15">
                  <a className="primary-hover">{item.title}</a>
                </h5>

                <span
                  style={{ fontSize: "15px", fontWeight: "500" }}
                  className="ml-10"
                >
                  {item.shortDescription}
                </span>
                {/* <span
               style={{ fontSize: "15px", fontWeight: "500" }}
               className="ml-10"
             >
               {item.description} */}
                {/* </span> */}
              </div>
              <a
                className="product__cart d-block bor-top pointer"
                onClick={() => {
                  dispatch(setBlog(item));
                  navigate(`/blog`);
                }}
              >
                {/* <i className="fa-regular fa-cart-shopping primary-color me-1" /> */}
                <span>Read More</span>
              </a>
            </div>
            {/* </div> */}
          </SwiperSlide>
        );
      })}
    </Swiper>
  );
};

export default SwiperComponent;
