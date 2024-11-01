import React from "react";

function FreeShipping() {
  return (
    <div style={styles.container}>
      {/* Title */}
      <h1 style={styles.title}>Enjoy Free Shipping on All Orders!</h1>

      {/* Image */}
      <div style={styles.imageContainer}>
        <i class="fa-light fa-dolly fa-xl"></i>
      </div>

      {/* Description */}
      <p style={styles.description}>
        Say goodbye to extra costs with our free shipping service! We offer free
        shipping on all orders, so you can enjoy our top-quality vape products
        delivered directly to your door without any added fees.
      </p>

      {/* Benefits Section */}
      <div style={styles.benefits}>
        <h2 style={styles.subtitle}>Why Choose Free Shipping?</h2>
        <ul style={styles.benefitsList}>
          <li>No hidden fees – what you see is what you pay.</li>
          <li>Fast, reliable delivery across all regions.</li>
          <li>Convenient and budget-friendly for regular orders.</li>
          <li>
            Available on all products, including vape kits and accessories.
          </li>
        </ul>
      </div>

      {/* CTA */}
      <p style={styles.callToAction}>
        Enjoy the convenience of free shipping today – order now and experience
        hassle-free delivery on us!
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

export default FreeShipping;
