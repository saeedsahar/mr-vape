import React from "react";
import { useSelector } from "react-redux";

function Blog(props) {
  let blogState = useSelector((state) => state.blog.selectedBlog);
  console.log("descriptiton is ...."+blogState.description)

  // debugger
  let content = blogState.description;
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
          <p 
          key={index} 
          style={styles.paragraph} 
          dangerouslySetInnerHTML={{ __html: paragraph }} 
        />
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
  smallH2: {
    fontSize: "15px",  // 'font-size' should be 'fontSize' in camelCase
  },
 
};

export default Blog;
