import React from "react";
import { useNavigate } from "react-router-dom";

function ProductDisplay(props) {
  let navigate = useNavigate();
  return (
    // <div className="col-xxl-3 col-xl-4 col-md-6">
    <div
      className="product__item bor"
      onClick={() => navigate(`/products/${props.product.id}`)}
    >
      <a className="wishlist">
        <i className="fa-regular fa-heart" />
      </a>
      <a
        className="product__image pt-20 d-block"
        style={{ maxHeight: "410px" }}
      >
        <img
          className="font-image rounded"
          src={props.product.image}
          alt="image"
          style={{ maxHeight: "300px" }}
        />
        <img
          className="back-image rounded"
          src={props.product.image}
          alt="image"
        />
      </a>
      <div className="product__content">
        <h5 className="mb-15">
          <a className="primary-hover">{props.product.name}</a>
        </h5>
        {props.product.wasPrice && <del>£{props.product.wasPrice}</del>}
        <span className="primary-color ml-10">£{props.product.price}</span>
        <div className="star mt-20">
          <i className="fa-solid fa-star" />
          <i className="fa-solid fa-star" />
          <i className="fa-solid fa-star" />
          <i className="fa-solid fa-star" />
          <i className="fa-solid fa-star" />
        </div>
      </div>
      <a
        className="product__cart d-block bor-top pointer"
        // onClick={() => navigate(`/products/${props.product.id}`)}
      >
        <i className="fa-regular fa-cart-shopping primary-color me-1" />
        <span>Shop Now</span>
      </a>
    </div>
    // </div>
  );
}

export default ProductDisplay;
