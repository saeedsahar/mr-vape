import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, IconButton, Button, Icon } from "@mui/material";
// import { CartService } from "./services/cartService"; // Replace this with your CartService logic
import "./Cart.css"; // Assuming the CSS is placed here
import Slide from '@mui/material/Slide';
import { useDispatch, useSelector } from 'react-redux';
import { incrementItemQuantity, decreaseItemQuantity, removeItem, openCart } from "./CartSlice";

function Cart(props) {
  const cartStates = useSelector((state) => state.cart)
  let dispatch = useDispatch()
  const navigate = useNavigate();

  const selectProduct = (productId) => {
    navigate(`/products/${productId}`);
  };

  return (
    <Slide direction="left" in={cartStates.open} unmountOnExit container={props.containerRef.current}
     style={{    right : "0",
      position : "absolute",
      zIndex : "999",
      width: "700px",
      height: "100vh",
      backgroundColor: "white",
      border : "1px solid black",
      borderRadius : "5px",
      borderRight : "0px",
      paddingLeft : "10px"}}>
         <div>
      <div className="title-container">
        <h1>Cart</h1>
        <h3 onClick={() => dispatch(openCart(!cartStates.open))}>back</h3>
       
      </div>

      {cartStates.total > 0 ? (
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Image</TableCell>
                <TableCell>Name</TableCell>
                <TableCell>Price</TableCell>
                <TableCell>Quantity</TableCell>
                <TableCell>Subtotal</TableCell>
                <TableCell></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {cartStates.items.map((item, index) => (
                <TableRow key={index}>
                  {/* IMAGE */}
                  <TableCell>
                    <img src={item.image} alt={item.name} className="product-image" />
                  </TableCell>

                  {/* NAME */}
                  <TableCell>
                    <h3 className="product-name" onClick={() => selectProduct(item.id)}>
                      {item.name}
                    </h3>
                  </TableCell>

                  {/* PRICE */}
                  <TableCell>€{item.price.toFixed(2)}</TableCell>

                  {/* QUANTITY */}
                  <TableCell>
                    <div className="product-quantity">
                      <IconButton
                        onClick={() => dispatch(decreaseItemQuantity(item))}
                        // disabled={item.availableQuantity === 1}
                      >
                        <Icon className={"item-decrease"}>
                          -
                        </Icon>
                      </IconButton>
                      <span className="item-quantity">{item.quantity}</span>
                      <IconButton
                        onClick={() => dispatch(incrementItemQuantity(item))}
                        disabled={item.availableQuantity <= 0}
                      >
                        <Icon className={item.availableQuantity <= 0 ? "item-quantity-disabled" : "item-increase"}>
                          +
                        </Icon>
                      </IconButton>
                    </div>
                  </TableCell>

                  {/* SUBTOTAL */}
                  <TableCell>€{(item.quantity * item.price).toFixed(2)}</TableCell>

                  {/* ACTION */}
                  <TableCell onClick={() => dispatch(removeItem(item))}>
                      <span>remove</span>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
            <TableRow>
              <TableCell colSpan={4}>
                <h2>Total</h2>
              </TableCell>
              <TableCell>
                <h2>€{cartStates.totalPrice.toFixed(2)}</h2>
              </TableCell>
            </TableRow>
          </Table>
        </TableContainer>
      ) : (
        <div>
          <i>The cart is empty.</i>
        </div>
      )}

      {cartStates.total > 0 && (
        <div className="checkout-button-container">
          <Button variant="contained" color="primary" className="checkout-button"
          onClick={() => {
            dispatch(openCart(false))
            navigate(`/checkout`)}}>
            Checkout
          </Button>
        </div>
      )}

      <p className="cart-quantity-footer">
        <i>{cartStates.total} item(s)</i>
      </p>
    </div>
      </Slide>
  )
}

export default Cart