import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
  Button,
  Icon,
} from "@mui/material";
import "./Cart.css"; // Assuming the CSS is placed here
import Slide from "@mui/material/Slide";
import { useDispatch, useSelector } from "react-redux";
import {
  incrementItemQuantity,
  decreaseItemQuantity,
  removeItem,
  openCart,
} from "./CartSlice";
import bannerBImg from "../../assets/images/banner/inner-banner.jpg";
function Cart(props) {
  const cartStates = useSelector((state) => state.cart);
  let dispatch = useDispatch();
  const navigate = useNavigate();

  const selectProduct = (productId) => {
    navigate(`/products/${productId}`);
  };

  return (
    <>
      <main>
        {/* Page banner area start here */}
        <section
          className="page-banner bg-image pt-130 pb-130"
          style={{ backgroundImage: `url(${bannerBImg})` }}
          // data-background="assets/images/banner/inner-banner.jpg"
        >
          <div className="container">
            <h2
              className="wow fadeInUp mb-15 text-white"
              data-wow-duration="1.1s"
              data-wow-delay=".1s"
            >
              Cart Page
            </h2>
            <div
              className="breadcrumb-list wow fadeInUp"
              data-wow-duration="1.3s"
              data-wow-delay=".3s"
            >
              <a href="index.html" className="primary-hover">
                <i className="fa-solid fa-house me-1" /> Home{" "}
                <i className="fa-regular text-white fa-angle-right" />
              </a>
              <span>Cart</span>
            </div>
          </div>
        </section>
        {/* Page banner area end here */}
        {/* cart page area start here */}
        <section className="cart-page pt-130 pb-130">
          <div className="container">
            <div className="shopping-cart radius-10 bor text-dark">
              <div className="column-labels py-3 px-4 d-flex justify-content-between align-items-center fw-bold text-dark text-uppercase">
                <label className="product-details">Product</label>
                <label className="product-price">Price</label>
                <label className="product-quantity">Quantity</label>
                <label className="product-line-price">Total</label>
                <label className="product-removal">Edit</label>
              </div>
              {cartStates.items.map((item, index) => (
                <div className="product p-4 bor-top bor-bottom d-flex justify-content-between align-items-center">
                  <div className="product-details d-flex align-items-center">
                    <img src={item.productImage} alt={item.flavour} />
                    <h4 className="ps-4 text-capitalize">{`${item.productName} - ${item.flavour}`}</h4>
                  </div>
                  <div className="product-price">{item.price.toFixed(2)}</div>
                  <div className="product-quantity">
                    <div className="product-quantity">
                      <IconButton
                        onClick={() => dispatch(decreaseItemQuantity(item))}
                      >
                        <Icon className={"item-decrease"}>-</Icon>
                      </IconButton>
                      <span className="item-quantity">{item.quantity}</span>
                      <IconButton
                        onClick={() => dispatch(incrementItemQuantity(item))}
                        disabled={item.availableQuantity <= 0}
                      >
                        <Icon
                          className={
                            item.availableQuantity <= 0
                              ? "item-quantity-disabled"
                              : "item-increase"
                          }
                        >
                          +
                        </Icon>
                      </IconButton>
                    </div>
                  </div>
                  <div className="product-line-price">
                    {item.price * item.quantity}
                  </div>
                  <div className="product-removal">
                    <button
                      className="remove-product"
                      onClick={() => dispatch(removeItem(item))}
                    >
                      <i className="fa-solid fa-x heading-color" />
                    </button>
                  </div>
                </div>
              ))}
              <div
                className="totals"
                style={{
                  display: "grid",
                  textAlign: "right",
                  paddingRight: "10px",
                  paddingBottom: "10px",
                }}
              >
                <div className="totals-item theme-color float-end mt-20">
                  <span className="fw-bold text-uppercase py-2">
                    cart total =
                  </span>
                  <div
                    className="totals-value d-inline py-2 pe-2"
                    id="cart-subtotal"
                  >
                    {cartStates.totalPrice.toFixed(2)}
                  </div>
                </div>
                <div className="pointer">
                  <a
                    className="btn-one pointer"
                    data-animation="fadeInUp"
                    data-delay="1.8s"
                    onClick={() => {if(cartStates.total > 0) navigate("/checkout")}}
                  >
                    <span className="pointer">Checkout </span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* cart page area end here */}
     
      </main>
    </>
  );
}

export default Cart;
