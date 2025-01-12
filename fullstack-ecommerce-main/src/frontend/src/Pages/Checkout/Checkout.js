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
  Skeleton,
  CircularProgress,
} from "@mui/material";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import { Elements, CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import bannerBImg from "../../assets/images/banner/inner-banner.jpg";
import { Group } from "@mui/icons-material";
import ReviewCartDetails from "./ReviewDetails";
import debounce from "lodash.debounce";
import axios from "axios";
import { setSnackBar } from "../../Component/MainNaivgationComp/MainNavSlice";

const Checkout = () => {
  // const [shippingMethod, setShippingMethod] = useState("");
  const [errors, setErrors] = useState({});

  // const [sameAsBilling, setSameAsBilling] = useState(true); // Checkbox state for shipping address
  const [activeStep, setActiveStep] = useState(1);
  const [suggestions, setSuggestions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    company: "",
    phone: "",
    country: "",
    streetAddress: "",
    townCity: "",
    postalCode: "",
    // cardNumber: "",
    // expirationDate: "",
    // cvc: "",
  });

  let navigate = useNavigate();
  let dispatch = useDispatch();
  let cartItems = useSelector((state) => state.cart);
  let userauth = useSelector((state) => state.auth);

  // const handleShippingMethodChange = (event) => {
  //   setShippingMethod(event.target.value);
  // };

  
  const stripePromise = loadStripe("pk_test_51NgU8ZKmvY8D2mUALsoAnz00j94YOrP4IMZRQ65cLYz8emEvURQFRcYWEPG73RQBOJIUln0dcZ9wKP4Kbzr6VpWz00gqg9EANG");
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setErrors({ ...errors, [name]: "" }); // Clear error for field on change

    if (name == "streetAddress") {
      debouncedFetchSuggestions(value);
    }
  };

  const validateForm = () => {
    const newErrors = {};
    Object.keys(formData).forEach((key) => {
      if (!formData[key] && key != "company") {
        newErrors[key] = "This field is required";
      }
    });
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0; // Form is valid if there are no errors
  };

  const fetchSuggestions = async (term) => {
    if (term.length < 3) {
      setSuggestions([]);
      setOpen(false);
      return;
    }

    setLoading(true);
    try {
      const response = await axios.get(
        `https://api.getaddress.io/autocomplete/${term}?api-key=h2DiPGb2qUyaA1iTN_YL2Q44205`
      );
      setSuggestions(response.data.suggestions || []);
      setOpen(true);
    } catch (error) {
      console.error("Error fetching address suggestions:", error);
    } finally {
      setLoading(false);
    }
  };

  const debouncedFetchSuggestions = debounce(fetchSuggestions, 300);

  const handleSelectSuggestion = (address) => {
    setFormData((prevData) => ({
      ...prevData,
      streetAddress: address,
    }));
    setSuggestions([]);
    setOpen(false);
  };

  const orderItems = cartItems.items;
  const totalBill = cartItems.totalPrice;

  const handleNextStep = () => {
    if (validateForm()) {
      // Proceed with form submission logic, e.g., API call
      console.log("Form submitted:", formData);
      setActiveStep(activeStep + 1);
    }
    // else if (!userauth.isLogged) {
    //   dispatch(
    //     setSnackBar({
    //       open: true,
    //       message: "Please login or signup to continue!",
    //       type: "error",
    //     })
    //   );
    // }
  };


  const StripePaymentForm = () => {
    const stripe = useStripe();
    const elements = useElements();
  
    const [isProcessing, setIsProcessing] = useState(false);
    const [paymentError, setPaymentError] = useState("");
    const [paymentSuccess, setPaymentSuccess] = useState("");
    const [amount, setAmount] = useState(""); // Amount field state
  
    const handleSubmit = async (event) => {
      event.preventDefault();
  
      if (!stripe || !elements) {
        setPaymentError("Stripe is not fully loaded. Please try again.");
        return;
      }
  
      if (!amount || isNaN(amount) || parseFloat(amount) <= 0) {
        setPaymentError("Please enter a valid amount.");
        return;
      }
  
      setIsProcessing(true);
      setPaymentError("");
      setPaymentSuccess("");
  
      try {
        // Replace with your backend call to get the client secret
        const { data: { clientSecret } } = await axios.post(
          "http://localhost:8081/api/payment-intent",
          { amount: parseFloat(amount) * 100 } // Convert to cents
        );
  
        const cardElement = elements.getElement(CardElement);
        const { error, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
          payment_method: {
            card: cardElement,
          },
        });
  
        if (error) {
          setPaymentError(error.message);
          setIsProcessing(false);
          return;
        }
  
        setPaymentSuccess("Payment successful! Thank you for your purchase.");
      } catch (err) {
        setPaymentError("An error occurred while processing your payment.");
      } finally {
        setIsProcessing(false);
      }
    };
  
    return (
      <form onSubmit={handleSubmit}>
        <Box sx={{ mt: 4 }}>
          <Typography variant="h6" sx={{ mb: 2 }}>
            Payment Information
          </Typography>
          {/* Amount Field */}
          <Grid container spacing={2} sx={{ mb: 2 }}>
            <Grid item xs={12}>
              <TextField
                label="Amount (USD)"
                type="number"
                fullWidth
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="Enter amount to pay"
                InputProps={{
                  startAdornment: <CreditCardIcon sx={{ mr: 1, color: "grey.500" }} />,
                }}
              />
            </Grid>
          </Grid>
          {/* Card Element */}
          <Box sx={{ border: "1px solid #dcdcdc", borderRadius: 1, p: 2 }}>
            <CardElement
              options={{
                style: {
                  base: {
                    fontSize: "16px",
                    color: "#424770",
                    "::placeholder": { color: "#aab7c4" },
                    iconColor: "#424770",
                  },
                  invalid: {
                    color: "#9e2146",
                  },
                },
                showIcon: true, // Show card icons
              }}
            />
          </Box>
        </Box>
  
        {/* Error & Success Alerts */}
        {paymentError && (
          <Alert severity="error" sx={{ mt: 2 }}>
            {paymentError}
          </Alert>
        )}
        {paymentSuccess && (
          <Alert severity="success" sx={{ mt: 2 }}>
            {paymentSuccess}
          </Alert>
        )}
  
        {/* Submit Button */}
        <Button
          type="submit"
          size="large"
          variant="contained"
          fullWidth
          sx={{ mt: 3 }}
          disabled={isProcessing || !stripe}
        >
          {isProcessing ? "Processing..." : "Pay Now"}
        </Button>
      </form>
    );
  };
  
  // Stepper Content
  const steps = ["Billing & Shipping", "Review & Confirm Order"];

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

          <span onClick={() => navigate("/checkout")} className="color-primary">
            checkout
          </span>
        </div>
      </div>
      {/* Breadcrumb End */}

      <section className="checkout-area pb-80">
        {/* Contact Saved Info Section */}
        <div className="container-lg">
          <Box sx={{ maxWidth: "75%", marginInline: "auto", my: 5 }}>
            <Stepper activeStep={activeStep} alternativeLabel>
              {steps.map((label) => (
                <Step
                  key={label}
                  onClick={() =>
                    setActiveStep(
                      label == "Billing & Shipping" ? 1 : activeStep
                    )
                  }
                >
                  <StepLabel>{label}</StepLabel>
                </Step>
              ))}
            </Stepper>
          </Box>
          {activeStep === 1 ? (
            <div className="row">
              <div className="col-lg-8">
                {userauth.isLogged && (
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
                        <h6 className="mb-0">{userauth.name}</h6>
                        <p className="text-muted mb-0 text-lowercase">
                          {userauth.email}
                        </p>
                      </Box>
                    </Stack>
                    <FormControlLabel
                      control={<Checkbox defaultChecked />}
                      label="Keep me upto date on news and exclusive offers"
                      sx={{ mt: 1.5 }}
                    />
                  </Box>
                )}

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

                      {/* <FormControlLabel
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
                      /> */}

                      {/* <FormControlLabel
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
                      /> */}
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
                        name="firstName"
                        fullWidth
                        placeholder="First Name"
                        size="medium"
                        value={formData.firstName}
                        onChange={handleChange}
                        error={!!errors.firstName}
                        helperText={errors.firstName}
                      />
                    </div>
                    <div className="col-lg-6 mb-4">
                      <TextField
                        required
                        label="Last Name"
                        fullWidth
                        name="lastName"
                        placeholder="Last Name"
                        size="medium"
                        value={formData.lastName}
                        onChange={handleChange}
                        error={!!errors.lastName}
                        helperText={errors.lastName}
                      />
                    </div>
                    <div className="col-lg-6 mb-4">
                      <TextField
                        label="Company"
                        fullWidth
                        name="company"
                        placeholder="Company"
                        size="medium"
                        value={formData.company}
                        onChange={handleChange}
                        error={!!errors.company}
                        helperText={errors.company}
                      />
                    </div>
                    <div className="col-lg-6 mb-4">
                      <TextField
                        required
                        label="Phone Number"
                        fullWidth
                        name="phone"
                        placeholder="Your Phone Number"
                        size="medium"
                        value={formData.phone}
                        onChange={handleChange}
                        error={!!errors.phone}
                        helperText={errors.phone}
                      />
                    </div>
                    <div className="col-lg-12 mb-4">
                      <TextField
                        select
                        label="Country / Region"
                        required
                        fullWidth
                        value={formData.country}
                        onChange={handleChange}
                        error={!!errors.country}
                        helperText={errors.country}
                        name="country"
                      >
                        <MenuItem value="">Select Country</MenuItem>
                        <MenuItem value="United States">United States</MenuItem>
                        <MenuItem value="United Kingdom">
                          United Kingdom
                        </MenuItem>
                        <MenuItem value="Australia">Australia</MenuItem>
                        <MenuItem value="Germany">Germany</MenuItem>
                        <MenuItem value="France">France</MenuItem>
                      </TextField>
                    </div>
                    <div className="col-lg-12 mb-4">
                      <Box position="relative">
                        <TextField
                          required
                          fullWidth
                          label="Street Address"
                          name="streetAddress"
                          placeholder="1837 E Homer M Adams Pkwy"
                          size="medium"
                          value={formData.streetAddress}
                          onChange={handleChange}
                          error={!!errors.streetAddress}
                          helperText={errors.streetAddress}
                          InputProps={{
                            endAdornment: loading ? (
                              <CircularProgress size={20} />
                            ) : null,
                          }}
                        />
                        {open && (
                          <Box
                            sx={{
                              position: "absolute",
                              top: "100%",
                              left: 0,
                              right: 0,
                              zIndex: 9,
                              bgcolor: "background.paper",
                              boxShadow: 1,
                              maxHeight: "200px",
                              overflowY: "auto",
                            }}
                          >
                            {loading ? (
                              Array.from(new Array(5)).map((_, index) => (
                                <Skeleton
                                  key={index}
                                  variant="rectangular"
                                  height={40}
                                />
                              ))
                            ) : suggestions.length > 0 ? (
                              suggestions.map((suggestion, index) => (
                                <MenuItem
                                  key={index}
                                  onClick={() =>
                                    handleSelectSuggestion(suggestion.address)
                                  }
                                >
                                  {suggestion.address}
                                </MenuItem>
                              ))
                            ) : (
                              <MenuItem disabled>No results found</MenuItem>
                            )}
                          </Box>
                        )}
                      </Box>
                    </div>

                    <div className="col-lg-12 mb-4">
                      <TextField
                        required
                        fullWidth
                        label="Town / City"
                        name="townCity"
                        placeholder="Town / City"
                        size="medium"
                        value={formData.townCity}
                        onChange={handleChange}
                        error={!!errors.townCity}
                        helperText={errors.townCity}
                      />
                    </div>
                    <div className="col-lg-12 mb-4">
                      <TextField
                        required
                        fullWidth
                        label="Postal Code"
                        name="postalCode"
                        placeholder="Postal Code"
                        size="medium"
                        value={formData.postalCode}
                        onChange={handleChange}
                        error={!!errors.postalCode}
                        helperText={errors.postalCode}
                      />
                    </div>

                    {/* Card Details */}
                    {/* <section className="checkout-area pb-80"> */}
        {/* <div className="container-lg"> */}
          {/* <Box sx={{ maxWidth: "75%", marginInline: "auto", my: 5 }}> */}
            {/* <Stepper activeStep={1} alternativeLabel>
              {["Billing & Shipping", "Review & Confirm Order"].map((label) => (
                <Step key={label}>
                  <StepLabel>{label}</StepLabel>
                </Step>
              ))}
            </Stepper> */}
          {/* </Box> */}
          {/* <div className="row"> */}
            {/* <div className="col-lg-8"> */}
            {/* <Box component="section" sx={{ mb: 5 }}>
  <Elements stripe={stripePromise}>
    <StripePaymentForm />
  </Elements>
</Box> */}
            {/* </div> */}
          {/* </div> */}
        {/* </div> */}
      {/* </section> */}
                  </div>
                </Box>
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
                    {orderItems.map((item, i) => {
                      return (
                        <Stack
                          direction="row"
                          useFlexGap
                          spacing={1.5}
                          className={
                            i != orderItems?.length - 1
                              ? "border-bottom pb-4 mb-4"
                              : ""
                          }
                        >
                          <Avatar
                            className="img-thumbnail"
                            sx={{ width: 80, height: 80 }}
                            variant="rounded"
                            alt="Cart Product"
                            src={item.productImage}
                          />
                          <div className="product-info">
                            <div className="product-title">
                              {item.productName}
                            </div>
                            <small className="product-qty d-block mt-1">
                              {item.flavour}
                            </small>
                          </div>
                          <div
                            className="price align-self-center fw-semibold"
                            style={{ marginLeft: "auto" }}
                          >
                            £{item.price * item.quantity}
                          </div>
                        </Stack>
                      );
                    })}
                  </Stack>

                  {/* <Box mt={4} className="border-top pt-4">
                    <div className="mb-2 checkout-title">Shipping Address</div>
                    <p>
                      2801 Lafayette Blvd, Norfolk, Vermont 23609, united state
                    </p>
                  </Box> */}

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
               
              </div>
            </div>
          ) : (
            <ReviewCartDetails
              formData={formData}
              setActiveStep={setActiveStep}
            />
          )}
        </div>
      </section>
    </main>
  );
};

export default Checkout;
