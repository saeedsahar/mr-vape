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
  useMediaQuery,
  useTheme,
} from "@mui/material";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { base_url, getRequests, postRequests } from "../../axios/API";
import { setSnackBar } from "../../Component/MainNaivgationComp/MainNavSlice";
import { useNavigate } from "react-router-dom";
import { resetCart } from "../Cart/CartSlice";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import axios from "axios";
import StripePaymentForm from './StripePaymentForm'; // Import StripePaymentForm

const stripePromise = loadStripe("pk_live_51NgU8ZKmvY8D2mUAc9aPKbuGa2BXcHq0WaRpqfpT28XLbctdKFJqEyYg8yiag1LzCNoU5gJK6lf4PpQiqVlbfVkx00iq9cF8ME");

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

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

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
            orderReference: "vapeplanet",
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
            shippingCostCharged: 0.0,
            total: (totalBill - (discountedAmount / 100) * totalBill).toFixed(2),
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

  const OrderSummary = () => (
    <Box
  component="section"
  className="order-summary"
  sx={{
    borderRadius: 2,
    padding: "20px",
    backgroundColor: "#f9f9f9",
    boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
  }}
>
  {/* Order Summary Title */}
  <Typography
    variant="h6"
    sx={{
      fontWeight: "bold",
      color: "#333",
      mb: 3,
      textTransform: "uppercase",
      borderBottom: "2px solid #ddd",
      pb: 2,
    }}
  >
    <i
      className="fa-solid fa-list"
      style={{ marginRight: "10px", color: "#fa4f09" }}
    ></i>{" "}
    Order Summary
  </Typography>

  {/* Points Alert */}
  <Alert severity="info" icon={false} sx={{ mb: 4 }}>
    <AlertTitle sx={{ fontWeight: "bold", fontSize: "16px" }}>
      You have 50 points
    </AlertTitle>
    You don't have enough coins to redeem.
  </Alert>

  {/* Product Items */}
  <Stack spacing={3}>
    {orderItems.map((item, i) => (
      <Box
        key={i}
        sx={{
          display: "flex",
          alignItems: "center",
          borderBottom: i !== orderItems.length - 1 ? "1px solid #ddd" : "none",
          pb: 2,
          mb: 2,
        }}
      >
        {/* Product Image */}
        <Avatar
          variant="rounded"
          src={item.productImage}
          alt="Cart Product"
          sx={{ width: 80, height: 80, marginRight: "16px" }}
        />
        {/* Product Information */}
        <div className="product-info">
          <Typography
            variant="body1"
            sx={{ fontWeight: "bold", color: "#333" }}
          >
            {item.productName}
          </Typography>
          <Typography variant="body2" sx={{ color: "#555" }}>
            <i
              className="fa-solid fa-flask"
              style={{ marginRight: "8px", color: "#2196f3" }}
            ></i>
            {item.flavour}
          </Typography>
          <Typography variant="body2" sx={{ color: "#555" }}>
            <i
              className="fa-solid fa-box"
              style={{ marginRight: "8px", color: "#fa8c16" }}
            ></i>
            Qty: {item.quantity}
          </Typography>
        </div>
        {/* Product Price */}
        <Typography
          variant="body1"
          sx={{
            fontWeight: "bold",
            color: "#333",
            marginLeft: "auto",
          }}
        >
          £{item.price * item.quantity}
        </Typography>
      </Box>
    ))}
  </Stack>

  {/* Discount Code Section */}
  <Box mt={4} className="border-top pt-4">
  <TextField
  label="Discount Code"
  value={discountCode}
  onChange={(e) => {
    setDiscountCode(e.target.value);
  }}
  autoFocus={true}
  variant="outlined"
  fullWidth
  inputProps={{
    autoComplete: "new-password", // Prevent browser autofill without causing focus issues
  }}
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
      size="large"
      fullWidth
      sx={{
        mt: 2,
        backgroundColor: "#fa4f09",
        fontWeight: "bold",
        "&:hover": { backgroundColor: "#d64500" },
      }}
    >
      <i className="fa-solid fa-tag" style={{ marginRight: "10px" }}></i>{" "}
      Apply Code
    </Button>
    {isDiscountApplied && (
      <Alert severity={isDiscountApplied} sx={{ mt: 2 }}>
        {isDiscountApplied === "success"
          ? "Discount applied successfully!"
          : "Failed to apply discount!"}
      </Alert>
    )}
  </Box>

  {/* Pricing Summary */}
  <Box>
    <table style={{ width: "100%", borderCollapse: "collapse", marginTop: "20px" }}>
      <tbody>
        <tr>
          <td style={{ padding: "10px 0", fontWeight: "bold", color: "#333" }}>
            <i
              className="fa-solid fa-money-bill-wave"
              style={{ marginRight: "10px", color: "#4caf50" }}
            ></i>
            Subtotal
          </td>
          <td style={{ textAlign: "right", fontWeight: "bold", color: "#333" }}>
            £{totalBill}
          </td>
        </tr>

        <tr>
          <td style={{ padding: "10px 0", fontWeight: "bold", color: "#333" }}>
            <i
              className="fa-solid fa-truck"
              style={{ marginRight: "10px", color: "#ff9800" }}
            ></i>
            Shipping
            <Typography variant="body2" sx={{ color: "#888", fontSize: "12px" }}>
              Royal mail special delivery
            </Typography>
          </td>
          <td style={{ textAlign: "right", fontWeight: "bold", color: "#333" }}>
            £0
          </td>
        </tr>

        {discountedAmount > 0 && (
          <tr>
            <td style={{ padding: "10px 0", fontWeight: "bold", color: "#333" }}>
              <i
                className="fa-solid fa-percent"
                style={{ marginRight: "10px", color: "#2196f3" }}
              ></i>
              Discount
            </td>
            <td style={{ textAlign: "right", fontWeight: "bold", color: "#333" }}>
            -£{((discountedAmount / 100) * totalBill).toFixed(2)}
            </td>
          </tr>
        )
        }

        <tr>
          <td style={{ padding: "10px 0", fontWeight: "bold", color: "#333" }}>
            <i
              className="fa-solid fa-calculator"
              style={{ marginRight: "10px", color: "#fa4f09" }}
            ></i>
            Total
            <Typography variant="body2" sx={{ color: "#888", fontSize: "12px" }}>
              Prices include taxes
            </Typography>
          </td>
          <td
            style={{
              textAlign: "right",
              fontSize: "18px",
              fontWeight: "bold",
              color: "#000",
            }}
          >
            {/* £{totalBill + 6 - discountedAmount} */}
            £{(totalBill - (discountedAmount / 100) * totalBill).toFixed(2)}
          </td>
        </tr>
      </tbody>
    </table>
  </Box>
</Box>

  );

  return (
    <Elements stripe={stripePromise}>
      <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: 4 }}>
        <Box sx={{ flex: 1 }}>
          <Box component="section" className="border" sx={{ mb: 5, borderRadius: 2, padding: "10px 20px" }}>
          <TableContainer
  sx={{
    borderRadius: 2,
    overflow: "hidden",
    boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
    backgroundColor: "#f9f9f9",
    padding: "20px",
  }}
