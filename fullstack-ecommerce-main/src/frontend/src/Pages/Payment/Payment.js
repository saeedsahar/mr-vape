import React, { useState } from 'react';
import {
  Accordion, AccordionSummary, AccordionDetails, Typography, Button, Grid, Container, Box, Divider, TextField
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useSelector } from 'react-redux';

const Payment = () => {
  let userauth = useSelector(state => state.auth)
  const [discountCode, setDiscountCode] = useState('');
  const [giftCard, setGiftCard] = useState('');

  const handleDiscountApply = () => {
    // Handle discount code application logic
    console.log(`Applying discount: ${discountCode}`);
  };

  const handleGiftCardApply = () => {
    // Handle gift card application logic
    console.log(`Applying gift card: ${giftCard}`);
  };

  const handlePlaceOrder = (event) => {
    event.preventDefault();
    // Handle order placement logic
    console.log('Placing order...');
  };

  // Dummy user information and shipping address for display
  const userInfo = {
    email: userauth.email,
    name: userauth.name,
    mobile: userauth.mobile,
    shippingAddress: userauth.shippingAddress
  };

  return (
    <Container maxWidth="md">
      <Box component="form" onSubmit={handlePlaceOrder} noValidate sx={{ mt: 3 }}>
        {/* User Information Section */}
        <Accordion defaultExpanded>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography variant="h6">User Information</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>Email: {userInfo.email}</Typography>
            <Typography>Name: {userInfo.name}</Typography>
            <Typography>Mobile: {userInfo.mobile}</Typography>
            <Typography>Shipping Address: {userInfo.shippingAddress}</Typography>
          </AccordionDetails>
        </Accordion>

        <Divider sx={{ my: 3 }} />

        {/* Discounts/Coupons Section */}
        <Accordion>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography variant="h6">Apply Discounts/Coupons</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Grid container spacing={2}>
              <Grid item xs={8}>
                <TextField
                  fullWidth
                  label="Discount Code"
                  value={discountCode}
                  onChange={(e) => setDiscountCode(e.target.value)}
                />
              </Grid>
              <Grid item xs={4}>
                <Button
                  fullWidth
                  variant="outlined"
                  onClick={handleDiscountApply}
                >
                  Apply Discount
                </Button>
              </Grid>
            </Grid>
          </AccordionDetails>
        </Accordion>

        <Divider sx={{ my: 3 }} />

        {/* Gift Card Section */}
        <Accordion>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography variant="h6">Apply Gift Card</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Grid container spacing={2}>
              <Grid item xs={8}>
                <TextField
                  fullWidth
                  label="Gift Card Code"
                  value={giftCard}
                  onChange={(e) => setGiftCard(e.target.value)}
                />
              </Grid>
              <Grid item xs={4}>
                <Button
                  fullWidth
                  variant="outlined"
                  onClick={handleGiftCardApply}
                >
                  Apply Gift Card
                </Button>
              </Grid>
            </Grid>
          </AccordionDetails>
        </Accordion>

        <Divider sx={{ my: 3 }} />

        {/* Core Payment Section */}
        <Accordion>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography variant="h6">Payment Information</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  label="Card Number"
                  name="cardNumber"
                  autoComplete="cc-number"
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  required
                  fullWidth
                  label="Expiry Date (MM/YY)"
                  name="expiryDate"
                  autoComplete="cc-exp"
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  required
                  fullWidth
                  label="Security Code (CVV)"
                  name="securityCode"
                  type="password"
                  autoComplete="cc-csc"
                />
              </Grid>
            </Grid>
          </AccordionDetails>
        </Accordion>

        <Button
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          sx={{ mt: 3 }}
        >
          Place Order
        </Button>
      </Box>
    </Container>
  );
};

export default Payment;
