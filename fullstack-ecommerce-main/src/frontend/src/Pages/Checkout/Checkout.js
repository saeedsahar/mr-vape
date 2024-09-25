import React, { useState } from 'react';
import {
  TextField, Button, Grid, Radio, RadioGroup, FormControl, FormControlLabel, FormLabel,
  Container, Box, Typography, List, ListItem, ListItemText
} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { updateUserData } from '../Authenticate/AuthSlice';

const Checkout = () => {
  const [shippingMethod, setShippingMethod] = useState('');
  const [errors, setErrors] = useState({});
  let navigate = useNavigate()
  let dispatch = useDispatch()
  let cartItems = useSelector(state => state.cart)
  let userauth = useSelector(state => state.auth)

  const handleShippingMethodChange = (event) => {
    setShippingMethod(event.target.value);
  };


  const validateFields = () => {
    let fieldErrors = {};

    if (!userauth.name) fieldErrors.name = "Full Name is required";
    if (!userauth.mobile) fieldErrors.mobile = "Mobile Number is required";
    if (!userauth.email) fieldErrors.email = "Email is required";
    if (!userauth.postcode) fieldErrors.postcode = "Postcode is required";
    if (!userauth.country) fieldErrors.country = "Country is required";
    if (!userauth.city) fieldErrors.city = "Town/City is required";
    if (!userauth.shippingAddress) fieldErrors.shippingAddress = "Street Address is required";
    if (!shippingMethod) fieldErrors.shippingMethod = "Please select a shipping method";

    setErrors(fieldErrors);
    return Object.keys(fieldErrors).length === 0; // Returns true if no errors
  };

  const orderItems = cartItems.items

  const totalBill = cartItems.totalPrice

  return (
    <Container maxWidth="lg">
      <Box component="form" noValidate sx={{ mt: 3 }}>
        <Grid container spacing={4}>
          {/* Left Section: Shipping Details (60%) */}
          <Grid item xs={12} md={7}>
            <FormControl fullWidth margin="normal">
              <FormLabel component="legend" sx={{ mb: 2 }}>Shipping Details</FormLabel>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    fullWidth
                    label="Full Name"
                    name="fullName"
                    autoComplete="name"
                    error={!!errors.name}
                    helperText={errors.name}
                    value={userauth.name}
                    onChange={(e) => {
                        dispatch(updateUserData({key : "name" , value : e.target.value}))
                    }}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    fullWidth
                    label="Mobile Number"
                    name="mobile"
                    type="tel"
                    autoComplete="tel"
                    error={!!errors.mobile}
                    helperText={errors.mobile}
                    value={userauth.mobile}
                    onChange={(e) => {
                        dispatch(updateUserData({key : "mobile" , value : e.target.value}))
                    }}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    fullWidth
                    label="Email"
                    name="email"
                    type="tel"
                    autoComplete="tel"
                    error={!!errors.email}
                    helperText={errors.email}
                    value={userauth.email}
                    onChange={(e) => {
                        dispatch(updateUserData({key : "email" , value : e.target.value}))
                    }}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    fullWidth
                    label="Postcode"
                    name="Postcode"
                    type="tel"
                    autoComplete="tel"
                    error={!!errors.postcode}
                    helperText={errors.postcode}
                    value={userauth.postcode}
                    onChange={(e) => {
                        dispatch(updateUserData({key : "postcode" , value : e.target.value}))
                    }}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    fullWidth
                    label="Country"
                    name="country"
                    autoComplete="country"
                    error={!!errors.country}
                    helperText={errors.country}
                    value={userauth.country}
                    onChange={(e) => {
                        dispatch(updateUserData({key : "country" , value : e.target.value}))
                    }}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    fullWidth
                    label="Town/City"
                    name="town"
                    autoComplete="address-level2"
                    error={!!errors.city}
                    helperText={errors.city}
                    value={userauth.city}
                    onChange={(e) => {
                        dispatch(updateUserData({key : "city" , value : e.target.value}))
                    }}
                  />
                </Grid>
                <Grid item xs={12} sm={12}>
                  <TextField
                    required
                    fullWidth
                    label="Street Address"
                    name="address"
                    autoComplete="address-level3"
                    error={!!errors.shippingAddress}
                    helperText={errors.shippingAddress}
                    value={userauth.shippingAddress}
                    onChange={(e) => {
                        dispatch(updateUserData({key : "shippingAddress" , value : e.target.value}))
                    }}
                  />
                </Grid>
              </Grid>
            </FormControl>

            <FormControl component="fieldset" fullWidth margin="normal">
              <FormLabel component="legend" sx={{ mb: 2 }}>Shipping Method</FormLabel>
              <RadioGroup value={shippingMethod} onChange={handleShippingMethodChange}>
                <FormControlLabel value="standard" control={<Radio />} label="Standard Shipping" />
                <FormControlLabel value="express" control={<Radio />} label="Express Shipping" />
                <FormControlLabel value="overnight" control={<Radio />} label="Overnight Shipping" />
              </RadioGroup>
            </FormControl>

            <Button
            //   type="submit"
              fullWidth
              variant="contained"
              color="primary"
              sx={{ mt: 3 }}
              onClick={() =>  {
                if (validateFields()) {
                navigate("/checkout/payment");
              }}
            }
            >
              Payment
            </Button>
          </Grid>

          {/* Right Section: Order Summary (40%) */}
          <Grid item xs={12} md={5}>
            <Box sx={{ p: 2, border: '1px solid #ccc', borderRadius: 2 }}>
              <Typography variant="h6" gutterBottom>Order Summary</Typography>
              <List>
                {orderItems.map((item, index) => (
                  <ListItem key={index} disableGutters>
                    <ListItemText primary={`${item.name} x ${item.quantity}`} /> 
                    <Typography variant="body2">${item.price * item.quantity}</Typography>
                  </ListItem>
                ))}
              </List>
              <Box sx={{ mt: 2 }}>
                <Typography variant="h6">Total Bill: ${totalBill}</Typography>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};

export default Checkout;
