import React, { useState } from "react";
import {
  useStripe,
  useElements,
  CardNumberElement,
  CardExpiryElement,
  CardCvcElement,
} from "@stripe/react-stripe-js";
import { Box, Typography, Button, Alert, InputAdornment, TextField } from "@mui/material";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import LockIcon from "@mui/icons-material/Lock";
import axios from "axios";
import { useSelector } from "react-redux";
import { base_url, getRequests, postRequests } from "../../axios/API";


const StripePaymentForm = ({ onPaymentSuccess }) => {
  const stripe = useStripe();
  const elements = useElements();

  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentError, setPaymentError] = useState("");
  const [paymentSuccess, setPaymentSuccess] = useState("");
  const [discountedAmount, setDiscountedAmount] = useState(0);

  const cartItems = useSelector((state) => state.cart);
  const totalBill = cartItems.totalPrice;

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      setPaymentError("Stripe is not fully loaded. Please try again.");
      return;
    }

    if (!totalBill || isNaN(totalBill) || parseFloat(totalBill) <= 0) {
      setPaymentError("Please enter a valid amount.");
      return;
    }

    setIsProcessing(true);
    setPaymentError("");
    setPaymentSuccess("");

    try {
      // API endpoint for creating a payment intent (ensure HTTPS in production)
      const { data: { clientSecret } } = await axios.post(
        "${base_url}/api/payment-intent",
        { amount: (totalBill + 4 - discountedAmount) * 100 } // Amount in cents
      );

      const cardNumberElement = elements.getElement(CardNumberElement);

      // Confirm the payment
      const { error } = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: cardNumberElement,
        },
      });

      if (error) {
        setPaymentError(error.message);
        setIsProcessing(false);
        return;
      }

      setPaymentSuccess("Payment successful! Thank you for your purchase.");
      onPaymentSuccess(); // Trigger the order confirmation
    } catch (err) {
      setPaymentError("An error occurred while processing your payment.");
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <Box sx={{ mt: 4, p: 3, border: "1px solid #ddd", borderRadius: 2, backgroundColor: "#f9f9f9" }}>
        <Typography variant="h6" sx={{ mb: 3, fontWeight: "bold", color: "#333" }}>
          Payment Details
        </Typography>

        {/* Card Number Field */}
        <Box sx={{ mb: 3 }}>
          <Typography variant="subtitle1" sx={{ mb: 1, fontWeight: "bold" }}>
            Card Number
          </Typography>
          <TextField
            fullWidth
            variant="outlined"
            InputProps={{
              inputComponent: CardNumberElement,
              startAdornment: (
                <InputAdornment position="start">
                  <CreditCardIcon sx={{ color: "#fa4f09" }} />
                </InputAdornment>
              ),
              style: {
                fontSize: "16px",
                padding: "10px",
              },
            }}
            placeholder="Card Number"
          />
        </Box>

        {/* Expiry Date Field */}
        <Box sx={{ mb: 3 }}>
          <Typography variant="subtitle1" sx={{ mb: 1, fontWeight: "bold" }}>
            Expiry Date
          </Typography>
          <TextField
            fullWidth
            variant="outlined"
            InputProps={{
              inputComponent: CardExpiryElement,
              startAdornment: (
                <InputAdornment position="start">
                  <CalendarMonthIcon sx={{ color: "#4caf50" }} />
                </InputAdornment>
              ),
              style: {
                fontSize: "16px",
                padding: "10px",
              },
            }}
            placeholder="MM/YY"
          />
        </Box>

        {/* CVC Field */}
        <Box>
          <Typography variant="subtitle1" sx={{ mb: 1, fontWeight: "bold" }}>
            CVC
          </Typography>
          <TextField
            fullWidth
            variant="outlined"
            InputProps={{
              inputComponent: CardCvcElement,
              startAdornment: (
                <InputAdornment position="start">
                  <LockIcon sx={{ color: "#2196f3" }} />
                </InputAdornment>
              ),
              style: {
                fontSize: "16px",
                padding: "10px",
              },
            }}
            placeholder="CVC"
          />
        </Box>
      </Box>

      {paymentError && <Alert severity="error" sx={{ mt: 2 }}>{paymentError}</Alert>}
      {paymentSuccess && <Alert severity="success" sx={{ mt: 2 }}>{paymentSuccess}</Alert>}

      <Button type="submit" size="large" variant="contained" fullWidth sx={{ mt: 3 }} disabled={isProcessing || !stripe}>
        {isProcessing ? "Processing..." : "Pay Now"}
      </Button>
    </form>
  );
};

export default StripePaymentForm;
