import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import WOW from 'wowjs';
import bgImage from "../assets/images/bg/view-bg.jpg"
import bImg from "../assets/images/bg/discount-bg2.jpg"
import bannerBImg from "../assets/images/banner/banner-two-image1.jpg"
import ProductDisplay from "../Component/HomePage/Product/ProductDisplay";
// import { Swiper, SwiperSlide } from 'swiper/react';
// import SwiperCore, { Navigation, Pagination, Autoplay } from 'swiper';

// SwiperCore.use([Navigation, Pagination, Autoplay]);

function Home(props) {
  console.log("[Home.js]");
  const navigate = useNavigate();

  useEffect(() => {
    new WOW.WOW().init(); // Initialize wow.js
  }, []);

  return (
    <>
  <main>
  {/* Banner area start here */}
  <section className="banner-two banner-two-light black-area">
    <div
      className="banner-two__shape-left d-none d-lg-block wow bounceInLeft"
      data-wow-duration="1s"
      data-wow-delay=".5s"
    >
      <img src="assets/images/shape/vape1.png" alt="shape" />
    </div>
    <div
      className="banner-two__shape-right d-none d-lg-block wow bounceInRight"
      data-wow-duration="1s"
      data-wow-delay=".1s"
    >
      <img
        className="sway_Y__animation "
        src="assets/images/shape/vape2.png"
        alt="shape"
      />
    </div>
    <div className="swiper banner-two__slider">
      <div className="swiper-wrapper">
        <div className="swiper-slide">
          <div
            className="slide-bg"
            style={{ backgroundImage: `url(${bannerBImg})` }}
            // data-background="assets/images/banner/banner-two-image1.jpg"
          />
          <div className="container">
            <div className="banner-two__content">
              <h4 data-animation="fadeInUp" data-delay="1s">
                <img src="assets/images/icon/fire.svg" alt="icon" /> GET{" "}
                <span className="primary-color">25% OFF</span> NOW
              </h4>
              <h1 data-animation="fadeInUp" data-delay="1.3s">
                Find everything <br />
                for <span className="primary-color">vaping</span>
              </h1>
              <p className="mt-40" data-animation="fadeInUp" data-delay="1.5s">
                Sell globally in minutes with localized currencies languages,
                and <br /> experie in every market. only a variety of vaping
                products
              </p>
              <div
                className="banner-two__info mt-30"
                data-animation="fadeInUp"
                data-delay="1.7s"
              >
                <span className="mb-10">Starting Price</span>
                <h3>£ 99.00</h3>
              </div>
              <div className="btn-wrp mt-65">
                <a
                  href="shop.html"
                  className="btn-one"
                  data-animation="fadeInUp"
                  data-delay="1.8s"
                >
                  <span>Shop Now </span>
                </a>
                <a
                  className="btn-one-light ml-20"
                  href="shop-single.html"
                  data-animation="fadeInUp"
                  data-delay="1.9s"
                >
                  <span>View Details</span>
                </a>
              </div>
            </div>
          </div>
        </div>
        <div className="swiper-slide">
          <div
            className="slide-bg"
            data-background="assets/images/banner/banner-two-image2.jpg"
          />
          <div className="container">
            <div className="banner-two__content">
              <h4 data-animation="fadeInUp" data-delay="1s">
                <img src="assets/images/icon/fire.svg" alt="icon" /> GET{" "}
                <span className="primary-color">25% OFF</span> NOW
              </h4>
              <h1 data-animation="fadeInUp" data-delay="1.3s">
                Find everything <br />
                for <span className="primary-color">vaping</span>
              </h1>
              <p className="mt-40" data-animation="fadeInUp" data-delay="1.5s">
                Sell globally in minutes with localized currencies languages,
                and <br /> experie in every market. only a variety of vaping
                products
              </p>
              <div
                className="banner-two__info mt-30"
                data-animation="fadeInUp"
                data-delay="1.7s"
              >
                <span className="mb-10">Starting Price</span>
                <h3>£99.00</h3>
              </div>
              <div className="btn-wrp mt-65">
                <a
                  href="shop.html"
                  className="btn-one"
                  data-animation="fadeInUp"
                  data-delay="1.8s"
                >
                  <span>Shop Now</span>
                </a>
                <a
                  className="btn-one-light ml-20"
                  href="shop-single.html"
                  data-animation="fadeInUp"
                  data-delay="1.9s"
                >
                  <span>View Details</span>
                </a>
              </div>
            </div>
          </div>
        </div>
        <div className="swiper-slide">
          <div
            className="slide-bg"
            data-background="assets/images/banner/banner-two-image3.jpg"
          />
          <div className="container">
            <div className="banner-two__content">
              <h4 data-animation="fadeInUp" data-delay="1s">
                <img src="assets/images/icon/fire.svg" alt="icon" /> GET{" "}
                <span className="primary-color">25% OFF</span> NOW
              </h4>
              <h1 data-animation="fadeInUp" data-delay="1.3s">
                Find everything <br />
                for <span className="primary-color">vaping</span>
              </h1>
              <p className="mt-40" data-animation="fadeInUp" data-delay="1.5s">
                Sell globally in minutes with localized currencies languages,
                and <br /> experie in every market. only a variety of vaping
                products
              </p>
              <div
                className="banner-two__info mt-30"
                data-animation="fadeInUp"
                data-delay="1.7s"
              >
                <span className="mb-10">Starting Price</span>
                <h3>£99.00</h3>
              </div>
              <div className="btn-wrp mt-65">
                <a
                  href="shop.html"
                  className="btn-one"
                  data-animation="fadeInUp"
                  data-delay="1.8s"
                >
                  <span>Shop Now</span>
                </a>
                <a
                  className="btn-one-light ml-20"
                  href="shop-single.html"
                  data-animation="fadeInUp"
                  data-delay="1.9s"
                >
                  <span>View Details</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div className="banner-two__arry-btn">
      <button className="arry-prev mb-15 banner-two__arry-prev">
        <i className="fa-light text-white fa-chevron-left" />
      </button>
      <button className="arry-next active banner-two__arry-next">
        <i className="fa-light text-white fa-chevron-right" />
      </button>
    </div>
  </section>
  {/* Banner area end here */}
  {/* Category area start here */}
  <section className="category-area black-area category-two pb-130 pt-130">
    <div className="container">
      <div className="bor-bottom pb-130">
        <div
          className="sub-title text-center mb-65 wow fadeInUp"
          data-wow-delay=".1s"
        >
          <h3>
            <span className="title-icon" /> Trending Products{" "}
            <span className="title-icon" />
          </h3>
        </div>
        <div className="swiper category__slider">
          <div className="swiper-wrapper">
            <div className="swiper-slide">
              <div className="category__item category-two__item text-center">
                <a href="shop.html" className="category__image d-block">
                  <img
                    src="assets/images/category/category-image1.png"
                    alt="image"
                  />
                  {/* <div class="category-icon">
                                      <img src="assets/images/category/category-icon1.png" alt="icon">
                                  </div> */}
                </a>
                <h4 className="mt-30">
                  <a href="shop.html">BLACK &amp; GOLDEN</a>
                </h4>
              </div>
            </div>
            <div className="swiper-slide">
              <div className="category__item category-two__item text-center">
                <a href="shop.html" className="category__image d-block">
                  <img
                    src="assets/images/category/category-image2.png"
                    alt="image"
                  />
                  {/* <div class="category-icon">
                                      <img src="assets/images/category/category-icon2.png" alt="icon">
                                  </div> */}
                </a>
                <h4 className="mt-30">
                  <a href="shop.html">FALCON-X</a>
                </h4>
              </div>
            </div>
            <div className="swiper-slide">
              <div className="category__item category-two__item text-center">
                <a href="shop.html" className="category__image d-block">
                  <img
                    src="assets/images/category/category-image3.png"
                    alt="image"
                  />
                  {/* <div class="category-icon">
                                      <img src="assets/images/category/category-icon3.png" alt="icon">
                                  </div> */}
                </a>
                <h4 className="mt-30">
                  <a href="shop.html">INFONITY-BOX</a>
                </h4>
              </div>
            </div>
            <div className="swiper-slide">
              <div className="category__item category-two__item text-center">
                <a href="shop.html" className="category__image d-block">
                  <img
                    src="assets/images/category/category-image4.png"
                    alt="image"
                  />
                  {/* <div class="category-icon">
                                      <img src="assets/images/category/category-icon4.png" alt="icon">
                                  </div> */}
                </a>
                <h4 className="mt-30">
                  <a href="shop.html">MEGA-BOX</a>
                </h4>
              </div>
            </div>
            <div className="swiper-slide">
              <div className="category__item category-two__item text-center">
                <a href="shop.html" className="category__image d-block">
                  <img
                    src="assets/images/category/category-image5.png"
                    alt="image"
                  />
                  {/* <div class="category-icon">
                                      <img src="assets/images/category/category-icon5.png" alt="icon">
                                  </div> */}
                </a>
                <h4 className="mt-30">
                  <a href="shop.html">ROCKET-X</a>
                </h4>
              </div>
            </div>
            <div className="swiper-slide">
              <div className="category__item category-two__item text-center">
                <a href="shop.html" className="category__image d-block">
                  <img
                    src="assets/images/category/category-image6.png"
                    alt="image"
                  />
                  {/* <div class="category-icon">
                                      <img src="assets/images/category/category-icon6.png" alt="icon">
                                  </div> */}
                </a>
                <h4 className="mt-30">
                  <a href="shop.html">ALIEN-MAX</a>
                </h4>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
  {/* Category area end here */}
  {/* View area start here */}
  <section className="view-area">
    <div
      className="bg-image view__bg"
      style={{ backgroundImage: `url(${bgImage})` }}
      // data-background=""
    />
    <div className="container">
      <div className="row g-4">
        <div className="col-lg-6 wow fadeInLeft" data-wow-delay=".1s">
          <div className="view__left-item">
            <div className="image">
              <img src="assets/images/view/view-image1.jpg" alt="image" />
            </div>
            <div className="view__left-content sub-bg">
              <h2>
                <a className="primary-hover" href="shop-single.html">
                  The best e-liqued bundles
                </a>
              </h2>
              <p className="fw-600">
                Sell globally in minutes with localized currencies languages,
                and experie in every market. only a variety of vaping products
              </p>
              <a className="btn-two" href="shop-single.html">
                <span>Shop Now</span>
              </a>
              <a className="off-btn" href="#0">
                <img
                  className="mr-10"
                  src="assets/images/icon/fire.svg"
                  alt="icon"
                />{" "}
                GET
                <span className="primary-color">25% OFF</span> NOW
              </a>
            </div>
          </div>
        </div>
        <div className="col-lg-6">
          <div className="view__item mb-25 wow fadeInDown" data-wow-delay=".2s">
            <div className="view__content">
              <h3>
                <a className="primary-hover" href="shop-single.html">
                  new to vapeing?
                </a>
              </h3>
              <p>Whereas recognition of the inherent dignity</p>
              <a className="btn-two" href="shop-single.html">
                <span>Shop Now</span>
              </a>
            </div>
            <div className="view__image">
              <img src="assets/images/view/view-image2.jpg" alt="image" />
            </div>
          </div>
          <div className="view__item wow fadeInUp" data-wow-delay=".3s">
            <div className="view__content">
              <h3>
                <a className="primary-hover" href="shop-single.html">
                  Vap mode
                </a>
              </h3>
              <p>Whereas recognition of the inherent dignity</p>
              <a className="btn-two" href="shop-single.html">
                <span>Shop Now</span>
              </a>
            </div>
            <div className="view__image">
              <img src="assets/images/view/view-image3.jpg" alt="image" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
  {/* View area end here */}
  {/* Product area start here */}
  <section className="product-area pt-130 pb-130 mt-130">
    <div className="container">
      <div className="product__wrp pb-30 mb-65 bor-bottom d-flex flex-wrap align-items-center justify-content-xl-between justify-content-center">
        <div
          className="section-header d-flex align-items-center wow fadeInUp"
          data-wow-delay=".1s"
        >
          <span className="title-icon mr-10" />
          <h2>latest arrival products</h2>
        </div>
        <ul className="nav nav-pills mt-4 mt-xl-0">
          <li className="nav-item wow fadeInUp" data-wow-delay=".1s">
            <a
              href="#latest-item"
              data-bs-toggle="tab"
              className="nav-link px-4 active"
            >
              latest item
            </a>
          </li>
          <li className="nav-item wow fadeInUp" data-wow-delay=".2s">
            <a
              href="#top-ratting"
              data-bs-toggle="tab"
              className="nav-link px-4 bor-left bor-right"
            >
              top ratting
            </a>
          </li>
          <li className="nav-item wow fadeInUp" data-wow-delay=".3s">
            <a
              href="#featured-products"
              data-bs-toggle="tab"
              className="nav-link ps-4"
            >
              featured products
            </a>
          </li>
        </ul>
      </div>
      <div className="tab-content">
        <div id="latest-item" className="tab-pane fade show active">
          <div className="row g-4">
            <ProductDisplay/>
            <ProductDisplay/>
            <ProductDisplay/>
            <ProductDisplay/>
            <ProductDisplay/>
            <ProductDisplay/>
            <ProductDisplay/>
            <ProductDisplay/>
          </div>
        </div>
        <div id="top-ratting" className="tab-pane fade">
          <div className="row g-4">
            <div className="col-xxl-3 col-xl-4 col-md-6">
              <div className="product__item bor">
                <a href="#0" className="wishlist">
                  <i className="fa-regular fa-heart" />
                </a>
                <a
                  href="shop-single.html"
                  className="product__image pt-20 d-block"
                >
                  <img
                    className="font-image"
                    src="assets/images/product/product-image4.png"
                    alt="image"
                  />
                  <img
                    className="back-image"
                    src="assets/images/product/product-image6.png"
                    alt="image"
                  />
                </a>
                <div className="product__content">
                  <h4 className="mb-15">
                    <a className="primary-hover" href="shop-single.html">
                      Battery And Charger Kit
                    </a>
                  </h4>
                  <del>£74.50</del>
                  <span className="primary-color ml-10">£49.50</span>
                  <div className="star mt-20">
                    <i className="fa-solid fa-star" />
                    <i className="fa-solid fa-star" />
                    <i className="fa-solid fa-star" />
                    <i className="fa-solid fa-star" />
                    <i className="fa-solid fa-star" />
                  </div>
                </div>
                <a className="product__cart d-block bor-top" href="#0">
                  <i className="fa-regular fa-cart-shopping primary-color me-1" />
                  <span>Add to cart</span>
                </a>
              </div>
            </div>
            <div className="col-xxl-3 col-xl-4 col-md-6">
              <div className="product__item bor">
                <a href="#0" className="wishlist">
                  <i className="fa-regular fa-heart" />
                </a>
                <a
                  href="shop-single.html"
                  className="product__image pt-20 d-block"
                >
                  <img
                    className="font-image"
                    src="assets/images/product/product-image5.png"
                    alt="image"
                  />
                  <img
                    className="back-image"
                    src="assets/images/product/product-image3.png"
                    alt="image"
                  />
                </a>
                <div className="product__content">
                  <h4 className="mb-15">
                    <a className="primary-hover" href="shop-single.html">
                      Pods Sold Separately
                    </a>
                  </h4>
                  <del>£74.50</del>
                  <span className="primary-color ml-10">£49.50</span>
                  <div className="star mt-20">
                    <i className="fa-solid fa-star" />
                    <i className="fa-solid fa-star" />
                    <i className="fa-solid fa-star" />
                    <i className="fa-solid fa-star" />
                    <i className="fa-solid fa-star" />
                  </div>
                </div>
                <a className="product__cart d-block bor-top" href="#0">
                  <i className="fa-regular fa-cart-shopping primary-color me-1" />
                  <span>Add to cart</span>
                </a>
              </div>
            </div>
            <div className="col-xxl-3 col-xl-4 col-md-6">
              <div className="product__item bor">
                <a href="#0" className="wishlist">
                  <i className="fa-regular fa-heart" />
                </a>
                <a
                  href="shop-single.html"
                  className="product__image pt-20 d-block"
                >
                  <img
                    className="font-image"
                    src="assets/images/product/product-image6.png"
                    alt="image"
                  />
                  <img
                    className="back-image"
                    src="assets/images/product/product-image4.png"
                    alt="image"
                  />
                </a>
                <div className="product__content">
                  <h4 className="mb-15">
                    <a className="primary-hover" href="shop-single.html">
                      GeekVape Obelisk Pod
                    </a>
                  </h4>
                  <del>£74.50</del>
                  <span className="primary-color ml-10">£49.50</span>
                  <div className="star mt-20">
                    <i className="fa-solid fa-star" />
                    <i className="fa-solid fa-star" />
                    <i className="fa-solid fa-star" />
                    <i className="fa-solid fa-star" />
                    <i className="fa-solid fa-star" />
                  </div>
                </div>
                <a className="product__cart d-block bor-top" href="#0">
                  <i className="fa-regular fa-cart-shopping primary-color me-1" />
                  <span>Add to cart</span>
                </a>
              </div>
            </div>
            <div className="col-xxl-3 col-xl-4 col-md-6">
              <div className="product__item bor">
                <a href="#0" className="wishlist">
                  <i className="fa-regular fa-heart" />
                </a>
                <a
                  href="shop-single.html"
                  className="product__image pt-20 d-block"
                >
                  <img
                    className="font-image"
                    src="assets/images/product/product-image7.png"
                    alt="image"
                  />
                  <img
                    className="back-image"
                    src="assets/images/product/product-image4.png"
                    alt="image"
                  />
                </a>
                <div className="product__content">
                  <h4 className="mb-15">
                    <a className="primary-hover" href="shop-single.html">
                      POP Extra Strawberry
                    </a>
                  </h4>
                  <del>£74.50</del>
                  <span className="primary-color ml-10">£49.50</span>
                  <div className="star mt-20">
                    <i className="fa-solid fa-star" />
                    <i className="fa-solid fa-star" />
                    <i className="fa-solid fa-star" />
                    <i className="fa-solid fa-star" />
                    <i className="fa-solid fa-star" />
                  </div>
                </div>
                <a className="product__cart d-block bor-top" href="#0">
                  <i className="fa-regular fa-cart-shopping primary-color me-1" />
                  <span>Add to cart</span>
                </a>
              </div>
            </div>
            <div className="col-xxl-3 col-xl-4 col-md-6">
              <div className="product__item bor">
                <a href="#0" className="wishlist">
                  <i className="fa-regular fa-heart" />
                </a>
                <a
                  href="shop-single.html"
                  className="product__image pt-20 d-block"
                >
                  <img
                    className="font-image"
                    src="assets/images/product/product-image8.png"
                    alt="image"
                  />
                  <img
                    className="back-image"
                    src="assets/images/product/product-image4.png"
                    alt="image"
                  />
                </a>
                <div className="product__content">
                  <h4 className="mb-15">
                    <a className="primary-hover" href="shop-single.html">
                      100ml Nic Salt Juice
                    </a>
                  </h4>
                  <del>£74.50</del>
                  <span className="primary-color ml-10">£49.50</span>
                  <div className="star mt-20">
                    <i className="fa-solid fa-star" />
                    <i className="fa-solid fa-star" />
                    <i className="fa-solid fa-star" />
                    <i className="fa-solid fa-star" />
                    <i className="fa-solid fa-star" />
                  </div>
                </div>
                <a className="product__cart d-block bor-top" href="#0">
                  <i className="fa-regular fa-cart-shopping primary-color me-1" />
                  <span>Add to cart</span>
                </a>
              </div>
            </div>
          </div>
        </div>
        <div id="featured-products" className="tab-pane fade">
          <div className="row g-4">
            <div className="col-xxl-3 col-xl-4 col-md-6">
              <div className="product__item bor">
                <a href="#0" className="wishlist">
                  <i className="fa-regular fa-heart" />
                </a>
                <a
                  href="shop-single.html"
                  className="product__image pt-20 d-block"
                >
                  <img
                    className="font-image"
                    src="assets/images/product/product-image1.png"
                    alt="image"
                  />
                  <img
                    className="back-image"
                    src="assets/images/product/product-image3.png"
                    alt="image"
                  />
                </a>
                <div className="product__content">
                  <h4 className="mb-15">
                    <a className="primary-hover" href="shop-single.html">
                      Menthol E-Cigarette Kit
                    </a>
                  </h4>
                  <del>£74.50</del>
                  <span className="primary-color ml-10">£49.50</span>
                  <div className="star mt-20">
                    <i className="fa-solid fa-star" />
                    <i className="fa-solid fa-star" />
                    <i className="fa-solid fa-star" />
                    <i className="fa-solid fa-star" />
                    <i className="fa-solid fa-star" />
                  </div>
                </div>
                <a className="product__cart d-block bor-top" href="#0">
                  <i className="fa-regular fa-cart-shopping primary-color me-1" />
                  <span>Add to cart</span>
                </a>
              </div>
            </div>
            <div className="col-xxl-3 col-xl-4 col-md-6">
              <div className="product__item bor">
                <a href="#0" className="wishlist">
                  <i className="fa-regular fa-heart" />
                </a>
                <a
                  href="shop-single.html"
                  className="product__image pt-20 d-block"
                >
                  <img
                    className="font-image"
                    src="assets/images/product/product-image2.png"
                    alt="image"
                  />
                  <img
                    className="back-image"
                    src="assets/images/product/product-image4.png"
                    alt="image"
                  />
                </a>
                <div className="product__content">
                  <h4 className="mb-15">
                    <a className="primary-hover" href="shop-single.html">
                      Disposable Sub-Ohm Tank
                    </a>
                  </h4>
                  <del>£74.50</del>
                  <span className="primary-color ml-10">£49.50</span>
                  <div className="star mt-20">
                    <i className="fa-solid fa-star" />
                    <i className="fa-solid fa-star" />
                    <i className="fa-solid fa-star" />
                    <i className="fa-solid fa-star" />
                    <i className="fa-solid fa-star" />
                  </div>
                </div>
                <a className="product__cart d-block bor-top" href="#0">
                  <i className="fa-regular fa-cart-shopping primary-color me-1" />
                  <span>Add to cart</span>
                </a>
              </div>
            </div>
            <div className="col-xxl-3 col-xl-4 col-md-6">
              <div className="product__item bor">
                <a href="#0" className="wishlist">
                  <i className="fa-regular fa-heart" />
                </a>
                <a
                  href="shop-single.html"
                  className="product__image pt-20 d-block"
                >
                  <img
                    className="font-image"
                    src="assets/images/product/product-image3.png"
                    alt="image"
                  />
                  <img
                    className="back-image"
                    src="assets/images/product/product-image5.png"
                    alt="image"
                  />
                </a>
                <div className="product__content">
                  <h4 className="mb-15">
                    <a className="primary-hover" href="shop-single.html">
                      POP Extra Strawberry
                    </a>
                  </h4>
                  <del>£74.50</del>
                  <span className="primary-color ml-10">£49.50</span>
                  <div className="star mt-20">
                    <i className="fa-solid fa-star" />
                    <i className="fa-solid fa-star" />
                    <i className="fa-solid fa-star" />
                    <i className="fa-solid fa-star" />
                    <i className="fa-solid fa-star" />
                  </div>
                </div>
                <a className="product__cart d-block bor-top" href="#0">
                  <i className="fa-regular fa-cart-shopping primary-color me-1" />
                  <span>Add to cart</span>
                </a>
              </div>
            </div>
            <div className="col-xxl-3 col-xl-4 col-md-6">
              <div className="product__item bor">
                <a href="#0" className="wishlist">
                  <i className="fa-regular fa-heart" />
                </a>
                <a
                  href="shop-single.html"
                  className="product__image pt-20 d-block"
                >
                  <img
                    className="font-image"
                    src="assets/images/product/product-image7.png"
                    alt="image"
                  />
                  <img
                    className="back-image"
                    src="assets/images/product/product-image4.png"
                    alt="image"
                  />
                </a>
                <div className="product__content">
                  <h4 className="mb-15">
                    <a className="primary-hover" href="shop-single.html">
                      POP Extra Strawberry
                    </a>
                  </h4>
                  <del>£74.50</del>
                  <span className="primary-color ml-10">£49.50</span>
                  <div className="star mt-20">
                    <i className="fa-solid fa-star" />
                    <i className="fa-solid fa-star" />
                    <i className="fa-solid fa-star" />
                    <i className="fa-solid fa-star" />
                    <i className="fa-solid fa-star" />
                  </div>
                </div>
                <a className="product__cart d-block bor-top" href="#0">
                  <i className="fa-regular fa-cart-shopping primary-color me-1" />
                  <span>Add to cart</span>
                </a>
              </div>
            </div>
            <div className="col-xxl-3 col-xl-4 col-md-6">
              <div className="product__item bor">
                <a href="#0" className="wishlist">
                  <i className="fa-regular fa-heart" />
                </a>
                <a
                  href="shop-single.html"
                  className="product__image pt-20 d-block"
                >
                  <img
                    className="font-image"
                    src="assets/images/product/product-image8.png"
                    alt="image"
                  />
                  <img
                    className="back-image"
                    src="assets/images/product/product-image4.png"
                    alt="image"
                  />
                </a>
                <div className="product__content">
                  <h4 className="mb-15">
                    <a className="primary-hover" href="shop-single.html">
                      100ml Nic Salt Juice
                    </a>
                  </h4>
                  <del>£74.50</del>
                  <span className="primary-color ml-10">£49.50</span>
                  <div className="star mt-20">
                    <i className="fa-solid fa-star" />
                    <i className="fa-solid fa-star" />
                    <i className="fa-solid fa-star" />
                    <i className="fa-solid fa-star" />
                    <i className="fa-solid fa-star" />
                  </div>
                </div>
                <a className="product__cart d-block bor-top" href="#0">
                  <i className="fa-regular fa-cart-shopping primary-color me-1" />
                  <span>Add to cart</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
  {/* Product area end here */}
  {/* Discount area start here */}
  <section
    className="discount-area bg-image black-area"
    style={{ backgroundImage: `url(${bImg})` }}
  >
    <div className="container">
      <div className="row align-items-center">
        <div className="col-lg-6">
          <div className="image mb-5 mb-lg-0">
            <img src="assets/images/discount/discount-image2.png" alt="image" />
          </div>
        </div>
        <div className="col-lg-6">
          <div className="discount__item ps-0 pb-5 pb-lg-0 ps-lg-5">
            <div className="section-header">
              <div
                className="section-title-icon wow fadeInUp"
                data-wow-delay=".1s"
              >
                <span className="title-icon mr-10" />
                <h2 className="text-white">find your best favourite</h2>
              </div>
              <p
                className="mt-30 mb-55 wow fadeInUp text-white lightPara-color"
                data-wow-delay=".2s"
              >
                Sell globally in minutes with localized currencies languages,
                and
                <br />
                experie in every market. only a variety of vaping products
              </p>
              <a
                className="btn-one wow fadeInUp"
                data-wow-delay=".3s"
                href="shop.html"
              >
                <span>Shop Now</span>
              </a>
              <a
                className="off-btn wow fadeInUp text-white"
                data-wow-delay=".4s"
                href="#0"
              >
                <img
                  className="mr-10"
                  src="assets/images/icon/fire.svg"
                  alt="icon"
                />{" "}
                GET <span className="primary-color">25% OFF</span> NOW
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
  {/* Discount area end here */}
  {/* Get now area start here */}
  <section className="get-now-area pt-130 pb-130">
    <div className="container">
      <div className="row align-items-center">
        <div className="col-xl-6">
          <h4 className="mb-30 wow fadeInUp" data-wow-delay=".1s">
            <img src="assets/images/icon/fire.svg" alt="icon" />
            GET <span className="primary-color">25% OFF</span> NOW
          </h4>
          <div
            className="section-header d-flex align-items-center wow fadeInUp"
            data-wow-delay=".2s"
          >
            <span className="title-icon mr-10" />
            <h2>latest arrival products</h2>
          </div>
          <div className="get-now__content">
            <div className="get-info py-4 wow fadeInUp" data-wow-delay=".2s">
              <del>£99.00</del> <span>£49.00</span>
            </div>
            <p className="fw-600 wow fadeInUp" data-wow-delay=".3s">
              There are many variations of passages of Lorem Ipsum available,
              but <br />
              the majority have suffered alteration in some form, by injected
              humour, or randomised words which
            </p>
            <ul
              className="pt-30 pb-30 bor-bottom wow fadeInUp"
              data-wow-delay=".3s"
            >
              <li>100% Natural</li>
              <li>Coupon £61.99, Code: W2</li>
              <li>30 Day Refund</li>
            </ul>
            <div
              className="time-up d-flex flex-wrap align-items-center gap-5 mt-30 wow fadeInUp"
              data-wow-delay=".4s"
            >
              <div className="info">
                <h4>HUNGRY UP !</h4>
                <span>Offer end in :</span>
              </div>
              <div className="d-flex gap-2 align-items-center">
                <div className="get-time">
                  <h3 id="day">00</h3>
                  <span>Day</span>
                </div>
                <div className="get-time">
                  <h3 id="hour">00</h3>
                  <span>Hr</span>
                </div>
                <div className="get-time">
                  <h3 id="min">00</h3>
                  <span>Min</span>
                </div>
                <div className="get-time">
                  <h3 id="sec">00</h3>
                  <span>Sec</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-xl-6">
          <div className="get-now__image mt-5 mt-xl-0">
            <div className="get-bg-image">
              <img src="assets/images/shop/get-bg.png" alt="image" />
            </div>
            <div className="swiper get__slider">
              <div className="swiper-wrapper">
                <div className="swiper-slide">
                  <div className="image">
                    <img src="assets/images/shop/get-image.png" alt="image" />
                  </div>
                </div>
                <div className="swiper-slide">
                  <div className="image">
                    <img src="assets/images/shop/get-image2.png" alt="image" />
                  </div>
                </div>
              </div>
            </div>
            <button className="get-now-arry get-now__arry-left">
              <i className="fa-light fa-chevron-left" />
            </button>
            <button className="get-now-arry get-now__arry-right text-warning">
              <i className="fa-light fa-chevron-right" />
            </button>
          </div>
        </div>
      </div>
    </div>
  </section>
  {/* Get now area end here */}
  {/* Text slider area start here */}
  <div className="container">
    <div className="bor-top pb-40" />
  </div>
  <div className="marquee-wrapper text-slider">
    <div className="marquee-inner to-left">
      <ul className="marqee-list d-flex">
        <li className="marquee-item">
          E-Cigarettes{" "}
          <img src="assets/images/icon/title-left.svg" alt="icon" />{" "}
          <span>Vape Pens</span>
          <img src="assets/images/icon/title-left.svg" alt="icon" />
          Vape Juice <img
            src="assets/images/icon/title-left.svg"
            alt="icon"
          />{" "}
          <span>E-Cigarettes</span>
          <img src="assets/images/icon/title-left.svg" alt="icon" />
          Vape Pens <img
            src="assets/images/icon/title-left.svg"
            alt="icon"
          />{" "}
          <span>Vape Juice</span>
          <img src="assets/images/icon/title-left.svg" alt="icon" />
          E-Cigarettes{" "}
          <img src="assets/images/icon/title-left.svg" alt="icon" />{" "}
          <span>Vape Pens</span>
          <img src="assets/images/icon/title-left.svg" alt="icon" />
          Vape Juice <img
            src="assets/images/icon/title-left.svg"
            alt="icon"
          />{" "}
          <span>E-Cigarettes</span>
        </li>
      </ul>
    </div>
  </div>
  <div className="container">
    <div className="bor-top pb-65" />
  </div>
  {/* Text slider area end here */}
  {/* Gallery area start here */}
  <section className="gallery-area gallery-light black-area">
    <div className="swiper gallery__slider">
      <div className="swiper-wrapper">
        <div className="swiper-slide">
          <div className="gallery__item">
            <div className="off-tag">
              50% <br />
              off
            </div>
            <div className="gallery__image image">
              <img src="assets/images/gallery/gallery-image1.jpg" alt="image" />
            </div>
            <div className="gallery__content">
              <h3 className="mb-10">
                <a href="shop-2.html">best e-lequid</a>
              </h3>
              <p>Best E liquids from our huge collection</p>
              <a href="shop-2.html" className="btn-two mt-25">
                <span>Shop Now</span>
              </a>
            </div>
          </div>
        </div>
        <div className="swiper-slide">
          <div className="gallery__item">
            <div className="off-tag">
              50% <br />
              off
            </div>
            <div className="gallery__image image">
              <img src="assets/images/gallery/gallery-image2.jpg" alt="image" />
            </div>
            <div className="gallery__content">
              <h3 className="mb-10">
                <a href="shop-2.html">best vape flavours</a>
              </h3>
              <p>Best E liquids from our huge collection</p>
              <a href="shop-2.html" className="btn-two mt-25">
                <span>Shop Now</span>
              </a>
            </div>
          </div>
        </div>
        <div className="swiper-slide">
          <div className="gallery__item">
            <div className="off-tag">
              50% <br />
              off
            </div>
            <div className="gallery__image image">
              <img src="assets/images/gallery/gallery-image3.jpg" alt="image" />
            </div>
            <div className="gallery__content">
              <h3 className="mb-10">
                <a href="shop-2.html">Battery And Charger Kit</a>
              </h3>
              <p>Best E liquids from our huge collection</p>
              <a href="shop-2.html" className="btn-two mt-25">
                <span>Shop Now</span>
              </a>
            </div>
          </div>
        </div>
        <div className="swiper-slide">
          <div className="gallery__item">
            <div className="off-tag">
              50% <br />
              off
            </div>
            <div className="gallery__image image">
              <img src="assets/images/gallery/gallery-image4.jpg" alt="image" />
            </div>
            <div className="gallery__content">
              <h3 className="mb-10">
                <a href="shop-2.html">best vape tanks</a>
              </h3>
              <p>Best E liquids from our huge collection</p>
              <a href="shop-2.html" className="btn-two mt-25">
                <span>Shop Now</span>
              </a>
            </div>
          </div>
        </div>
        <div className="swiper-slide">
          <div className="gallery__item">
            <div className="off-tag">
              50% <br />
              off
            </div>
            <div className="gallery__image image">
              <img src="assets/images/gallery/gallery-image5.jpg" alt="image" />
            </div>
            <div className="gallery__content">
              <h3 className="mb-10">
                <a href="shop-2.html">POP Extra Strawberry</a>
              </h3>
              <p>Best E liquids from our huge collection</p>
              <a href="shop-2.html" className="btn-two mt-25">
                <span>Shop Now</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
  {/* Gallery area end here */}
  {/* Brand area start here */}
  <section className="brand-area black-area pt-130 pb-130">
    <div className="container">
      <div className="sub-title text-center mb-65">
        <h3>
          <span className="title-icon" /> our top brands{" "}
          <span className="title-icon" />
        </h3>
      </div>
      <div className="swiper brand__slider">
        <div className="swiper-wrapper">
          <div className="swiper-slide">
            <div className="brand__item bor radius-10 text-center p-4">
              <img src="assets/images/brand/brand1.png" alt="icon" />
            </div>
          </div>
          <div className="swiper-slide">
            <div className="brand__item bor radius-10 text-center p-4">
              <img src="assets/images/brand/brand2.png" alt="icon" />
            </div>
          </div>
          <div className="swiper-slide">
            <div className="brand__item bor radius-10 text-center p-4">
              <img src="assets/images/brand/brand3.png" alt="icon" />
            </div>
          </div>
          <div className="swiper-slide">
            <div className="brand__item bor radius-10 text-center p-4">
              <img src="assets/images/brand/brand4.png" alt="icon" />
            </div>
          </div>
          <div className="swiper-slide">
            <div className="brand__item bor radius-10 text-center p-4">
              <img src="assets/images/brand/brand5.png" alt="icon" />
            </div>
          </div>
          <div className="swiper-slide">
            <div className="brand__item bor radius-10 text-center p-4">
              <img src="assets/images/brand/brand6.png" alt="icon" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
  {/* Brand area end here */}
</main>

    </>
  );
}

export default Home;
