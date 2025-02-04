import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { signin, setUserDetails } from "./AuthSlice";

import { base_url, postRequests, getAuthRequests } from "../../axios/API";
import "./Authenticate.css";

function Authenticate() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // State for form inputs and errors
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({
    email: "",
    password: "",
  });

  // Handle input change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  // Email validation
  const validateEmail = () => {
    if (!form.email) {
      setErrors((prev) => ({ ...prev, email: "Email is required." }));
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(form.email)) {
      setErrors((prev) => ({ ...prev, email: "Enter a valid email address." }));
    } else {
      setErrors((prev) => ({ ...prev, email: "" }));
    }
  };

  // Password validation
  const validatePassword = () => {
    if (!form.password) {
      setErrors((prev) => ({ ...prev, password: "Password is required." }));
    } else if (form.password.length < 6) {
      setErrors((prev) => ({
        ...prev,
        password: "Password must be at least 6 characters long.",
      }));
    } else {
      setErrors((prev) => ({ ...prev, password: "" }));
    }
  };

  // Form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    validateEmail();
    validatePassword();

    if (!errors.email && !errors.password) {
      postRequests(`${base_url}/api/v1/auth/authenticate`, form)
        .then((data) => {
          // Save token and navigate to the home page
          dispatch(signin(data.data?.token));
          getAuthRequests(`${base_url}/api/v1/auth/me`).then((userData) => {
            dispatch(setUserDetails(userData.data));
            navigate("/");
          });
        })
        .catch((error) => {
          console.error("Sign in error:", error);
        });
    }
  };

  return (
    <main>
      {/* Banner Section */}
      <section
        className="page-banner bg-image pt-130 pb-130"
        style={{
          backgroundImage: `url('https://s3.eu-west-2.amazonaws.com/www.vapeplanet.co.uk/websitelayouts/SignIn-top-banner-v2.jpg')`,
        }}
      >
        <div className="container-lg text-center">
          <h2 className="text-white">Sign In</h2>
        </div>
      </section>

      {/* Login Section */}
      <section className="login-area pt-130 pb-130">
        <div className="container-lg">
          <div className="row justify-content-center">
            <div className="col-md-6">
              <div className="login-box p-4 shadow-lg rounded">
                <h3 className="text-center mb-4">Welcome Back</h3>

                <form onSubmit={handleSubmit}>
                  {/* Email Field */}
                  <div className="form-group mb-4">
                    <label htmlFor="email" className="form-label">
                      Email Address
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={form.email}
                      onChange={handleInputChange}
                      onBlur={validateEmail}
                      className={`form-control ${
                        errors.email ? "is-invalid" : ""
                      }`}
                      placeholder="Enter your email"
                    />
                    {errors.email && (
                      <div className="invalid-feedback">{errors.email}</div>
                    )}
                  </div>

                  {/* Password Field */}
                  <div className="form-group mb-4">
                    <label htmlFor="password" className="form-label">
                      Password
                    </label>
                    <input
                      type="password"
                      id="password"
                      name="password"
                      value={form.password}
                      onChange={handleInputChange}
                      onBlur={validatePassword}
                      className={`form-control ${
                        errors.password ? "is-invalid" : ""
                      }`}
                      placeholder="Enter your password"
                    />
                    {errors.password && (
                      <div className="invalid-feedback">{errors.password}</div>
                    )}
                  </div>

                  {/* Sign In Button */}
                  <button
                    type="submit"
                    className="btn btn-primary w-100 py-2"
                    disabled={!form.email || !form.password}
                  >
                    Sign In
                  </button>
                </form>

                <div className="text-center mt-3">
                  <a
                    href="#"
                    onClick={() => navigate("/forgot-password")}
                    className="text-secondary"
                  >
                    Forgot Password?
                  </a>
                </div>

                <hr className="my-4" />

                <div className="text-center">
                  <p>
                    Don't have an account?{" "}
                    <a
                      href="#"
                      onClick={() => navigate("/register")}
                      className="text-primary"
                    >
                      Create Account
                    </a>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

export default Authenticate;
