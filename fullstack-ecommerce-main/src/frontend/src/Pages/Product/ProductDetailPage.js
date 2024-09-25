import React, { useEffect, useState } from 'react'
import { useParams } from "react-router-dom";
import { CircularProgress, Button, Icon } from "@mui/material";
import { base_url, getRequests } from '../../axios/API';
import { addItemQuantity } from '../../Component/Cart/CartSlice';
import { useSelector , useDispatch } from 'react-redux';

function ProductDetailPage(props) {
    const { id } = useParams();
    const [status, setStatus] = useState("pending");
  const [product, setProduct] = useState(null);
  const [category, setCategory] = useState(null);
  let cartStates = useSelector(state => state.cart)
  let dispatch = useDispatch()
  
  const shouldAddButtonDisable = (product) => {
    let item = cartStates.items.filter(ele => ele.id == product.id)
    if(item.length <= 0) return false

    return item[0].availableQuantity <= 0
  }

  useEffect(() => {
    // Fetch product details
    const fetchProduct = async () => {
      try {
         getProductDetails(id);
    
      } catch (error) {
        setStatus("error");
        console.error("Error fetching product details", error);
      }
    };
    fetchProduct();
  }, [id]);

  const getProductDetails = (id) => {
    getRequests(`${base_url}/api/v1/product/${id}`)
    .then(data => {
        setProduct(data.data);
        setStatus("success");
    })
  }

  const addProductToCart = (productId) => {
    console.log("Product added to cart: ", productId);
    // Add your logic for adding the product to the cart
  };

  if (status === "pending") {
    return (
      <div>
        <CircularProgress />
      </div>
    );
  }

  if (status === "success" && product) {
    return (
      <div className="container">
        {/* Breadcrumb */}
        <i className="gray">
          {category?.name || "..."} / {product.name}
        </i>
        {/* Product */}
        <div className="product-container">
          {/* Product Image */}
          <div className="product-image">
            <img src={product.image} alt={product.name} />
          </div>
          {/* Product Short Details */}
          <div className="product-short-details">
            <h2 className="product-name">{product.name}</h2>
            <div className="gray">{category?.name || "..."}</div>
            {/* Short Description */}
            <div className="product-short-description">
              {product.shortDescription}
            </div>
            {/* Full Description */}
            <div className="product-description">{product.description}</div>
            <hr />
            <div className="product-footer">
              {/* Price and Stock */}
              {product.quantity >= 1 ? (
                <span className="price">
                  <h3>€{product.price.toFixed(2)}</h3>
                </span>
              ) : (
                <span className="text-danger">
                  <h4>Out of Stock</h4>
                </span>
              )}
              {/* Add to Cart Button */}
              <Button
                variant="contained"
                color="primary"
                // startIcon={<Icon>shopping_cart</Icon>}
                disabled={shouldAddButtonDisable(product)}
                onClick={() => dispatch(addItemQuantity(product))}
              >
                Add to Cart
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return <div>Error loading product</div>;
}

export default ProductDetailPage