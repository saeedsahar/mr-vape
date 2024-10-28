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
import React from "react";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

const ReviewCartDetails = () => {
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
                    saeed_sehar@hotmail.com
                  </TableCell>
                  <TableCell
                    sx={{ padding: "10px 0 10px 0", textAlign: "right" }}
                  >
                    <Button size="small">change</Button>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell sx={{ fontWeight: 600, padding: "10px 0 10px 0" }}>
                    Ship to :
                  </TableCell>
                  <TableCell sx={{ padding: "10px 0 10px 0" }}>
                    <p className="mb-0">Saeed Sehar</p>
                    <p className="mb-0">
                      66A harmondsworth Lane, Harmondsworth
                    </p>
                    <p className="mb-0">West Drayton, UB7 0AA</p>
                    <p className="mb-0">United Kingdom</p>
                    <p className="mb-0">030087363639</p>
                  </TableCell>
                  <TableCell
                    sx={{ padding: "10px 0 10px 0", textAlign: "right" }}
                  >
                    <Button size="small">change</Button>
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
                    <Button size="small">change</Button>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </Box>

        <Box component="section" sx={{ mb: 5 }}>
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
                  sx={{ position: "absolute", right: 10, top: 10 }}
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
                  sx={{ position: "absolute", right: 10, top: 10 }}
                >
                  Apply Discount
                </Button>
              </Box>
            </AccordionDetails>
          </Accordion>
        </Box>

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
              <FormControlLabel
                sx={{ mb: 1 }}
                control={<Checkbox size="small" defaultChecked />}
                label="My Billing and shipping are same"
              />
              <ul class="list-group">
                <li class="list-group-item">
                  <strong className="w-ch">Name:</strong> Saeer Sehar
                </li>
                <li class="list-group-item">
                  <strong className="w-ch">Address:</strong> 66A harmondsworth
                  Lane, Harmondsworth
                </li>
                <li class="list-group-item">
                  <strong className="w-ch">Street:</strong> West Drayton, UB7
                  0AA
                </li>
                <li class="list-group-item">
                  <strong className="w-ch">Country:</strong> United Kingdom
                </li>
                <li class="list-group-item">
                  <strong className="w-ch">Phone:</strong> 030087363639
                </li>
              </ul>

              <Box sx={{ mt: 3 }}>Add Third Party Payment Snipper Here</Box>
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

          <Stack
            className="border-bottom"
            mb={4}
            pb={5}
            // maxHeight={350}
            // sx={{ overflowY: "scroll", overflowX: "hidden" }}
          >
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
              <div className="price align-self-center fw-semibold">£20.00</div>
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
              <div className="price align-self-center fw-semibold">£20.00</div>
            </Stack>
          </Stack>

          <Box>
            <table>
              <tr>
                <td className="py-2 ">Subtotal</td>
                <td className="py-2 " align="right">
                  <span className="">$20</span>
                </td>
              </tr>
              <tr>
                <td className="py-2 border-bottom ">
                  <span>Shipping</span>
                  <span className="text-muted d-block">
                    Royal mail special delivery
                  </span>
                </td>
                <td className="py-2 border-bottom " align="right">
                  <span>$10</span>
                </td>
              </tr>

              <tr>
                <td className="pt-4 fw-semibold">
                  <span className="fs-6">Total</span>
                  <span className="fs-6 d-block text-muted">Include $20 in taxes</span>
                </td>
                <td className="pt-4 fw-semibold" align="right">
                  <span className="fw-semibold fs-4">$10</span>
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
