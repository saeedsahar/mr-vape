import React from "react";

function SameDayDispatch() {
  return (
    <div style={styles.container}>
      {/* Title */}
      <h1 style={styles.title}>Order Today, Dispatched Today!</h1>

      {/* Image */}
      <div style={styles.imageContainer}>
        <i class="fa-light fa-truck-container fa-xl"></i>
      </div>

      {/* Description */}
      <p style={styles.description}>
        Don’t wait around – with our same-day dispatch service, your order is
        packed and on its way the very same day! Get your favorite vape products
        quickly and enjoy a smooth, seamless experience from start to finish.
      </p>

      {/* Benefits Section */}
      <div style={styles.benefits}>
        <h2 style={styles.subtitle}>Why Choose Same-Day Dispatch?</h2>
        <ul style={styles.benefitsList}>
          <li>Fast processing so your order is dispatched within hours.</li>
          <li>Enjoy shorter wait times and quicker delivery.</li>
          <li>
            Available on a wide selection of products with no extra charge.
          </li>
          <li>Receive tracking updates as soon as your order is on its way.</li>
        </ul>
      </div>

      {/* CTA */}
      <p style={styles.callToAction}>
        Order now and experience the convenience of same-day dispatch. We’re
        here to get your products to you faster!
      </p>
    </div>
  );
}

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

export default SameDayDispatch;
