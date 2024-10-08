import React from "react";
import { useNavigate } from "react-router-dom";
import "./Cart.css"; // Assuming the CSS is placed here
import { useDispatch, useSelector } from "react-redux";
import { Button, ButtonGroup, Icon, IconButton } from "@mui/material";
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
          style={{
            backgroundImage: `url(https://mrvape-frontend.s3.eu-west-2.amazonaws.com/cart-header.jpeg)`,
          }}
          // data-background="assets/images/banner/inner-banner.jpg"
        >
          <div className="container-lg">
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
          <div className="container-lg">
            <div className="shopping-cart radius-10 bor text-dark mobile-view">
              <div className="bg-light column-labels py-3 px-4 d-none d-md-flex justify-content-between align-items-center fw-bold text-dark text-uppercase">
                <label className="product-details">Product</label>
                <label className="product-price">Price</label>
                <label className="product-quantity">Quantity</label>
                {/* <label className="product-line-price">Total</label> */}
                <label className="product-removal"></label>
              </div>
              {cartStates.items.map((item, index) => (
                <div className="product p-4 bor-top bor-bottom d-flex flex-md-row flex-column justify-content-center align-content-center justify-content-md-between align-items-md-center">
                  <div className="product-details d-flex align-items-center justify-content-center justify-content-md-start">
                    <img
                      src={item.productImage}
                      alt={item.flavour}
                      className="img-thumbnail"
                    />
                    <h4 className="ps-4 text-capitalize">{`${item.productName} - ${item.flavour}`}</h4>
                  </div>
                  <div className="product-price">
                    <span className="d-inline-block d-md-none me-2 fw-bold">
                      Price:
                    </span>
                    <span className="w-10">
                      £{item.quantity * item.price.toFixed(2)}
                    </span>
                  </div>
                  <div className="quantity-wrapper">
                    <span className="d-inline-block d-md-none me-2 fw-bold">
                      Quantity:
                    </span>
                    <div className="product-quantity">
                      <ButtonGroup variant="outlined">
                        <Button
                          onClick={() => dispatch(decreaseItemQuantity(item))}
                        >
                          -
                        </Button>
                        <Button>{item.quantity}</Button>
                        <Button
                          onClick={() => dispatch(incrementItemQuantity(item))}
                        >
                          +
                        </Button>
                      </ButtonGroup>
                    </div>
                  </div>
                  {/* <div className="product-line-price">
                    <span className="d-inline-block d-md-none me-2 fw-bold">
                      Total:{" "}
                    </span>{" "}
                    <span className="w-10">£{item.price * item.quantity}</span>
                  </div> */}
                  <div className="product-removal">
                    <button
                      className="remove-product"
                      onClick={() => dispatch(removeItem(item))}
                    >
                      <i class="fa-regular fa-xmark heading-color"></i>
                    </button>
                  </div>
                </div>
              ))}
              <div className="total-section">
                <div className="totals-item">
                  <span className="fw-bold text-uppercase py-2">
                    Cart Total =
                  </span>
                  <span className="totals-value d-inline py-2 pe-2">
                    {" "}
                    £{cartStates.totalPrice.toFixed(2)}
                  </span>
                </div>
                <div className="pointer">
                  <button
                    className="btn-one"
                    data-animation="fadeInUp"
                    data-delay="1.8s"
                    onClick={() => {
                      navigate("/product");
                    }}
                    style={{ marginRight: "5px" }}
                  >
                    <span>Continue Shopping</span>
                  </button>
                  <button
                    className="btn-one"
                    data-animation="fadeInUp"
                    data-delay="1.8s"
                    onClick={() => {
                      if (cartStates.total > 0) navigate("/checkout");
                    }}
                  >
                    <span>Checkout</span>
                  </button>
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
