import React from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Button, ButtonGroup } from "@mui/material";
import {
  incrementItemQuantity,
  decreaseItemQuantity,
  removeItem,
} from "./CartSlice";
import "./Cart.css";

function Cart() {
  const cartStates = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  return (
    <>
      <main>
        {/* Page Banner */}
        <section
          className="page-banner bg-image pt-130 pb-130"
          style={{
            backgroundImage: `url(https://s3.eu-west-2.amazonaws.com/www.vapeplanet.co.uk/websitelayouts/Cart-Banner.jpg)`,
          }}
        ></section>

        {/* Cart Section */}
        <section className="cart-page pt-130 pb-130">
          <div className="container-lg">
            {/* Breadcrumb */}
            <div className="breadcrumb-list mb-4">
              <a
                className="breadcrumb-link"
                onClick={() => navigate("/")}
              >
                <i className="fa-solid fa-house me-1 color-primary" /> Home{" "}
                <i className="fa-regular fa-angle-right color-primary" />
              </a>
              <span className="breadcrumb-current">Cart</span>
            </div>

            {/* Cart Table */}
            <div className="shopping-cart radius-10 bor text-dark">
              {/* Table Header */}
              <div className="cart-header bg-light py-3 px-4 d-none d-md-flex justify-content-between align-items-center fw-bold text-uppercase">
                <div className="product-details">Product</div>
                <div className="product-price">Price</div>
                <div className="product-quantity">Quantity</div>
                <div className="product-total">Total Price</div>
                <div className="product-removal"></div>
              </div>

              {/* Product Items */}
              {cartStates.items.length > 0 ? (
                cartStates.items.map((item, index) => (
                  <div
                    className="cart-item p-4 bor-top bor-bottom d-flex flex-column flex-md-row justify-content-between align-items-center"
                    key={index}
                  >
                    {/* Product Details */}
                    <div className="product-details d-flex align-items-center">
                      <img
                        src={item.productImage}
                        alt={item.productName}
                        className="product-image"
                      />
                      <h4 className="ps-4 text-capitalize fw-bold">
                        {`${item.productName} - ${item.flavour}`}
                      </h4>
                    </div>

                    {/* Price */}
                    <div className="product-price fw-bold">
                      <span className="d-inline-block d-md-none fw-bold">Price: </span>
                      £{item.price.toFixed(2)}
                    </div>

                    {/* Quantity */}
                    <div className="product-quantity">
                      <ButtonGroup variant="outlined">
                        <Button
                          onClick={() => dispatch(decreaseItemQuantity(item))}
                          style={{
                            color: "#fa4f09",
                            borderColor: "#fa4f09",
                          }}
                        >
                          -
                        </Button>
                        <Button className="fw-bold">{item.quantity}</Button>
                        <Button
                          onClick={() => dispatch(incrementItemQuantity(item))}
                          style={{
                            color: "green",
                            borderColor: "green",
                          }}
                        >
                          +
                        </Button>
                      </ButtonGroup>
                    </div>

                    {/* Total Price */}
                    <div className="product-total fw-bold">
                      <span className="d-inline-block d-md-none fw-bold">Total: </span>
                      £{(item.price * item.quantity).toFixed(2)}
                    </div>

                    {/* Remove Product */}
                    <div className="product-removal">
                      <button
                        className="remove-product"
                        onClick={() => dispatch(removeItem(item))}
                      >
                        <i className="fa-regular fa-trash-can"></i>
                      </button>
                    </div>
                  </div>
                ))
              ) : (
                <div className="empty-cart text-center py-4">
                  <h4>Your cart is empty.</h4>
                  <button
                    className="btn btn-primary mt-3"
                    onClick={() => navigate("/products")}
                  >
                    Start Shopping
                  </button>
                </div>
              )}

              {/* Cart Total Section */}
              {cartStates.items.length > 0 && (
                <div className="total-section p-4 text-end bg-light rounded">
                  <h5 className="fw-bold text-uppercase">Cart Total:</h5>
                  <h3 className="text-primary fw-bold">
                    £{cartStates.totalPrice.toFixed(2)}
                  </h3>
                  <div className="mt-3">
                    <button
                      className="btn btn-outline-primary me-3"
                      onClick={() => navigate("/products")}
                    >
                      <i className="fa-solid fa-arrow-left me-1"></i> Continue Shopping
                    </button>
                    <button
                      className="btn btn-primary"
                      onClick={() => {
                        if (cartStates.items.length > 0) navigate("/checkout");
                      }}
                    >
                      <i className="fa-solid fa-credit-card me-1"></i> Checkout
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>
      </main>
    </>
  );
}

export default Cart;
