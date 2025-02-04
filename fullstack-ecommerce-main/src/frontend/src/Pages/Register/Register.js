import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { postRequests } from "../../axios/API"; // Import your API function
import { base_url } from "../../axios/API"; // Import your base URL

function Register(props) {
  const navigate = useNavigate();

  // Form state
  const [form, setForm] = useState({
    name: "",
    surname: "",
    email: "",
    password: "",
    passwordRepeat: "",
  });

  // Validation errors state
  const [errors, setErrors] = useState({
    name: false,
    surname: false,
    email: false,
    password: false,
    passwordRepeat: false,
    passwordMatch: false,
    userExists: false,
  });

  // Handle input change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  // Validate email format
  const validateEmail = () => {
    if (!form.email) {
      setErrors({ ...errors, email: "Email is required" });
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(form.email)) {
      setErrors({ ...errors, email: "Invalid email address" });
    } else {
      setErrors({ ...errors, email: false });
    }
  };

  // Validate required fields
  const validateField = (field) => {
    if (!form[field]) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        [field]: `${field} is required`,
      }));
    } else {
      setErrors((prevErrors) => ({ ...prevErrors, [field]: false }));
    }
  };

  // Check if passwords match
  const validatePasswordsMatch = () => {
    if (form.password !== form.passwordRepeat) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        passwordMatch: "Passwords do not match",
      }));
    } else {
      setErrors((prevErrors) => ({ ...prevErrors, passwordMatch: false }));
    }
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    // Run all validations
    validateEmail();
    validateField("name");
    validateField("surname");
    validateField("password");
    validateField("passwordRepeat");
    validatePasswordsMatch();

    // Check if all validations passed
    if (
      !errors.email &&
      !errors.name &&
      !errors.surname &&
      !errors.password &&
      !errors.passwordMatch
    ) {
      // API call to register user
      postRequests(
        `${base_url}/api/v1/auth/register`,
        JSON.stringify({
          email: form.email,
          name: form.name,
          surname: form.surname,
          password: form.password,
        })
      )
        .then((data) => {
          navigate("/authenticate");
        })
        .catch((error) => {
          console.log("Sign-up error", error);
          setErrors({
            ...errors,
            userExists: true,
          });
        });
      console.log("Form Submitted", form);
    }
  };

  return (
    <>
      <main>
        {/* Page banner area */}
        <section
          className="page-banner bg-image pt-130 pb-130"
          style={{
            backgroundImage: "url(https://s3.eu-west-2.amazonaws.com/www.vapeplanet.co.uk/websitelayouts/SignIn-top-banner-v2.jpg)",
          }}
        ></section>

        {/* Login area */}
        <section className="login-area pt-130 pb-130">
          <div className="container-lg">
            <div className="login__item">
              <div className="row g-4">
                <div className="col-xxl-8">
                  <div className="login__image">
                    <img
                      src="https://s3.eu-west-2.amazonaws.com/www.vapeplanet.co.uk/websitelayouts/Login-Box.jpg"
                      alt="image"
                    />
                    <div className="btn-wrp pointer">
                      <a
                        style={{ color: "white", borderColor: "white" }}
                        onClick={() => navigate("/authenticate")}
                      >
                        Sign In
                      </a>
                      <a className="active" style={{ color: "white" }}>
                        Create Account
                      </a>
                    </div>
                  </div>
                </div>

                <div className="col-xxl-4">
                  <div className="login__content">
                    <h2 className="mb-65">Create Account</h2>
                    <div className="form-area login__form">
                      <form onSubmit={handleSubmit}>
                        {/* Name Input */}
                        <input
                          type="text"
                          name="name"
                          placeholder="First Name"
                          style={{ color: "black" }}
                          value={form.name}
                          onChange={handleInputChange}
                          className={`mt-30 ${errors.name ? "error" : ""}`}
                        />
                        {errors.name && (
                          <span className="error-text">{errors.name}</span>
                        )}

                        {/* Surname Input */}
                        <input
                          type="text"
                          name="surname"
                          placeholder="Last Name"
                          style={{ color: "black" }}
                          value={form.surname}
                          onChange={handleInputChange}
                          className={`mt-30 ${errors.surname ? "error" : ""}`}
                        />
                        {errors.surname && (
                          <span className="error-text">{errors.surname}</span>
                        )}

                        {/* Email Input */}
                        <input
                          type="email"
                          name="email"
                          placeholder="Email"
                          value={form.email}
                          style={{ color: "black" }}
                          onChange={handleInputChange}
                          onBlur={validateEmail}
                          className={`mt-30 ${errors.email ? "error" : ""}`}
                        />
                        {errors.email && (
                          <span className="error-text">{errors.email}</span>
                        )}

                        {/* Password Input */}
                        <input
                          type="password"
                          name="password"
                          placeholder="Enter Password"
                          style={{ color: "black" }}
                          value={form.password}
                          onChange={handleInputChange}
                          className={`mt-30 ${errors.password ? "error" : ""}`}
                        />
                        {errors.password && (
                          <span className="error-text">{errors.password}</span>
                        )}

                        {/* Confirm Password Input */}
                        <input
                          type="password"
                          name="passwordRepeat"
                          placeholder="Confirm Password"
                          style={{ color: "black" }}
                          value={form.passwordRepeat}
                          onChange={handleInputChange}
                          className={`mt-30 ${
                            errors.passwordRepeat ? "error" : ""
                          }`}
                        />
                        {errors.passwordMatch && (
                          <span className="error-text">
                            {errors.passwordMatch}
                          </span>
                        )}

                        {/* Submit Button */}
                        <button
                          type="submit"
                          className="mt-30"
                          style={{ color: "white" }}
                        >
                          Create Account
                        </button>
                        {errors.userExists && (
                          <span className="error-text">
                            Failed to register user!
                          </span>
                        )}
                        <div className="radio-btn mt-30">
                          <span style={{ backgroundColor: "white" }} />
                          <p style={{ color: "black" }}>
                            I accept your terms &amp; conditions
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
    </>
  );
}

export default Register;
