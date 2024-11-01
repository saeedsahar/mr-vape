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
      <div class="order-message">
        <i class="fas fa-truck delivery-header-icon"></i> Order within{" "}
        <strong>{timeLeft}</strong> for delivery tomorrow
      </div>
      <div
        className="top__header black-area pt-30 pb-30"
        style={{ backgroundColor: "white" }}
      >
        <div className="container-lg">
          <div className="top__wrapper row justify-content-between align-items-center">
            <div className="col-2">
              <a className="main__logo">
                <button
                  onClick={() => toggleDrawer(true)}
                  class="px-2 d-lg-none"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="28"
                    height="28"
                    fill="currentColor"
                    class="bi bi-list"
                    viewBox="0 0 16 16"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5"
                    />
                  </svg>
                </button>
                <Drawer
                  open={open}
                  onClose={() => toggleDrawer(false)}
                  className="mobile-navigation"
                >
                  <div class="offcanvas-header">
                    <h6 class="offcanvas-title">Popular Categories</h6>
                    <button
                      class="text-white"
                      aria-label="Close"
                      onClick={() => toggleDrawer(false)}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="18"
                        height="18"
                        fill="currentColor"
                        class="bi bi-x-circle-fill"
                        viewBox="0 0 16 16"
                      >
                        <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0M5.354 4.646a.5.5 0 1 0-.708.708L7.293 8l-2.647 2.646a.5.5 0 0 0 .708.708L8 8.707l2.646 2.647a.5.5 0 0 0 .708-.708L8.707 8l2.647-2.646a.5.5 0 0 0-.708-.708L8 7.293z" />
                      </svg>
                    </button>
                  </div>
                  <div class="offcanvas-body p-0">
                    {homeStates.menu?.map((menuEle, i) => {
                      let hasSubMenu = menuEle.brandList.length > 0;

                      return (
                        <>
                          <div class="accordion" id={i}>
                            <div class="accordion-item">
                              <div class="accordion-header">
                                {/* {hasSubMenu ? ( */}
                                <button
                                  className={`${
                                    !hasSubMenu ? "accordion-custom-button" : ""
                                  } accordion-button collapsed`}
                                  type="button"
                                  data-bs-toggle="collapse"
                                  data-bs-target={`#flush-${i}`}
                                  aria-expanded="false"
                                  aria-controls={`flush-${i}`}
                                  onClick={() => {
                                    if (!hasSubMenu && menuEle.id == 1) {
                                      dispatch(setQuery("Trending"));
                                      navigate("/products");
                                      toggleDrawer(false);
                                    } else if (!hasSubMenu) {
                                      dispatch(setCategoryId(menuEle.id));
                                      navigate("/products");
                                      toggleDrawer(false);
                                    }
                                  }}
                                >
                                  {menuEle.name}
                                </button>
                              </div>
                              {hasSubMenu
                                ? menuEle.brandList?.map((subMenuEle) => {
                                    return (
                                      <>
                                        <div
                                          id={`flush-${i}`}
                                          class="accordion-collapse collapse"
                                          data-bs-parent={`${i}`}
                                        >
                                          <div class="accordion-body">
                                            <ul>
                                              <li
                                                className="pointer"
                                                // data-bs-dismiss="offcanvas"
                                                // aria-label="Close"
                                              >
                                                <a
                                                  onClick={() => {
                                                    dispatch(
                                                      setBrandId(subMenuEle.id)
                                                    );
                                                    navigate("/products");
                                                    toggleDrawer(false);
                                                  }}
                                                >
                                                  {subMenuEle.name}
                                                </a>
                                              </li>
                                            </ul>
                                          </div>
                                        </div>
                                      </>
                                    );
                                  })
                                : ""}
                            </div>
                          </div>
                        </>
                      );
                    })}
                  </div>
                </Drawer>

                <img
                  className="pointer img-fluid"
                  onClick={() => navigate("/")}
                  src="https://mrvape-frontend.s3.eu-west-2.amazonaws.com/VapePlanet+Logo.png"
                  style={{ width: "185px" }}
                  alt="logo__image"
                />
              </a>
            </div>
            <div className="col-lg-5 search-div">
              {" "}
              <div
                style={{ border: "1px solid #fa4f09", borderRadius: "30px" }}
                className="search__wrp"
                ref={searchWrapperRef}
              >
                <input
                  placeholder="Search Products"
                  aria-label="Search"
                  onChange={onSearchChange}
                  value={searchValue}
                  style={{ color: "black" }}
                  onClick={(e) => setAnchorEl(e.currentTarget)}
                />
                <button
                  id="search-icon"
                  onClick={() => setOpenSearchBar(!openSearchBar)}
                >
                  <i className="fa-solid fa-search" />
                </button>
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
                  <div
                    style={{
                      width: anchorEl ? anchorEl.clientWidth : "100%",
                      backgroundColor: "#fff",
                      borderBottomLeftRadius: "20px", // Match with input's bottom left
                      borderBottomRightRadius: "20px", // Match with input's bottom right
                      borderTop: "none", // Remove top border to blend with input
                      boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
                      maxHeight: "300px",
                      overflowY: "auto",
                      padding: "10px 0", // Padding to avoid cutting off list items
                      borderRadius: "10px",
                    }}
                    className="custom-scrollbar"
                  >
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
                              style={{
                                color: "black",
                                cursor: "pointer", // Pointer cursor on hover
                                padding: "10px",
                                transition: "background-color 0.2s ease", // Smooth hover effect
                              }}
                              onMouseEnter={(e) =>
                                (e.currentTarget.style.backgroundColor =
                                  "#f0f0f0")
                              }
                              onMouseLeave={(e) =>
                                (e.currentTarget.style.backgroundColor =
                                  "transparent")
                              }
                              onClick={() => {
                                navigate(`/products/${item.id}`);
                                setAnchorEl(null);
                              }}
                            >
                              {item.name}{" "}
                              {/* Assuming each result has a name */}
                            </ListItem>
                          ))
                        )}
                      </List>
                    )}
                  </div>
                </Popper>
              </div>
              {openSearchBar && appWidth < 1200 ? (
                <input
                  placeholder="Search Products"
                  aria-label="Search"
                  onChange={onSearchChange}
                  value={searchValue}
                  style={{
                    color: "black",
                    borderRadius: "10px",
                    paddingLeft: "10px",
                    width: "50%",
                    marginRight: "15px",
                  }}
                />
              ) : null}
            </div>
            <div className="col-auto">
              <div className="row">
                <div className="account__wrap">
                  <div className="account d-flex align-items-center">
                    <div
                      className="user__icon"
                      onClick={() => !isLogged && navigate("/authenticate")}
                    >
                      <a>
                        <i className="fa-regular fa-user" />
                      </a>
                    </div>
                    <a className="acc__cont">
                      {isLogged ? (
                        <span className="text-white">{currentUser}</span>
                      ) : (
                        <span
                          onClick={() => navigate("/authenticate")}
                          className="text-white"
                        >
                          My Account
                        </span>
                      )}
                    </a>
                  </div>
                  <div
                    className="cart d-flex align-items-center cursror-pointer"
                    onClick={() => setCartDrawerOpen(true)}
                    style={{
                      paddingLeft: "5px",
                      width: "120px",
                      gap: "5px",
                      justifyContent: "center",
                    }}
                    ref={containerRef}
                  >
                    {/* <span className="cart__icon">
                      <i className="fa-regular fa-cart-shopping" />
                    </span> */}
                    <a className="c__one">
                      <span className="text-white">
                        £{cartStates.totalPrice}
                      </span>
                    </a>
                    <Button
                      onClick={() => setCartDrawerOpen(true)}
                      style={{ height: "50px" }}
                      aria-label="Shopping Cart"
                      color="inherit"
                      className="btn-light cart__icon"
                      size="large"
                    >
                      <Badge
                        badgeContent={
                          cartStates?.total ? cartStates?.total : "0"
                        }
                        color="warning"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          fill="currentColor"
                          class="bi bi-bag-plus"
                          viewBox="0 0 16 16"
                          className="cart-icon"
                          // style={{ color: "white" }}
                        >
                          <path
                            fill-rule="evenodd"
                            d="M8 7.5a.5.5 0 0 1 .5.5v1.5H10a.5.5 0 0 1 0 1H8.5V12a.5.5 0 0 1-1 0v-1.5H6a.5.5 0 0 1 0-1h1.5V8a.5.5 0 0 1 .5-.5"
                          />
                          <path d="M8 1a2.5 2.5 0 0 1 2.5 2.5V4h-5v-.5A2.5 2.5 0 0 1 8 1m3.5 3v-.5a3.5 3.5 0 1 0-7 0V4H1v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V4zM2 5h12v9a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1z" />
                        </svg>
                      </Badge>
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <header className="header-section black-area">
        <div className="container-lg">
          <div className="header-wrapper">
            <div className="search__wrp d-lg-none py-2">
              <div className="search-area">
                <input
                  placeholder="Search for"
                  aria-label="Search"
                  onChange={onSearchChange}
                  value={searchValue}
                  style={{ color: "black" }}
                />
                <button>
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
                <div
                  style={{
                    width: anchorEl ? anchorEl.clientWidth : "100%",
                    backgroundColor: "#fff",
                    borderBottomLeftRadius: "20px", // Match with input's bottom left
                    borderBottomRightRadius: "20px", // Match with input's bottom right
                    borderTop: "none", // Remove top border to blend with input
                    boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
                    maxHeight: "300px",
                    overflowY: "auto",
                    padding: "10px 0", // Padding to avoid cutting off list items
                    borderRadius: "10px",
                  }}
                  className="custom-scrollbar"
                >
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
                            style={{
                              color: "black",
                              cursor: "pointer", // Pointer cursor on hover
                              padding: "10px",
                              transition: "background-color 0.2s ease", // Smooth hover effect
                            }}
                            onMouseEnter={(e) =>
                              (e.currentTarget.style.backgroundColor =
                                "#f0f0f0")
                            }
                            onMouseLeave={(e) =>
                              (e.currentTarget.style.backgroundColor =
                                "transparent")
                            }
                            onClick={() => {
                              navigate(`/products/${item.id}`);
                              setAnchorEl(null);
                            }}
                          >
                            {item.name} {/* Assuming each result has a name */}
                          </ListItem>
                        ))
                      )}
                    </List>
                  )}
                </div>
              </Popper>
            </div>
            <ul className="main-menu pointer">
              {homeStates.menu?.map((menuEle) => {
                let hasSubMenu = menuEle.brandList.length > 0;
                return (
                  <li className="pointer">
                    <a
                      onClick={() => {
                        if (menuEle.id == 1) {
                          dispatch(setQuery("Trending"));
                          navigate("/products");
                        } else if (!hasSubMenu) {
                          dispatch(setCategoryId(menuEle.id));
                          navigate("/products");
                        }
                      }}
                    >
                      {menuEle.name}
                      {hasSubMenu && (
                        <i className="fa-regular fa-angle-down ms-1" />
                      )}
                    </a>
                    {hasSubMenu && (
                      <ul className="sub-menu">
                        {menuEle.brandList?.map((subMenuEle) => {
                          return (
                            <li className="subtwohober">
                              <a
                                onClick={() => {
                                  dispatch(setBrandId(subMenuEle.id));
                                  navigate("/products");
                                }}
                              >
                                {subMenuEle.name}
                              </a>
                            </li>
                          );
                        })}
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
      >
        <Box className="drawer-header">
          <div class="offcanvas-header">
            <h6 className="cart-drawer-title">Shopping Cart</h6>
            <button
              class="text-white"
              aria-label="Close"
              onClick={() => setCartDrawerOpen(false)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="18"
                fill="currentColor"
                class="bi bi-x-circle-fill"
                viewBox="0 0 16 16"
              >
                <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0M5.354 4.646a.5.5 0 1 0-.708.708L7.293 8l-2.647 2.646a.5.5 0 0 0 .708.708L8 8.707l2.646 2.647a.5.5 0 0 0 .708-.708L8.707 8l2.647-2.646a.5.5 0 0 0-.708-.708L8 7.293z" />
              </svg>
            </button>
          </div>
        </Box>
        {/* <Box className="drawer-header row">
          <div style={{display : "flex"}}>
          <h6 className="cart-drawer-title">Shopping Cart</h6>
          <span
            className="color-white"
            onClick={() => setCartDrawerOpen(false)}
          >
            x
          </span></div>
        </Box> */}
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
            return (
              <Box className="cart-product pb-20 mb-20" key={productId}>
                <img
                  className="img-fluid rounded-2 img-thumbnail"
                  alt={productImage}
                  src={productImage}
                />
                <Box className="product-meta">
                  <h6 className="product-title mb-1">{productName}</h6>
                  <span className="text-muted">£{price}</span>{" "}
                  <span className="text-muted">x</span>{" "}
                  <span className="text-muted">{quantity}</span>
                </Box>
                <IconButton className="ms-auto">
                  <Close
                    onClick={() => dispatch(removeItem({ id: cartItem.id }))}
                  />
                </IconButton>
              </Box>
            );
          })}
        </Box>
        <Box className="drawer-footer">
          <div className="d-grid gap-3">
            <button
              class="btn-one"
              onClick={function () {
                navigate("/cart");
                setCartDrawerOpen(false);
              }}
            >
              <span>View Cart</span>
            </button>
          </div>
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
