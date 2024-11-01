import React from "react";

function Support() {
  return (
    <div style={styles.container}>
      {/* Title */}
      <h1 style={styles.title}>24/7 Customer Support – We're Here Anytime!</h1>

      {/* Image */}
      <div style={styles.imageContainer}>
        <i class="fa-light fa-headset fa-xl"></i>
      </div>

      {/* Description */}
      <p style={styles.description}>
        Need assistance? Our dedicated customer support team is available 24/7
        to help you with any questions, orders, or issues. Day or night, we’re
        here to ensure your experience is seamless.
      </p>

      {/* Benefits Section */}
      <div style={styles.benefits}>
        <h2 style={styles.subtitle}>Why Choose 24/7 Support?</h2>
        <ul style={styles.benefitsList}>
          <li>Access support at any time, no matter where you are.</li>
          <li>Instant responses from friendly, knowledgeable staff.</li>
          <li>Help with orders, tracking, and product information.</li>
          <li>Multiple contact options, including phone, chat, and email.</li>
        </ul>
      </div>

      {/* CTA */}
      <p style={styles.callToAction}>
        Reach out whenever you need – we’re always here to support you!
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

export default Support;
