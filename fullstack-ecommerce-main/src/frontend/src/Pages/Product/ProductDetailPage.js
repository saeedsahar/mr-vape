import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  CircularProgress,
  Button,
  Icon,
  TextField,
  Stack,
  Chip,
  ButtonGroup,
  Input,
} from "@mui/material";
import { base_url, getRequests } from "../../axios/API";
import {
  addItemQuantity,
  decreaseItemQuantity,
} from "../../Pages/Cart/CartSlice";
import { useSelector, useDispatch } from "react-redux";
import { setSnackBar } from "../../Component/MainNaivgationComp/MainNavSlice";
import bannerBImg from "../../assets/images/banner/inner-banner.jpg";
import { SwiperSlide } from "swiper/react";
import { SwiperComponentCustom } from "../../Component/Swiper/Swiper";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import { FreeMode, Navigation, Thumbs } from "swiper/modules";
import { Swiper } from "swiper/react";
import comment1 from "../../assets/images/about/comment1.png";
import comment2 from "../../assets/images/about/comment2.png";
import comment3 from "../../assets/images/about/comment3.png";
import comment4 from "../../assets/images/about/comment4.png";
// Import Swiper styles
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";

function ProductDetailPage(props) {
  const { id } = useParams();
  const [status, setStatus] = useState("pending");
  const [product, setProduct] = useState(null);
  const [selectedFlavour, setSelectedFlavour] = useState(null);
  const [selectedProductImage, setSelectedProductImage] = useState("");
  const [selectedTab, setSelectedTab] = useState(0);
  let cartStates = useSelector((state) => state.cart);
  let dispatch = useDispatch();
  let navigate = useNavigate();

  const [thumbsSwiper, setThumbsSwiper] = useState(null);

  const shouldAddButtonDisable = (product, flavour) => {
    let item = cartStates.items.filter((ele) => ele.id == flavour.id);
    // let falvourItem = item.productFlavours.filter(ele => ele.id == flavour.id)
    if (item.length <= 0) return false;

    return item[0].availableQuantity <= 0;
  };

  useEffect(() => {
    // Fetch product details
    const fetchProduct = async () => {
      try {
        getProductDetails(id);
      } catch (error) {
        setStatus("error");
        console.error("Error fetching product details", error);
      }
    };
    fetchProduct();
  }, [id]);

  const getProductDetails = (id) => {
    getRequests(`${base_url}/api/v1/product/${id}`).then((data) => {
      let flavourIdMap = {};
      data.data?.productImages?.forEach((flav) => {
        flavourIdMap[flav.id] = flav.image;
      });

      data.data.productFlavours?.forEach((flav) => {
        flav.productId = data.data.id;
        flav.price = data.data.price;
        flav.image = flavourIdMap[flav.id];
        flav.productName = data.data.name;
        flav.productImage = data.data.image;
      });
      setProduct(data.data);
      setSelectedProductImage(data.data.image);
      setSelectedFlavour(data.data.productFlavours[0]);
      setStatus("success");
    });
  };

  const customSwiperProductOff = (item) => {
    return (
      <SwiperSlide>
        {" "}
        <div
          style={{
            paddingTop: "12px",
            paddingBottom: "10px",
            cursor: "pointer",
          }}
          onClick={() => {
            setSelectedProductImage(item.image);
          }}
        >
          <img src={item.image} alt="image" />
        </div>
      </SwiperSlide>
    );
  };

  const addProductToCart = (productId) => {
    console.log("Product added to cart: ", productId);
    // Add your logic for adding the product to the cart
  };

  let currentFlavQuantity = cartStates?.items?.filter(
    (ele) => ele.id == selectedFlavour?.id
  )[0]?.quantity;
  if (!currentFlavQuantity) {
    currentFlavQuantity = 0;
  }

  if (status === "pending") {
    return (
      <main style={{ marginTop: "200px" }}>
        <section className="banner-two banner-two-light black-area">
          <div style={{ textAlign: "center" }}>
            <CircularProgress />
          </div>
        </section>
      </main>
    );
  }

  if (status === "success" && product) {
    return (
      <main>
        {/* Page banner area start here */}
        <section
          className="page-banner bg-image pt-130 pb-130"
          style={{
            backgroundImage: `url(https://s3.eu-west-2.amazonaws.com/www.vapeplanet.co.uk/websitelayouts/Product-Detail-Banner--v2.jpg)`,
          }}
        >
          {/* <div className="container-lg">
            <h2
              className="wow fadeInUp text-white mb-15 color-black"
              data-wow-duration="1.1s"
              data-wow-delay=".1s"
            >
              
            </h2>
            <div
              className="breadcrumb-list wow fadeInUp"
              data-wow-duration="1.3s"
              data-wow-delay=".3s"
            >
              <a className="primary-hover color-black">
                <i className="fa-solid fa-house me-1 color-black" /> Home{" "}
                <i className="fa-regular text-white fa-angle-right color-black" />
              </a>
              <a className="primary-hover color-black">
                {" "}
                shop{" "}
                <i className="fa-regular text-white fa-angle-right color-black" />
              </a>
              <span className="color-black">Shop Details</span>
            </div>
          </div> */}
        </section>
        {/* Page banner area end here */}
        {/* Shop single area start here */}
        <section className="shop-single pt-130 pb-130">
          <div className="container-lg" style={{ paddingBottom: "10px" }}>
            <div
              className="breadcrumb-list wow fadeInUp"
              data-wow-duration="1.3s"
              data-wow-delay=".3s"
            >
              <a
                className="primary-hover color-primary"
                onClick={() => navigate("/")}
              >
                <i className="fa-solid fa-house me-1 color-primary" /> Home{" "}
                <i className="fa-regular fa-angle-right color-primary" />
              </a>
              <a
                className="primary-hover color-primary"
                onClick={() => navigate("/products")}
              >
                {" "}
                shop <i className="fa-regular fa-angle-right color-primary" />
              </a>
              <span className="color-primary">Shop Details</span>
            </div>
          </div>

          <div className="container-lg">
            {/* product-details area start here */}
            <div className="product-details-single pb-40">
              <div className="row g-4">
                <div className="col-lg-5">
                  <Swiper
                    style={{
                      "--swiper-navigation-color": "#fa4f09",
                      "--swiper-pagination-color": "#fff",
                      height: "auto",
                      width: "100%",
                      marginBottom: "20px",
                      objectFit: "cover",
                    }}
                    spaceBetween={10}
                    navigation={true}
                    thumbs={{ swiper: thumbsSwiper }}
                    modules={[FreeMode, Navigation, Thumbs]}
                    className="mySwiper2"
                    // style={{height : "520px"}}
                  >
                    {product.productImages?.map((item) => {
                      return (
                        <SwiperSlide>
                          <img src={item.image} className="img-fluid" />
                        </SwiperSlide>
                      );
                    })}
                  </Swiper>
                  <Swiper
                    onSwiper={setThumbsSwiper}
                    spaceBetween={20}
                    slidesPerView={4}
                    freeMode={true}
                    watchSlidesProgress={true}
                    modules={[FreeMode, Navigation, Thumbs]}
                    className="mySwiper"
                  >
                    {product.productImages?.map((item) => {
                      return (
                        <SwiperSlide>
                          <img className="img-fluid" src={item.image} />
                        </SwiperSlide>
                      );
                    })}
                  </Swiper>
                </div>

                <div className="col-lg-7">
                  <div className="content h24">
                    <h3 className="pb-2 primary-color">
                      {selectedFlavour.productName}
                    </h3>
                    <div className="star primary-color pb-2">
                      <span>
                        <i className="fa-solid fa-star sm-font" />
                      </span>
                      <span>
                        <i className="fa-solid fa-star sm-font" />
                      </span>
                      <span>
                        <i className="fa-solid fa-star sm-font" />
                      </span>
                      <span>
                        <i className="fa-solid fa-star sm-font" />
                      </span>
                      <span>
                        <i className="fa-solid fa-star-half-stroke sm-font" />
                      </span>
                    </div>
                    <h2 className="pb-3">£{product.price}</h2>
                    <h4 className="pb-2 primary-color">Product Description</h4>
                    <p className="text-justify mb-10">
                      <div
                        style={{ color: "black" }}
                        className="product-description"
                        dangerouslySetInnerHTML={{
                          __html: product.shortDescription,
                        }}
                      />
                    </p>
                    <p className="text-justify">
                      <div
                        style={{ color: "black" }}
                        className="product-description"
                        dangerouslySetInnerHTML={{
                          __html: product.description,
                        }}
                      />
                    </p>
                  </div>
                  <div className="row">
                    <div className="col-lg-8">
                      <div className="details-area">
                        <Stack
                          direction="row"
                          gap={2}
                          alignItems="center"
                          className="py-3 mt-4 bor-bottom"
                        >
                          <h6 className="pe-3 mb-0 w-25">Flavors : </h6>
                          <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            size="small"
                            value={selectedFlavour.flavour}
                            // label="Flavours"
                            onChange={(e) => {
                              console.log(e.target.value);

                              setSelectedFlavour(
                                product.productFlavours?.filter(
                                  (fla) => fla.flavour == e.target.value
                                )[0]
                              );
                            }}
                            style={{ borderColor: "#fa4f09" }}
                          >
                            {" "}
                            {product.productFlavours?.map((fla) => {
                              return (
                                <MenuItem value={fla.flavour}>
                                  {fla.flavour}
                                </MenuItem>
                              );
                            })}
                          </Select>
                        </Stack>

                        <Stack
                          direction="row"
                          gap={2}
                          alignItems="center"
                          className="py-3 bor-bottom"
                        >
                          <h6 className="pe-3 mb-0 w-25">
                            Key Selling Points :{" "}
                          </h6>
                          <Chip variant="filled" label="Fashion" />
                          <Chip variant="filled" label="Lifestyle" />
                          <Chip variant="filled" label="Travel" />
                        </Stack>

                        <Stack
                          direction="row"
                          gap={2}
                          alignItems="center"
                          className="py-3 bor-bottom"
                        >
                          <h6 className="pe-3 mb-0 w-25">Share</h6>
                          <div className="social-media">
                            <a className="mx-2 primary-color secondary-hover">
                              <i className="fa-brands fa-facebook-f" />
                            </a>
                            <a className="mx-2 primary-color secondary-hover">
                              <i className="fa-brands fa-twitter" />
                            </a>
                            <a className="mx-2 primary-color secondary-hover">
                              <i className="fa-brands fa-linkedin-in" />
                            </a>
                            <a className="mx-2 primary-color secondary-hover">
                              <i className="fa-brands fa-instagram" />
                            </a>
                            <a className="mx-2 primary-color secondary-hover">
                              <i className="fa-brands fa-pinterest-p" />
                            </a>
                          </div>
                        </Stack>

                        <Stack
                          direction="row"
                          gap={2}
                          alignItems="center"
                          className="py-3 border-bottom"
                        >
                          <h6 className="pe-3 mb-0 w-25">Quantity</h6>
                          <ButtonGroup variant="outlined">
                            <Button
                              onClick={() =>
                                dispatch(decreaseItemQuantity(selectedFlavour))
                              }
                            >
                              -
                            </Button>
                            <Button variant="outlined">
                              {currentFlavQuantity}
                            </Button>
                            <Button
                              onClick={() =>
                                dispatch(addItemQuantity(selectedFlavour))
                              }
                            >
                              +
                            </Button>
                          </ButtonGroup>
                        </Stack>

                        <a
                          className="d-block text-center btn-two mt-40"
                          onClick={() => {
                            dispatch(addItemQuantity(selectedFlavour));
                            dispatch(
                              setSnackBar({
                                open: true,
                                message: "Item Added to Cart!",
                                type: "success",
                              })
                            );
                          }}
                        >
                          <span className="pointer">
                            <i className="fa-solid fa-basket-shopping pe-2" />
                            add to cart
                          </span>
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* product-details area end here */}
            {/* description review area start here */}
            <div className="shop-singe-tab">
              <ul className="nav nav-pills mb-4 bor-top bor-bottom py-2">
                <li className="nav-item">
                  <a
                    data-bs-toggle="tab"
                    className={`nav-link ps-0 pe-3 ${
                      selectedTab == 0 ? "active" : ""
                    }`}
                    onClick={() => setSelectedTab(0)}
                  >
                    <h4 className="text-uppercase">reviews (4)</h4>
                  </a>
                </li>
                <li className="nav-item">
                  <a
                    data-bs-toggle="tab"
                    className={`nav-link ${selectedTab == 1 ? "active" : ""}`}
                    onClick={() => setSelectedTab(1)}
                  >
                    <h4 className="text-uppercase">description</h4>
                  </a>
                </li>
              </ul>
              <div className="tab-content">
                <div
                  id="description"
                  className={`tab-pane ${
                    selectedTab == 1 ? "show active" : "fade"
                  }`}
                >
                  <p className="pb-4 text-justify" style={{ color: "black" }}>
                    Proactively disseminate impactful mindshare without
                    technically sound web services. Distiively harness
                    compelling innovation before high payoff testing procedures.
                    Uniquely fashion customized web services with cross
                    functional internal or "organic" sources. Uniquely restore
                    error-free e-commerce via multidisciplinary antailers.
                    Completely whiteboard user friendly quality vectors rather
                    than synergistic technologi Professionally evisculate
                    enterprise wide metrics without resource maximizing
                    interfaces. Synergistically benchmark enterprise-wide
                    e-tailers through optimal paradigms. Phosfluorescently
                    foster cutting-edge was and benefits without magnetic
                  </p>
                  <p className="pb-4 text-justify" style={{ color: "black" }}>
                    Completely build emerging ideas through covalent
                    applications. Distinctively synthesize user friendly
                    collaboration and idsharing with superior content.
                    Energistically incentivize user friendly models rather than
                    timely convergence. Objectively disintermediate high
                    standards in paradigms before state the art process
                    improvements. Interactively orchestrate plug-and-play human
                    capital whereas customer directed initiatives.
                  </p>
                  <p className="text-justify" style={{ color: "black" }}>
                    Intrinsicly provide access to team driven information
                    without adaptive content. Collaboratively embrace reliable
                    supply chains via extensible benefits. Enthusiastically
                    visualize accurate human capital before backend
                    meta-services. Continually reinvent interdependent schemas
                    through mission-critical benefits. Competently leverage
                    existing parallel action items through end-to-end "outside
                    the box" thinking.
                  </p>
                </div>
                <div
                  id="review"
                  className={`tab-pane ${
                    selectedTab == 0 ? "show active" : "fade"
                  }`}
                >
                  <div className="review-wrp">
                    <div className="abmin d-flex flex-wrap flex-md-nowrap align-items-center pb-4">
                      <div className="img pb-4 pb-md-0 me-4">
                        <img src={comment3} alt="image" />
                      </div>
                      <div className="content position-relative p-4 bor">
                        <div className="head-wrp pb-1 d-flex flex-wrap justify-content-between">
                          <a>
                            <h4
                              className="text-capitalize primary-color"
                              style={{ color: "black" }}
                            >
                              Janaton Doe{" "}
                              <span
                                className="sm-font ms-2 fw-normal"
                                style={{ color: "black" }}
                              >
                                27 March 2023 at 3.44 pm
                              </span>
                            </h4>
                          </a>
                          <div className="star primary-color">
                            <span>
                              <i className="fa-solid fa-star sm-font" />
                            </span>
                            <span>
                              <i className="fa-solid fa-star sm-font" />
                            </span>
                            <span>
                              <i className="fa-solid fa-star sm-font" />
                            </span>
                            <span>
                              <i className="fa-solid fa-star sm-font" />
                            </span>
                            <span>
                              <i className="fa-solid fa-star-half-stroke sm-font" />
                            </span>
                          </div>
                        </div>
                        <p className="text-justify" style={{ color: "black" }}>
                          Globally leverage existing sticky testing procedures
                          whereas timely alignments. Appropriately leverage
                          existing cross unit human a capital Globally
                          distributed process improvements and empowered
                          internal or sources.{" "}
                        </p>
                      </div>
                    </div>
                    <div className="abmin d-flex flex-wrap flex-md-nowrap align-items-center pb-4">
                      <div className="img pb-4 pb-md-0 me-4">
                        <img src={comment2} alt="image" />
                      </div>
                      <div className="content position-relative p-4 bor">
                        <div className="head-wrp pb-1 d-flex flex-wrap justify-content-between">
                          <a>
                            <h4
                              className="text-capitalize primary-color"
                              style={{ color: "black" }}
                            >
                              kawser ahemd
                              <span
                                className="sm-font ms-2 fw-normal"
                                style={{ color: "black" }}
                              >
                                27 March 2023 at 3.44 pm
                              </span>
                            </h4>
                          </a>
                          <div className="star primary-color">
                            <span>
                              <i className="fa-solid fa-star sm-font" />
                            </span>
                            <span>
                              <i className="fa-solid fa-star sm-font" />
                            </span>
                            <span>
                              <i className="fa-solid fa-star sm-font" />
                            </span>
                            <span>
                              <i className="fa-solid fa-star sm-font" />
                            </span>
                            <span>
                              <i className="fa-solid fa-star-half-stroke sm-font" />
                            </span>
                          </div>
                        </div>
                        <p className="text-justify" style={{ color: "black" }}>
                          Globally leverage existing sticky testing procedures
                          whereas timely alignments. Appropriately leverage
                          existing cross unit human a capital Globally
                          distributed process improvements and empowered
                          internal or sources.{" "}
                        </p>
                      </div>
                    </div>
                    <div className="abmin d-flex flex-wrap flex-md-nowrap align-items-center pb-4">
                      <div className="img pb-4 pb-md-0 me-4">
                        <img src={comment1} alt="image" />
                      </div>
                      <div className="content position-relative p-4 bor">
                        <div className="head-wrp pb-1 d-flex flex-wrap justify-content-between">
                          <a>
                            <h4
                              className="text-capitalize primary-color"
                              style={{ color: "black" }}
                            >
                              famad sami
                              <span
                                className="sm-font ms-2 fw-normal"
                                style={{ color: "black" }}
                              >
                                27 March 2023 at 3.44 pm
                              </span>
                            </h4>
                          </a>
                          <div className="star primary-color">
                            <span>
                              <i className="fa-solid fa-star sm-font" />
                            </span>
                            <span>
                              <i className="fa-solid fa-star sm-font" />
                            </span>
                            <span>
                              <i className="fa-solid fa-star sm-font" />
                            </span>
                            <span>
                              <i className="fa-solid fa-star sm-font" />
                            </span>
                            <span>
                              <i className="fa-solid fa-star-half-stroke sm-font" />
                            </span>
                          </div>
                        </div>
                        <p className="text-justify" style={{ color: "black" }}>
                          Globally leverage existing sticky testing procedures
                          whereas timely alignments. Appropriately leverage
                          existing cross unit human a capital Globally
                          distributed process improvements and empowered
                          internal or sources.{" "}
                        </p>
                      </div>
                    </div>
                    <div className="abmin d-flex flex-wrap flex-md-nowrap align-items-center pb-4">
                      <div className="img pb-4 pb-md-0 me-4">
                        <img src={comment4} alt="image" />
                      </div>
                      <div className="content position-relative p-4 bor">
                        <div className="head-wrp pb-1 d-flex flex-wrap justify-content-between">
                          <a>
                            <h4
                              className="text-capitalize primary-color"
                              style={{ color: "black" }}
                            >
                              Abu rayhan{" "}
                              <span
                                className="sm-font ms-2 fw-normal"
                                style={{ color: "black" }}
                              >
                                27 March 2023 at 3.44 pm
                              </span>
                            </h4>
                          </a>
                          <div className="star primary-color">
                            <span>
                              <i className="fa-solid fa-star sm-font" />
                            </span>
                            <span>
                              <i className="fa-solid fa-star sm-font" />
                            </span>
                            <span>
                              <i className="fa-solid fa-star sm-font" />
                            </span>
                            <span>
                              <i className="fa-solid fa-star sm-font" />
                            </span>
                            <span>
                              <i className="fa-solid fa-star-half-stroke sm-font" />
                            </span>
                          </div>
                        </div>
                        <p className="text-justify" style={{ color: "black" }}>
                          Globally leverage existing sticky testing procedures
                          whereas timely alignments. Appropriately leverage
                          existing cross unit human a capital Globally
                          distributed process improvements and empowered
                          internal or sources.{" "}
                        </p>
                      </div>
                    </div>
                    <div className="section-title mt-5 py-15 mb-30">
                      <h2
                        className="text-capitalize primary-color mb-10"
                        style={{ color: "black" }}
                      >
                        add a review
                      </h2>
                      <p className="mb-20" style={{ color: "black" }}>
                        Your email address will not be published. Required
                        fields are marked *
                      </p>
                      <div className="shop-single__rate-now">
                        <p style={{ color: "black" }}>Rate this product? *</p>
                        <div className="star">
                          <span>
                            <i className="fa-solid fa-star" />
                          </span>
                          <span>
                            <i className="fa-solid fa-star" />
                          </span>
                          <span>
                            <i className="fa-solid fa-star" />
                          </span>
                          <span>
                            <i className="fa-solid fa-star" />
                          </span>
                          <span>
                            <i className="fa-solid fa-star" />
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="comment-form">
                      <form action="#">
                        <div className="row g-4">
                          <div className="col-md-6">
                            <input
                              type="text"
                              className="w-100 mb-4 bor px-4 py-2"
                              placeholder="Your Name*"
                            />
                          </div>
                          <div className="col-md-6">
                            <input
                              type="email"
                              className="w-100 mb-4 bor px-4 py-2"
                              placeholder="Your Email*"
                            />
                          </div>
                        </div>
                        <textarea
                          className="w-100 mb-4 bor p-4"
                          placeholder="Message"
                          defaultValue={""}
                        />
                      </form>
                      <div className="btn-wrp">
                        <button className="btn-one" style={{ color: "black" }}>
                          <span>Submit Now</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    );
  }

  return <div>Error loading product</div>;
}

export default ProductDetailPage;
