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
import { colors } from "@mui/material";

function MainNavigation(props) {
  console.log("[MainNavigation.js]");
  const containerRef = React.useRef(null);
  const searchValueRef = React.useRef(null);

  const [searchValue, setSearchValue] = useState("");

  let navigate = useNavigate();
  let isLogged = useSelector((state) => state.auth.isLogged);
  let currentUser = useSelector((state) => state.auth.name);
  let cartStates = useSelector((state) => state.cart);
  let homeStates = useSelector((state) => state.home);
  let mainNavStates = useSelector((state) => state.mainNav);
  let dispatch = useDispatch();
  let location = useLocation();

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

  useEffect(() => {
    homeStates?.menu?.length <= 0 && getMenu();
  }, []);

  const handleSearch = (value) => {
    if (value) {
      if (location.pathname !== "/products") {
        navigate("/products");
      }
      dispatch(setQuery(value));
      setSearchValue(value);
      searchValueRef.current = value;
    } else {
      // navigate("/")
      dispatch(setQuery(""));
      setSearchValue("");
    }
  };

  const onSearchChange = (e) => {
    const value = e.target.value;
    handleSearch(value);
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    dispatch(setSnackBar({ open: false, message: "", type: "" }));
  };

  return (
    <>
      <div
        className="top__header black-area pt-30 pb-30"
        style={{ backgroundColor: "#B2B2B2" }}
      >
        <div className="container">
          <div className="top__wrapper">
            <a className="main__logo">
              <img className="pointer" style={{width : "185px"}} onClick={() => navigate("/")} src={"https://mrvape-frontend.s3.eu-west-2.amazonaws.com/VapePlanet+Logo.png"} alt="logo__image" />
            </a>
            <div className="search__wrp">
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
            <div className="account__wrap">
              <div className="account d-flex align-items-center">
                <div className="user__icon">
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
                className="cart d-flex align-items-center"
                onClick={() => navigate("/cart")}
                ref={containerRef}
              >
                <span className="cart__icon">
                  <i className="fa-regular fa-cart-shopping" />
                </span>
                <a className="c__one">
                  <span className="text-white">£{cartStates.totalPrice}</span>
                </a>
                <span className="one text-white">{cartStates.total}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <header className="header-section black-area">
        <div className="container">
          <div className="header-wrapper">
            <div className="header-bar d-lg-none">
              <span />
              <span />
              <span />
            </div>
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
                            <li className="subtwohober pointer" style={{color : "#000"}}>
                              <a
                              className="pointer"
                              style={{color : "#000"}}
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
              <li>
                <a onClick={() => navigate("/products")}>
                  Top Products
                  {/* <i className="fa-regular fa-angle-down" /> */}
                </a>
                {/* <ul className="sub-menu">
              <li className="subtwohober">
                <a href="#">Mega Box</a>
              </li>
              <li className="subtwohober">
                <a href="#">Rocket X</a>
              </li>
              <li className="subtwohober">
                <a href="#">Alien Max</a>
              </li>
              <li className="subtwohober">
                <a href="#">Black &amp; Golden</a>
              </li>
              <li className="subtwohober">
                <a href="#">Falcon X</a>
              </li>
              <li className="subtwohober">
                <a href="#">Infinity Box</a>
              </li>
            </ul> */}
              </li>
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
