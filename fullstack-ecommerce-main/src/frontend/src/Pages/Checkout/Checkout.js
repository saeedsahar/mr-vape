import React, { useState } from 'react';
import {
  TextField, Button, Grid, Radio, RadioGroup, FormControl, FormControlLabel, FormLabel,
  Container, Box, Typography, List, ListItem, ListItemText
} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { updateUserData } from '../Authenticate/AuthSlice';
import bannerBImg from "../../assets/images/banner/inner-banner.jpg"
const Checkout = () => {
  const [shippingMethod, setShippingMethod] = useState('');
  const [errors, setErrors] = useState({});
  let navigate = useNavigate()
  let dispatch = useDispatch()
  let cartItems = useSelector(state => state.cart)
  let userauth = useSelector(state => state.auth)

  const handleShippingMethodChange = (event) => {
    setShippingMethod(event.target.value);
  };


  const validateFields = () => {
    let fieldErrors = {};

    if (!userauth.name) fieldErrors.name = "Full Name is required";
    if (!userauth.mobile) fieldErrors.mobile = "Mobile Number is required";
    if (!userauth.email) fieldErrors.email = "Email is required";
    if (!userauth.postcode) fieldErrors.postcode = "Postcode is required";
    if (!userauth.country) fieldErrors.country = "Country is required";
    if (!userauth.city) fieldErrors.city = "Town/City is required";
    if (!userauth.shippingAddress) fieldErrors.shippingAddress = "Street Address is required";
    if (!shippingMethod) fieldErrors.shippingMethod = "Please select a shipping method";

    setErrors(fieldErrors);
    return Object.keys(fieldErrors).length === 0; // Returns true if no errors
  };

  const orderItems = cartItems.items

  const totalBill = cartItems.totalPrice

  return (
<main>
  {/* Page banner area start here */}
  <section
    className="page-banner bg-image pt-130 pb-130"
    style={{ backgroundImage: `url(${bannerBImg})` }}
  >
    <div className="container">
      <h2
        className="wow fadeInUp mb-15"
        data-wow-duration="1.1s"
        data-wow-delay=".1s"
      >
        Checkout Page
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
        <span>Checkout</span>
      </div>
    </div>
  </section>
  {/* Page banner area end here */}
  {/* Checkout area start here */}
  <section className="checkout-area pt-130 pb-130">
    <div className="container">
      <div className="row g-4">
        <div className="col-lg-8">
          <div className="checkout__item-left text-dark border">
            <h3 className="mb-40">Billing Details</h3>
            <label className="mb-10" htmlFor="name">
              Your Name *
            </label>
            <input className="mb-20" id="name" type="text" />
            <label className="mb-10" htmlFor="email">
              Email Address *
            </label>
            <input className="mb-20" id="email" type="email" />
            <label className="mb-10" htmlFor="companyName">
              Company Name (Optional)
            </label>
            <input className="mb-20" id="companyName" type="text" />
            <h5 className="mb-10">Country / Region *</h5>
            <select className="mb-20" name="subject">
              <option value={0}>United state america</option>
              <option value={1}>United Kingdom</option>
              <option value={2}>Australia</option>
              <option value={3}>Germany</option>
              <option value={4}>France</option>
            </select>
            <label className="mb-10" htmlFor="streetAddress">
              Street Address *
            </label>
            <input
              placeholder="1837 E Homer M Adams Pkwy"
              className="mb-10"
              id="streetAddress"
              type="text"
            />
            <input className="mb-20" id="streetAddress2" type="text" />
            <label className="mb-10" htmlFor="townName">
              Town / City *
            </label>
            <input className="mb-20" id="townName" type="text" />
            <h5 className="mb-10">State *</h5>
            <select className="mb-20" name="subject">
              <option value={0}>Georgia / ohio / new york</option>
              <option value={1}>Georgia</option>
              <option value={2}>Ohio</option>
              <option value={3}>New York</option>
              <option value={4}>Texas</option>
            </select>
            <label className="mb-10" htmlFor="zipCode">
              ZIP Code *
            </label>
            <input className="mb-20" id="zipCode" type="number" />
            <label className="mb-10" htmlFor="phone">
              Phone *
            </label>
            <input className="mb-20" id="phone" type="text" />
            <div className="radio-btn">
              <span />
              <a className="ml-10 fw-bold" href="register.html">
                Create An Account?
              </a>
            </div>
            <div className="radio-btn mt-2 mb-30">
              <span className="opacity-75" />
              <p style={{color : "black"}}>Ship To A Different Address?</p>
            </div>
            <label className="mb-10" htmlFor="phone">
              Order Notes (Optional)
            </label>
            <textarea
              placeholder="Note About Your Order . . ."
              name="notes"
              id="notes"
              defaultValue={""}
            />
          </div>
        </div>
        <div className="col-lg-4">
          <div className="checkout__item-right border">
            <h3 className="mb-40">Your Order</h3>
            <ul>
              <li className="bor-bottom pb-4">
                <h4>Products</h4>
                <h4>Subtotal</h4>
              </li>
              <li className="bor-bottom py-4">
                <a href="#">Secretary desk</a> <span>$15.00</span>
              </li>
              <li className="bor-bottom py-4">
                <a href="#">Secretary desk</a> <span>$15.00</span>
              </li>
              <li className="bor-bottom py-4">
                <a href="#">Secretary desk</a> <span>$15.00</span>
              </li>
              <li className="bor-bottom py-4">
                <a href="#">Secretary desk</a> <span>$15.00</span>
              </li>
              <li className="bor-bottom py-4">
                <a href="#">Secretary desk</a> <span>$15.00</span>
              </li>
              <li className="bor-bottom py-4">
                <h4>Subtotal</h4>
                <h4>$999.00</h4>
              </li>
            </ul>
            <div className="py-4 bor-bottom">
              <h5 className="mb-10">Shipping Address</h5>
              <span>
                2801 Lafayette Blvd, Norfolk, Vermont <br />
                23509, united state
              </span>
            </div>
            <div className="radio-btn mt-30">
              <span className="opacity-75" />
              <p>Direct Bank Transfer</p>
            </div>
            <div className="radio-btn mt-2">
              <span />
              <a className="ml-10 fw-bold" href="#0">
                Check Payments
              </a>
            </div>
            <div className="radio-btn mt-2 pb-30 bor-bottom">
              <span className="opacity-75" />
              <p>Cash On Delivery</p>
            </div>
            <p className="pt-30 bor-top">
              Your personal data will be used to process your order, support
              your experience throughout this website.
            </p>
            <a href="#0" className="btn-one mt-35">
              <span style={{color : "white"}}>Place Order</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  </section>
  {/* Checkout area end here */}
</main>

  );
};

export default Checkout;
