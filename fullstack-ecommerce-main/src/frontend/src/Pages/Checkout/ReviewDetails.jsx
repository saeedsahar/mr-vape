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
          <div className="pb-3 checkout-title">Contact & Shipping Information</div>
          <Box component="section" className="border" sx={{ mb: 5, borderRadius: 2, padding: "10px 20px" }}>
            <TableContainer>
              <Table>
                <TableBody>
                  <TableRow>
                    <TableCell sx={{ fontWeight: 600 }}>Contact</TableCell>
                    <TableCell>{userauth.email}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell sx={{ fontWeight: 600 }}>Ship to:</TableCell>
                    <TableCell>
                      <p>{`${props.formData.lastName}, ${props.formData.firstName}`}</p>
                      <p>{props.formData.streetAddress}</p>
                      <p>{props.formData.townCity}</p>
                      <p>{props.formData.postalCode}</p>
                      <p>{props.formData.phone}</p>
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>
          </Box>

          <Box component="section" sx={{ mb: 5 }}>
            <div className="mb-0 checkout-title">Payment</div>
            <p className="text-muted">All transactions are secure and encrypted</p>

            <StripePaymentForm onPaymentSuccess={handlePaymentSuccess} />
          </Box>
        </div>
        <div className="col-lg-4">
          <Box component="section" className="order-summary">
            <div className="pb-3 mb-4 border-bottom checkout-title">Order Summary</div>

            <Alert severity="info" icon={false} sx={{ mb: 4 }}>
              <AlertTitle>You have 50 points</AlertTitle>
              You don't have enough coins to redeem.
            </Alert>

            <Stack mb={4} pb={5} style={{ marginBottom: "0px" }}>
              {orderItems.map((item, i) => (
                <Stack
                  direction="row"
                  useFlexGap
                  spacing={1.5}
                  className={i !== orderItems.length - 1 ? "border-bottom pb-4 mb-4" : ""}
                  key={i}
                >
                  <Avatar
                    className="img-thumbnail"
                    sx={{ width: 80, height: 80 }}
                    variant="rounded"
                    alt="Cart Product"
                    src={item.productImage}
                  />
                  <div className="product-info">
                    <div className="product-title">{item.productName}</div>
                    <small className="product-qty d-block mt-1">{item.flavour}</small>
                  </div>
                  <div className="price align-self-center fw-semibold" style={{ marginLeft: "auto" }}>
                    £{item.price * item.quantity}
                  </div>
                </Stack>
              ))}
            </Stack>

            <Box mt={4} className="border-top pt-4" style={{ marginTop: "0px" }}>
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
                sx={{ mt: 2, backgroundColor: "#fa4f09" }}
              >
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

            <Box>
              <table>
                <tr>
                  <td className="py-2 ">Subtotal</td>
                  <td className="py-2 " align="right">
                    <span className="">£{totalBill}</span>
                  </td>
                </tr>
                {discountedAmount ? (
                  <tr>
                    <td className="py-2 ">Discount</td>
                    <td className="py-2 " align="right">
                      <span className="">£{discountedAmount}</span>
                    </td>
                  </tr>
                ) : null}
                <tr>
                  <td className="py-2 border-bottom ">
                    <span>Shipping</span>
                    <span className="text-muted d-block">Royal mail special delivery</span>
                  </td>
                  <td className="py-2 border-bottom " align="right">
                    <span>£6</span>
                  </td>
                </tr>
                <tr>
                  <td className="pt-4 fw-semibold">
                    <span className="fs-6">Total</span>
                    <span className="fs-6 d-block text-muted">Prices included taxes</span>
                  </td>
                  <td className="pt-4 fw-semibold" align="right">
                    <span className="fw-semibold fs-4">£{totalBill + 6 - discountedAmount}</span>
                  </td>
                </tr>
              </table>
            </Box>
          </Box>
        </div>
      </div>
    </Elements>
  );
};

export default ReviewDetails;