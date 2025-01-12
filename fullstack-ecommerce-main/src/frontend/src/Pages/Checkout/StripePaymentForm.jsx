import React, { useState } from "react";
import { useStripe, useElements, CardNumberElement, CardExpiryElement, CardCvcElement } from "@stripe/react-stripe-js";
import { Box, Typography, Button, Alert } from "@mui/material";
import axios from "axios";
import { useSelector } from "react-redux";

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
      const { data: { clientSecret } } = await axios.post(
        "http://localhost:8081/api/payment-intent",
        { amount: (totalBill + 6 - discountedAmount) * 100 }
      );

      const cardNumberElement = elements.getElement(CardNumberElement);
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
      <Box sx={{ mt: 4 }}>
        <Typography variant="subtitle1" sx={{ mb: 1 }}>Card Number</Typography>
        <CardNumberElement />
        <Typography variant="subtitle1" sx={{ mb: 1 }}>Expiry Date</Typography>
        <CardExpiryElement />
        <Typography variant="subtitle1" sx={{ mb: 1 }}>CVC</Typography>
        <CardCvcElement />
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