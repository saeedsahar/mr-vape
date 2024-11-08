import React from "react";
import { SwiperComponentCustom } from "../../Component/Swiper/Swiper";
import { SwiperSlide } from "swiper/react";
import { useDispatch } from "react-redux";
import { setBlog } from "./BlogSlice";
import { useNavigate } from "react-router-dom";
import blogImg from "../../assets/images/blog/blogimage.png";

function ViewAllBlogs(props) {
  let blogArray = [
    {
      title: "Exploring the Top Vape Kit Trends for 2024: What’s New?",
      description: "",
      image: blogImg,
      shortDescription:
        "Discover 2024’s vape kit trends, including compact designs, new tech, and improved features, plus insights from top brands.",
    },
    {
      title:
        "Understanding E-Liquid Ingredients: What’s Really Inside Your Vape Juice?",
      description: "",
      image: blogImg,
      shortDescription:
        "Learn about e-liquid ingredients like VG, PG, and flavors, their roles, safety tips, and what to check on labels.",
    },
    {
      title: "Guide to Choosing the Right Vape Kit for Beginners and Pros",
      description: "",
      image: blogImg,
      shortDescription:
        "A guide to selecting vape kits based on experience level, from beginner devices to advanced mods for seasoned vapers.",
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
    {
      title: "Exploring the Top Vape Kit Trends for 2024: What’s New?",
      description: "",
      image: blogImg,
      shortDescription:
        "Discover 2024’s vape kit trends, including compact designs, new tech, and improved features, plus insights from top brands.",
    },
    {
      title:
        "Understanding E-Liquid Ingredients: What’s Really Inside Your Vape Juice?",
      description: "",
      image: blogImg,
      shortDescription:
        "Learn about e-liquid ingredients like VG, PG, and flavors, their roles, safety tips, and what to check on labels.",
    },
    {
      title: "Guide to Choosing the Right Vape Kit for Beginners and Pros",
      description: "",
      image: blogImg,
      shortDescription:
        "A guide to selecting vape kits based on experience level, from beginner devices to advanced mods for seasoned vapers.",
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
    {
      title: "Exploring the Top Vape Kit Trends for 2024: What’s New?",
      description: "",
      image: blogImg,
      shortDescription:
        "Discover 2024’s vape kit trends, including compact designs, new tech, and improved features, plus insights from top brands.",
    },
    {
      title:
        "Understanding E-Liquid Ingredients: What’s Really Inside Your Vape Juice?",
      description: "",
      image: blogImg,
      shortDescription:
        "Learn about e-liquid ingredients like VG, PG, and flavors, their roles, safety tips, and what to check on labels.",
    },
  ];

  let dispatch = useDispatch();
  let navigate = useNavigate();

  return (
    <>
      <section
        className="gallery-area gallery-light black-area"
        style={{ marginTop: "30px" }}
      >
        <div className="container-lg">
          <div className="product__wrp pb-30 mb-25 bor-bottom d-flex flex-wrap align-items-center justify-content-xl-between justify-content-center">
            <div
              className="section-header d-flex align-items-center wow fadeInUp"
              data-wow-delay=".1s"
            >
              <span className="title-icon mr-10" />
              <h2>News and Blogs</h2>
            </div>
          </div>

          <div id="latest-item" className="tab-pane fade show active">
            <div className="row g-4">
              {blogArray?.map((item) => {
                return (
                  <div className="col-lg-3 mb-4">
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
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default ViewAllBlogs;
