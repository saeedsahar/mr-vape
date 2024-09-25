import React, { useState } from "react";
import { TextField, Button, IconButton, InputAdornment } from "@mui/material";
import { Visibility, VisibilityOff, Email, Lock } from "@mui/icons-material";
import { base_url, getRequests, postRequests, getAuthRequests } from "../../../axios/API";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux'
import {signin, setUserDetails } from '../AuthSlice'

function SignIn(props) {
//   const auth = useSelector((state) => state.counter.value)
  let authdispatch = useDispatch()
  const navigate = useNavigate();
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [errors, setErrors] = useState({
    email: false,
    password: false,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const validateEmail = () => {
    if (!form.email) {
      setErrors({ ...errors, email: "Email is required" });
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(form.email)) {
      setErrors({ ...errors, email: "Please enter a valid email address" });
    } else {
      setErrors({ ...errors, email: false });
    }
  };

  const validatePassword = () => {
    if (!form.password) {
      setErrors({ ...errors, password: "Password is required" });
    } else {
      setErrors({ ...errors, password: false });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    validateEmail();
    validatePassword();

    if (!errors.email && !errors.password) {
      // Handle form submission
      postRequests(
        `${base_url}/api/v1/auth/authenticate`,
        JSON.stringify({ email: form.email, password: form.password })
      )
        .then((data) => {
          authdispatch(signin(data.data?.token))
          console.log("Sign-ip: ", data);
          getAuthRequests(`${base_url}/api/v1/auth/me`).then((data) => {
            console.log("User details: ", data);
            authdispatch(setUserDetails(data.data))
            navigate("/");
          });
        })
        .catch((error) => {
          console.log("Sign-ip error");
        });
      console.log("Form Submitted", form);
    }
  };

  const toggleVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* EMAIL */}
      <TextField
        label="Email"
        type="email"
        name="email"
        value={form.email}
        onChange={handleInputChange}
        onBlur={validateEmail}
        error={!!errors.email}
        helperText={errors.email || ""}
        placeholder="Ex. pat@example.com"
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <Email color="primary" />
            </InputAdornment>
          ),
        }}
        fullWidth
        margin="normal"
      />

      {/* PASSWORD */}
      <TextField
        label="Password"
        type={isPasswordVisible ? "text" : "password"}
        name="password"
        value={form.password}
        onChange={handleInputChange}
        onBlur={validatePassword}
        error={!!errors.password}
        helperText={errors.password || ""}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <Lock color="primary" />
            </InputAdornment>
          ),
          endAdornment: (
            <InputAdornment position="end">
              <IconButton onClick={toggleVisibility} edge="end">
                {isPasswordVisible ? <Visibility /> : <VisibilityOff />}
              </IconButton>
            </InputAdornment>
          ),
        }}
        fullWidth
        margin="normal"
      />

      {/* BUTTON */}
      <Button
        type="submit"
        variant="contained"
        color="primary"
        fullWidth
        disabled={
          !form.email || !form.password || !!errors.email || !!errors.password
        }
      >
        Sign In
      </Button>
    </form>
  );
}

export default SignIn;
