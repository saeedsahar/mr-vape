import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import WOW from "wowjs";
import bgImage from "../assets/images/bg/view-bg.jpg";
import bImg from "../assets/images/bg/discount-bg2.jpg";

import blogImgeliquid from "../assets/images/blog/best-eliquid2025.jpg";
import blogNewInstores2025 from "../assets/images/blog/whatinstores2025.jpg";
import blogVapingDevicesBudget from "../assets/images/blog/vapingdevicesbudget.jpg";

import bannerBImg from "../assets/images/banner/banner-two-image1.jpg";
import trustPilotWidget from "../assets/images/logo/widget-1.jpg";
// import ProductDisplay from "../Component/HomePage/Product/ProductDisplay";
import Product from "./Product/Product";
import { useDispatch, useSelector } from "react-redux";
import {
  setCategoryId,
  setLoading,
  setProducts,
  setQuery,
  setTrendingProducts,
} from "./Product/ProductSlice";
import { base_url, getRequests } from "../axios/API";
import ProductList from "./Product/ProductList";
import SwiperComponent, {
  SwiperComponentCustom,
  SwiperComponentNavigation,
} from "../Component/Swiper/Swiper";
import { setMenu } from "./HomeSlice";
import { SwiperSlide } from "swiper/react";
import blogImg from "../assets/images/blog/blogimage.png";
import "./Home.css";
import { setBlog } from "./Blog/BlogSlice";
import { blogArray } from "./Blog/ViewAllBlogs";
function Home(props) {
  console.log("[Home.js]");
  const bannerImages = [
    "https://mrvape-frontend.s3.eu-west-2.amazonaws.com/Shisha.jpg",
    "https://mrvape-frontend.s3.eu-west-2.amazonaws.com/Skywalker.jpg",
  ];
  const navigate = useNavigate();
  let dispatch = useDispatch();
  const [productType, setProductType] = useState("Trending");
  const [selectedBannerImage, setSelectedBannerImage] = useState(
    // "https://mrvape-frontend.s3.eu-west-2.amazonaws.com/Skywalker-mob.jpg"
    bannerImages[0]
  );

  const [timer, setTimer] = useState({
    days: 7,
    remainingDays: 7,
    remainingHours: 24,
    remainingMinutes: 60,
    remainingSeconds: 60,
  });

  useEffect(() => {
    const intervalId = setInterval(() => {
      setTimer((prevTimer) => {
        let {
          remainingDays,
          remainingHours,
          remainingMinutes,
          remainingSeconds,
        } = prevTimer;

        remainingSeconds--;
        if (remainingSeconds < 0) {
          remainingSeconds = 59;
          remainingMinutes--;
        }
        if (remainingMinutes < 0) {
          remainingMinutes = 59;
          remainingHours--;
        }
        if (remainingHours < 0) {
          remainingHours = 23;
          remainingDays--;
        }
        if (remainingDays < 0) {
          // Reset the timer
          return {
            remainingDays: 7,
            remainingHours: 24,
            remainingMinutes: 60,
            remainingSeconds: 60,
          };
        }

        // Return the updated timer
        return {
          remainingDays,
          remainingHours,
          remainingMinutes,
          remainingSeconds,
        };
      });
    }, 1000); // Update every second

    // Clean up the interval on component unmount
    return () => clearInterval(intervalId);
  }, []);

  let productState = useSelector((state) => state.product);

  const setProductListType = (type) => {
    setProductType(type);
    fetchProducts(type, 0, 6);
  };

  useEffect(() => {
    setProductListType("Trending");
  }, []);

  useEffect(() => {
    if (productState.trendingProducts?.length > 0) {
    } else {
      fetchProductsTrending("Trending");
    }
  }, []);

  useEffect(() => {
    new WOW.WOW().init(); // Initialize wow.js
  }, []);

  const fetchProductsTrending = async (query, pageIndex, pageSize) => {
    // dispatch(setLoading(true))
    try {
      const response = await getRequests(
        `${base_url}/api/v1/product?q=${query}&pageNumber=${0}&pageSize=${20}`
      ); // Assuming productService.products$ returns list and total
      let { list, total } = response.data;
      dispatch(setTrendingProducts({ products: list, length: total }));
    } catch (error) {
      console.error("Error fetching products", error);
      dispatch(setTrendingProducts({ products: [], length: 0 }));
    } finally {
      // dispatch(setLoading(false))
    }
  };

  const fetchProducts = async (query, pageIndex, pageSize) => {
    dispatch(setLoading(true));
    try {
      const response = await getRequests(
        `${base_url}/api/v1/product?q=${query}&pageNumber=${pageIndex}&pageSize=${pageSize}`
      ); // Assuming productService.products$ returns list and total
      let { list, total } = response.data;
      dispatch(setProducts({ products: list, length: total }));
    } catch (error) {
      console.error("Error fetching products", error);
      dispatch(setProducts({ products: [], length: 0 }));
    } finally {
      dispatch(setLoading(false));
    }
  };

  const customSwiperProduct = (item) => {
    return (
      <SwiperSlide>
        <div className="swiper-slide">
          <div className="brand__item bor radius-10 text-center p-4">
            <img style={{ width: "150px" }} src={item.image} alt="icon" />
          </div>
        </div>
      </SwiperSlide>
    );
  };

  const customSwiperProductBanner = (item) => {
    return (
      <SwiperSlide>
        <img src={item} alt="banner" className="hero-banner" />
      </SwiperSlide>
    );
  };

  return (
    <>
      <section className="bg-dark">
        <div className="container-lg">
          <div className="row">
            <div
              className="col text-center my-2 pointer"
              onClick={() => navigate("/fastDelivery")}
            >
              <div className="icon text-white mb-2">
                <i class="fa-light fa-truck-fast fa-xl"></i>
              </div>
              <h6 className="text-white text-sm text-narrow-normal">
                Fast Delivery
              </h6>
            </div>

            <div
              className="col text-center my-2 pointer"
              onClick={() => navigate("/freeShipping")}
            >
              <div className="icon text-white mb-2">
                <i class="fa-light fa-dolly fa-xl"></i>
              </div>
              <h6 className="text-white text-sm text-narrow-normal">
                Free Shipping
              </h6>
            </div>

            <div
              className="col text-center my-2 pointer"
              onClick={() => navigate("/sameDayDispatch")}
            >
              <div className="icon text-white mb-2">
                <i class="fa-light fa-truck-container fa-xl"></i>
              </div>
              <h6 className="text-white text-sm text-narrow-normal">
                Same day dispatch
              </h6>
            </div>

            <div
              className="col text-center my-2 pointer"
              onClick={() => navigate("/support")}
            >
              <div className="icon text-white mb-2">
                <i class="fa-light fa-headset fa-xl"></i>
              </div>
              <h6 className="text-white text-sm text-narrow-normal">
                24/7 Support
              </h6>
            </div>
          </div>
        </div>
      </section>

      <main>
        {/* Banner area start here */}
        <section className="banner-two banner-two-light black-area">
          {/* <div className="swiper-wrapper">
            <div className="swiper banner-two__slider banner-media-class"> */}
          <SwiperComponentCustom
            hideBreakPoint={true}
            slidesPerView={1}
            swiperProduct={[
              // "https://mrvape-frontend.s3.eu-west-2.amazonaws.com/banners/megabox.jpg",
              // "https://mrvape-frontend.s3.eu-west-2.amazonaws.com/banners/Alien+Max+(1720+x+915).jpg",
              // "https://mrvape-frontend.s3.eu-west-2.amazonaws.com/banners/Capsule+(1720+x+915).jpg",
              "https://mrvape-frontend.s3.eu-west-2.amazonaws.com/banners/Falcon_X_web_banner.jpg",
            ]}
            customSwiperProduct={customSwiperProductBanner}
          />
          {/* </div>
          </div> */}
        </section>
        {/* Widget Block 2 */}
        <section className="bg-white py-2 pb-3 trustpilot-section">
  <div
    className="trustpilot-widget"
    data-locale="en-GB"
    data-template-id="56278e9abfbbba0bdcd568bc"
    data-businessunit-id="674a0a1bc6992161e87b4986"
    data-style-height="52px"
    data-style-width="100%"
  >
    <a href="https://uk.trustpilot.com/review/vapeplanet.co.uk" target="_blank" rel="noopener">Trustpilot</a>
  </div>
</section>

        <section className=" bg-image category-area black-area category-two ">
          <div className="container-lg">
            <div className="bor-bottom pb-50">
              <div
                className="sub-title text-center wow fadeInUp"
                data-wow-delay=".1s"
              >
                <h3>
                  <span className="title-icon" /> Vape Planet ©{" "}
                  <span className="title-icon" />
                </h3>
                <p>Your Premier Online Vape Store in the UK</p>
                <p>
                  Welcome to Vape Planet, your trusted source for premium vaping
                  products. We offer a wide range of disposable vapes,
                  e-liquids, vape kits, coils, and tanks, all meeting strict
                  safety standards. Whether you're new to vaping or an
                  experienced vaper, our curated selection has something to suit
                  your needs.
                </p>
              </div>
            </div>
          </div>
        </section>
        {/* Banner area end here */}
        {/* Category area start here */}
        <section className="category-area black-area category-two pb-130 pt-30">
          <div className="container-lg">
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
              <SwiperComponent
                slidesPerView={5}
                swiperProduct={productState.trendingProducts}
              />
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
          <div className="container-lg">
            <div className="row g-4">
              <div className="col-lg-6 wow fadeInLeft" data-wow-delay=".1s">
                <div className="view__left-item">
                  <div className="image">
                    <img
                      // src="assets/images/view/view-image1.jpg"
                      src={
                        "https://s3.eu-west-2.amazonaws.com/www.vapeplanet.co.uk/websitelayouts/E-liquide-banner-v4.jpg"
                      }
                      alt="image"
                      className=""
                    />
                  </div>
                  <div className="view__left-content sub-bg">
                    <h2>
                      <a className="primary-hover">The best e-liqued bundles</a>
                    </h2>
                    <p>
                      Sell globally in minutes with localized currencies
                      languages, and experie in every market. only a variety of
                      vaping products
                    </p>
                    <a className="off-btn get-offer-button" href="#0">
                      <img
                        className="mr-10"
                        src="assets/images/icon/fire.svg"
                        alt="icon"
                      />{" "}
                      GET
                      <span className="primary-color">25% OFF</span> NOW
                    </a>
                    <a className="btn-two">
                      <span
                        onClick={() => {
                          dispatch(setCategoryId("2"));
                          navigate("/products");
                        }}
                      >
                        Shop Now
                      </span>
                    </a>
                  </div>
                </div>
              </div>
              <div className="col-lg-6">
                <div
                  className="view__item mb-25 wow fadeInDown"
                  data-wow-delay=".2s"
                >
                  <div className="view__content">
                    <h3>
                      <a className="primary-hover">The finest disposable</a>
                    </h3>
                    <p>Whereas recognition of the inherent dignity</p>
                    <a className="btn-two">
                      <span
                        onClick={() => {
                          dispatch(setCategoryId("3"));
                          navigate("/products");
                        }}
                      >
                        Shop Now
                      </span>
                    </a>
                  </div>
                  <div className="view__image">
                    <img
                      src="https://s3.eu-west-2.amazonaws.com/www.vapeplanet.co.uk/websitelayouts/disposable+image.jpg"
                      alt="image"
                    />
                  </div>
                </div>
                <div className="view__item wow fadeInUp" data-wow-delay=".3s">
                  <div className="view__content">
                    <h3>
                      <a className="primary-hover">Top-quality vape kits</a>
                    </h3>
                    <p>Whereas recognition of the inherent dignity</p>
                    <a className="btn-two">
                      <span
                        onClick={() => {
                          dispatch(setCategoryId("5"));
                          navigate("/products");
                        }}
                      >
                        Shop Now
                      </span>
                    </a>
                  </div>
                  <div className="view__image">
                    <img
                      src="https://s3.eu-west-2.amazonaws.com/www.vapeplanet.co.uk/websitelayouts/Vape-Kit-image.jpg"
                      alt="image"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* View area end here */}
        {/* Product area start here */}
        <section className="product-area pt-80 pb-80 mt-130">
          <div className="container-lg">
            <div className="product__wrp pb-30 mb-65 bor-bottom d-flex flex-wrap align-items-center justify-content-xl-between justify-content-center">
              <div
                className="section-header d-flex align-items-center wow fadeInUp"
                data-wow-delay=".1s"
              >
                <span className="title-icon mr-10" />
                <h2>Vaping Trends</h2>
              </div>
              <ul className="nav nav-pills mt-4 mt-xl-0">
                <li className="nav-item wow fadeInUp" data-wow-delay=".1s">
                  <a
                    // href="#latest-item"
                    data-bs-toggle="tab"
                    className={`nav-link px-4 ${
                      productType == "Trending" ? "active" : ""
                    } pointer`}
                    onClick={() => setProductListType("Trending")}
                  >
                    latest item
                  </a>
                </li>
                <li className="nav-item wow fadeInUp" data-wow-delay=".2s">
                  <a
                    // href="#top-ratting"
                    data-bs-toggle="tab"
                    className={`nav-link px-4 bor-left bor-right ${
                      productType == "TopRating" ? "active" : ""
                    } pointer`}
                    onClick={() => setProductListType("TopRating")}
                  >
                    top ratting
                  </a>
                </li>
                <li className="nav-item wow fadeInUp" data-wow-delay=".3s">
                  <a
                    // href="#featured-products"
                    data-bs-toggle="tab"
                    className={`nav-link ps-4  ${
                      productType == "Featured" ? "active" : ""
                    } pointer`}
                    onClick={() => setProductListType("Featured")}
                  >
                    featured products
                  </a>
                </li>
              </ul>
            </div>
            <ProductList />
          </div>
        </section>

        {/* Discount area end here */}
        {/* Get now area start here */}
        {/* <section className="get-now-area pt-130 pb-130">
  <div className="container-lg">
    <div className="get-now-row row align-items-center">
      <div className="col-xl-6 col-12">
        <h4 className="mb-30 wow fadeInUp" data-wow-delay=".1s">
          <img src="assets/images/icon/fire.svg" alt="icon" className="icon-small" />
          GET <span className="primary-color">25% OFF</span> NOW
        </h4>
        <div
          className="section-header d-flex align-items-center wow fadeInUp"
          data-wow-delay=".2s"
        >
          <span className="title-icon mr-10" />
          <h2>Coming Soon Products</h2>
        </div>
        <div className="get-now__content">
          <div
            className="get-info py-4 wow fadeInUp"
            data-wow-delay=".2s"
          >
            <del>£99.00</del> <span>£49.00</span>
          </div>
          <p className="wow fadeInUp" data-wow-delay=".3s">
            There are many variations of passages of Lorem Ipsum available, but <br />
            the majority have suffered alteration in some form, by injected humour, or randomised words which
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
              <h4 className="mb-0">HURRY UP!</h4>
              <span>Offer ends in:</span>
            </div>
            <div className="d-flex gap-2 align-items-center">
              <div className="get-time">
                <h3 id="day">{timer.remainingDays}</h3>
                <span>Day</span>
              </div>
              <div className="get-time">
                <h3 id="hour">{timer.remainingHours}</h3>
                <span>Hr</span>
              </div>
              <div className="get-time">
                <h3 id="min">{timer.remainingMinutes}</h3>
                <span>Min</span>
              </div>
              <div className="get-time">
                <h3 id="sec">{timer.remainingSeconds}</h3>
                <span>Sec</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="col-xl-6 col-12 mt-5 mt-xl-0">
        <div className="get-now__image">
          <div className="image">
            <img
              src={
                "https://s3.eu-west-2.amazonaws.com/www.vapeplanet.co.uk/websitelayouts/Coming-Soon-1.jpg"
              }
              alt="image"
              className="img-fluid round-100"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</section> */}


        {/* Get now area end here */}
        {/* Text slider area start here */}
        {/* <div className="container-lg">
          <div className="bor-top pb-40" />
        </div> */}
        {/* <div className="marquee-wrapper text-slider">
          <div className="marquee-inner to-left">
            <ul className="marqee-list d-flex">
              <li className="marquee-item">
                E-Cigarettes{" "}
                <img src="assets/images/icon/title-left.svg" alt="icon" />{" "}
                <span>Vape Pens</span>{" "}
                <img src="assets/images/icon/title-left.svg" alt="icon" /> Vape
                Juice <img src="assets/images/icon/title-left.svg" alt="icon" />{" "}
                <span>E-Cigarettes</span>{" "}
                <img src="assets/images/icon/title-left.svg" alt="icon" /> Vape
                Pens <img src="assets/images/icon/title-left.svg" alt="icon" />{" "}
                <span>Vape Juice</span>{" "}
                <img src="assets/images/icon/title-left.svg" alt="icon" />{" "}
                E-Cigarettes{" "}
                <img src="assets/images/icon/title-left.svg" alt="icon" />{" "}
                <span>Vape Pens</span>{" "}
                <img src="assets/images/icon/title-left.svg" alt="icon" /> Vape
                Juice <img src="assets/images/icon/title-left.svg" alt="icon" />{" "}
                <span>E-Cigarettes</span>{" "}
              </li>
            </ul>
          </div>
        </div> */}
        <div className="container-lg">
          <div className="bor-top pb-65" />
        </div>
        {/* Text slider area end here */}
        {/* Gallery area start here */}

        <section className="gallery-area gallery-light black-area">
          <div className="container-lg">
            <div className="product__wrp pb-30 mb-65 bor-bottom d-flex flex-wrap align-items-center justify-content-xl-between justify-content-center">
              <div
                className="section-header d-flex align-items-center wow fadeInUp"
                data-wow-delay=".1s"
              >
                <span className="title-icon mr-10" />
                <h2>News and Blogs</h2>
              </div>
            </div>
            <SwiperComponentNavigation
              slidesPerView={3}
              swiperProduct={blogArray}
              // customSwiperProduct={customSwiperProductOff}
              breakpoints={{
                320: {
                  slidesPerView: 1,
                  spaceBetween: 20,
                },
                640: {
                  slidesPerView: 1,
                  spaceBetween: 20,
                },
                768: {
                  slidesPerView: 1,
                  spaceBetween: 20,
                },
                1366: {
                  slidesPerView: 3,
                  spaceBetween: 25,
                },
              }}
              navigation={true}
            />
            <h4
              onClick={() => navigate("/allBlogs")}
              className="blogs-and-news"
            >
              View All Blogs And News{" "}
            </h4>
          </div>
        </section>
        {/* Gallery area end here */}
        {/* Brand area start here */}
        <section className="brand-area black-area pt-130 pb-130">
          <div className="container-lg">
            <div className="sub-title text-center mb-65">
              <h3>
                <span className="title-icon" /> our top brands{" "}
                <span className="title-icon" />
              </h3>
            </div>
            <SwiperComponentCustom
              slidesPerView={5}
              swiperProduct={[
                { image: "assets/images/brand/Geek-Bar.webp" },
                { image: "assets/images/brand/Magic-Bar.webp" },
                { image: "assets/images/brand/lost-mary.webp" },
                { image: "assets/images/brand/Kingston.webp" },
                { image: "assets/images/brand/JNR-Logo.webp" },
                { image: "assets/images/brand/hayati-logo.webp" },
              ]}
              customSwiperProduct={customSwiperProduct}
            />
          </div>
        </section>
        {/* Brand area end here */}
      </main>
    </>
  );
}

export default Home;
