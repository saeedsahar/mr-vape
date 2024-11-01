import {
  AccordionDetails,
  AccordionSummary,
  Avatar,
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  TextField,
  Accordion,
  TableHead,
  Alert,
  RadioGroup,
  FormControl,
  AlertTitle,
  Radio,
} from "@mui/material";
import React, { useState } from "react";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useDispatch, useSelector } from "react-redux";
import { base_url, getRequests, postRequests } from "../../axios/API";
import { setSnackBar } from "../../Component/MainNaivgationComp/MainNavSlice";
import { useNavigate } from "react-router-dom";
import { resetCart } from "../Cart/CartSlice";

const ReviewCartDetails = (props) => {
  const [discountCode, setDiscountCode] = useState(""); // State for discount code
  const [isDiscountApplied, setIsDiscountApplied] = useState(""); // Discount application status
  const [discountedAmount, setDiscountedAmount] = useState(0);
  let cartItems = useSelector((state) => state.cart);
  let userauth = useSelector((state) => state.auth);
  let navigate = useNavigate();
  let dispatch = useDispatch();
  const orderItems = cartItems.items;
  const totalBill = cartItems.totalPrice;

  const getCurrentDate = () => {
    const currentDate = new Date();

    return currentDate.toISOString().replace(/\.\d{3}Z$/, "Z");
  };

  const getWeight = () => {
    let fixWeight = 20;
    let totalQuantity = 0;

    orderItems.forEach((item) => {
      totalQuantity += item.quantity;
    });

    return fixWeight * totalQuantity;
  };

  const getContent = () => {
    let contentForApi = [];

    orderItems.forEach((item) => {
      let objForItem = {};
      objForItem.name = item.productName;
      objForItem.sku = item.id;
      objForItem.quantity = item.quantity;
      objForItem.unitValue = item.price;
      objForItem.unitWeightInGrams = 20;

      contentForApi.push(objForItem);
    });

    return contentForApi;
  };

  const handleConfirmOrder = () => {
    let payload = {
      items: [
        {
          orderReference: "test", // <= 40 characters
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
          orderDate: getCurrentDate(), // Required date-time
          subtotal: totalBill, // Required <= 999999.99
          shippingCostCharged: 10.0, // Required <= 999999.99
          total: totalBill + 10.0 + 20.0 - discountedAmount, // Required <= 999999.99
          currencyCode: "GBP", // <= 3 characters
          packages: [
            {
              weightInGrams: getWeight(), // Required
              packageFormatIdentifier: "PARCEL", // Valid packaging format
              contents: getContent(),
            },
          ],
        },
      ],
    };

    postRequests(`${base_url}/api/v1/product/order`, JSON.stringify(payload))
      .then((data) => {
        dispatch(
          setSnackBar({
            open: true,
            message: "Order placed successfully!",
            type: "success",
          })
        );
        dispatch(resetCart());
        navigate("/");
      })
      .catch((e) => {
        dispatch(
          setSnackBar({
            open: true,
            message: "Failed to place order!",
            type: "error",
          })
        );
      });
  };

  const handleApplyDiscount = () => {
    // Logic to apply discount code
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
        .catch((error) => {
          setIsDiscountApplied("error");
          setDiscountedAmount(0);
        });
    }
  };
  return (
    <div className="row">
      <div className="col-lg-8">
        <div className="pb-3 checkout-title">
          Contact & Shipping Information
        </div>
        <Box
          component="section"
          className="border"
          sx={{ mb: 5, borderRadius: 2, padding: "10px  20px" }}
        >
          <TableContainer>
            <Table>
              <TableBody>
                <TableRow
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell sx={{ fontWeight: 600, padding: "10px 0 10px 0" }}>
                    Contact
                  </TableCell>
                  <TableCell sx={{ padding: "10px 0 10px 0" }}>
                    {userauth.email}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell sx={{ fontWeight: 600, padding: "10px 0 10px 0" }}>
                    Ship to :
                  </TableCell>
                  <TableCell sx={{ padding: "10px 0 10px 0" }}>
                    <p className="mb-0">{`${props.formData.lastName}, ${props.formData.firstName}`}</p>
                    <p className="mb-0">{props.formData.streetAddress}</p>
                    <p className="mb-0">{props.formData.lane}</p>
                    <p className="mb-0">{props.formData.country}</p>
                    <p className="mb-0">{props.formData.phone}</p>
                  </TableCell>
                  <TableCell
                    sx={{ padding: "10px 0 10px 0", textAlign: "right" }}
                  >
                    <Button size="small" onClick={() => props.setActiveStep(1)}>
                      change
                    </Button>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell sx={{ fontWeight: 600, padding: "10px 0 10px 0" }}>
                    Method :
                  </TableCell>
                  <TableCell sx={{ padding: "10px 0 10px 0" }}>
                    Royal Mail Special Delivery . <strong>$6.99</strong>
                  </TableCell>
                  <TableCell
                    sx={{ padding: "10px 0 10px 0", textAlign: "right" }}
                  >
                    <Button onClick={() => props.setActiveStep(1)} size="small">
                      change
                    </Button>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </Box>

        {/* <Box component="section" sx={{ mb: 5 }}>
          <Accordion
            expanded={true}
            sx={{ boxShadow: "none", overflow: "hidden" }}
            className="border shipping-address-accordian"
          >
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              Apply Discount Code
            </AccordionSummary>
            <AccordionDetails>
              <Box sx={{ position: "relative" }}>
                <TextField
                  sx={{ position: "relative" }}
                  label="Discount Code"
                  name="diccount_code"
                  fullWidth
                  placeholder="Enter Discount Code"
                  size="medium"
                />
                <Button
                  variant="outlined"
                  sx={{
                    position: "absolute",
                    right: 10,
                    top: 10,
                    borderColor: "#fa4f09",
                    color: "#fa4f09",
                  }}
                >
                  Apply Discount
                </Button>
              </Box>
            </AccordionDetails>
          </Accordion>
        </Box>

        <Box component="section" sx={{ mb: 5 }}>
          <Accordion
            sx={{ boxShadow: "none", overflow: "hidden" }}
            className="border shipping-address-accordian"
          >
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              Apply Gift Card
            </AccordionSummary>
            <AccordionDetails>
              <Box sx={{ position: "relative" }}>
                <TextField
                  sx={{ position: "relative" }}
                  label="Discount Code"
                  name="diccount_code"
                  fullWidth
                  placeholder="Enter Discount Code"
                  size="medium"
                />
                <Button
                  variant="outlined"
                  sx={{
                    position: "absolute",
                    right: 10,
                    top: 10,
                    borderColor: "#fa4f09",
                    color: "#fa4f09",
                  }}
                >
                  Apply Discount
                </Button>
              </Box>
            </AccordionDetails>
          </Accordion>
        </Box> */}

        <Box component="section" sx={{ mb: 5 }}>
          <div className="mb-0 checkout-title">Payment</div>
          <p className="text-muted">
            All transactions are secure and encrypted
          </p>

          <Accordion
            expanded={true}
            sx={{ borderRadius: 1, boxShadow: "none", overflow: "hidden" }}
            className="border shipping-address-accordian"
          >
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              Credit / Debit Card
            </AccordionSummary>
            <AccordionDetails>
              {/* <FormControlLabel
                sx={{ mb: 1 }}
                control={<Checkbox size="small" defaultChecked />}
                label="My Billing and shipping are same"
              /> */}
              <ul class="list-group">
                <li class="list-group-item">
                  <strong className="w-ch">Name:</strong>{" "}
                  {`${props.formData.lastName}, ${props.formData.firstName}`}
                </li>
                <li class="list-group-item">
                  <strong className="w-ch">Address:</strong>{" "}
                  {props.formData.streetAddress}
                </li>

                <li class="list-group-item">
                  <strong className="w-ch">Country:</strong>{" "}
                  {props.formData.country}
                </li>
                <li class="list-group-item">
                  <strong className="w-ch">Phone:</strong>{" "}
                  {props.formData.phone}
                </li>
              </ul>

              {/* <Box sx={{ mt: 3 }}>Add Third Party Payment Snipper Here</Box> */}
            </AccordionDetails>
          </Accordion>
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

          <Stack mb={4} pb={5} style={{ marginBottom: "0px" }}>
            {orderItems.map((item, i) => {
              return (
                <Stack
                  direction="row"
                  useFlexGap
                  spacing={1.5}
                  className={
                    i != orderItems?.length - 1 ? "border-bottom pb-4 mb-4" : ""
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
                    <div className="product-title">{item.productName}</div>
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
                {isDiscountApplied == "success"
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
                  <span className="text-muted d-block">
                    Royal mail special delivery
                  </span>
                </td>
                <td className="py-2 border-bottom " align="right">
                  <span>£10</span>
                </td>
              </tr>

              <tr>
                <td className="pt-4 fw-semibold">
                  <span className="fs-6">Total</span>
                  <span className="fs-6 d-block text-muted">
                    Include £20 in taxes
                  </span>
                </td>
                <td className="pt-4 fw-semibold" align="right">
                  <span className="fw-semibold fs-4">
                    £{totalBill + 10 + 20 - discountedAmount}
                  </span>
                </td>
              </tr>
            </table>
          </Box>

          <Box mt={4} className="pt-4">
            <Button
              size="large"
              className="btn-primary btn-white"
              fullWidth
              variant="contained"
              sx={{ paddingBlock: 2, borderRadius: 10 }}
              onClick={handleConfirmOrder}
            >
              Confirm Order
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
  );
};

export default ReviewCartDetails;
