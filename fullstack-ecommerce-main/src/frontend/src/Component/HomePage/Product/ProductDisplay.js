import React from "react";
import { useNavigate } from "react-router-dom";

function ProductDisplay(props) {
  const navigate = useNavigate();
  const { product } = props;

  return (
    <div
      className="product-item bor shadow-sm rounded overflow-hidden"
      onClick={() => navigate(`/products/${product.id}`)}
      style={{
        cursor: "pointer",
        background: "#fff",
        transition: "transform 0.3s ease, box-shadow 0.3s ease",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = "scale(1.05)";
        e.currentTarget.style.boxShadow = "0 4px 20px rgba(0, 0, 0, 0.1)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = "scale(1)";
        e.currentTarget.style.boxShadow = "none";
      }}
    >
      {/* Wishlist Icon */}
      {/* <div
        className="wishlist-icon position-absolute top-0 end-0 p-2"
        style={{
          background: "rgba(255, 255, 255, 0.9)",
          borderRadius: "50%",
          zIndex: 2,
          transform: "translate(-10px, 10px)",
        }}
        onClick={(e) => e.stopPropagation()} // Prevent triggering navigation
      >
        <i className="fa-regular fa-heart" style={{ color: "#fa4f09" }} />
      </div> */}

      {/* Product Image */}
      <div
        className="product-image-wrapper position-relative"
        style={{
          overflow: "hidden",
          maxHeight: "300px",
          borderRadius: "10px 10px 0 0",
        }}
      >
        <img
          src={product.image}
          alt={product.name}
          className="img-fluid d-block w-100"
          style={{
            transition: "transform 0.3s ease",
            maxHeight: "300px",
            objectFit: "cover",
          }}
          onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.1)")}
          onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
        />
        {product.productLabel && (
          <span
            className="product-label badge bg-primary text-white position-absolute top-0 start-0 m-2"
            style={{
              padding: "5px 10px",
              borderRadius: "5px",
              fontSize: "12px",
            }}
          >
            {product.productLabel}
          </span>
        )}
      </div>

      {/* Product Content */}
      <div className="product-content p-3">
        <h5 className="mb-2 text-truncate" style={{ fontWeight: "600" }}>
          {product.name}
        </h5>
        {product.wasPrice && (
          <span
            className="text-muted me-2"
            style={{
              textDecoration: "line-through",
              fontSize: "14px",
            }}
          >
            £{product.wasPrice}
          </span>
        )}
        <span className="text-primary fw-bold" style={{ fontSize: "16px" }}>
          £{product.price}
        </span>
        <div className="rating mt-2" style={{ fontSize: "14px", color: "#fa4f09" }}>
          {Array(5)
            .fill(0)
            .map((_, i) => (
              <i
                key={i}
                className={`fa-solid fa-star ${
                  i < product.rating ? "text-warning" : "text-muted"
                }`}
                style={{ marginRight: "2px" }}
              />
            ))}
        </div>
      </div>

      {/* Add to Cart */}
      <div
        className="add-to-cart p-2 text-center border-top"
        style={{
          background: "#f8f9fa",
          color: "#fa4f09",
          fontWeight: "500",
          transition: "background 0.3s ease",
        }}
        onClick={(e) => {
          e.stopPropagation(); // Prevent triggering parent navigation
          navigate(`/products/${product.id}`);
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.background = "#fa4f09";
          e.currentTarget.style.color = "black";
        }}
        onMouseLeave={(e) => (e.currentTarget.style.background = "#f8f9fa")}
      >
        <i className="fa-solid fa-cart-shopping me-1" />
        <span>Shop Now</span>
      </div>
    </div>
  );
}

export default ProductDisplay;
