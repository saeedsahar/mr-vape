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
} from "../Component/Swiper/Swiper";
import { setMenu } from "./HomeSlice";
import { SwiperSlide } from "swiper/react";
import blogImg from "../assets/images/blog/blogimage.png";
import "./Home.css";
import { setBlog } from "./Blog/BlogSlice";
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

  let blogArray = [
    {
      title: "Exploring the Top Vape Kit Trends for 2024: What’s New?",
      description: `    <p style="font-size: 16px; line-height: 1.6; color: #555; margin-bottom: 15px;">
      As we head into 2025, the vaping industry continues to evolve with innovative technologies, more compact designs, and enhanced features that cater to both beginner vapers and seasoned enthusiasts. This year, top brands like <strong>JNR Vapes</strong> are leading the way in creating cutting-edge vape kits that combine performance, portability, and affordability. Here’s a look at the latest trends that are set to dominate the market, from sleek, pocket-sized devices to smarter, longer-lasting options.
    </p>

    <h2 style="font-size: 24px; font-weight: bold; color: #333; margin-top: 20px;">
      1. Compact and Portable Designs: A Game-Changer for Vapers on the Go
    </h2>
    <p style="font-size: 16px; line-height: 1.6; color: #555; margin-bottom: 15px;">
      In 2025, the trend toward smaller, more portable vaping devices continues to gain momentum. Compact designs allow vapers to carry their devices discreetly without sacrificing performance. The <strong>JNR Crystal Pro Max 5000 Puffs</strong>, for example, offers a compact size yet delivers a smooth vaping experience with up to 5000 puffs. This makes it ideal for users who want a device that’s easy to carry in their pocket but doesn’t compromise on flavor or longevity.
    </p>
    <p style="font-size: 16px; line-height: 1.6; color: #555; margin-bottom: 15px;">
      <strong>Key Trend:</strong> Ultra-portability without sacrificing performance.
    </p>
    <p style="font-size: 16px; line-height: 1.6; color: #555; margin-bottom: 15px;">
      <strong>JNR Insight:</strong> The <strong>JNR Crystal Pro Max</strong> proves that size isn’t everything; its portability and long-lasting puffs make it an excellent choice for frequent travelers or on-the-go vapers.
    </p>

    <h2 style="font-size: 24px; font-weight: bold; color: #333; margin-top: 20px;">
      2. New Tech Features: Smarter Vaping for the Modern User
    </h2>
    <p style="font-size: 16px; line-height: 1.6; color: #555; margin-bottom: 15px;">
      2025 sees an influx of new tech in vape kits, including advanced airflow systems, better battery management, and even app connectivity. The <strong>JNR Alien 10000 Puffs</strong> is a great example, offering improved battery life, smarter draw sensors, and enhanced flavor delivery systems. These features make for an even smoother and more consistent vaping experience.
    </p>
    <p style="font-size: 16px; line-height: 1.6; color: #555; margin-bottom: 15px;">
      <strong>Key Trend:</strong> Integration of smarter technology for precision and efficiency.
    </p>
    <p style="font-size: 16px; line-height: 1.6; color: #555; margin-bottom: 15px;">
      <strong>JNR Insight:</strong> With the <strong>JNR Alien</strong>, users can enjoy cutting-edge tech that optimizes every puff, making each vape session seamless and satisfying.
    </p>

    <h2 style="font-size: 24px; font-weight: bold; color: #333; margin-top: 20px;">
      3. Enhanced Durability and Longer Life: A Focus on Longevity
    </h2>
    <p style="font-size: 16px; line-height: 1.6; color: #555; margin-bottom: 15px;">
      As vapers demand products that offer better value and longer-lasting performance, brands like JNR are stepping up with devices that are built to last. The <strong>JNR Falcon-X 18000 Puffs</strong> takes durability to a new level with its extended lifespan and robust design. With 18,000 puffs, it’s perfect for those who don’t want to constantly replace their device.
    </p>
    <p style="font-size: 16px; line-height: 1.6; color: #555; margin-bottom: 15px;">
      <strong>Key Trend:</strong> Devices that last longer, offering more puffs and reducing the frequency of replacements.
    </p>
    <p style="font-size: 16px; line-height: 1.6; color: #555; margin-bottom: 15px;">
      <strong>JNR Insight:</strong> The <strong>JNR Falcon-X</strong> provides impressive longevity while maintaining a sleek and modern design—ideal for vapers who want to get the most out of their investment.
    </p>

    <h2 style="font-size: 24px; font-weight: bold; color: #333; margin-top: 20px;">
      4. Shisha-Inspired Flavors and Styles: A Traditional Twist with a Modern Edge
    </h2>
    <p style="font-size: 16px; line-height: 1.6; color: #555; margin-bottom: 15px;">
      For 2025, there’s a notable trend toward blending traditional experiences with modern tech. Shisha-inspired vape kits are gaining popularity, offering classic flavors with the convenience of modern, disposable devices. The <strong>JNR Shisha 12000 Puffs</strong> offers a refreshing take on traditional shisha, bringing those rich, aromatic flavors into a sleek, easy-to-use vape kit.
    </p>
    <p style="font-size: 16px; line-height: 1.6; color: #555; margin-bottom: 15px;">
      <strong>Key Trend:</strong> Shisha-inspired vaping, combining tradition with technology.
    </p>
    <p style="font-size: 16px; line-height: 1.6; color: #555; margin-bottom: 15px;">
      <strong>JNR Insight:</strong> The <strong>JNR Shisha</strong> series is perfect for those who enjoy the cultural experience of shisha but want a more modern, portable solution.
    </p>

    <h2 style="font-size: 24px; font-weight: bold; color: #333; margin-top: 20px;">
      5. Sustainability in Vape Kits: Eco-Friendly Designs
    </h2>
    <p style="font-size: 16px; line-height: 1.6; color: #555; margin-bottom: 15px;">
      As sustainability becomes more important in the consumer product market, the vaping industry is following suit with eco-friendly innovations. Brands like JNR are focusing on recyclable materials and reducing waste. Look for vape kits that not only offer great performance but also help minimize environmental impact.
    </p>
    <p style="font-size: 16px; line-height: 1.6; color: #555; margin-bottom: 15px;">
      <strong>Key Trend:</strong> A move toward sustainability in vaping products, including recyclable components.
    </p>
    <p style="font-size: 16px; line-height: 1.6; color: #555; margin-bottom: 15px;">
      <strong>JNR Insight:</strong> JNR’s commitment to eco-friendly materials ensures that you can enjoy your vape sessions while being mindful of your environmental footprint.
    </p>

    <h2 style="font-size: 24px; font-weight: bold; color: #333; margin-top: 20px;">
      Conclusion: The Future of Vaping in 2025
    </h2>
    <p style="font-size: 16px; line-height: 1.6; color: #555; margin-bottom: 15px;">
      2025 is shaping up to be an exciting year for the vaping industry, with innovations in design, technology, and sustainability. JNR Vapes is at the forefront of these trends, offering a diverse range of products that cater to every type of vaper. Whether you’re looking for compact portability, enhanced tech, or a more eco-friendly vape experience, JNR’s 2025 lineup has something for you.
    </p>`,
      image: blogNewInstores2025,
      shortDescription:
        "Discover 2025’s vape kit trends, including compact designs, new tech, and improved features, plus insights from top brands.",
    },
    {
      title:
        "The Best E-Liquid Brands of 2025",
      description: `
      <p style="font-size: 16px; margin-bottom: 15px;">
        The vaping world is buzzing with excitement in 2025 as e-liquid brands continue to push the boundaries of flavor, quality, and innovation. Among these, 
        <strong style="color: #e74c3c;">Niplo</strong> stands out as a leader, setting a new benchmark for excellence in the industry. Let’s explore the top brands that are shaping the e-liquid market this year.
    </p>

    <h2 style="font-size: 22px; font-weight: bold; color: #34495e;">1. Niplo: Leading the Way in Innovation</h2>
    <p style="font-size: 16px; margin-bottom: 15px;">
        Niplo continues to dominate the e-liquid market with its groundbreaking flavors and exceptional quality. Known for its bold, innovative approach, Niplo 
        combines premium ingredients with cutting-edge technology to deliver a vaping experience like no other.
    </p>
    <p style="font-size: 16px; margin-bottom: 15px;">
        <strong>Top Picks:</strong> Niplo’s tropical blends and dessert-inspired flavors are a hit among vapers, offering a perfect balance of sweetness and smoothness.
    </p>

    <h2 style="font-size: 22px; font-weight: bold; color: #34495e;">2. Vaporia: A Flavorful Journey</h2>
    <p style="font-size: 16px; margin-bottom: 15px;">
        Vaporia has carved out a niche for itself with its diverse range of flavors and dedication to quality. From fruity explosions to refreshing menthols, this brand ensures that there’s something for every palate.
    </p>
    <p style="font-size: 16px; margin-bottom: 15px;">
        <strong>Top Picks:</strong> Their berry-inspired e-liquids and iced flavors are particularly popular in 2025.
    </p>

    <h2 style="font-size: 22px; font-weight: bold; color: #34495e;">3. CloudFusion: Perfect for Cloud Chasers</h2>
    <p style="font-size: 16px; margin-bottom: 15px;">
        For those who love thick clouds and rich flavor profiles, CloudFusion is the brand to beat. Its high VG (vegetable glycerin) blends are designed to maximize vapor production without compromising on taste.
    </p>
    <p style="font-size: 16px; margin-bottom: 15px;">
        <strong>Top Picks:</strong> Creamy custards and classic tobacco blends are standout options from CloudFusion.
    </p>

    <h2 style="font-size: 22px; font-weight: bold; color: #34495e;">4. FlavorArt: Authentic and Pure</h2>
    <p style="font-size: 16px; margin-bottom: 15px;">
        FlavorArt prides itself on using natural ingredients to create authentic, pure flavors. Their attention to detail ensures that each bottle is crafted to perfection, making them a favorite among flavor purists.
    </p>
    <p style="font-size: 16px; margin-bottom: 15px;">
        <strong>Top Picks:</strong> Citrus blends and vanilla-infused flavors are highly recommended.
    </p>

    <h2 style="font-size: 22px; font-weight: bold; color: #34495e;">5. EcoJuice: Sustainability Meets Flavor</h2>
    <p style="font-size: 16px; margin-bottom: 15px;">
        As sustainability becomes a top priority, EcoJuice leads the way with eco-friendly packaging and responsibly sourced ingredients. Their commitment to the environment doesn’t come at the cost of flavor, as they offer a range of delicious, guilt-free options.
    </p>
    <p style="font-size: 16px; margin-bottom: 15px;">
        <strong>Top Picks:</strong> EcoJuice’s organic fruit flavors are both refreshing and environmentally friendly.
    </p>

    <h2 style="font-size: 22px; font-weight: bold; color: #34495e;">Conclusion</h2>
    <p style="font-size: 16px; margin-bottom: 15px;">
        2025 is shaping up to be an incredible year for e-liquid enthusiasts. With brands like <strong style="color: #e74c3c;">Niplo</strong> leading the charge in innovation and quality, there’s never been a better time to explore new flavors and elevate your vaping experience. Whether you’re seeking bold, exotic blends or eco-conscious choices, the top brands of 2025 have something for everyone.
    </p>
      `,
      image: blogImgeliquid,
      shortDescription:
        "Discover the top e-liquid brands of 2025, with Niplo leading the way in flavor, quality, and innovation.",
    },
    {
      title: "Top Budget-Friendly Vaping Devices at VapePlanet.co.uk",
      description: `
      <div style="padding: 20px;">
        <p style="font-size: 16px; line-height: 1.6; color: #34495e;">Experience exceptional quality without breaking the bank. VapePlanet.co.uk offers a variety of budget-friendly vape devices that provide great performance, longevity, and flavor.</p>

        <div style="background-color: #fff; margin: 15px 0; padding: 20px; border-radius: 8px; box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);">
            <h2 style="font-size: 20px; color: #2c3e50;">1. JNR Crystal Pro Max 5000 Puffs: Compact Yet Powerful</h2>
            <p style="font-size: 16px; line-height: 1.6; color: #34495e;">For vapers on the go, the JNR Crystal Pro Max 5000 Puffs offers portability, affordability, and performance. This device delivers a smooth vaping experience with consistent flavors lasting up to 5,000 puffs. Its compact size makes it easy to carry while offering exceptional value.</p>
        </div>

        <div style="background-color: #fff; margin: 15px 0; padding: 20px; border-radius: 8px; box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);">
            <h2 style="font-size: 20px; color: #2c3e50;">2. JNR Black and Gold 600 Puffs: Small But Mighty</h2>
            <p style="font-size: 16px; line-height: 1.6; color: #34495e;">If you're just starting out or need something discreet, the JNR Black and Gold 600 Puffs delivers a rich, satisfying flavor in a sleek, portable design. This device offers a premium feel at a fraction of the cost.</p>
        </div>

        <div style="background-color: #fff; margin: 15px 0; padding: 20px; border-radius: 8px; box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);">
            <h2 style="font-size: 20px; color: #2c3e50;">3. JNR Alien 10000 Puffs: Long-Lasting Value</h2>
            <p style="font-size: 16px; line-height: 1.6; color: #34495e;">The JNR Alien 10000 Puffs provides up to 10,000 puffs, offering a smooth vaping experience for an extended period. Its ergonomic design makes it easy to carry, making it a great investment for vapers who want a long-lasting device at a reasonable price.</p>
        </div>

        <div style="background-color: #fff; margin: 15px 0; padding: 20px; border-radius: 8px; box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);">
            <h2 style="font-size: 20px; color: #2c3e50;">4. JNR Falcon-X 18000 Puffs: High-Performance on a Budget</h2>
            <p style="font-size: 16px; line-height: 1.6; color: #34495e;">The JNR Falcon-X 18000 Puffs offers incredible value for those seeking durability and longevity. With 18,000 puffs, this device delivers excellent performance without the premium price tag. Its sleek, modern design ensures you get top-tier quality without breaking the bank.</p>
        </div>

        <div style="background-color: #fff; margin: 15px 0; padding: 20px; border-radius: 8px; box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);">
            <h2 style="font-size: 20px; color: #2c3e50;">5. JNR Shisha 12000 Puffs: A Taste of Tradition at an Affordable Price</h2>
            <p style="font-size: 16px; line-height: 1.6; color: #34495e;">For shisha enthusiasts, the JNR Shisha 12000 Puffs offers traditional flavors in a convenient, disposable vape. With 12,000 puffs, it’s a great way to enjoy rich flavors without compromising on affordability or quality.</p>
        </div>

        <p style="font-size: 16px; line-height: 1.6; color: #34495e;"><strong>Why Choose Budget-Friendly Devices at VapePlanet.co.uk?</strong></p>
        <p style="font-size: 16px; line-height: 1.6; color: #34495e;">VapePlanet.co.uk is dedicated to bringing you top-notch vaping experiences at prices you can afford. Our carefully selected range of devices from JNR Vapes ensures you get exceptional value without compromising quality. All of our devices are designed to deliver consistent flavor, longevity, and satisfaction—proving you don’t have to spend a lot to enjoy a great vaping experience.</p>

        <p style="font-size: 16px; line-height: 1.6; color: #34495e;"><strong>Conclusion:</strong> You don’t have to break the bank for a great vaping experience. At VapePlanet.co.uk, we offer affordable devices like the JNR Crystal Pro Max and JNR Alien, each crafted to deliver quality performance. Visit us today and find the perfect vape that suits your needs and your wallet!</p>

        <a href="https://vapeplanet.co.uk" style="background-color: #e74c3c; color: white; padding: 10px 20px; text-decoration: none; border-radius: 4px; font-weight: bold; display: inline-block; margin-top: 20px;">Shop Now</a>
    </div>`,
      image: blogVapingDevicesBudget,
      shortDescription:
        "Unlock unbeatable vaping experiences without the hefty price tag—explore the top budget-friendly devices at VapePlanet.co.uk today!",
    },
    {
      title: "How the E-Liquid Flavor Craze is Changing the Vaping Industry",
      description: "",
      image: blogImg,
      shortDescription:
        "Explore the popularity of unique e-liquid flavors, from classic to exotic, and their influence on the vaping experience.",
    },
    {
      title:
        "Vaping Etiquette: Tips for Respectful and Responsible Vaping in Public",
      description: "",
      image: blogImg,
      shortDescription:
        "Essential tips for respectful public vaping: low-odor options, designated areas, and responsible use around others.",
    },
  ];
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

  const customSwiperProductOff = (item) => {
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
              "https://mrvape-frontend.s3.eu-west-2.amazonaws.com/banners/Alien+Max+(1720+x+915).jpg",
              "https://mrvape-frontend.s3.eu-west-2.amazonaws.com/banners/Capsule+(1720+x+915).jpg",
              // "https://mrvape-frontend.s3.eu-west-2.amazonaws.com/banners/Falcon+X+(1720+x+915).jpg",
            ]}
            customSwiperProduct={customSwiperProductBanner}
          />
          {/* </div>
          </div> */}
        </section>
        {/* Widget Block 2 */}
        <section className="bg-white py-2 pb-3">
          <div className="container-lg">
            <div className="row">
              <div className="col-12 text-center">
                <div className="trustpilot-widget">
                  <img
                    src={trustPilotWidget}
                    alt="trust pilot widget"
                    className="img-fluid"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className=" bg-image category-area black-area category-two pb-60 pt-80">
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
                      className="img-fluid"
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
                <h2>Explore the Latest in Vaping Trends</h2>
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
        <section className="get-now-area pt-130 pb-130">
          <div className="container-lg">
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
                  <h2>coming soon products</h2>
                </div>
                <div className="get-now__content">
                  <div
                    className="get-info py-4 wow fadeInUp"
                    data-wow-delay=".2s"
                  >
                    <del>£99.00</del> <span>£49.00</span>
                  </div>
                  <p className=" wow fadeInUp" data-wow-delay=".3s">
                    There are many variations of passages of Lorem Ipsum
                    available, but <br />
                    the majority have suffered alteration in some form, by
                    injected humour, or randomised words which
                  </p>
                  <ul
                    className="pt-30 pb-30 bor-bottom wow fadeInUp"
                    data-wow-delay=".3s"
                  >
                    <li>100% Natural</li>
                    <li>Coupon £61.99, Code: W2</li>
                    <li>30 Day Refund</li>
                  </ul>
                  {/* timer */}
                  <div
                    className="time-up d-flex flex-wrap align-items-center gap-5 mt-30 wow fadeInUp"
                    data-wow-delay=".4s"
                  >
                    <div className="info">
                      <h4 className="mb-0">HUNGRY UP !</h4>
                      <span>Offer end in :</span>
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
              <div className="col-xl-6">
                <div className="get-now__image mt-5 mt-xl-0">
                  {/* <div className="swiper get__slider">
                    <div className="swiper-wrapper">
                      <div className="swiper-slide"> */}
                  <div className="image">
                    <img
                      src={
                        "https://s3.eu-west-2.amazonaws.com/www.vapeplanet.co.uk/websitelayouts/Coming-Soon-1.jpg"
                      }
                      alt="image"
                      className="img-fluid round-100"
                    />
                    {/* </div>
                      </div>
                    </div> */}
                  </div>
                  {/* <button className="get-now-arry get-now__arry-left">
                    <i className="fa-light fa-chevron-left" />
                  </button>
                  <button className="get-now-arry get-now__arry-right text-warning">
                    <i className="fa-light fa-chevron-right" />
                  </button> */}
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* Get now area end here */}
        {/* Text slider area start here */}
        <div className="container-lg">
          <div className="bor-top pb-40" />
        </div>
        <div className="marquee-wrapper text-slider">
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
        </div>
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
            <SwiperComponentCustom
              slidesPerView={3}
              swiperProduct={blogArray}
              customSwiperProduct={customSwiperProductOff}
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
              stopAutoPlay={true}
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
