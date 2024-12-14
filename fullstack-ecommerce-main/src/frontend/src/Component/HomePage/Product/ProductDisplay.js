import React from "react";
import { useNavigate } from "react-router-dom";

function ProductDisplay(props) {
  let navigate = useNavigate();
  const { product } = props;

  return (
    <div
      className="product__item bor"
      onClick={() => navigate(`/products/${product.id}`)}
    >
      {/* Wishlist icon */}
      <a className="wishlist">
        <i className="fa-regular fa-heart" />
      </a>

      {/* Product Image */}
      <a
        className="product__image pt-20 d-block"
        style={{ maxHeight: "410px" }}
      >
        <img
          className="font-image rounded"
          src={product.image}
          alt={product.name}
          style={{ maxHeight: "300px" }}
        />
        <img
          className="back-image rounded"
          src={product.image}
          alt={product.name}
        />
      </a>

      {/* Product Label */}
      {product.productLabel && (
        <div className="product-label badge bg-primary text-white">
          {product.productLabel}
        </div>
      )}

      {/* Product Content */}
      <div className="product__content">
        <h5 className="mb-15">
          <a className="primary-hover">{product.name}</a>
        </h5>
        {product.wasPrice && <del>£{product.wasPrice}</del>}
        <span className="primary-color ml-10">£{product.price}</span>
        <div className="star mt-20">
          <i className="fa-solid fa-star" />
          <i className="fa-solid fa-star" />
          <i className="fa-solid fa-star" />
          <i className="fa-solid fa-star" />
          <i className="fa-solid fa-star" />
        </div>
      </div>

      {/* Add to Cart */}
      <a className="product__cart d-block bor-top pointer">
        <i className="fa-regular fa-cart-shopping primary-color me-1" />
        <span>Shop Now</span>
      </a>
    </div>
  );
}

export default ProductDisplay;