>
  <Table>
    <TableBody>
      {/* Contact Row */}
      <TableRow>
        <TableCell
          sx={{
            fontWeight: "bold",
            fontSize: "16px",
            color: "#555",
            display: "flex",
            alignItems: "center",
            gap: "10px",
          }}
        >
          <i className="fa-solid fa-envelope" style={{ color: "#4caf50" }}></i> Contact & Shipping Information
        </TableCell>
        <TableCell sx={{ fontSize: "15px", color: "#333" }}>
          {userauth.email}
        </TableCell>
      </TableRow>

      {/* Shipping Address Row */}
      <TableRow>
        <TableCell
          sx={{
            fontWeight: "bold",
            fontSize: "16px",
            color: "#555",
            display: "flex",
            alignItems: "center",
            gap: "10px",
          }}
        >
          <i className="fa-solid fa-truck" style={{ color: "#fa4f09" }}></i> Ship to
        </TableCell>
        <TableCell>
          <Typography
            variant="body1"
            sx={{
              fontWeight: "bold",
              color: "#333",
              mb: "8px",
            }}
          >
            {`${props.formData.lastName}, ${props.formData.firstName}`}
          </Typography>
          <Typography
            variant="body2"
            sx={{ color: "#666", mb: "4px" }}
          >
            {props.formData.streetAddress}
          </Typography>
          <Typography
            variant="body2"
            sx={{ color: "#666", mb: "4px" }}
          >
            {props.formData.townCity}
          </Typography>
          <Typography
            variant="body2"
            sx={{ color: "#666", mb: "4px" }}
          >
            {props.formData.postalCode}
          </Typography>
          <Typography
            variant="body2"
            sx={{ color: "#666", display: "flex", alignItems: "center", gap: "6px" }}
          >
            <i className="fa-solid fa-phone" style={{ color: "#2196f3" }}></i> {props.formData.phone}
          </Typography>
        </TableCell>
      </TableRow>
    </TableBody>
  </Table>
</TableContainer>

          </Box>

          {isMobile && <OrderSummary />}

        
          <StripePaymentForm onPaymentSuccess={handlePaymentSuccess} />
        </Box>

        {!isMobile && <Box sx={{ flex: 1 }}><OrderSummary /></Box>}
      </Box>

      <Button
  onClick={() => navigate("/products")}
  size="large"
  variant="contained"
  fullWidth
  sx={{
    mt: 3,
    backgroundColor: "#fa8c16", // Orange color
    color: "#fff", // White text
    fontWeight: "bold",
    textTransform: "uppercase",
    padding: "12px", // Ensure consistent padding
    borderRadius: "6px", // Match "Pay Now" button rounded corners
    display: "flex", // Flex for aligning icon and text
    alignItems: "center", // Vertical alignment
    justifyContent: "center", // Horizontal alignment
    gap: "10px", // Space between the icon and text
    fontSize: "16px", // Consistent font size
    width: {
      xs: "100%", // 100% on extra small screens
      sm: "100%", // 100% on small screens
      md: "49%", // 50% on medium and larger screens
    },
    "&:hover": {
      backgroundColor: "#d47410", // Darker orange on hover
    },
  }}
>
  <i
    className="fa-solid fa-shopping-cart"
    style={{ fontSize: "20px" }} // Icon size matches button height
  ></i>
  Continue Shopping
</Button>



    </Elements>
  );
};

export default ReviewDetails;