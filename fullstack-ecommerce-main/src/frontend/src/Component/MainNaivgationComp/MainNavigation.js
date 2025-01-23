import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import {
  handleReviewAdded,
  setBrandId,
  setCategoryId,
  setQuery,
} from "../../Pages/Product/ProductSlice";
import { base_url, getRequests, postRequests } from "../../axios/API";
import { setMenu } from "../../Pages/HomeSlice";
import { mainNavSlice, resetDialog, setSnackBar } from "./MainNavSlice";
import {
  Popper,
  List,
  ListItem,
  Skeleton,
  Alert,
  Snackbar,
  Drawer,
  IconButton,
  Button,
  Box,
  Typography,
  Stack,
  Avatar,
  Badge,
  Menu,
  MenuItem,
} from "@mui/material";
import "./MainNavigation.css";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import { Close } from "@mui/icons-material";
import { removeItem } from "../../Pages/Cart/CartSlice";
import VapeDialog from "../Dialog/Dialog";
import StarRatings from "react-star-ratings";

function MainNavigation(props) {
  console.log("[MainNavigation.js]");
  const containerRef = React.useRef(null);

  const [searchValue, setSearchValue] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [noResults, setNoResults] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [openSearchBar, setOpenSearchBar] = useState(false);
  const [appWidth, setAppWidth] = useState(window.innerWidth);
  const [open, setOpen] = useState(false);
  const [cartDrawerOpen, setCartDrawerOpen] = useState(false);
  const [reviewRating, setReviewRating] = useState(0);
  const [errors, setErrors] = useState({});
  const [timeLeft, setTimeLeft] = useState("");
  const searchWrapperRef = React.useRef(null); // Ref for search wrapper

  let navigate = useNavigate();
  let isLogged = useSelector((state) => state.auth.isLogged);
  let currentUser = useSelector((state) => state.auth.name);
  let cartStates = useSelector((state) => state.cart);
  let homeStates = useSelector((state) => state.home);
  let mainNavStates = useSelector((state) => state.mainNav);

  let dispatch = useDispatch();
  let location = useLocation();

  // Function to handle closing popper on clicking outside or pressing Escape
  const handleClickOutside = (event) => {
    if (
      searchWrapperRef.current &&
      !searchWrapperRef.current.contains(event.target)
    ) {
      setAnchorEl(null); // Close dropdown
    }
  };

  const toggleDrawer = (newOpen) => {
    setOpen(newOpen);
  };

  const handleKeyDown = (event) => {
    if (event.key === "Escape") {
      setAnchorEl(null); // Close dropdown on pressing Escape
    }
  };

  const getMenu = async () => {
    try {
      const response = await getRequests(`${base_url}/api/v1/category`);
      let data = response.data;
      dispatch(setMenu(data));
    } catch (error) {
      console.error("Error fetching menu", error);
      dispatch(setMenu([]));
    }
  };

  const handleResize = () => {
    setAppWidth(window.innerWidth);
  };

  useEffect(() => {
    const targetHour = 21; // 9 PM in 24-hour format

    const updateCountdown = () => {
      const now = new Date();
      const targetTime = new Date();

      // Set the target time to 9 PM today
      targetTime.setHours(targetHour, 0, 0, 0);

      // If the target time has already passed for today, set it to 9 PM tomorrow
      if (now > targetTime) {
        targetTime.setDate(targetTime.getDate() + 1);
      }

      // Calculate the time difference in milliseconds
      const remainingTime = targetTime - now;

      // Convert the remaining time to hours, minutes, and seconds
      const hours = Math.floor((remainingTime / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((remainingTime / (1000 * 60)) % 60);
      const seconds = Math.floor((remainingTime / 1000) % 60);

      // Update the timeLeft state
      setTimeLeft(`${hours}h ${minutes}m ${seconds}s`);

      // If the countdown reaches zero, start it over
      if (remainingTime <= 0) {
        clearInterval(timer); // Optional: Clear interval if needed
        updateCountdown(); // Restart countdown for the next 9 PM
      }
    };

    // Update the countdown every second
    const timer = setInterval(updateCountdown, 1000);

    // Initial call to set the countdown
    updateCountdown();

    // Cleanup interval on component unmount
    return () => clearInterval(timer);
  }, []);
  useEffect(() => {
    if (anchorEl) {
      document.addEventListener("mousedown", handleClickOutside);
      document.addEventListener("keydown", handleKeyDown);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleKeyDown);
    }

    // Cleanup listeners when the dropdown is closed or on component unmount
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [anchorEl]);

  useEffect(() => {
    // Add event listener to handle window resizing
    window.addEventListener("resize", handleResize);

    // Clean up the event listener on component unmount
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    homeStates?.menu?.length <= 0 && getMenu();
  }, []);

  const handleSearch = (e, value) => {
    if (value.trim()) {
      setAnchorEl(e.currentTarget); // Show dropdown under the input field
      setSearchValue(value);
      searchAPI(value);
    } else {
      setSearchResults([]);
      setSearchValue(value);
      setNoResults(false);
      setAnchorEl(null); // Hide dropdown if input is empty
    }
  };

  const searchAPI = async (query) => {
    setLoading(true);
    setNoResults(false);

    try {
      const response = await getRequests(
        `${base_url}/api/v1/product?q=${query}&pageNumber=${0}&pageSize=${20}`
      ); // Assuming productService.products$ returns list and total
      let { list, total } = response.data;
      setSearchResults(list);
      setNoResults(list.length === 0);
      // dispatch(setProducts({ products: list, length: total }));
    } catch (error) {
      console.error("Error fetching products", error);
      setLoading(false);
      setNoResults(true);
    } finally {
      setLoading(false);
      // setNoResults(true);
    }
  };

  const onSearchChange = (e) => {
    const value = e.target.value;
    handleSearch(e, value);
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    dispatch(setSnackBar({ open: false, message: "", type: "" }));
  };

  const handleCloseDialog = () => {
    dispatch(resetDialog());
  };

  const changeRating = (newRating, name) => {
    setReviewRating(newRating);
  };

  const validateFields = (name, email, rating, message) => {
    let fieldErrors = {};

    if (!name) fieldErrors.name = "Name is required";
    if (!email) fieldErrors.email = "Email is required";
    if (!rating) fieldErrors.email = "Rating is required";
    if (!message) fieldErrors.postcode = "Message is required";

    setErrors(fieldErrors);
    return Object.keys(fieldErrors).length === 0; // Returns true if no errors
  };

  const formatDate = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");
    const seconds = String(date.getSeconds()).padStart(2, "0");

    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
  };

  const handleSubmitReview = () => {
    let name = document.getElementById("review-name")?.value;
    let email = document.getElementById("review-email")?.value;
    let message = document.getElementById("review-message")?.value;
    let rating = reviewRating;

    if (validateFields(name, email, rating, message)) {
      postRequests(
        `${base_url}/api/v1/product/savereview`,
        JSON.stringify({
          user_id: null,
          product_id: mainNavStates.productId,
          rating: rating,
          comment: message,
          title: message,
          review_Date: formatDate(new Date()),
        })
      )
        .then((data) => {
          handleCloseDialog();
          dispatch(
            setSnackBar({
              open: true,
              message: "Review submitted successfully!",
              type: "success",
            })
          );
          dispatch(
            handleReviewAdded({
              reviewObject: {
                user_id: null,
                product_id: mainNavStates.productId,
                rating: rating,
                comment: message,
                title: message,
                review_Date: formatDate(new Date()),
              },
            })
          );
        })
        .catch((error) => {
          dispatch(
            setSnackBar({
              open: true,
              message: "Failed to add review!",
              type: "error",
            })
          );
        });
    }
  };
  const getDialogTitle = () => {
    return mainNavStates.dialogType == "review" ? (
      <h4
        className="text-capitalize primary-color mb-10"
        style={{ color: "black" }}
      >
        add a review
      </h4>
    ) : (
      ""
    );
  };

  const getDialogContent = () => {
    return mainNavStates.dialogType == "review" ? (
      <>
        {" "}
        <div className="section-title  py-15">
          <p className="mb-20" style={{ color: "black" }}>
            Your email address will not be published. Required fields are marked
            *
          </p>
          <div className="shop-single__rate-now">
            <p style={{ color: "black" }}>Rate this product? *</p>
            <div style={{ alignSelf: "baseline" }}>
              <StarRatings
                rating={reviewRating}
                changeRating={changeRating}
                numberOfStars={5}
                name="rating"
                starRatedColor="#ff9200"
                starDimension="20px"
                starSpacing="0px"
              />
            </div>
          </div>
          <div className="comment-form">
            <form>
              <div className="row g-4">
                <div className="col-md-6">
                  <input
                    type="text"
                    id="review-name"
                    className="w-100 mb-4 bor px-4 py-2"
                    placeholder="Your Name*"
                  />
                </div>
                <div className="col-md-6">
                  <input
                    type="email"
                    id="review-email"
                    className="w-100 mb-4 bor px-4 py-2"
                    placeholder="Your Email*"
                  />
                </div>
              </div>
              <textarea
                className="w-100 mb-4 bor p-4"
                placeholder="Message"
                id="review-message"
                defaultValue={""}
              />
            </form>
            {/* <div className="btn-wrp">
              <button className="btn-one" style={{ color: "black" }}>
                <span>Submit Now</span>
              </button>
            </div> */}
          </div>
        </div>
      </>
    ) : (
      ""
    );
  };

  const getDialogActions = () => {
    return mainNavStates.dialogType == "review" ? (
      <>
        {" "}
        <Button onClick={handleCloseDialog} color="primary">
          Cancel
        </Button>
        <Button onClick={handleSubmitReview} color="primary">
          Submit Review
        </Button>
      </>
    ) : (
      ""
    );
  };

  return (
    <>



<div className="delivery-message-bar text-center">
  <style>
    {`
      /* Web Version */
      .delivery-message-bar {
        background: #dc3545; /* Red background for web */
        color: white; /* White text */
        font-size: 14px; /* Font size for web */
        font-weight: 600; /* Slightly bold for emphasis */
        display: flex;
        justify-content: space-between; /* Align content with spacing */
        align-items: center; /* Vertically align content */
        padding: 8px 20px; /* Proper padding for spacing */
        text-align: center;
      }

      .delivery-message-bar .left-content {
        display: flex;
        align-items: center;
        gap: 10px; /* Spacing between truck icon and text */
      }

      .delivery-message-bar .right-content {
        display: flex;
        align-items: center;
        gap: 15px; /* Spacing between links and phone info */
      }

      .delivery-message-bar .right-content a {
        color: white; /* White links */
        text-decoration: none; /* Remove underline */
        font-weight: 600; /* Slightly bold */
      }

      .delivery-message-bar .right-content a:hover {
        text-decoration: underline; /* Add underline on hover */
      }

      .delivery-message-bar .right-content span {
        margin: 0 5px; /* Spacing between separators */
      }

      .delivery-message-bar i {
        font-size: 16px; /* Icon size */
        margin-right: 8px; /* Space between icon and text */
      }

      /* Mobile Version */
      @media (max-width: 768px) {
        .delivery-message-bar {
          background: #add8e6; /* Light blue background for mobile */
          color: black; /* Black text */
          font-size: 12px; /* Font size matching the image */
          font-weight: 700; /* Bold font weight matching the image */
          display: flex;
          align-items: center;
          justify-content: center; /* Center-align content for mobile */
          padding: 2px 5px; /* Adjusted padding for clean spacing */
          flex-wrap: wrap; /* Allow wrapping if necessary */
          line-height: 1.5;
        }

        .delivery-message-bar .right-content {
          display: none; /* Hide the links on mobile */
        }

        .delivery-message-bar .left-content {
          justify-content: center;
          text-align: center;
          gap: 5px; /* Reduced gap for tighter layout */
        }

        .delivery-message-bar i {
          font-size: 18px; /* Slightly larger icon size to match the style */
        }
      }
    `}
  </style>

  {/* Left Content */}
  <div className="left-content">
    <i className="fa-solid fa-truck-fast"></i>
    <span>
      ONLINE VAPE STORE UK. FREE DELIVERY OVER £40 - SAME DAY DISPATCH - ORDER BY 2PM
    </span>
  </div>

  {/* Right Content */}
  <div className="right-content">
    <a href="/track-order">Track order</a>
    <span>|</span>
    <a href="/blog">Blog</a>
    <span>|</span>
    <a href="/delivery">Delivery</a>
    <span>|</span>
    <i className="fa-solid fa-phone"></i>
    <span>01772 230513 (9:00 AM - 6:00 PM)</span>
  </div>
</div>








      {/* <div class="order-message">
        <i class="fas fa-truck delivery-header-icon"></i> Order within{" "}
        <strong>{timeLeft}</strong> for delivery tomorrow
      </div> */}
<div
  className="top__header"
  style={{
    backgroundColor: "white",
    borderBottom: "1px solid #e5e5e5",
    padding: "10px 0",
  }}
>
  <div className="container-lg">
    <div className="row align-items-center justify-content-between">
      {/* Logo and Hamburger */}
      <div className="col-auto d-flex align-items-center">
        <button
          onClick={() => toggleDrawer(true)}
          className="hamburger-btn d-lg-none"
          style={{
            background: "none",
            border: "none",
            marginRight: "15px",
            cursor: "pointer",
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="28"
            height="28"
            fill="currentColor"
            viewBox="0 0 16 16"
          >
            <path
              fillRule="evenodd"
              d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5.5 0 0 1 0 1H3a.5.5.5 0 0 1-.5-.5"
            />
          </svg>
        </button>
        <a className="main__logo" style={{ display: "flex", alignItems: "center" }}>
          <img
            src="https://mrvape-frontend.s3.eu-west-2.amazonaws.com/VapePlanet+Logo.png"
            alt="Vape Planet Logo"
            style={{ maxHeight: "50px", cursor: "pointer" }}
            onClick={() => navigate("/")}
          />
        </a>
      </div>

      {/* Search Bar */}
      <div
        className="col-lg-5 d-none d-lg-flex search-bar"
        style={{
          border: "1px solid #fa4f09",
          borderRadius: "25px",
          padding: "5px 10px",
          maxWidth: "500px",
          flexGrow: 1,
        }}
      >
        <input
          type="text"
          placeholder="Search Products..."
          style={{
            border: "none",
            outline: "none",
            flex: 1,
            padding: "5px",
            fontSize: "14px",
            color: "black",
          }}
        />
        <button
          style={{
            background: "none",
            border: "none",
            cursor: "pointer",
          }}
        >
          <i
            className="fa-solid fa-search"
            style={{ color: "#fa4f09", fontSize: "18px" }}
          />
        </button>
      </div>

      {/* Support, Login, and Cart */}
      <div className="col-auto d-flex align-items-center" style={{ gap: "21px" }}>
        {/* Support */}
        <div
          className="d-none d-lg-flex align-items-center"
          style={{
            fontSize: "14px",
            gap: "5px",
            cursor: "pointer",
          }}
        >
          <i
            className="fa-solid fa-headset"
            style={{
              fontSize: "16px", // Exact icon size
              color: "#333",
            }}
          />
          <div style={{ lineHeight: "1" }}>
            <span style={{ fontWeight: "bold", color: "#333" }}>CUSTOMER</span>
            <br />
            <span style={{ fontSize: "12px", color: "#777" }}>Support</span>
          </div>
        </div>

        {/* Login */}
        <div
          className="d-flex align-items-center"
          onClick={() => navigate(isLogged ? "/account" : "/authenticate")}
          style={{
            fontSize: "14px",
            gap: "5px", // Minimal spacing
            cursor: "pointer",
          }}
        >
          <i
            className="fa-regular fa-user"
            style={{
              fontSize: "16px", // Exact icon size
              color: "#333",
            }}
          />
          <div className="d-none d-lg-block" style={{ lineHeight: "1" }}>
            <span style={{ fontWeight: "bold", color: "#333" }}>
              {isLogged ? "MY ACCOUNT" : "LOGIN"}
            </span>
            <br />
            <span style={{ fontSize: "12px", color: "#777" }}>My Account</span>
          </div>
        </div>

        {/* Cart */}
        <div
          className="d-flex align-items-center position-relative"
          onClick={() => setCartDrawerOpen(true)}
          style={{
            fontSize: "14px",
            gap: "5px",
            cursor: "pointer",
          }}
        >
          <i
            className="fa-solid fa-cart-shopping"
            style={{
              fontSize: "16px", // Exact icon size
              color: "#333",
            }}
          />
          <div className="d-none d-lg-block" style={{ lineHeight: "1" }}>
            <span style={{ fontWeight: "bold", color: "#333" }}>MY CART</span>
            <br />
            <span style={{ fontSize: "12px", color: "#777" }}>
              £{cartStates?.totalPrice || "0.00"}
            </span>
          </div>
          <span
            className="cart-count"
            style={{
              position: "absolute",
              top: "-8px",
              right: "-8px",
              backgroundColor: "#dc3545",
              color: "white",
              borderRadius: "50%",
              fontSize: "12px",
              width: "18px",
              height: "18px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              fontWeight: "bold",
            }}
          >
            {cartStates?.total || "0"}
          </span>
        </div>
      </div>
    </div>
  </div>
</div>






      
<header className="custom-header">
  <div className="custom-container">
    <div className="custom-header-wrapper">
      {/* Mobile Search Bar */}
      <div className="custom-mobile-search d-lg-none py-2">
        <div className="custom-search-bar">
          <input
            placeholder="Search for"
            aria-label="Search"
            onChange={onSearchChange}
            value={searchValue}
            className="custom-mobile-search-input"
          />
          <button className="custom-mobile-search-btn">
            <i className="fa-solid fa-search" />
          </button>
        </div>
        <Popper
          open={Boolean(anchorEl && searchValue.trim())}
          anchorEl={anchorEl}
          placement="bottom-start"
          style={{ zIndex: 1300 }}
          modifiers={{
            preventOverflow: {
              enabled: true,
              boundariesElement: "viewport",
            },
          }}
          onMouseDown={(e) => e.stopPropagation()}
        >
          <div className="custom-popper-container">
            {/* Loading State */}
            {loading ? (
              <div>
                <Skeleton variant="text" width="100%" height={30} />
                <Skeleton variant="text" width="100%" height={30} />
                <Skeleton variant="text" width="100%" height={30} />
              </div>
            ) : (
              <List>
                {/* No Data Found */}
                {noResults ? (
                  <ListItem>No data found</ListItem>
                ) : (
                  // Render Search Results
                  searchResults.map((item, index) => (
                    <ListItem
                      key={index}
                      className="custom-search-result-item"
                      onClick={() => {
                        navigate(`/products/${item.id}`);
                        setAnchorEl(null);
                      }}
                    >
                      {item.name}
                    </ListItem>
                  ))
                )}
              </List>
            )}
          </div>
        </Popper>
      </div>

      {/* Web Menu */}
      <ul className="custom-web-menu d-none d-lg-flex">
        {homeStates.menu?.map((menuEle) => {
          let hasSubMenu = menuEle.brandList.length > 0;
          return (
            <li className="custom-menu-item" key={menuEle.id}>
              <a
                onClick={() => {
                  if (menuEle.id === 1) {
                    dispatch(setQuery("Trending"));
                    navigate("/products");
                  } else if (!hasSubMenu) {
                    dispatch(setCategoryId(menuEle.id));
                    navigate("/products");
                  }
                }}
              >
                {menuEle.name}
                {hasSubMenu && <i className="fa-regular fa-angle-down ms-1" />}
              </a>

              {hasSubMenu && (
                <ul className="custom-sub-menu">
                  {menuEle.brandList?.map((subMenuEle) => (
                    <li className="custom-sub-menu-item" key={subMenuEle.id}>
                      <a
                        onClick={() => {
                          dispatch(setBrandId(subMenuEle.id));
                          navigate("/products");
                        }}
                      >
                        {subMenuEle.name}
                      </a>
                    </li>
                  ))}
                </ul>
              )}
            </li>
          );
        })}
      </ul>
    </div>
  </div>
</header>




      <Snackbar
        open={mainNavStates.open}
        autoHideDuration={6000}
        onClose={handleClose}
      >
        <Alert
          onClose={handleClose}
          severity={mainNavStates.type}
          variant="filled"
          sx={{ width: "100%" }}
        >
          {mainNavStates.message}{" "}
        </Alert>
      </Snackbar>
      <Drawer
  className="cart-drawer"
  anchor="right"
  open={cartDrawerOpen}
  onClose={() => setCartDrawerOpen(false)}
  sx={{
    "& .MuiDrawer-paper": {
      width: "350px", // Adjust width as needed
      padding: "20px",
      backgroundColor: "#f8f9fa", // Light grey background
      boxShadow: "0 4px 10px rgba(0, 0, 0, 0.2)", // Subtle shadow
    },
  }}
>
  {/* Drawer Header */}
  <Box
    className="drawer-header"
    sx={{
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: "20px",
    }}
  >
    <h6
  style={{
    fontSize: "24px", // Increased font size for visibility
    fontWeight: "bold", // Bold text for prominence
    color: "white", // Vibrant orange color to match the theme
    textTransform: "uppercase", // Makes the text more striking
    // marginBottom: "10px", // Adds spacing below the header
    textAlign: "center", // Centers the header text
    // borderBottom: "2px solid #fa4f09", // Adds a bottom border for emphasis
    // paddingBottom: "10px", // Padding for space around the border
  }}
>
  Shopping Cart
</h6>
<button
  aria-label="Close"
  onClick={() => setCartDrawerOpen(false)}
  style={{
    background: "transparent", // Transparent background
    border: "none", // No border for a clean look
    cursor: "pointer", // Pointer cursor for interactivity
    padding: "5px",
    color: "#fff", // White color for visibility on black background
  }}
>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    fill="currentColor"
    viewBox="0 0 16 16"
    style={{
      color: "#fff", // White icon color for visibility
      transition: "color 0.3s ease", // Smooth color transition
    }}
  >
    <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0M5.354 4.646a.5.5 0 1 0-.708.708L7.293 8l-2.647 2.646a.5.5 0 0 0 .708.708L8 8.707l2.646 2.647a.5.5 0 0 0 .708-.708L8.707 8l2.647-2.646a.5.5 0 0 0-.708-.708L8 7.293z" />
  </svg>
</button>

  </Box>

  {/* Drawer Body */}
  <Box className="drawer-body">
    {cartStates?.items?.map((cartItem) => {
      const {
        availableQuantity,
        productImage,
        productName,
        quantity,
        productId,
        price,
      } = cartItem;

      // Calculate the total for the item
      const itemTotal = price * quantity;

      return (
        <Box
          key={productId}
          sx={{
            display: "flex",
            alignItems: "center",
            marginBottom: "20px",
            padding: "10px",
            border: "1px solid #d9d9d9",
            borderRadius: "8px",
            backgroundColor: "#fff",
          }}
        >
          {/* Product Image */}
          <img
            src={productImage}
            alt={productName}
            style={{
              width: "60px",
              height: "60px",
              objectFit: "cover",
              borderRadius: "8px",
              marginRight: "10px",
            }}
          />

          {/* Product Details */}
          <Box sx={{ flex: 1 }}>
            <h6
              style={{
                fontSize: "16px",
                fontWeight: "bold",
                color: "#333",
                marginBottom: "5px",
              }}
            >
              {productName}
            </h6>
            <span
              style={{
                fontSize: "14px",
                color: "#666",
                display: "inline-block",
                marginBottom: "5px",
              }}
            >
              £{price} x {quantity}
            </span>
            <h6
              style={{
                fontSize: "14px",
                fontWeight: "bold",
                color: "#fa4f09",
              }}
            >
              Total: £{itemTotal.toFixed(2)}
            </h6>
          </Box>

          {/* Remove Button */}
          <IconButton
            onClick={() => dispatch(removeItem({ id: cartItem.id }))}
            sx={{
              color: "#fa4f09",
              "&:hover": {
                backgroundColor: "#ffe6e1",
              },
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              height="18"
              fill="currentColor"
              viewBox="0 0 16 16"
            >
              <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0M5.354 4.646a.5.5 0 1 0-.708.708L7.293 8l-2.647 2.646a.5.5 0 0 0 .708.708L8 8.707l2.646 2.647a.5.5 0 0 0 .708-.708L8.707 8l2.647-2.646a.5.5 0 0 0-.708-.708L8 7.293z" />
            </svg>
          </IconButton>
        </Box>
      );
    })}
  </Box>

  {/* Drawer Footer */}
  <Box
    className="drawer-footer"
    sx={{
      marginTop: "20px",
      display: "flex",
      flexDirection: "column",
      gap: "10px",
    }}
  >
    {/* View Cart Button */}
    <button
  className="btn-one"
  onClick={() => {
    navigate("/cart");
    setCartDrawerOpen(false);
  }}
  style={{
    padding: "10px 20px",
    fontSize: "16px",
    fontWeight: "bold",
    color: "#000", // Default black text
    backgroundColor: "#fa4f09", // Default orange background
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    textAlign: "center",
    transition: "all 0.3s ease", // Smooth transition
  }}
  onMouseEnter={(e) => {
    e.currentTarget.style.backgroundColor = "#000"; // Change to black background
    e.currentTarget.style.color = "#ffcc00"; // Change text to yellow-orange
  }}
  onMouseLeave={(e) => {
    e.currentTarget.style.backgroundColor = "#fa4f09"; // Revert to orange background
    e.currentTarget.style.color = "#000"; // Revert to black text
  }}
>
  View Cart
</button>



  </Box>
</Drawer>

      {mainNavStates.openDialog && (
        <VapeDialog
          dialogTitle={getDialogTitle()}
          dialogContent={getDialogContent()}
          dialogButton={getDialogActions()}
          handleClose={handleCloseDialog}
        />
      )}
    </>
  );
}

export default MainNavigation;
