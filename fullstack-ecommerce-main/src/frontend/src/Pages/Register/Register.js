import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { postRequests } from "../../axios/API"; // API call
import { base_url } from "../../axios/API"; // Base URL

function Register() {
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
  const [errors, setErrors] = useState({});

  // Handle input change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
    setErrors({ ...errors, [name]: "" }); // Clear errors on input change
  };

  // Validation logic
  const validateFields = () => {
    const newErrors = {};
    if (!form.name) newErrors.name = "First name is required.";
    if (!form.surname) newErrors.surname = "Last name is required.";
    if (!form.email) {
      newErrors.email = "Email is required.";
    } else if (
      !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(form.email)
    ) {
      newErrors.email = "Enter a valid email address.";
    }
    if (!form.password) {
      newErrors.password = "Password is required.";
    } else if (form.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters long.";
    }
    if (!form.passwordRepeat) {
      newErrors.passwordRepeat = "Please confirm your password.";
    } else if (form.password !== form.passwordRepeat) {
      newErrors.passwordRepeat = "Passwords do not match.";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    if (validateFields()) {
      postRequests(
        `${base_url}/api/v1/auth/register`,
        JSON.stringify({
          email: form.email,
          name: form.name,
          surname: form.surname,
          password: form.password,
        })
      )
        .then(() => {
          navigate("/authenticate");
        })
        .catch((error) => {
          console.error("Registration error:", error);
          setErrors((prev) => ({
            ...prev,
            email: "User with this email already exists.",
          }));
        });
    }
  };

  return (
    <main>
      {/* Banner Section */}
      <section
        style={{
          backgroundImage:
            "url('https://s3.eu-west-2.amazonaws.com/www.vapeplanet.co.uk/websitelayouts/SignIn-top-banner-v2.jpg')",
          padding: "130px 0",
          textAlign: "center",
          backgroundSize: "cover",
          color: "white",
        }}
      >
        <h2>Create Account</h2>
      </section>

      {/* Registration Section */}
      <section style={{ padding: "130px 0", backgroundColor: "#f8f9fa" }}>
        <div style={{ maxWidth: "600px", margin: "0 auto" }}>
          <div
            style={{
              backgroundColor: "white",
              padding: "30px",
              borderRadius: "10px",
              boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
            }}
          >
            <h3 style={{ textAlign: "center", marginBottom: "20px" }}>Sign Up</h3>

            <form onSubmit={handleSubmit}>
              {/* First Name */}
              <div style={{ marginBottom: "15px" }}>
                <label htmlFor="name" style={{ display: "block", marginBottom: "5px" }}>
                  First Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={form.name}
                  onChange={handleInputChange}
                  style={{
                    width: "100%",
                    padding: "10px",
                    borderRadius: "5px",
                    border: errors.name ? "1px solid #dc3545" : "1px solid #ccc",
                  }}
                  placeholder="Enter your first name"
                />
                {errors.name && (
                  <span style={{ color: "#dc3545", fontSize: "14px" }}>{errors.name}</span>
                )}
              </div>

              {/* Last Name */}
              <div style={{ marginBottom: "15px" }}>
                <label htmlFor="surname" style={{ display: "block", marginBottom: "5px" }}>
                  Last Name
                </label>
                <input
                  type="text"
                  id="surname"
                  name="surname"
                  value={form.surname}
                  onChange={handleInputChange}
                  style={{
                    width: "100%",
                    padding: "10px",
                    borderRadius: "5px",
                    border: errors.surname ? "1px solid #dc3545" : "1px solid #ccc",
                  }}
                  placeholder="Enter your last name"
                />
                {errors.surname && (
                  <span style={{ color: "#dc3545", fontSize: "14px" }}>
                    {errors.surname}
                  </span>
                )}
              </div>

              {/* Email */}
              <div style={{ marginBottom: "15px" }}>
                <label htmlFor="email" style={{ display: "block", marginBottom: "5px" }}>
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={form.email}
                  onChange={handleInputChange}
                  style={{
                    width: "100%",
                    padding: "10px",
                    borderRadius: "5px",
                    border: errors.email ? "1px solid #dc3545" : "1px solid #ccc",
                  }}
                  placeholder="Enter your email"
                />
                {errors.email && (
                  <span style={{ color: "#dc3545", fontSize: "14px" }}>{errors.email}</span>
                )}
              </div>

              {/* Password */}
              <div style={{ marginBottom: "15px" }}>
                <label htmlFor="password" style={{ display: "block", marginBottom: "5px" }}>
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={form.password}
                  onChange={handleInputChange}
                  style={{
                    width: "100%",
                    padding: "10px",
                    borderRadius: "5px",
                    border: errors.password ? "1px solid #dc3545" : "1px solid #ccc",
                  }}
                  placeholder="Enter your password"
                />
                {errors.password && (
                  <span style={{ color: "#dc3545", fontSize: "14px" }}>
                    {errors.password}
                  </span>
                )}
              </div>

              {/* Confirm Password */}
              <div style={{ marginBottom: "15px" }}>
                <label
                  htmlFor="passwordRepeat"
                  style={{ display: "block", marginBottom: "5px" }}
                >
                  Confirm Password
                </label>
                <input
                  type="password"
                  id="passwordRepeat"
                  name="passwordRepeat"
                  value={form.passwordRepeat}
                  onChange={handleInputChange}
                  style={{
                    width: "100%",
                    padding: "10px",
                    borderRadius: "5px",
                    border: errors.passwordRepeat
                      ? "1px solid #dc3545"
                      : "1px solid #ccc",
                  }}
                  placeholder="Confirm your password"
                />
                {errors.passwordRepeat && (
                  <span style={{ color: "#dc3545", fontSize: "14px" }}>
                    {errors.passwordRepeat}
                  </span>
                )}
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                style={{
                  width: "100%",
                  padding: "10px",
                  borderRadius: "5px",
                  backgroundColor: "#007bff",
                  color: "white",
                  border: "none",
                  fontSize: "16px",
                }}
              >
                Create Account
              </button>
            </form>

            <div style={{ textAlign: "center", marginTop: "20px" }}>
              <p>
                Already have an account?{" "}
                <a
                  href="#"
                  onClick={() => navigate("/authenticate")}
                  style={{ color: "#007bff", textDecoration: "underline" }}
                >
                  Sign In
                </a>
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

export default Register;
