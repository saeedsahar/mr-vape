import React, { useState } from "react";
import {
  TextField,
  Button,
  Grid,
  Radio,
  RadioGroup,
  FormControl,
  FormControlLabel,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Checkbox,
  Box,
  Typography,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import bannerBImg from "../../assets/images/banner/inner-banner.jpg";

const Checkout = () => {
  const [shippingMethod, setShippingMethod] = useState("");
  const [errors, setErrors] = useState({});
  const [discountCode, setDiscountCode] = useState(""); // State for discount code
  const [isDiscountApplied, setIsDiscountApplied] = useState(false); // Discount application status
  const [sameAsBilling, setSameAsBilling] = useState(true); // Checkbox state for shipping address
  let navigate = useNavigate();
  let dispatch = useDispatch();
  let cartItems = useSelector((state) => state.cart);
  let userauth = useSelector((state) => state.auth);

  const handleShippingMethodChange = (event) => {
    setShippingMethod(event.target.value);
  };

  const handleApplyDiscount = () => {
    // Logic to apply discount code
    if (discountCode) {
      // Assuming the code is valid for demo purposes
      setIsDiscountApplied(true);
      console.log("Discount applied:", discountCode);
    }
  };
  const validateFields = () => {
    let fieldErrors = {};

    if (!userauth.name) fieldErrors.name = "Full Name is required";
    if (!userauth.mobile) fieldErrors.mobile = "Mobile Number is required";
    if (!userauth.email) fieldErrors.email = "Email is required";
    if (!userauth.postcode) fieldErrors.postcode = "Postcode is required";
    if (!userauth.country) fieldErrors.country = "Country is required";
    if (!userauth.city) fieldErrors.city = "Town/City is required";
    if (!userauth.shippingAddress)
      fieldErrors.shippingAddress = "Street Address is required";
    if (!shippingMethod)
      fieldErrors.shippingMethod = "Please select a shipping method";

    setErrors(fieldErrors);
    return Object.keys(fieldErrors).length === 0; // Returns true if no errors
  };

  const orderItems = cartItems.items;
  const totalBill = cartItems.totalPrice;

  return (
    <main>
      <section
        className="page-banner bg-image pt-130 pb-130"
        style={{ backgroundImage: `url(${bannerBImg})` }}
      >
        <div className="container-lg">
          <h2 className="wow text-white fadeInUp mb-15">Checkout Page</h2>
          <div className="breadcrumb-list wow fadeInUp">
            <a href="index.html" className="primary-hover">
              Home <i className="fa-regular text-white fa-angle-right" />
            </a>
            <span>Checkout</span>
          </div>
        </div>
      </section>

      <section className="checkout-area pt-130 pb-130">
        <div className="container-lg">
          <div className="row g-4">
            <div className="col-lg-8">
              <div className="checkout__item-left text-dark bor mb-30">
                <h3 className="mb-40 fw-semibold">Billing Details</h3>
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
                <label className="mb-10 d-block">Country / Region *</label>
                <select className="mb-20" name="subject">
                  <option value={0}>United States</option>
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
                <label className="mb-10 d-block">State *</label>
                <select className="mb-20" id="state" name="subject">
                  <option value={0}>Georgia / Ohio / New York</option>
                  <option value={1}>Georgia</option>
                  <option value={2}>Ohio</option>
                  <option value={3}>New York</option>
                  <option value={4}>Texas</option>
                </select>
                <label className="mb-10 d-block" htmlFor="zipCode">
                  ZIP Code *
                </label>
                <input className="mb-20" id="zipCode" type="number" />
                <label className="mb-10" htmlFor="phone">
                  Phone *
                </label>
                <input className="mb-20" id="phone" type="text" />

                {/* Shipping address checkbox */}
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={sameAsBilling}
                      onChange={() => setSameAsBilling(!sameAsBilling)}
                    />
                  }
                  label="Shipping address same as billing address"
                />

                {/* Shipping details section (only visible when unchecked) */}
                {!sameAsBilling && (
                  <Accordion defaultExpanded>
                    <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                      <Typography>Shipping Details</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                      <label className="mb-10" htmlFor="shippingName">
                        Your Name *
                      </label>
                      <input className="mb-20" id="shippingName" type="text" />
                      <label className="mb-10" htmlFor="shippingEmail">
                        Email Address *
                      </label>
                      <input
                        className="mb-20"
                        id="shippingEmail"
                        type="email"
                      />
                      <label className="mb-10" htmlFor="shippingCompanyName">
                        Company Name (Optional)
                      </label>
                      <input
                        className="mb-20"
                        id="shippingCompanyName"
                        type="text"
                      />
                      <label className="mb-10 d-block">
                        Country / Region *
                      </label>
                      <select className="mb-20" name="subject">
                        <option value={0}>United States</option>
                        <option value={1}>United Kingdom</option>
                        <option value={2}>Australia</option>
                        <option value={3}>Germany</option>
                        <option value={4}>France</option>
                      </select>
                      <label className="mb-10" htmlFor="shippingStreetAddress">
                        Street Address *
                      </label>
                      <input
                        placeholder="1837 E Homer M Adams Pkwy"
                        className="mb-10"
                        id="shippingStreetAddress"
                        type="text"
                      />
                      <input
                        className="mb-20"
                        id="shippingStreetAddress2"
                        type="text"
                      />
                      <label className="mb-10" htmlFor="shippingTownName">
                        Town / City *
                      </label>
                      <input
                        className="mb-20"
                        id="shippingTownName"
                        type="text"
                      />
                      <label className="mb-10 d-block">State *</label>
                      <select
                        className="mb-20"
                        id="shippingState"
                        name="subject"
                      >
                        <option value={0}>Georgia / Ohio / New York</option>
                        <option value={1}>Georgia</option>
                        <option value={2}>Ohio</option>
                        <option value={3}>New York</option>
                        <option value={4}>Texas</option>
                      </select>
                      <label
                        className="mb-10 d-block"
                        htmlFor="shippingZipCode"
                      >
                        ZIP Code *
                      </label>
                      <input
                        className="mb-20"
                        id="shippingZipCode"
                        type="number"
                      />
                      <label className="mb-10" htmlFor="shippingPhone">
                        Phone *
                      </label>
                      <input className="mb-20" id="shippingPhone" type="text" />
                    </AccordionDetails>
                  </Accordion>
                )}
              </div>

              {/* Existing Shipping Methods Section */}
              <div className="checkout__item-left text-dark bor shipping-address">
                <h3 className="mb-40 fw-semibold">Shipping Methods</h3>
                <div className="shipping-address--item">
                  <label className="plan mb-20" htmlFor="basic1">
                    <input
                      defaultChecked=""
                      type="radio"
                      name="plan"
                      id="basic1"
                    />
                    <div className="plan-content">
                      <div className="plan-details">
                        <span>Royal Mail Tracked 24</span>
                        <p>
                          <strong>Delivery tomorrow,</strong> Sep 26th
                        </p>
                      </div>
                    </div>
                  </label>
                  <label className="plan  mb-20" htmlFor="basic2">
                    <input type="radio" id="basic2" name="plan" />
                    <div className="plan-content">
                      <div className="plan-details">
                        <span>DPD Local Pickup</span>
                        <p>
                          <strong>Delivery tomorrow,</strong> Sep 26th
                        </p>
                      </div>
                    </div>
                  </label>
                  <label className="plan  mb-20" htmlFor="basic3">
                    <input type="radio" id="basic3" name="plan" />
                    <div className="plan-content">
                      <div className="plan-details">
                        <span>DPD Local</span>
                        <p>
                          <strong>Delivery tomorrow,</strong> Sep 26th
                        </p>
                      </div>
                    </div>
                  </label>
                  <label className="plan  mb-20" htmlFor="basic4">
                    <input type="radio" id="basic4" name="plan" />
                    <div className="plan-content">
                      <div className="plan-details">
                        <span>Royal Mail Special Delivery</span>
                        <p>
                          <strong>Delivery tomorrow,</strong> Sep 26th
                        </p>
                      </div>
                    </div>
                  </label>
                  {/* <label class="plan" for="basic3">
                              <input checked type="radio" name="basic3" id="basic3" />
                              <div class="plan-content">
                                  <div class="plan-details">
                                      <span>DPD Local</span>
                                      <p><strong>Delievery tomorrow,</strong> Sep 26th</p>
                                  </div>
                              </div>
                          </label>
                          <label class="plan" for="basic4">
                              <input checked type="radio" name="basic4" id="basic4" />
                              <div class="plan-content">
                                  <div class="plan-details">
                                      <span>Royal Mail Special Delivery</span>
                                      <p><strong>Delievery tomorrow,</strong> Sep 26th</p>
                                  </div>
                              </div>
                          </label> */}
                </div>
              </div>

              {/* Card details */}
              <Accordion>
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                  <Typography>Card Details</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Grid container spacing={2}>
                    <Grid item xs={12}>
                      <TextField
                        required
                        label="Card Number"
                        fullWidth
                        variant="outlined"
                      />
                    </Grid>
                    <Grid item xs={6}>
                      <TextField
                        required
                        label="Expiration Date"
                        fullWidth
                        variant="outlined"
                        placeholder="MM/YY"
                      />
                    </Grid>
                    <Grid item xs={6}>
                      <TextField
                        required
                        label="CVC"
                        fullWidth
                        variant="outlined"
                      />
                    </Grid>
                  </Grid>
                </AccordionDetails>
              </Accordion>
            </div>

            <div className="col-lg-4">
              <div className="checkout__item-right bor">
                <h3 className="mb-40 fw-semibold">Your Order</h3>
                <ul>
                  <li className="bor-bottom pb-4">
                    <h4>Products</h4>
                    <h4>Subtotal</h4>
                  </li>
                  {orderItems?.map((item) => {
                    return (
                      <li className="bor-bottom py-4">
                        <a>{`${item.productName} - ${item.flavour}`}</a>
                        <span>£{item.price * item.quantity}</span>
                      </li>
                    );
                  })}
                </ul>
                <Box mt={4} className="bor-bottom py-4">
                  <TextField
                    label="Discount Code"
                    value={discountCode}
                    onChange={(e) => setDiscountCode(e.target.value)}
                    variant="outlined"
                    fullWidth
                  />
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={handleApplyDiscount}
                    style={{ marginTop: "10px", backgroundColor: "#fa4f09" }}
                    fullWidth
                  >
                    Apply
                  </Button>
                  {isDiscountApplied && (
                    <Typography color="green" mt={2}>
                      Discount applied successfully!
                    </Typography>
                  )}
                </Box>
                <div className="py-4 bor-bottom">
                  <h5 className="mb-10 fw-semibold">Shipping Address</h5>
                  <p>
                    2801 Lafayette Blvd, Norfolk, Vermont 23509, united state
                  </p>
                </div>
                <div className="radio-btn mt-30 color-black">
                  <span />
                  <a className="ml-10 color-black">Direct Bank Transfer</a>
                </div>
                <div className="radio-btn mt-2 color-black">
                  <span />
                  <a className="ml-10 color-black">Check Payments</a>
                </div>
                <div className="radio-btn mt-2 pb-30 bor-bottom color-black">
                  <span />
                  <a className="ml-10 color-black">Cash On Delivery</a>
                </div>
                <p className="pt-30 bor-top">
                  Your personal data will be used to process your order, support
                  your experience throughout this website.
                </p>
                <a className="btn-one mt-35 color-white">
                  <span>Place Order</span>
                </a>
                <a
                  className="btn-one mt-35 color-white"
                  style={{ marginLeft: "5px" }}
                  onClick={() => navigate("/products")}
                >
                  <span>Continue Shopping</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Checkout;
