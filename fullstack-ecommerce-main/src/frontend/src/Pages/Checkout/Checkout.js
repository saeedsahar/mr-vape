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
  Stepper,
  FormLabel,
  Step,
  StepLabel,
  Typography,
  Stack,
  Avatar,
  MenuItem,
  Card,
  CardHeader,
  Alert,
  AlertTitle,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import bannerBImg from "../../assets/images/banner/inner-banner.jpg";
import { Group } from "@mui/icons-material";
import ReviewCartDetails from "./ReviewDetails";

const Checkout = () => {
  const [shippingMethod, setShippingMethod] = useState("");
  const [errors, setErrors] = useState({});
  const [discountCode, setDiscountCode] = useState(""); // State for discount code
  const [isDiscountApplied, setIsDiscountApplied] = useState(false); // Discount application status
  const [sameAsBilling, setSameAsBilling] = useState(true); // Checkbox state for shipping address
  const [activeStep, setActiveStep] = useState(1);
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

  // Stepper Content
  const steps = ["Billing & Shipping", "Review & Confirm Order"];
  const handleNextStep = () => {
    setActiveStep(activeStep + 1);
  };
  return (
    <main>
      {/* Breadcrumb Start */}
      <div className="container-lg py-3">
        <div
          className="breadcrumb-list wow fadeInUp"
          data-wow-duration="1.3s"
          data-wow-delay=".3s"
        >
          <a
            className="primary-hover color-primary"
            onClick={() => navigate("/")}
          >
            <i className="fa-solid fa-house me-1 color-primary" /> Home{" "}
            <i className="fa-regular fa-angle-right color-primary" />
          </a>

          <span className="color-primary">checkout</span>
        </div>
      </div>
      {/* Breadcrumb End */}

      <section className="checkout-area pb-80">
        {/* Contact Saved Info Section */}
        <div className="container-lg">
          <Box sx={{ maxWidth: "75%", marginInline: "auto", my: 5 }}>
            <Stepper activeStep={activeStep} alternativeLabel>
              {steps.map((label) => (
                <Step key={label}>
                  <StepLabel>{label}</StepLabel>
                </Step>
              ))}
            </Stepper>
          </Box>
          {activeStep === 1 ? (
            <div className="row">
              <div className="col-lg-8">
                <Box component="section" sx={{ mb: 5 }}>
                  <div className="pb-3 mb-4 border-bottom checkout-title">
                    Contact Information
                  </div>
                  <Stack
                    alignItems="center"
                    direction="row"
                    gap={2}
                    sx={{ mb: 2 }}
                  >
                    <Avatar
                      alt="Remy Sharp"
                      variant="rounded"
                      src="/static/images/avatar/1.jpg"
                      sx={{ width: 50, height: 50 }}
                    />
                    <Box className="user-info-section">
                      <h6 className="mb-0">Saeed Sehar</h6>
                      <p className="text-muted mb-0 text-lowercase">
                        saeed_sehar@hotmail.com
                      </p>
                    </Box>
                  </Stack>
                  <Stack
                    alignItems="center"
                    direction="row"
                    gap={2}
                    sx={{ mb: 2 }}
                  >
                    <Avatar
                      alt="Remy Sharp"
                      variant="rounded"
                      src="/static/images/avatar/1.jpg"
                      sx={{ width: 50, height: 50 }}
                    />
                    <Box className="user-info-section">
                      <h6 className="mb-0">Saeed Sehar</h6>
                      <p className="text-muted mb-0 text-lowercase">
                        saeed_sehar@hotmail.com
                      </p>
                    </Box>
                  </Stack>
                  <FormControlLabel
                    control={<Checkbox defaultChecked />}
                    label="Keep me upto date on news and exclusive offers"
                    sx={{ mt: 1.5 }}
                  />
                </Box>

                {/* Shipping Methods */}
                <Box component="section" sx={{ mb: 5 }}>
                  <div className="pb-3 mb-4 border-bottom checkout-title">
                    Shipping Methods
                  </div>
                  <FormControl
                    sx={{ width: "100%", borderRadius: 2 }}
                    className="border"
                  >
                    <RadioGroup defaultValue="1" name="radio-buttons-group">
                      <FormControlLabel
                        className="border-bottom w-100 m-0"
                        sx={{ padding: 2, width: "100%" }}
                        value="1"
                        control={<Radio />}
                        label={
                          <>
                            <p className="mb-0 fw-medium">
                              Royal Mail Tracked 24
                            </p>
                            <small>
                              <span className="fw-semibold">
                                Delievery Tomorrow
                              </span>
                              , Friday Oct 25
                            </small>
                          </>
                        }
                      />

                      <FormControlLabel
                        className="border-bottom w-100 m-0"
                        sx={{ padding: 2, width: "100%" }}
                        value="2"
                        control={<Radio />}
                        label={
                          <>
                            <p className="mb-0 fw-medium">
                              Royal Mail Tracked 24
                            </p>
                            <small>
                              <span className="fw-semibold">
                                Delievery Tomorrow
                              </span>
                              , Friday Oct 25
                            </small>
                          </>
                        }
                      />

                      <FormControlLabel
                        className="w-100 m-0"
                        sx={{ padding: 2, width: "100%" }}
                        value="3"
                        control={<Radio />}
                        label={
                          <>
                            <p className="mb-0 fw-medium">
                              Royal Mail Tracked 24
                            </p>
                            <small>
                              <span className="fw-semibold">
                                Delievery Tomorrow
                              </span>
                              , Friday Oct 25
                            </small>
                          </>
                        }
                      />
                    </RadioGroup>
                  </FormControl>
                </Box>

                {/* Shipping Address */}
                <Box component="section" sx={{ mb: 5 }}>
                  <div className="pb-3 mb-4 checkout-title border-bottom">
                    Shipping Address
                  </div>
                  <div className="row">
                    <div className="col-lg-6 mb-4">
                      <TextField
                        required
                        label="First Name"
                        name="first_name"
                        fullWidth
                        placeholder="First Name"
                        size="medium"
                      />
                    </div>
                    <div className="col-lg-6 mb-4">
                      <TextField
                        required
                        label="Last Name"
                        fullWidth
                        name="last_name"
                        placeholder="Last Name"
                        size="medium"
                      />
                    </div>
                    <div className="col-lg-6 mb-4">
                      <TextField
                        required
                        label="Company"
                        fullWidth
                        name="company"
                        placeholder="Company"
                        size="medium"
                      />
                    </div>
                    <div className="col-lg-6 mb-4">
                      <TextField
                        required
                        label="Phone Number"
                        fullWidth
                        name="phon_no"
                        placeholder="Your Phone Number"
                        size="medium"
                      />
                    </div>
                    <div className="col-lg-12 mb-4">
                      <TextField
                        select
                        label="Country / Region"
                        required
                        fullWidth
                      >
                        <MenuItem value={0}>United States</MenuItem>
                        <MenuItem value={1}>United Kingdom</MenuItem>
                        <MenuItem value={2}>Australia</MenuItem>
                        <MenuItem value={3}>Germany</MenuItem>
                        <MenuItem value={4}>France</MenuItem>
                      </TextField>
                    </div>
                    <div className="col-lg-12 mb-4">
                      <TextField
                        required
                        fullWidth
                        label="Street Address"
                        name="street_address"
                        placeholder="1837 E Homer M Adams Pkwy"
                        size="medium"
                      />
                    </div>
                    <div className="col-lg-12 mb-4">
                      <TextField
                        required
                        fullWidth
                        label="Lane"
                        name="lane"
                        placeholder="1837 E Homer M Adams Pkwy"
                        size="medium"
                      />
                    </div>
                    <div className="col-lg-12 mb-4">
                      <TextField
                        required
                        fullWidth
                        label="Town / City"
                        name="town_city"
                        placeholder="Town / City"
                        size="medium"
                      />
                    </div>
                    <div className="col-lg-12 mb-4">
                      <TextField
                        required
                        fullWidth
                        label="Postal Code"
                        name="postal_code"
                        placeholder="Postal Code"
                        size="medium"
                      />
                    </div>
                    <div className="col-lg-12 mb-4">
                      <FormControlLabel
                        control={
                          <Checkbox
                            checked={sameAsBilling}
                            onChange={() => setSameAsBilling(!sameAsBilling)}
                          />
                        }
                        label="Shipping address same as billing address"
                      />
                    </div>
                    <div className="col-lg-12 mb-4">
                      {/* Same Shipping & Billing Address */}
                      <Accordion
                        disabled={sameAsBilling}
                        sx={{ boxShadow: "none", overflow: "hidden" }}
                        className="border shipping-address-accordian"
                      >
                        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                          Shipping Address
                        </AccordionSummary>
                        <AccordionDetails>
                          <div className="row">
                            <div className="col-lg-6 mb-4">
                              <TextField
                                required
                                label="First Name"
                                name="first_name"
                                fullWidth
                                placeholder="First Name"
                                size="medium"
                              />
                            </div>
                            <div className="col-lg-6 mb-4">
                              <TextField
                                required
                                label="Last Name"
                                fullWidth
                                name="last_name"
                                placeholder="Last Name"
                                size="medium"
                              />
                            </div>
                            <div className="col-lg-6 mb-4">
                              <TextField
                                required
                                label="Company"
                                fullWidth
                                name="company"
                                placeholder="Company"
                                size="medium"
                              />
                            </div>
                            <div className="col-lg-6 mb-4">
                              <TextField
                                required
                                label="Phone Number"
                                fullWidth
                                name="phon_no"
                                placeholder="Your Phone Number"
                                size="medium"
                              />
                            </div>
                            <div className="col-lg-12 mb-4">
                              <TextField
                                select
                                label="Country / Region"
                                required
                                fullWidth
                              >
                                <MenuItem value={0}>United States</MenuItem>
                                <MenuItem value={1}>United Kingdom</MenuItem>
                                <MenuItem value={2}>Australia</MenuItem>
                                <MenuItem value={3}>Germany</MenuItem>
                                <MenuItem value={4}>France</MenuItem>
                              </TextField>
                            </div>
                            <div className="col-lg-12 mb-4">
                              <TextField
                                required
                                fullWidth
                                label="Street Address"
                                name="street_address"
                                placeholder="1837 E Homer M Adams Pkwy"
                                size="medium"
                              />
                            </div>
                            <div className="col-lg-12 mb-4">
                              <TextField
                                required
                                fullWidth
                                label="Lane"
                                name="lane"
                                placeholder="1837 E Homer M Adams Pkwy"
                                size="medium"
                              />
                            </div>
                            <div className="col-lg-12 mb-4">
                              <TextField
                                required
                                fullWidth
                                label="Town / City"
                                name="town_city"
                                placeholder="Town / City"
                                size="medium"
                              />
                            </div>
                            <div className="col-lg-12 mb-4">
                              <TextField
                                required
                                fullWidth
                                label="Postal Code"
                                name="postal_code"
                                placeholder="Postal Code"
                                size="medium"
                              />
                            </div>
                          </div>
                        </AccordionDetails>
                      </Accordion>
                    </div>
                    <div className="col-lg-12 mb-4">
                      <Accordion
                        sx={{ boxShadow: "none", overflow: "hidden" }}
                        className="border shipping-address-accordian"
                      >
                        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                          Card Details
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
                  </div>
                </Box>

                {/* Card Details */}
              </div>
              <div className="col-lg-4">
                <Box component="section" className="order-summary">
                  <div className="pb-3 mb-4 border-bottom checkout-title">
                    Order Summary
                  </div>

                  <Alert severity="info" icon={false} sx={{ mb: 4 }}>
                    <AlertTitle>You have 50 points</AlertTitle>
                    You don't have enough coins to redeem.
                  </Alert>

                  {/* Product Lists === make sur to remove theses classes from the last child  "className="border-bottom pb-4 mb-4" */}
                  <Stack>
                    <Stack
                      direction="row"
                      useFlexGap
                      spacing={1.5}
                      className="border-bottom pb-4 mb-4"
                    >
                      <Avatar
                        className="img-thumbnail"
                        sx={{ width: 80, height: 80 }}
                        variant="rounded"
                        alt="Cart Product"
                        src="https://mr-vape-s3.s3.eu-west-2.amazonaws.com/Mega%20Box/cover/Cover%20or%20Slider%205.jpg"
                      />
                      <div className="product-info">
                        <div className="product-title">
                          JNR Mega Box 25,000 Puffs Disposable Vape
                        </div>
                        <small className="product-qty d-block mt-1">
                          20mg Apple Peach
                        </small>
                      </div>
                      <div className="price align-self-center fw-semibold">
                        £20.00
                      </div>
                    </Stack>

                    <Stack direction="row" useFlexGap spacing={1.5}>
                      <Avatar
                        className="img-thumbnail"
                        sx={{ width: 80, height: 80 }}
                        variant="rounded"
                        alt="Cart Product"
                        src="https://mr-vape-s3.s3.eu-west-2.amazonaws.com/Mega%20Box/cover/Cover%20or%20Slider%205.jpg"
                      />
                      <div className="product-info">
                        <div className="product-title">
                          JNR Mega Box 25,000 Puffs Disposable Vape
                        </div>
                        <small className="product-qty d-block mt-1">
                          20mg Apple Peach
                        </small>
                      </div>
                      <div className="price align-self-center fw-semibold">
                        £20.00
                      </div>
                    </Stack>
                  </Stack>

                  <Box mt={4} className="border-top pt-4">
                    <TextField
                      label="Discount Code"
                      value={discountCode}
                      onChange={(e) => setDiscountCode(e.target.value)}
                      variant="outlined"
                      fullWidth
                    />
                    <Button
                      variant="contained"
                      onClick={handleApplyDiscount}
                      size="large"
                      fullWidth
                      sx={{ mt: 2 }}
                    >
                      Apply Code
                    </Button>
                    {isDiscountApplied && (
                      <Alert severity="success" sx={{ mt: 2 }}>
                        Discount applied successfully!
                      </Alert>
                    )}
                  </Box>

                  <Box mt={4} className="border-top pt-4">
                    <div className="mb-2 checkout-title">Shipping Address</div>
                    <p>
                      2801 Lafayette Blvd, Norfolk, Vermont 23609, united state
                    </p>
                  </Box>

                  <Box mt={4} className="border-top pt-4">
                    <FormControl fullWidth>
                      <RadioGroup>
                        <FormControlLabel
                          value="Direct Bank Transfer"
                          control={<Radio />}
                          label="Direct Bank Transfer"
                        />
                        <FormControlLabel
                          value="Check Payments"
                          control={<Radio />}
                          label="Check Payments"
                        />
                        <FormControlLabel
                          value="Cash On Delivery"
                          control={<Radio />}
                          label="Cash On Delivery"
                        />
                      </RadioGroup>
                    </FormControl>
                  </Box>
                  <Box mt={4} className="border-top pt-4">
                    <p>
                      Your personal data will be used to process your order,
                      support your experience throughout this website.
                    </p>
                  </Box>
                  <Box mt={4} className="pt-4">
                    <Button
                      size="large"
                      className="btn-primary btn-white"
                      fullWidth
                      variant="contained"
                      onClick={handleNextStep}
                      sx={{ paddingBlock: 2, borderRadius: 10 }}
                    >
                      Place Order
                    </Button>

                    <Button
                      size="large"
                      className="btn-dark"
                      fullWidth
                      variant="contained"
                      sx={{ paddingBlock: 2, borderRadius: 10, mt: 2 }}
                      onClick={() => navigate("/products")}
                    >
                      Continue Shopping
                    </Button>
                  </Box>
                </Box>
                {/* <div className="checkout__item-right bor">
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
                   2801 Lafayette Blvd, Norfolk, Vermont 23609, united state
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
             </div> */}
              </div>
            </div>
          ) : (
            <ReviewCartDetails />
          )}
        </div>
        {/* <div className="container-lg">
          <div className="row">
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

                <FormControlLabel
                  control={
                    <Checkbox
                      checked={sameAsBilling}
                      onChange={() => setSameAsBilling(!sameAsBilling)}
                    />
                  }
                  label="Shipping address same as billing address"
                />

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
                </div>
              </div>

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
                    2801 Lafayette Blvd, Norfolk, Vermont 23609, united state
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
        </div> */}
      </section>
    </main>
  );
};

export default Checkout;
