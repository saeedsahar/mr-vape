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
      <main className="cart-main-wrapper-unique">
        {/* Page Banner */}
        <section
          className="cart-page-banner-unique"
          style={{
            backgroundImage: `url(https://s3.eu-west-2.amazonaws.com/www.vapeplanet.co.uk/websitelayouts/Cart-Banner.jpg)`,
          }}
        ></section>

        {/* Cart Section */}
        <section className="cart-page-section-unique">
          <div className="cart-container-unique">
            {/* Breadcrumb */}
            <div className="cart-breadcrumb-unique mb-4">
              <a
                className="breadcrumb-link-unique"
                onClick={() => navigate("/")}
              >
                <i className="fa-solid fa-house me-1 color-primary" /> Home{" "}
                <i className="fa-regular fa-angle-right color-primary" />
              </a>
              <span className="breadcrumb-current-unique">Cart</span>
            </div>

            {/* Cart Items */}
            <div className="shopping-cart-unique">
              {/* Table Header */}
              <div className="cart-header-unique d-none d-md-grid">
                <div>Product</div>
                <div>Price</div>
                <div>Quantity</div>
                <div>Total Price</div>
                <div></div>
              </div>

              {/* Product Items */}
              {cartStates.items.length > 0 ? (
                cartStates.items.map((item, index) => (
                  <div
                    className="cart-item-unique d-grid"
                    key={index}
                  >
                    {/* Product Details */}
                    <div className="cart-product-details-unique">
                      <img
                        src={item.productImage}
                        alt={item.productName}
                        className="cart-product-image-unique"
                      />
                      <h4 className="cart-product-name-unique">
                        {`${item.productName} - ${item.flavour}`}
                      </h4>
                    </div>

                    {/* Price */}
                    <div className="cart-product-price-unique">
                      £{item.price.toFixed(2)}
                    </div>

                    {/* Quantity */}
                    <div className="cart-product-quantity-unique">
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
                        <Button>{item.quantity}</Button>
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
                    <div className="cart-product-total-unique">
                      £{(item.price * item.quantity).toFixed(2)}
                    </div>

                    {/* Remove Product */}
                    <div className="cart-product-remove-unique">
                      <button
                        className="cart-remove-button-unique"
                        onClick={() => dispatch(removeItem(item))}
                      >
                        <i className="fa-regular fa-trash-can"></i>
                      </button>
                    </div>
                  </div>
                ))
              ) : (
                <div className="cart-empty-unique text-center py-4">
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
                <div className="cart-total-section-unique text-end">
                  <h5 className="cart-total-title-unique">Cart Total:</h5>
                  <h3 className="cart-total-amount-unique">
                    £{cartStates.totalPrice.toFixed(2)}
                  </h3>
                  <div className="button-container mt-3">
                  <button
    className="btn btn-primary"
    onClick={() => navigate("/checkout")}
  >
    <i className="fa-solid fa-credit-card me-1"></i> Checkout
  </button>
  <button
    className="btn btn-outline-primary me-3"
    onClick={() => navigate("/products")}
  >
    <i className="fa-solid fa-arrow-left me-1"></i> Continue Shopping
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
