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
  incrementItemQuantity
} from "../../Pages/Cart/CartSlice";
import { useSelector, useDispatch } from "react-redux";
import {
  setDialogStates,
  setSnackBar,
} from "../../Component/MainNaivgationComp/MainNavSlice";
// import bannerBImg from "../../assets/images/banner/inner-banner.jpg";
import { SwiperSlide } from "swiper/react";
// import { SwiperComponentCustom } from "../../Component/Swiper/Swiper";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import { FreeMode, Navigation, Thumbs } from "swiper/modules";
import { Swiper } from "swiper/react";
import {
  setBrandId,
  setCategoryId,
  setLoading,
  setProducts,
  setQuery,
  setTrendingProducts,
  // setCategoryId,
  // setQuery,
} from "./ProductSlice";
import ProductList from "./ProductList";

import Avatar from "react-avatar";
import StarRatings from "react-star-ratings";

// Import Swiper styles
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";

function ProductDetailPage(props) {
  const { id } = useParams();
  const [status, setStatus] = useState("pending");
  const [product, setProduct] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [selectedFlavour, setSelectedFlavour] = useState(null);
  const [selectedProductImage, setSelectedProductImage] = useState("");
  const [selectedTab, setSelectedTab] = useState(1);
  let cartStates = useSelector((state) => state.cart);
  let productStates = useSelector((state) => state.product);
  let authStates = useSelector((state) => state.auth);
  let dispatch = useDispatch();
  let navigate = useNavigate();
  const [productType, setProductType] = useState("Trending");
  
  const setProductListType = (type) => {
    setProductType(type);
    fetchProducts(type, 0, 6);
  };

    const [trustpilotData, setTrustpilotData] = useState(null);
  
    useEffect(() => {
      // Replace with your Trustpilot API key and Business Unit ID
      const API_KEY = "YOUR_TRUSTPILOT_API_KEY";
      const BUSINESS_UNIT_ID = "674a0a1bc6992161e87b4986";
  
      const fetchTrustpilotData = async () => {
        try {
          const response = await fetch(
            `https://api.trustpilot.com/v1/business-units/${BUSINESS_UNIT_ID}`,
            {
              headers: {
                Authorization: `Bearer ${API_KEY}`,
              },
            }
          );
          const data = await response.json();
          setTrustpilotData(data);
        } catch (error) {
          console.error("Error fetching Trustpilot data:", error);
        }
      };
  
      fetchTrustpilotData();
    }, []);

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

  const [thumbsSwiper, setThumbsSwiper] = useState(null);

  useEffect(() => {
    // Set the default product list type when the page loads
    setProductListType("Trending"); // or "TopRating", as per your requirement
  }, []); 

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

  useEffect(() => {
    if (product) {
      // Add Review
      let reviewObj = productStates.reviewObject;
      let currProduct = [...reviews];
      let reviewToPush = {
        comment: reviewObj.comment,
        date_time: reviewObj.review_Date,
        intials: "SS",
        rating: reviewObj.rating,
        reviewer_name: authStates.name ? authStates.name : "Anonymous",
        title: "",
      };
      currProduct.push(reviewToPush);
      setReviews(currProduct);
    }
  }, [productStates.reviewAdded]);

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
      setReviews(data.data?.reviewResponseList);
    });
  };

  let currentFlavQuantity = cartStates?.items?.filter(
    (ele) => ele.id == selectedFlavour?.id
  )[0]?.quantity;
  if (!currentFlavQuantity) {
    currentFlavQuantity = 1;
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
        
        {/* Page banner area end here */}
        {/* Shop single area start here */}
        <section className="shop-single pt-130 ">
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
  {/* Main Swiper for Product Images */}
  <Swiper
    style={{
      "--swiper-navigation-color": "#fa4f09",
      "--swiper-pagination-color": "#fff",
      height: "auto",
      width: "100%",
      marginBottom: "20px",
    }}
    spaceBetween={10}
    navigation={true}
    thumbs={{ swiper: thumbsSwiper }}
    modules={[FreeMode, Navigation, Thumbs]}
    className="mySwiper2"
  >
    {product.productImages?.map((item, index) => (
      <SwiperSlide key={index}>
        <img
          src={item.image}
          alt={`Product ${index + 1}`}
          style={{
            width: "100%", // Adjust to the container width
            height: "auto", // Maintain aspect ratio
            objectFit: "contain", // Ensure the image fits without cropping
          }}
        />
      </SwiperSlide>
    ))}
  </Swiper>

  {/* Thumbnail Swiper */}
  <Swiper
    onSwiper={setThumbsSwiper}
    spaceBetween={20}
    slidesPerView={4}
    freeMode={true}
    watchSlidesProgress={true}
    modules={[FreeMode, Navigation, Thumbs]}
    className="mySwiper"
  >
    {product.productImages?.map((item, index) => (
      <SwiperSlide key={index}>
        <img
          src={item.image}
          alt={`Thumbnail ${index + 1}`}
          style={{
            width: "100%",
            height: "auto",
            objectFit: "contain",
            border: "1px solid #ddd", // Optional border for thumbnails
            borderRadius: "4px", // Rounded corners for thumbnails
          }}
        />
      </SwiperSlide>
    ))}
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
                    {product.wasPrice && <del>£{product.wasPrice}</del>}
                    <h2 className="pb-3">£{product.price}</h2>
                    {/* <h4 className="pb-2 primary-color">Product Description</h4> */}
                    <p className="text-justify mb-10">
                      <div
                        style={{ color: "black" }}
                        className="product-description"
                        dangerouslySetInnerHTML={{
                          __html: product.shortDescription,
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
  <h6 className="pe-3 mb-0 w-25" style={{ color: "black", fontWeight: "700", fontSize: "18px" }}>
    Flavours:
  </h6>
  <Select
    labelId="demo-simple-select-label"
    id="demo-simple-select"
    size="small"
    value={selectedFlavour.flavour}
    onChange={(e) => {
      console.log(e.target.value);

      setSelectedFlavour(
        product.productFlavours?.filter(
          (fla) => fla.flavour === e.target.value
        )[0]
      );
    }}
    sx={{
      width: "100%",
      border: "1px solid #fa4f09",
      borderRadius: "8px",
      backgroundColor: "#fff",
      "& .MuiSelect-select": {
        padding: "8px 12px",
      },
      "&:hover": {
        borderColor: "#e64500",
      },
      "&.Mui-focused": {
        borderColor: "#fa4f09",
      },
    }}
  >
    {product.productFlavours?.map((fla) => (
      <MenuItem
        key={fla.flavour}
        value={fla.flavour}
        style={{
          padding: "10px 16px",
          borderRadius: "4px",
          "&:hover": {
            backgroundColor: "#ffe4d1",
            color: "#fa4f09",
          },
        }}
      >
        {fla.flavour}
      </MenuItem>
    ))}
  </Select>
</Stack>


                        {/* <Stack
  direction="row"
  gap={2}
  alignItems="center"
  className="py-3 bor-bottom"
  sx={{
    borderBottom: "1px solid #d9d9d9",
    paddingBottom: "12px",
  }}
>
  <h6
    className="pe-3 mb-0 w-25"
    style={{
      color: "black",
      fontWeight: "bold",
      fontSize: "16px",
      textTransform: "uppercase",
    }}
  >
    Key Features:
  </h6>
  <Chip
    label="Sleek Design"
    sx={{
      backgroundColor: "#fa4f09",
      color: "#fff",
      fontWeight: "bold",
      borderRadius: "12px",
      fontSize: "14px",
      "&:hover": {
        backgroundColor: "#e64500",
      },
    }}
  />
  <Chip
    label="Premium Flavors"
    sx={{
      backgroundColor: "#4caf50",
      color: "#fff",
      fontWeight: "bold",
      borderRadius: "12px",
      fontSize: "14px",
      "&:hover": {
        backgroundColor: "#388e3c",
      },
    }}
  />
  <Chip
    label="Portable"
    sx={{
      backgroundColor: "#2196f3",
      color: "#fff",
      fontWeight: "bold",
      borderRadius: "12px",
      fontSize: "14px",
      "&:hover": {
        backgroundColor: "#1976d2",
      },
    }}
  />
</Stack> */}


<Stack
  direction="row"
  gap={2}
  alignItems="center"
  className="py-3 bor-bottom"
  sx={{
    borderBottom: "1px solid #d9d9d9", // Grey border for consistency
    paddingBottom: "12px",
  }}
>
  {/* Label */}
  <h6
    style={{
      fontSize: "16px", // Consistent font size
      color: "black", // Vibrant color to match the theme
      fontWeight: "bold",
      textTransform: "uppercase",
      margin: "0", // Removes extra space
    }}
  >
    Share:  
  </h6>

  {/* Social Media Icons */}
  <div
    className="social-media"
    style={{
      display: "flex",
      alignItems: "center",
      gap: "20px", // Consistent spacing between icons
      marginLeft: "24px", // Increased space between label and icons
    }}
  >
    {/* Facebook */}
    <a
      href="https://www.facebook.com/Vapeplanet.co.uk"
      target="_blank"
      rel="noopener noreferrer"
      style={{
        color: "#4267B2",
        fontSize: "20px",
        transition: "all 0.3s ease",
      }}
      className="primary-color secondary-hover"
    >
      <i className="fa-brands fa-facebook-f" />
    </a>

    {/* Twitter (X) */}
    <a
      href="https://x.com/vapeplanetuk"
      target="_blank"
      rel="noopener noreferrer"
      style={{
        color: "#1DA1F2",
        fontSize: "20px",
        transition: "all 0.3s ease",
      }}
      className="primary-color secondary-hover"
    >
      <i className="fa-brands fa-x" />
    </a>

    {/* TikTok */}
    <a
      href="https://www.tiktok.com/@vapeplanetuk"
      target="_blank"
      rel="noopener noreferrer"
      style={{
        color: "#000000",
        fontSize: "20px",
        transition: "all 0.3s ease",
      }}
      className="primary-color secondary-hover"
    >
      <i className="fa-brands fa-tiktok" />
    </a>

    {/* Instagram */}
    <a
      href="https://www.instagram.com/vapeplanetuk"
      target="_blank"
      rel="noopener noreferrer"
      style={{
        color: "#E4405F",
        fontSize: "20px",
        transition: "all 0.3s ease",
      }}
      className="primary-color secondary-hover"
    >
      <i className="fa-brands fa-instagram" />
    </a>

    {/* YouTube */}
    <a
      href="https://www.youtube.com/@vapeplanetuk"
      target="_blank"
      rel="noopener noreferrer"
      style={{
        color: "#FF0000",
        fontSize: "20px",
        transition: "all 0.3s ease",
      }}
      className="primary-color secondary-hover"
    >
      <i className="fa-brands fa-youtube" />
    </a>
  </div>
</Stack>




<Stack
  direction="row"
  gap={2}
  alignItems="center"
  className="py-3 border-bottom"
  sx={{
    borderBottom: "1px solid #d9d9d9", // Grey underline for consistency
    paddingBottom: "12px",
  }}
>
  {/* Label */}
  <h6
    style={{
      fontSize: "16px",
      color: "black",
      fontWeight: "bold",
      textTransform: "uppercase",
      margin: "0",
      flexBasis: "25%",
    }}
  >
    Quantity
  </h6>

  {/* Quantity Selector */}
  <Stack
    direction="row"
    alignItems="center"
    justifyContent="center"
    sx={{
      borderRadius: "8px",
      padding: "8px 12px",
      backgroundColor: "#f7f8fa", // Subtle background
      display: "inline-flex",
      gap: "12px", // Reduced space between buttons and value
    }}
  >
    {/* Decrease Button */}
    <Button
      onClick={() => dispatch(decreaseItemQuantity(selectedFlavour))}
      sx={{
        backgroundColor: "#f0f0f0", // Elegant light grey
        color: "#ff6b6b", // Subtle red for the icon
        minWidth: "40px", // Reduced width
        height: "40px", // Square shape
        borderRadius: "8px", // Slightly rounded for elegance
        fontSize: "18px", // Elegant icon size
        fontWeight: "bold",
        boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)", // Soft shadow for elegance
        "&:hover": {
          backgroundColor: "#eaeaea", // Lighter hover effect
        },
      }}
    >
      <i className="fa-solid fa-minus" />
    </Button>

    {/* Quantity Value */}
    <span
      style={{
        fontSize: "20px", // Elegant and bold
        fontWeight: "bold",
        color: "#333", // Dark text for better readability
      }}
    >
      {currentFlavQuantity}
    </span>

    {/* Increase Button */}
    <Button
      onClick={() => dispatch(incrementItemQuantity(selectedFlavour))}
      sx={{
        backgroundColor: "#f0f0f0", // Elegant light grey
        color: "#38b000", // Subtle green for the icon
        minWidth: "40px", // Reduced width
        height: "40px", // Square shape
        borderRadius: "8px", // Slightly rounded for elegance
        fontSize: "18px", // Elegant icon size
        fontWeight: "bold",
        boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)", // Soft shadow for elegance
        "&:hover": {
          backgroundColor: "#eaeaea", // Lighter hover effect
        },
      }}
    >
      <i className="fa-solid fa-plus" />
    </Button>
  </Stack>
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
  style={{ marginBottom: "16px" }} // Add space below the button
>
  <span className="pointer">
    <i className="fa-solid fa-basket-shopping pe-2" />
    add to cart
  </span>
</a>

<div
  className="trustpilot-widget"
  data-locale="en-GB"
  data-template-id="56278e9abfbbba0bdcd568bc"
  data-businessunit-id="674a0a1bc6992161e87b4986"
  data-style-height="52px"
  data-style-width="100%"
  style={{ marginTop: "16px" }} // Add space above the widget
>
  <a
    href="https://uk.trustpilot.com/review/vapeplanet.co.uk"
    target="_blank"
    rel="noopener"
  >
    Trustpilot
  </a>
</div>
<div
      style={{
        backgroundColor: "#f8f9f8",
        padding: "12px 16px",
        borderRadius: "5px",
        fontFamily: "Arial, sans-serif",
        color: "#2e6b3f",
        fontSize: "16px",
        border: "1px solid #ddd",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          padding: "10px 0",
          borderBottom: "1px solid #ddd",
        }}
      >
        <span style={{ marginRight: "8px" }}>✈️</span>
        <span>Track status of your package online</span>
      </div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          padding: "10px 0",
        }}
      >
        <span style={{ marginRight: "8px" }}>⏱️</span>
        <span>Same-day dispatch for orders before 2 PM (Mon to Fri)</span>
      </div>
    </div>


                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
            </div>

            
            {/* product-details area end here */}
            {/* description review area start here */}
            <div className="shop-single-tab">
  {/* Tab Navigation */}
  <ul className="nav nav-pills mb-4 bor-top bor-bottom py-2">
    <li className="nav-item">
      <a
        data-bs-toggle="tab"
        className={`nav-link ps-0 pe-3 ${
          selectedTab == 0 ? "active" : ""
        }`}
        onClick={() => setSelectedTab(0)}
      >
        <h4 className="text-uppercase">
          <i
            className="fa-solid fa-star me-2"
            style={{ color: "#fa4f09" }}
          ></i>
          Reviews
        </h4>
      </a>
    </li>
    <li className="nav-item">
      <a
        data-bs-toggle="tab"
        className={`nav-link ${selectedTab == 1 ? "active" : ""}`}
        onClick={() => setSelectedTab(1)}
      >
        <h4 className="text-uppercase">
          <i
            className="fa-solid fa-file-lines me-2"
            style={{ color: "#4caf50" }}
          ></i>
          Description
        </h4>
      </a>
    </li>
  </ul>

  {/* Tab Content */}
  <div className="tab-content">
    {/* Description Tab */}
    <div
      id="description"
      className={`tab-pane ${
        selectedTab == 1 ? "show active" : "fade"
      }`}
    >
      <div
        style={{ color: "#333", fontSize: "16px", lineHeight: "1.8" }}
        className="product-description"
        dangerouslySetInnerHTML={{
          __html: product.description,
        }}
      />
    </div>

    {/* Reviews Tab */}
    <div
      id="review"
      className={`tab-pane ${
        selectedTab == 0 ? "show active" : "fade"
      }`}
    >
      {/* Write a Review Button */}
      <button
        onClick={() => {
          dispatch(setDialogStates({ type: "review", id: product.id }));
        }}
        style={{
          padding: "8px 16px",
          marginBottom: "20px",
          border: "1px solid #d9d9d9",
          borderRadius: "20px",
          fontSize: "14px",
          color: "#fff",
          backgroundColor: "#fa4f09",
          fontWeight: "bold",
        }}
      >
        <i className="fa-solid fa-pen me-2"></i> Write a Review
      </button>

      {/* Reviews List */}
      <div className="review-wrp">
        {reviews?.map((review, i) => (
          <div
            id={i}
            className="review-item d-flex flex-wrap flex-md-nowrap align-items-start pb-4"
            key={i}
            style={{
              borderBottom: i !== reviews.length - 1 ? "1px solid #ddd" : "none",
              paddingBottom: "20px",
              marginBottom: "20px",
            }}
          >
            {/* Avatar */}
            <div className="review-avatar me-4">
              <Avatar
                name={review.reviewer_name}
                round={true}
                size="50"
                color="#fa4f09"
              />
            </div>

            {/* Review Content */}
            <div
              className="review-content position-relative p-4 bor shadow-sm"
              style={{
                width: "100%",
                borderRadius: "10px",
                backgroundColor: "#fff",
                boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
              }}
            >
              {/* Header */}
              <div className="review-header pb-2 d-flex flex-wrap justify-content-between">
                <div className="review-author">
                  <h5
                    className="text-capitalize"
                    style={{ fontWeight: "bold", color: "#333" }}
                  >
                    {review.reviewer_name}
                  </h5>
                  <span
                    className="sm-font text-muted"
                    style={{ fontSize: "12px" }}
                  >
                    <i className="fa-regular fa-clock me-1"></i>
                    {review.date_time && review.date_time !== "N/A"
                      ? review.date_time
                      : "No date provided"}
                  </span>
                </div>

                {/* Star Ratings */}
                <div className="review-rating">
                  <StarRatings
                    rating={review.rating}
                    numberOfStars={5}
                    name="rating"
                    starRatedColor="#ff9200"
                    starDimension="20px"
                    starSpacing="2px"
                  />
                </div>
              </div>

              {/* Comment */}
              <p
                className="review-comment text-justify"
                style={{
                  color: "#555",
                  fontSize: "14px",
                  lineHeight: "1.6",
                }}
              >
                <i
                  className="fa-solid fa-comment-dots me-2"
                  style={{ color: "#4caf50" }}
                ></i>
                {review.comment}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  </div>
</div>


          </div>
        </section>

        <section className="product-area pt-80">
      <div className="container-lg">
        <div className="product__wrp pb-30 mb-65 bor-bottom d-flex flex-wrap align-items-center justify-content-center">
          {/* Section Header */}
          <div
            className="section-header d-flex align-items-center wow fadeInUp"
            data-wow-delay=".1s"
          >
            <span className="title-icon mr-10" />
            <h2>Disposable Vapes</h2>
          </div>
        </div>

        {/* Product List */}
        <ProductList />
      </div>
    </section>
      </main>
    );
  }

  return <div>Error loading product</div>;
}

export default ProductDetailPage;
