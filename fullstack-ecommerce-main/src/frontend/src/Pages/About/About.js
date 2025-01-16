import React from "react";
import "./AboutUs.css"; // Custom styles for the About Us page
import { Box, Typography, Stack, Avatar, Grid } from "@mui/material";

function AboutUs() {
  return (
    <main className="about-us-main">
      {/* Hero Section */}
      <section className="about-us-hero bg-white py-5">
  <div className="container-lg text-center">
    {/* Heading */}
    <h1 className="hero-title" style={{ color: "#fa4f09", fontWeight: "bold" }}>
      <i
        className="fa-solid fa-star me-2"
        style={{ fontSize: "36px", color: "#fa4f09" }}
      ></i>
      Welcome to VapePlanet
      <i
        className="fa-solid fa-cloud ms-2"
        style={{ fontSize: "36px", color: "#fa4f09" }}
      ></i>
    </h1>

    {/* Subtitle */}
    <p
      className="hero-subtitle mt-3"
      style={{ fontSize: "18px", lineHeight: "1.6", color: "#333" }}
    >
      Your Premier Online Destination for Vaping Excellence in the UK.
      Discover the finest vape kits, e-liquids, and accessories tailored to
      elevate your vaping experience.
    </p>

    {/* Vape Icons */}
    <div
      className="mt-4 d-flex justify-content-center align-items-center gap-4 flex-wrap"
      style={{ fontSize: "24px" }}
    >
      {/* Icon 1: Premium Vapes */}
      <div className="text-center">
        <i
          className="fa-solid fa-vape"
          style={{ color: "#fa4f09", fontSize: "30px" }}
        ></i>
        <p className="mt-2" style={{ fontSize: "14px", color: "#333" }}>
          Premium Vapes
        </p>
      </div>

      {/* Icon 2: E-Liquids */}
      <div className="text-center">
        <i
          className="fa-solid fa-droplet"
          style={{ color: "#fa4f09", fontSize: "30px" }}
        ></i>
        <p className="mt-2" style={{ fontSize: "14px", color: "#333" }}>
          E-Liquids
        </p>
      </div>

      {/* Icon 3: Accessories */}
      <div className="text-center">
        <i
          className="fa-solid fa-tools"
          style={{ color: "#fa4f09", fontSize: "30px" }}
        ></i>
        <p className="mt-2" style={{ fontSize: "14px", color: "#333" }}>
          Accessories
        </p>
      </div>

      {/* Icon 4: Batteries */}
      <div className="text-center">
        <i
          className="fa-solid fa-battery-full"
          style={{ color: "#fa4f09", fontSize: "30px" }}
        ></i>
        <p className="mt-2" style={{ fontSize: "14px", color: "#333" }}>
          Long-Lasting Batteries
        </p>
      </div>

      {/* Icon 5: Trusted Quality */}
      <div className="text-center">
        <i
          className="fa-solid fa-shield-check"
          style={{ color: "#fa4f09", fontSize: "30px" }}
        ></i>
        <p className="mt-2" style={{ fontSize: "14px", color: "#333" }}>
          Trusted Quality
        </p>
      </div>
    </div>
  </div>
</section>

      

      {/* About Us Section */}
      <section className="about-us-content py-5">
        <div className="container-lg">
          <Typography variant="h4" gutterBottom className="text-center fw-bold">
            About VapePlanet
          </Typography>
          <Typography
            variant="body1"
            className="text-muted text-center mb-5"
            sx={{ fontSize: "18px" }}
          >
            At VapePlanet, we are committed to delivering top-quality vaping
            products, exceptional customer service, and the latest innovations
            in the vaping world.
          </Typography>

          <Grid container spacing={4}>
            {/* Mission Section */}
            <Grid item md={4} sm={12} xs={12} className="text-center">
              <Box className="icon-box">
                <i
                  className="fa-solid fa-bullseye"
                  style={{ fontSize: "40px", color: "#fa4f09" }}
                ></i>
              </Box>
              <Typography variant="h5" className="fw-bold mt-3">
                Our Mission
              </Typography>
              <Typography variant="body2" className="text-muted mt-2">
                To enhance your vaping journey with a wide selection of safe,
                reliable, and innovative vaping products tailored to your needs.
              </Typography>
            </Grid>

            {/* Vision Section */}
            <Grid item md={4} sm={12} xs={12} className="text-center">
              <Box className="icon-box">
                <i
                  className="fa-solid fa-eye"
                  style={{ fontSize: "40px", color: "#4caf50" }}
                ></i>
              </Box>
              <Typography variant="h5" className="fw-bold mt-3">
                Our Vision
              </Typography>
              <Typography variant="body2" className="text-muted mt-2">
                To be the leading online vaping store in the UK, offering
                unparalleled quality and variety to vapers of all experience
                levels.
              </Typography>
            </Grid>

            {/* Values Section */}
            <Grid item md={4} sm={12} xs={12} className="text-center">
              <Box className="icon-box">
                <i
                  className="fa-solid fa-handshake"
                  style={{ fontSize: "40px", color: "#2196f3" }}
                ></i>
              </Box>
              <Typography variant="h5" className="fw-bold mt-3">
                Our Values
              </Typography>
              <Typography variant="body2" className="text-muted mt-2">
                Trust, transparency, and a dedication to providing a positive
                vaping experience for all our customers.
              </Typography>
            </Grid>
          </Grid>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="why-choose-us py-5 bg-light">
        <div className="container-lg">
          <Typography
            variant="h4"
            gutterBottom
            className="text-center fw-bold mb-4"
          >
            Why Choose VapePlanet?
          </Typography>

          <Grid container spacing={4}>
            <Grid item md={3} sm={6} xs={12} className="text-center">
              <Avatar
                variant="rounded"
                sx={{
                  bgcolor: "#fa4f09",
                  width: 60,
                  height: 60,
                  margin: "0 auto",
                }}
              >
                <i className="fa-solid fa-shield-check"></i>
              </Avatar>
              <Typography variant="h6" className="fw-bold mt-3">
                Safety First
              </Typography>
              <Typography
                variant="body2"
                className="text-muted mt-2"
                sx={{ fontSize: "14px" }}
              >
                All products meet strict safety and quality standards.
              </Typography>
            </Grid>

            <Grid item md={3} sm={6} xs={12} className="text-center">
              <Avatar
                variant="rounded"
                sx={{
                  bgcolor: "#4caf50",
                  width: 60,
                  height: 60,
                  margin: "0 auto",
                }}
              >
                <i className="fa-solid fa-truck"></i>
              </Avatar>
              <Typography variant="h6" className="fw-bold mt-3">
                Fast Delivery
              </Typography>
              <Typography
                variant="body2"
                className="text-muted mt-2"
                sx={{ fontSize: "14px" }}
              >
                Enjoy same-day dispatch and free shipping on selected orders.
              </Typography>
            </Grid>

            <Grid item md={3} sm={6} xs={12} className="text-center">
              <Avatar
                variant="rounded"
                sx={{
                  bgcolor: "#2196f3",
                  width: 60,
                  height: 60,
                  margin: "0 auto",
                }}
              >
                <i className="fa-solid fa-thumbs-up"></i>
              </Avatar>
              <Typography variant="h6" className="fw-bold mt-3">
                Customer Support
              </Typography>
              <Typography
                variant="body2"
                className="text-muted mt-2"
                sx={{ fontSize: "14px" }}
              >
                Our dedicated team is here to assist you 24/7.
              </Typography>
            </Grid>

            <Grid item md={3} sm={6} xs={12} className="text-center">
              <Avatar
                variant="rounded"
                sx={{
                  bgcolor: "#fa8c16",
                  width: 60,
                  height: 60,
                  margin: "0 auto",
                }}
              >
                <i className="fa-solid fa-star"></i>
              </Avatar>
              <Typography variant="h6" className="fw-bold mt-3">
                Premium Quality
              </Typography>
              <Typography
                variant="body2"
                className="text-muted mt-2"
                sx={{ fontSize: "14px" }}
              >
                We offer a curated range of top-notch vaping products.
              </Typography>
            </Grid>
          </Grid>
        </div>
      </section>

      {/* Call to Action */}
      <section className="call-to-action py-5 text-white" style={{ backgroundColor: "#fa4f09" }}>
        <div className="container-lg text-center">
          <Typography variant="h5" className="fw-bold mb-3">
            Ready to Elevate Your Vaping Experience?
          </Typography>
          <button
            className="btn btn-light text-uppercase fw-bold px-4 py-2"
            style={{
              borderRadius: "30px",
              color: "#fa4f09",
              border: "2px solid #fff",
            }}
            onClick={() => (window.location.href = "/products")}
          >
            Explore Products <i className="fa-solid fa-arrow-right"></i>
          </button>
        </div>
      </section>
    </main>
  );
}

export default AboutUs;
