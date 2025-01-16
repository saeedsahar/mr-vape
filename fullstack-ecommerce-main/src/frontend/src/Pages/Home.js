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
              "https://mrvape-frontend.s3.eu-west-2.amazonaws.com/banners/megabox.jpg",
              // "https://mrvape-frontend.s3.eu-west-2.amazonaws.com/banners/Alien+Max+(1720+x+915).jpg",
              "https://mrvape-frontend.s3.eu-west-2.amazonaws.com/banners/Capsule+(1720+x+915).jpg",
              // "https://mrvape-frontend.s3.eu-west-2.amazonaws.com/banners/Falcon_X_web_banner.jpg",
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
        <section className="category-area black-area category-two ">
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
          <div className="container-lg pt-80 ">
            <div className="row g-4 pt-80 mb-65">
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
        <section className="product-area pt-80 ">
          <div className="container-lg">
            <div className="product__wrp pb-30 mb-65 bor-bottom d-flex flex-wrap align-items-center justify-content-xl-between justify-content-center">
              <div
                className="section-header d-flex align-items-center wow fadeInUp"
                data-wow-delay=".1s"
              >
                <span className="title-icon mr-10" />
                <h2>Vaping Trends</h2>
              </div>
              <ul className="nav nav-pills mt-4 mt-xl-0 justify-content-center">
  {/* Latest Item */}
  <li className="nav-item wow fadeInUp" data-wow-delay=".1s">
    <a
      data-bs-toggle="tab"
      className={`nav-link px-4 d-flex align-items-center ${
        productType === "Trending" ? "active" : ""
      } pointer`}
      onClick={() => setProductListType("Trending")}
      style={{
        fontWeight: "bold",
        fontSize: "16px",
        color: productType === "Trending" ? "#fa4f09" : "#333",
        borderRadius: "8px",
        transition: "all 0.3s ease",
      }}
    >
      <i
        className="fa-solid fa-fire me-2"
        style={{
          color: productType === "Trending" ? "#fa4f09" : "#999",
        }}
      ></i>
      Latest Items
    </a>
  </li>

  {/* Top Rating */}
  <li className="nav-item wow fadeInUp" data-wow-delay=".2s">
    <a
      data-bs-toggle="tab"
      className={`nav-link px-4 d-flex align-items-center ${
        productType === "TopRating" ? "active" : ""
      } pointer`}
      onClick={() => setProductListType("TopRating")}
      style={{
        fontWeight: "bold",
        fontSize: "16px",
        color: productType === "TopRating" ? "#fa4f09" : "#333",
        borderRadius: "8px",
        transition: "all 0.3s ease",
      }}
    >
      <i
        className="fa-solid fa-star me-2"
        style={{
          color: productType === "TopRating" ? "#fa4f09" : "#999",
        }}
      ></i>
      Top Rating
    </a>
  </li>

  {/* Featured Products */}
  {/* <li className="nav-item wow fadeInUp" data-wow-delay=".3s">
    <a
      data-bs-toggle="tab"
      className={`nav-link px-4 d-flex align-items-center ${
        productType === "Featured" ? "active" : ""
      } pointer`}
      onClick={() => setProductListType("Featured")}
      style={{
        fontWeight: "bold",
        fontSize: "16px",
        color: productType === "Featured" ? "#fa4f09" : "#333",
        borderRadius: "8px",
        transition: "all 0.3s ease",
      }}
    >
      <i
        className="fa-solid fa-star-and-crescent me-2"
        style={{
          color: productType === "Featured" ? "#fa4f09" : "#999",
        }}
      ></i>
      Featured Products
    </a>
  </li> */}
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




        <section
  className="blogs-section-unique"
  style={{
    padding: "30px 0",
    backgroundColor: "#f8f9fa",
    textAlign: "center",
  }}
