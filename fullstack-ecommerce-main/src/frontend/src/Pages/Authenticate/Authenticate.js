import React, { useState } from "react";
// import { IconButton, InputAdornment } from "@mui/material";
// import { Visibility, VisibilityOff } from "@mui/icons-material";
import { base_url, postRequests, getAuthRequests } from "../../axios/API";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { signin, setUserDetails } from "./AuthSlice";
import bannerBImg from "../../assets/images/banner/inner-banner.jpg";

function Authenticate(props) {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // State for form inputs and errors
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [errors, setErrors] = useState({
    email: false,
    password: false,
  });

  // Handle input change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  // Email validation
  const validateEmail = () => {
    if (!form.email) {
      setErrors({ ...errors, email: "Email is required" });
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(form.email)) {
      setErrors({ ...errors, email: "Please enter a valid email address" });
    } else {
      setErrors({ ...errors, email: false });
    }
  };

  // Password validation
  const validatePassword = () => {
    if (!form.password) {
      setErrors({ ...errors, password: "Password is required" });
    } else {
      setErrors({ ...errors, password: false });
    }
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    validateEmail();
    validatePassword();

    if (!errors.email && !errors.password) {
      // API call to authenticate
      postRequests(
        `${base_url}/api/v1/auth/authenticate`,
        JSON.stringify({ email: form.email, password: form.password })
      )
        .then((data) => {
          // Dispatch action to save token
          dispatch(signin(data.data?.token));
          console.log("Sign in successful: ", data);

          // Get user details after successful sign-in
          getAuthRequests(`${base_url}/api/v1/auth/me`).then((data) => {
            console.log("User details: ", data);
            dispatch(setUserDetails(data.data));
            navigate("/");
          });
        })
        .catch((error) => {
          console.log("Sign in error", error);
        });
    }
  };

  // Toggle password visibility
  const toggleVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  return (
    <main>
      {/* Page banner area */}
      <section
        className="page-banner bg-image pt-130 pb-130"
        style={{
          backgroundImage: `url(https://s3.eu-west-2.amazonaws.com/www.vapeplanet.co.uk/websitelayouts/SignIn-top-banner-v2.jpg)`,
        }}
      >
        <div className="container-lg">
          <h2
            className="wow fadeInUp mb-15 text-white"
            data-wow-duration="1.1s"
            data-wow-delay=".1s"
          >
            Sign In
          </h2>
          <div
            className="breadcrumb-list wow fadeInUp"
            data-wow-duration="1.3s"
            data-wow-delay=".3s"
          >
            <a className="primary-hover">
              <i className="fa-solid fa-house me-1" /> Home{" "}
              <i className="fa-regular text-white fa-angle-right" />
            </a>
            <span>Sign In</span>
          </div>
        </div>
      </section>

      {/* Login area */}
      <section className="login-area pt-130 pb-130 bg-light">
        <div className="container-lg">
          <div className="login__item">
            <div className="row g-4">
              <div className="col-xxl-8">
                <div className="login__image">
                  <img
                    src="https://s3.eu-west-2.amazonaws.com/www.vapeplanet.co.uk/websitelayouts/Login-Box.jpg"
                    alt="image"
                  />
                  <div className="btn-wrp">
                    <a style={{ color: "white" }} className="active">
                      Sign In
                    </a>
                    <a
                      style={{ color: "white", borderColor: "white" }}
                      onClick={() => navigate("/register")}
                    >
                      Create Account
                    </a>
                  </div>
                </div>
              </div>

              <div className="col-xxl-4">
                <div className="login__content">
                  <h2>Welcome Back</h2>
                  <div className="form-area login__form">
                    <form onSubmit={handleSubmit}>
                      {/* Email Input */}
                      <input
                        type="email"
                        name="email"
                        style={{ color: "black" }}
                        value={form.email}
                        onChange={handleInputChange}
                        onBlur={validateEmail}
                        placeholder="Email"
                        className={`mt-30 ${errors.email ? "error" : ""}`}
                      />
                      {errors.email && (
                        <span className="error-text">{errors.email}</span>
                      )}

                      {/* Password Input */}
                      <div className="mt-30 password-field">
                        <input
                          type={isPasswordVisible ? "text" : "password"}
                          name="password"
                          value={form.password}
                          style={{ color: "black" }}
                          onChange={handleInputChange}
                          onBlur={validatePassword}
                          placeholder="Enter Password"
                          className={`mt-30 ${errors.password ? "error" : ""}`}
                        />
                        {/* <InputAdornment position="end">
                          <IconButton onClick={toggleVisibility} edge="end">
                            {isPasswordVisible ? (
                              <Visibility />
                            ) : (
                              <VisibilityOff />
                            )}
                          </IconButton>
                        </InputAdornment> */}
                      </div>
                      {errors.password && (
                        <span className="error-text">{errors.password}</span>
                      )}

                      {/* Sign In Button */}
                      <button
                        type="submit"
                        className="mt-30 pointer"
                        style={{ color: "white" }}
                        onClick={(e) => handleSubmit(e)}
                        disabled={
                          !form.email ||
                          !form.password ||
                          !!errors.email ||
                          !!errors.password
                        }
                      >
                        Sign In
                      </button>

                      <div className="radio-btn mt-30">
                        <span style={{ backgroundColor: "white" }} />
                        <p style={{ color: "black" }}>
                          I accept your terms & conditions
                        </p>
                      </div>
                    </form>
                  </div>
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
