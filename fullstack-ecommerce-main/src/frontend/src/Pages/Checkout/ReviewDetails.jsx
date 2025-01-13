import {
  AccordionDetails,
  Box,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  TextField,
  Alert,
  AlertTitle,
  Avatar,
  Stack,
  Typography,
} from "@mui/material";
import React, { useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { base_url, getRequests, postRequests } from "../../axios/API";
import { setSnackBar } from "../../Component/MainNaivgationComp/MainNavSlice";
import { useNavigate } from "react-router-dom";
import { resetCart } from "../Cart/CartSlice";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import axios from "axios";
import StripePaymentForm from './StripePaymentForm'; // Import StripePaymentForm

const stripePromise = loadStripe("pk_test_51NgU8ZKmvY8D2mUALsoAnz00j94YOrP4IMZRQ65cLYz8emEvURQFRcYWEPG73RQBOJIUln0dcZ9wKP4Kbzr6VpWz00gqg9EANG");

const ReviewDetails = (props) => {
  const [discountCode, setDiscountCode] = useState("");
  const [isDiscountApplied, setIsDiscountApplied] = useState("");
  const [discountedAmount, setDiscountedAmount] = useState(0);
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentError, setPaymentError] = useState("");
  const [paymentSuccess, setPaymentSuccess] = useState("");

  const cartItems = useSelector((state) => state.cart);
  const userauth = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const orderItems = cartItems.items;
  const totalBill = cartItems.totalPrice;

  const handleApplyDiscount = () => {
    if (discountCode) {
      getRequests(`${base_url}/api/v1/product/dicount?code=${discountCode}`)
        .then((data) => {
          if (data?.data?.discount) {
            setIsDiscountApplied("success");
            setDiscountedAmount(data.data.discount);
          } else {
            setIsDiscountApplied("error");
            setDiscountedAmount(0);
          }
        })
        .catch(() => {
          setIsDiscountApplied("error");
          setDiscountedAmount(0);
        });
    }
  };

  const handleConfirmOrder = async () => {
    setIsProcessing(true);
    setPaymentError("");
    setPaymentSuccess("");

    try {
      const payload = {
        items: [
          {
            orderReference: "test",
            recipient: {
              address: {
                fullName: `${props.formData.lastName}, ${props.formData.firstName}`,
                addressLine1: props.formData.streetAddress,
                city: props.formData.townCity,
                postcode: props.formData.postalCode,
                countryCode: "GB",
              },
              phoneNumber: props.formData.phone,
              emailAddress: userauth.email,
            },
            orderDate: new Date().toISOString().replace(/\.\d{3}Z$/, "Z"),
            subtotal: totalBill,
            shippingCostCharged: 10.0,
            total: totalBill + 10.0 + 20.0 - discountedAmount,
            currencyCode: "GBP",
            packages: [
              {
                weightInGrams: 20 * orderItems.reduce((acc, item) => acc + item.quantity, 0),
                packageFormatIdentifier: "PARCEL",
                contents: orderItems.map(item => ({
                  name: item.productName,
                  sku: item.id,
                  quantity: item.quantity,
                  unitValue: item.price,
                  unitWeightInGrams: 20,
                })),
              },
            ],
          },
        ],
      };

      await postRequests(`${base_url}/api/v1/product/order`, JSON.stringify(payload));
      dispatch(setSnackBar({ open: true, message: "Order placed successfully!", type: "success" }));
      dispatch(resetCart());
      navigate("/");
      setPaymentSuccess("Order placed successfully!");
    } catch (err) {
      setPaymentError("An error occurred while placing the order.");
    } finally {
      setIsProcessing(false);
    }
  };

  const handlePaymentSuccess = () => {
    handleConfirmOrder();
  };

  return (
    <Elements stripe={stripePromise}>
      <div className="row">
      <div className="col-lg-8">
  {/* Contact & Shipping Information Section */}
  <Typography
    variant="h6"
    sx={{
      fontWeight: "bold",
      color: "#333",
      mb: 2,
      textTransform: "uppercase",
    }}
  >
    Contact & Shipping Information
  </Typography>
  <Box
    component="section"
    sx={{
      mb: 5,
      borderRadius: 2,
      padding: "20px",
      boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
      backgroundColor: "#f9f9f9",
    }}
  >
    <TableContainer>
      <Table>
        <TableBody>
          {/* Contact Information */}
          <TableRow>
            <TableCell sx={{ fontWeight: "bold", color: "#333" }}>
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <i
                  className="fa-solid fa-envelope"
                  style={{
                    color: "#fa4f09",
                    marginRight: "8px",
                    fontSize: "18px",
                  }}
                />
                Contact
              </Box>
            </TableCell>
            <TableCell sx={{ color: "#555" }}>{userauth.email}</TableCell>
          </TableRow>

          {/* Shipping Information */}
          <TableRow>
            <TableCell sx={{ fontWeight: "bold", color: "#333" }}>
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <i
                  className="fa-solid fa-truck"
                  style={{
                    color: "#4caf50",
                    marginRight: "8px",
                    fontSize: "18px",
                  }}
                />
                Ship to:
              </Box>
            </TableCell>
            <TableCell sx={{ color: "#555" }}>
              <Typography
                variant="body2"
                sx={{ mb: 1, fontWeight: "bold", color: "#000" }}
              >
                {`${props.formData.lastName}, ${props.formData.firstName}`}
              </Typography>
              <Typography variant="body2" sx={{ mb: 1 }}>
                {props.formData.streetAddress}
              </Typography>
              <Typography variant="body2" sx={{ mb: 1 }}>
                {props.formData.townCity}
              </Typography>
              <Typography variant="body2" sx={{ mb: 1 }}>
                {props.formData.postalCode}
              </Typography>
              <Typography variant="body2" sx={{ mb: 1 }}>
                <i
                  className="fa-solid fa-phone"
                  style={{
                    color: "#2196f3",
                    marginRight: "6px",
                    fontSize: "16px",
                  }}
                />
                {props.formData.phone}
              </Typography>
            </TableCell>
            <TableCell align="right">
              <Button
                size="small"
                onClick={() => props.setActiveStep(1)}
                sx={{
                  color: "#1976d2",
                  fontWeight: "bold",
                  textTransform: "uppercase",
                }}
              >
                Change
              </Button>
            </TableCell>
          </TableRow>

          {/* Method Section */}
          <TableRow>
            <TableCell sx={{ fontWeight: "bold", color: "#333" }}>
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <i
                  className="fa-solid fa-shipping-fast"
                  style={{
                    color: "#ff9800",
                    marginRight: "8px",
                    fontSize: "18px",
                  }}
                />
                Method
              </Box>
            </TableCell>
            <TableCell sx={{ color: "#555" }}>
              <Typography variant="body2" sx={{ fontWeight: "bold" }}>
                Royal Mail Special Delivery
              </Typography>
              <Typography
                variant="body2"
                sx={{
                  fontWeight: "bold",
                  color: "#000",
                  display: "inline",
                }}
              >
                $6.99
              </Typography>
            </TableCell>
            <TableCell align="right">
              <Button
                size="small"
                onClick={() => props.setActiveStep(1)} // Routes to the checkout step
                sx={{
                  color: "#1976d2",
                  fontWeight: "bold",
                  textTransform: "uppercase",
                }}
              >
                Change
              </Button>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  </Box>

  {/* Payment Section */}
  <Box
    component="section"
    sx={{
      mb: 5,
      padding: "20px",
      borderRadius: 2,
      backgroundColor: "#fff",
      boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
    }}
  >
    <Typography
      variant="h6"
      sx={{
        fontWeight: "bold",
        color: "#333",
        mb: 2,
        textTransform: "uppercase",
      }}
    >
      Payment
    </Typography>
    <Typography
      variant="body2"
      sx={{
        color: "#888",
        mb: 3,
        display: "flex",
        alignItems: "center",
      }}
    >
      <i
        className="fa-solid fa-lock"
        style={{
          color: "#4caf50",
          marginRight: "6px",
          fontSize: "16px",
        }}
      />
      All transactions are secure and encrypted
    </Typography>

    {/* Stripe Payment Form */}
    <StripePaymentForm onPaymentSuccess={handlePaymentSuccess} />
  </Box>
</div>

        <div className="col-lg-4">
        <Box component="section" className="order-summary" sx={{ borderRadius: 2, padding: "20px", backgroundColor: "#f9f9f9", boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)" }}>
  {/* Order Summary Title */}
  <Typography variant="h6" sx={{ fontWeight: "bold", color: "#333", mb: 3, textTransform: "uppercase", borderBottom: "2px solid #ddd", pb: 2 }}>
    <i className="fa-solid fa-list" style={{ marginRight: "10px", color: "#fa4f09" }}></i> Order Summary
  </Typography>

  {/* Alert for Points */}
  <Alert severity="info" icon={false} sx={{ mb: 4 }}>
    <AlertTitle sx={{ fontWeight: "bold", fontSize: "16px" }}>You have 50 points</AlertTitle>
    You don't have enough coins to redeem.
  </Alert>

  {/* Cart Items */}
  <Stack spacing={3}>
    {orderItems.map((item, i) => (
      <Box key={i} sx={{ display: "flex", alignItems: "center", borderBottom: i !== orderItems.length - 1 ? "1px solid #ddd" : "none", pb: 2, mb: 2 }}>
        {/* Product Image */}
        <Avatar
          variant="rounded"
          src={item.productImage}
          alt="Cart Product"
          sx={{ width: 80, height: 80, marginRight: "16px" }}
        />

        {/* Product Info */}
        <Box>
          <Typography variant="body1" sx={{ fontWeight: "bold", color: "#333" }}>
            {item.productName}
          </Typography>
          <Typography variant="body2" sx={{ color: "#555", mt: 0.5 }}>
            <i className="fa-solid fa-flask" style={{ marginRight: "6px", color: "#2196f3" }}></i> {item.flavour}
          </Typography>
        </Box>

        {/* Price */}
        <Typography variant="body1" sx={{ fontWeight: "bold", color: "#333", marginLeft: "auto" }}>
          £{item.price * item.quantity}
        </Typography>
      </Box>
    ))}
  </Stack>

  {/* Discount Code Section */}
  <Box sx={{ mt: 4, borderTop: "1px solid #ddd", pt: 4 }}>
    <TextField
      label="Discount Code"
      value={discountCode}
      onChange={(e) => setDiscountCode(e.target.value)}
      variant="outlined"
      fullWidth
      sx={{
        "& .MuiOutlinedInput-root": {
          borderRadius: "8px",
          backgroundColor: "#fff",
        },
      }}
    />
    <Button
      variant="contained"
      onClick={handleApplyDiscount}
      fullWidth
      size="large"
      sx={{
        mt: 2,
        backgroundColor: "#fa4f09",
        fontWeight: "bold",
        "&:hover": {
          backgroundColor: "#e64500",
        },
      }}
    >
      <i className="fa-solid fa-tag" style={{ marginRight: "10px" }}></i> Apply Code
    </Button>

    {/* Discount Code Status */}
    {isDiscountApplied && (
      <Alert severity={isDiscountApplied} sx={{ mt: 2 }}>
        {isDiscountApplied === "success" ? "Discount applied successfully!" : "Failed to apply discount!"}
      </Alert>
    )}
  </Box>

  {/* Pricing Summary */}
  <Box sx={{ mt: 4 }}>
    <table style={{ width: "100%", borderCollapse: "collapse" }}>
      <tbody>
        <tr>
          <td style={{ padding: "10px 0", fontWeight: "bold", color: "#333" }}>
            <i className="fa-solid fa-money-bill-wave" style={{ marginRight: "10px", color: "#4caf50" }}></i> Subtotal
          </td>
          <td style={{ textAlign: "right", fontWeight: "bold", color: "#333" }}>£{totalBill}</td>
        </tr>

        {discountedAmount > 0 && (
          <tr>
            <td style={{ padding: "10px 0", fontWeight: "bold", color: "#333" }}>
              <i className="fa-solid fa-percent" style={{ marginRight: "10px", color: "#2196f3" }}></i> Discount
            </td>
            <td style={{ textAlign: "right", fontWeight: "bold", color: "#333" }}>£{discountedAmount}</td>
          </tr>
        )}

        <tr>
          <td style={{ padding: "10px 0", fontWeight: "bold", color: "#333" }}>
            <i className="fa-solid fa-truck" style={{ marginRight: "10px", color: "#ff9800" }}></i> Shipping
          </td>
          <td style={{ textAlign: "right", fontWeight: "bold", color: "#333" }}>£6</td>
        </tr>

        <tr>
          <td style={{ padding: "10px 0", fontWeight: "bold", color: "#333" }}>
            <i className="fa-solid fa-calculator" style={{ marginRight: "10px", color: "#fa4f09" }}></i> Total
          </td>
          <td style={{ textAlign: "right", fontSize: "18px", fontWeight: "bold", color: "#000" }}>£{totalBill + 6 - discountedAmount}</td>
        </tr>
      </tbody>
    </table>
  </Box>
</Box>

        </div>
      </div>
    </Elements>
  );
};

export default ReviewDetails;