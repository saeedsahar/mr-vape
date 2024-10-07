import React, { useEffect, useState, useCallback } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import logo from "../../assets/images/logo/logo.svg";
import {
  setBrandId,
  setCategoryId,
  setQuery,
} from "../../Pages/Product/ProductSlice";
import { base_url, getRequests } from "../../axios/API";
import { setMenu } from "../../Pages/HomeSlice";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import { setSnackBar } from "./MainNavSlice";
import {
  InputAdornment,
  Popper,
  List,
  ListItem,
  Skeleton,
} from "@mui/material";
import { Search } from "@mui/icons-material";
import { colors } from "@mui/material";

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

  return (
    <>
      <div className="top__header black-area pt-30 pb-30">
        <div className="container">
          <div className="top__wrapper">
            <a className="main__logo">
              <button
                class="px-2 d-lg-none"
                data-bs-toggle="offcanvas"
                data-bs-target="#offcanvasExample"
                aria-controls="offcanvasExample"
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
              <div
                class="offcanvas offcanvas-start"
                tabindex="-1"
                id="offcanvasExample"
                aria-labelledby="offcanvasExampleLabel"
              >
                <div class="offcanvas-header">
                  <h5 class="offcanvas-title" id="offcanvasExampleLabel">
                    Popular Categories
                  </h5>
                  <button
                    type="button"
                    class="text-white"
                    data-bs-dismiss="offcanvas"
                    aria-label="Close"
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
                              {hasSubMenu ? (
                                <button
                                  className={`${
                                    !hasSubMenu ? "accordion-custom-button" : ""
                                  } accordion-button collapsed`}
                                  type="button"
                                  data-bs-toggle="collapse"
                                  data-bs-target={`#flush-${i}`}
                                  aria-expanded="false"
                                  aria-controls={`flush-${i}`}
                                >
                                  {menuEle.name}
                                </button>
                              ) : (
                                <li
                                  type="button"
                                  className="pointer"
                                  data-bs-dismiss="offcanvas"
                                  aria-label="Close"
                                  style={{
                                    padding: "10px 15px 10px 10px",
                                    fontSize: "14px",
                                    fontWeight: "500",
                                    borderRadius: "0px",
                                  }}
                                  onClick={() => {
                                    dispatch(setCategoryId(menuEle.id));
                                    navigate("/products");
                                  }}
                                >
                                  <a>{menuEle.name}</a>
                                </li>
                              )}
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
                                              data-bs-dismiss="offcanvas"
                                              aria-label="Close"
                                            >
                                              <a
                                                onClick={() => {
                                                  dispatch(
                                                    setBrandId(subMenuEle.id)
                                                  );
                                                  navigate("/products");
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
              </div>

              <img
                className="pointer img-fluid"
                onClick={() => navigate("/")}
                src={
                  "https://mrvape-frontend.s3.eu-west-2.amazonaws.com/VapePlanet+Logo.png"
                }
                style={{ width: "185px" }}
                alt="logo__image"
              />
            </a>
            <div className="search__wrp" ref={searchWrapperRef}>
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
              {/* Dropdown Suggestions */}
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
                className="cart d-flex align-items-center justify-content-between"
                onClick={() => navigate("/cart")}
                ref={containerRef}
              >
                <span className="cart__icon">
                  <i className="fa-regular fa-cart-shopping" />
                </span>
                <a className="c__one">
                  <span className="text-white">£{cartStates.totalPrice}</span>
                </a>
                <span className="one text-white" style={{ fontWeight: "600" }}>
                  {cartStates.total}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <header className="header-section black-area">
        <div className="container">
          <div className="header-wrapper">
            <ul className="main-menu pointer">
              {homeStates.menu?.map((menuEle) => {
                let hasSubMenu = menuEle.brandList.length > 0;
                return (
                  <li className="pointer">
                    <a
                      onClick={() => {
                        dispatch(setCategoryId(menuEle.id));
                        navigate("/products");
                      }}
                    >
                      {menuEle.name}
                      {hasSubMenu && <i className="fa-regular fa-angle-down" />}
                    </a>
                    {hasSubMenu && (
                      <ul className="sub-menu">
                        {menuEle.brandList?.map((subMenuEle) => {
                          return (
                            <li
                              className="subtwohober pointer"
                              style={{ color: "#000" }}
                            >
                              <a
                                className="pointer"
                                style={{ color: "#000" }}
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
    </>
  );
}

export default MainNavigation;