>
  <div className="blogs-container-unique container-lg">
    {/* Header Section */}
    <div
      className="blogs-header-unique"
      style={{
        marginBottom: "20px",
        paddingBottom: "0px",
        borderBottom: "2px solid #ececec",
      }}
    >
      <div
        className="blogs-title-wrapper-unique"
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: "10px",
        }}
      >
        {/* Icon */}
        <div
          className="blogs-title-icon-wrapper-unique"
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: "50px",
            height: "50px",
            backgroundColor: "#fa4f09",
            borderRadius: "50%",
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
          }}
        >
          <i
            className="fa-solid fa-newspaper blogs-icon-unique"
            style={{
              color: "#fff",
              fontSize: "20px",
            }}
          ></i>
        </div>
        {/* Title */}
        <h2
          className="blogs-title-unique"
          style={{
            fontSize: "24px",
            fontWeight: "bold",
            color: "#333",
            textTransform: "uppercase",
            letterSpacing: "0.5px",
          }}
        >
          News and Blogs
        </h2>
      </div>
    </div>

    {/* Swiper Component */}
    <SwiperComponentNavigation
  slidesPerView={1}
  swiperProduct={blogArray}
  breakpoints={{
    320: {
      slidesPerView: 1,
      spaceBetween: 15, // Adjust spacing for small screens
    },
    480: {
      slidesPerView: 1,
      spaceBetween: 15,
    },
    768: {
      slidesPerView: 2,
      spaceBetween: 20,
    },
    1366: {
      slidesPerView: 3,
      spaceBetween: 30,
    },
  }}
  navigation={false} // Disable navigation arrows
  customSwiperProduct={(blog) => (
    <div className="blog-item-unique custom-swiper-card">
      {/* Blog Image Wrapper */}
      <div className="blog-image-wrapper-unique custom-image-wrapper">
        <img
          src={blog.image}
          alt={blog.title}
          className="blog-image-unique"
          style={{
            position: "absolute",
            top: "0",
            left: "0",
            width: "100%",
            height: "100%",
            objectFit: "cover",
            borderRadius: "10px 10px 0 0", // Rounded corners for the top of the image
          }}
          loading="lazy"
        />
      </div>
      
      {/* Blog Content */}
      <div
        className="blog-content-unique"
        style={{
          padding: "15px",
          textAlign: "left",
          backgroundColor: "#fff",
          borderRadius: "0 0 10px 10px", // Rounded corners for content box
          boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
        }}
      >
        <h4
          className="blog-title-unique"
          style={{
            fontWeight: "bold",
            fontSize: "18px",
            color: "#333",
            marginBottom: "10px",
          }}
        >
          {blog.title}
        </h4>
        <p
          className="blog-description-unique"
          style={{
            fontSize: "14px",
            color: "#666",
            margin: "0",
          }}
        >
          {blog.description}
        </p>
      </div>
    </div>
  )}
  className="custom-swiper"
/>


    {/* View All Blogs Link */}
    <div className="blogs-view-all-unique" style={{ marginTop: "20px" }}>
      <h4
        onClick={() => navigate("/allBlogs")}
        className="blogs-link-unique"
        style={{
          fontWeight: "bold",
          fontSize: "18px",
          color: "#fa4f09",
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        View All Blogs And News{" "}
        <i
          className="fa-solid fa-arrow-right blogs-icon-link-unique"
          style={{ marginLeft: "8px", fontSize: "16px" }}
        ></i>
      </h4>
    </div>
  </div>
</section>








        {/* Gallery area end here */}
        {/* Brand area start here */}
        <section className="brand-area black-area py-5">
  <div className="container-lg">
    {/* Heading */}
    <div className="sub-title text-center mb-5">
      <h3 className="brand-heading">
        <span className="title-icon" /> Our Top Brands{" "}
        <span className="title-icon" />
      </h3>
    </div>

    {/* Brands Grid */}
    <div className="row g-3 justify-content-center">
      {[
        { image: "assets/images/brand/Geek-Bar.webp", name: "Geek Bar" },
        { image: "assets/images/brand/Magic-Bar.webp", name: "Magic Bar" },
        { image: "assets/images/brand/lost-mary.webp", name: "Lost Mary" },
        { image: "assets/images/brand/Kingston.webp", name: "Kingston" },
        { image: "assets/images/brand/JNR-Logo.webp", name: "JNR" },
        { image: "assets/images/brand/hayati-logo.webp", name: "Hayati" },
      ].map((brand, index) => (
        <div
          className="col-lg-2 col-md-3 col-sm-4 col-6 text-center"
          key={index}
        >
          <div className="brand-card">
            <img
              src={brand.image}
              alt={brand.name}
              className="brand-image"
              loading="lazy"
            />
            <h5 className="brand-name mt-2">{brand.name}</h5>
          </div>
        </div>
      ))}
    </div>
  </div>
</section>


        {/* Brand area end here */}
      </main>
    </>
  );
}

export default Home;
