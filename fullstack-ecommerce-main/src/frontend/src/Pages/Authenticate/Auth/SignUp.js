import React, { useState } from "react";
import { TextField, Button, IconButton, InputAdornment } from "@mui/material";
import { Visibility, VisibilityOff, Email, Person, Lock } from "@mui/icons-material";
import { postRequests , base_url } from "../../../axios/API";

function SignUp(props) {
    const [form, setForm] = useState({
        email: "",
        name: "",
        surname: "",
        password: "",
        passwordRepeat: ""
      });
    
      const [isPasswordVisible, setIsPasswordVisible] = useState(false);
      const [isPasswordRepeatVisible, setIsPasswordRepeatVisible] = useState(false);
      const [errors, setErrors] = useState({
        email: false,
        name: false,
        surname: false,
        password: false,
        passwordRepeat: false,
        passwordMatch: false
      });
    
      const handleInputChange = (e) => {
        const { name, value } = e.target;
        setForm({ ...form, [name]: value });
      };
    
      const validateEmail = () => {
        if (!form.email) {
          setErrors((prev) => ({ ...prev, email: "Email is required" }));
        } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(form.email)) {
          setErrors((prev) => ({ ...prev, email: "Please enter a valid email address" }));
        } else {
          setErrors((prev) => ({ ...prev, email: false }));
        }
      };
    
      const validateField = (field) => {
        if (!form[field]) {
          setErrors((prev) => ({ ...prev, [field]: `${field.charAt(0).toUpperCase() + field.slice(1)} is required` }));
        } else {
          setErrors((prev) => ({ ...prev, [field]: false }));
        }
      };
    
      const validatePasswordsMatch = () => {
        if (form.password !== form.passwordRepeat) {
          setErrors((prev) => ({ ...prev, passwordMatch: "Passwords don't match" }));
        } else {
          setErrors((prev) => ({ ...prev, passwordMatch: false }));
        }
      };
    
      const handleSubmit = (e) => {
        e.preventDefault();
    
        // Run all validations
        validateEmail();
        validateField("name");
        validateField("surname");
        validateField("password");
        validateField("passwordRepeat");
        validatePasswordsMatch();
    
        if (!errors.email && !errors.name && !errors.surname && !errors.password && !errors.passwordMatch) {
          // Handle form submission
          postRequests(`${base_url}/api/v1/auth/register`, JSON.stringify({"email":form.email,"name":form.name,"surname":form.surname,"password":form.password}))
          .then(data => {
            console.log("Sign-up: " , data)
            props.setSelectedTab(0)
          })
          .catch(error => {
            console.log("Sign-up error")
          })
          console.log("Form Submitted", form);
        }
      };
    
      const togglePasswordVisibility = () => {
        setIsPasswordVisible(!isPasswordVisible);
      };
    
      const togglePasswordRepeatVisibility = () => {
        setIsPasswordRepeatVisible(!isPasswordRepeatVisible);
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
    
          {/* NAME */}
          <TextField
            label="Name"
            type="text"
            name="name"
            value={form.name}
            onChange={handleInputChange}
            onBlur={() => validateField("name")}
            error={!!errors.name}
            helperText={errors.name || ""}
            placeholder="John"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Person color="primary" />
                </InputAdornment>
              ),
            }}
            fullWidth
            margin="normal"
          />
    
          {/* SURNAME */}
          <TextField
            label="Surname"
            type="text"
            name="surname"
            value={form.surname}
            onChange={handleInputChange}
            onBlur={() => validateField("surname")}
            error={!!errors.surname}
            helperText={errors.surname || ""}
            placeholder="Doe"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Person color="primary" />
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
            onBlur={() => validateField("password")}
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
                  <IconButton onClick={togglePasswordVisibility} edge="end">
                    {isPasswordVisible ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
            fullWidth
            margin="normal"
          />
    
          {/* PASSWORD REPEAT */}
          <TextField
            label="Password repeat"
            type={isPasswordRepeatVisible ? "text" : "password"}
            name="passwordRepeat"
            value={form.passwordRepeat}
            onChange={handleInputChange}
            onBlur={() => validateField("passwordRepeat")}
            error={!!errors.passwordMatch || !!errors.passwordRepeat}
            helperText={errors.passwordMatch || errors.passwordRepeat || ""}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Lock color="primary" />
                </InputAdornment>
              ),
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={togglePasswordRepeatVisibility} edge="end">
                    {isPasswordRepeatVisible ? <Visibility /> : <VisibilityOff />}
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
              !form.email ||
              !form.name ||
              !form.surname ||
              !form.password ||
              !form.passwordRepeat ||
              !!errors.email ||
              !!errors.passwordMatch
            }
          >
            Sign Up
          </Button>
        </form>
      );
}

export default SignUp