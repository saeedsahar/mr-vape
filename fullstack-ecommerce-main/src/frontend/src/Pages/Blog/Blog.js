import React from "react";
import { useSelector } from "react-redux";

function Blog(props) {
  let blogState = useSelector((state) => state.blog.selectedBlog);

  let content = `The vape industry is constantly evolving, with new innovations each year. In 2024, we expect to see more compact designs in vape kits that make them easier to carry and use on the go.\n\nBattery life is another area seeing significant improvement. Vape kits are now designed with longer-lasting batteries and faster charging times, ensuring users don’t have to worry about frequent recharging.\n\nHeating mechanisms have also seen an upgrade, with smoother vapor production and flavor retention. With each trend, manufacturers are working to make the vaping experience safer and more enjoyable for users of all experience levels.\n\nThe vape industry is constantly evolving, with new innovations each year. In 2024, we expect to see more compact designs in vape kits that make them easier to carry and use on the go.\n\nBattery life is another area seeing significant improvement. Vape kits are now designed with longer-lasting batteries and faster charging times, ensuring users don’t have to worry about frequent recharging.\n\nHeating mechanisms have also seen an upgrade, with smoother vapor production and flavor retention. With each trend, manufacturers are working to make the vaping experience safer and more enjoyable for users of all experience levels.\n\nThe vape industry is constantly evolving, with new innovations each year. In 2024, we expect to see more compact designs in vape kits that make them easier to carry and use on the go.\n\nBattery life is another area seeing significant improvement. Vape kits are now designed with longer-lasting batteries and faster charging times, ensuring users don’t have to worry about frequent recharging.\n\nHeating mechanisms have also seen an upgrade, with smoother vapor production and flavor retention. With each trend, manufacturers are working to make the vaping experience safer and more enjoyable for users of all experience levels.\n\nThe vape industry is constantly evolving, with new innovations each year. In 2024, we expect to see more compact designs in vape kits that make them easier to carry and use on the go.\n\nBattery life is another area seeing significant improvement. Vape kits are now designed with longer-lasting batteries and faster charging times, ensuring users don’t have to worry about frequent recharging.\n\nHeating mechanisms have also seen an upgrade, with smoother vapor production and flavor retention. With each trend, manufacturers are working to make the vaping experience safer and more enjoyable for users of all experience levels.`;
  return (
    <div style={styles.container}>
      {/* Main Title */}
      <h1 style={styles.title}>{blogState?.title}</h1>

      {/* Blog Image */}
      <div style={styles.imageContainer}>
        <img
          src={blogState?.image}
          alt={blogState?.title}
          style={styles.image}
        />
      </div>

      {/* Short Description */}
      <p style={styles.shortDescription}>{blogState?.shortDescription}</p>

      {/* Detailed Blog Content */}
      <div style={styles.content}>
        {content.split("\n\n").map((paragraph, index) => (
          <p key={index} style={styles.paragraph}>
            {paragraph}
          </p>
        ))}
      </div>
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
  shortDescription: {
    fontSize: "18px",
    fontWeight: "600",
    color: "#555",
    marginBottom: "20px",
    textAlign: "center",
  },
  content: {
    fontSize: "16px",
    lineHeight: "1.6",
    color: "#333",
  },
  paragraph: {
    marginBottom: "15px",
  },
};

export default Blog;
