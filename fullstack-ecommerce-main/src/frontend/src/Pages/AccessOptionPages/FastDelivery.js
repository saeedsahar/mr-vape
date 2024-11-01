import React from "react";

function FastDelivery() {
  return (
    <div style={styles.container}>
      {/* Title */}
      <h1 style={styles.title}>Enjoy Fast Same-Day Delivery!</h1>

      {/* Image */}
      <div style={styles.imageContainer}>
        <i class="fa-light fa-truck-fast fa-xl"></i>
      </div>

      {/* Description */}
      <p style={styles.description}>
        Get your favorite vape products delivered right to your doorstep with
        our fast, same-day delivery service! We understand the need for
        convenience and speed, so we’ve made it easier than ever to access
        top-quality products without the wait.
      </p>

      {/* Benefits Section */}
      <div style={styles.benefits}>
        <h2 style={styles.subtitle}>Why Choose Our Same-Day Delivery?</h2>
        <ul style={styles.benefitsList}>
          <li>Guaranteed delivery within hours of placing your order.</li>
          <li>High-quality, carefully packaged products.</li>
          <li>Real-time tracking to keep you updated every step of the way.</li>
          <li>
            Available for a wide selection of vape kits, e-liquids, and
            accessories.
          </li>
        </ul>
      </div>

      {/* CTA */}
      <p style={styles.callToAction}>
        Experience the ease of quick delivery today. Order now and enjoy your
        vape products without the wait!
      </p>
    </div>
  );
}

// Styles
const styles = {
  container: {
    maxWidth: "800px",
    margin: "0 auto",
    padding: "20px",
    fontFamily: "Arial, sans-serif",
  },
  title: {
    fontSize: "32px",
    fontWeight: "bold",
    marginBottom: "20px",
    textAlign: "center",
  },
  imageContainer: {
    textAlign: "center",
    marginBottom: "20px",
  },
  image: {
    width: "100%",
    height: "auto",
    borderRadius: "8px",
  },
  description: {
    fontSize: "18px",
    color: "#555",
    marginBottom: "20px",
    textAlign: "center",
  },
  benefits: {
    fontSize: "16px",
    color: "#333",
    marginBottom: "20px",
  },
  subtitle: {
    fontSize: "24px",
    fontWeight: "bold",
    marginBottom: "10px",
  },
  benefitsList: {
    listStyleType: "disc",
    paddingLeft: "20px",
  },
  callToAction: {
    fontSize: "18px",
    color: "#333",
    textAlign: "center",
    fontWeight: "bold",
  },
};

export default FastDelivery;
