import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import { Autoplay } from 'swiper/modules';
import Avatar from '@mui/material/Avatar';

function SwiperComponent(props) {

  return (
    <Swiper
    slidesPerView={props.slidesPerView}
    spaceBetween={100}
    // pagination={{
    //   clickable: true,
    // }}
    autoplay={{
        delay: 2500,
        disableOnInteraction: false,
      }}
      loop={true}
    modules={[Autoplay]}
    className="mySwiper"
  >
    {props.swiperProduct?.map(product => {
        return <>
        <SwiperSlide> <div className="category__item category-two__item text-center">
                <a className="category__image d-block">
                <Avatar alt="Remy Sharp" src={product.image} 
                  sx={{ width: 210, height: 210 }}/>
                </a>
                <h4 className="mt-30">
                  <a>{product.name}</a>
                </h4>
              </div></SwiperSlide>
        </>
    })}
  </Swiper>
  )
}

export const SwiperComponentCustom = (props) => {

    return (
      <Swiper
      slidesPerView={props.slidesPerView}
      spaceBetween={100}
      autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        loop={true}
      modules={[Autoplay]}
      className="mySwiper"
    >
      {props.swiperProduct?.map(product => {
          return props.customSwiperProduct(product)
      })}
    </Swiper>
    )
  }

export default SwiperComponent