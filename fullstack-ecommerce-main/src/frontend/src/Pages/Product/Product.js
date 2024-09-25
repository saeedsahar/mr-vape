import React, { useState, useEffect } from "react";
import { CircularProgress, Card, CardHeader, CardContent, CardActions, Button, Pagination, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { getRequests , base_url } from "../../axios/API";
import { useDispatch, useSelector } from "react-redux";
import { addItemQuantity } from "../../Component/Cart/CartSlice";

function Product(props) {
  const [categories , setCategories] = useState([])
  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState([]);
  const [query, setQuery] = useState('');
  const [length, setLength] = useState(0);
  const [pageSize, setPageSize] = useState(6);
  const [pageIndex, setPageIndex] = useState(0);
  const navigate = useNavigate();
  let dispatch = useDispatch()
  let cartStates = useSelector((state) => state.cart)

  useEffect(() => {
    getCategories()
  } , [])

  useEffect(() => {
    fetchProducts(query, pageIndex, pageSize);
  }, [query, pageIndex, pageSize]);

  const getCategories = () => {
     getRequests(`${base_url}/api/v1/category`).then(data => {
      setCategories(data)
    })
  }

  const fetchProducts = async (query, pageIndex, pageSize) => {
    setLoading(true);
    try {
      const response = await getRequests(`${base_url}/api/v1/product?q=${query}&pageNumber=${pageIndex}&pageSize=${pageSize}`); // Assuming productService.products$ returns list and total
      let {list , total} = response.data
      setProducts(list);
      setLength(total);
    } catch (error) {
      console.error("Error fetching products", error);
    } finally {
      setLoading(false);
    }
  };

  const handlePageChange = (event, newPageIndex) => {
    setPageIndex(newPageIndex);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handlePageSizeChange = (event) => {
    setPageSize(event.target.value);
    setPageIndex(0); // Reset to first page when changing page size
  };

  const handleQueryChange = (newQuery) => {
    setQuery(newQuery);
    setPageIndex(0); // Reset to first page when searching
  };

  const selectProduct = (id) => {
    navigate(`/products/${id}`);
  };

  const shouldAddButtonDisable = (product) => {
    let item = cartStates.items.filter(ele => ele.id == product.id)
    if(item.length <= 0) return false

    return item[0].availableQuantity <= 0
  }

  return (
    <div style={{ height: '100%' }}>
      <div className="search-bar-container" style={{width : "100%" , height : "100%" , padding : "10px"}}>
        <input value={query} onChange={(e) => handleQueryChange(e.target.value)}/>
      </div>
      {loading ? (
        <CircularProgress style={{ margin: 'auto', marginTop: '100px' }} />
      ) : (
        <div className="products-container">
          {query && (
            <div className="result-info">
              Searched for <i>'{query}'</i> ({length} items found)
            </div>
          )}
          {products.map(product => (
            <Card key={product.id} className="card">
              <CardHeader onClick={() => selectProduct(product.id)}>
                <img style={{ width: '100%' }} src={product.image} alt={product.name} />
              </CardHeader>
              <CardContent onClick={() => selectProduct(product.id)}>
                {/* <img src={}/> */}
                <Typography variant="h5">{product.name}</Typography>
                <Typography variant="subtitle1">{product.categoryName || ""}</Typography>
                <Typography>{product.shortDescription.substring(0, 25)}...</Typography>
              </CardContent>
              <CardActions>
                {product.quantity >= 1 ? (
                  <Typography variant="h6" className="price">{product.price} EUR</Typography>
                ) : (
                  <Typography variant="h6" className="text-danger">Out of Stock</Typography>
                )}
                <Button
                  variant="contained"
                  color="primary"
                  disabled={shouldAddButtonDisable(product)}
                  onClick={() => dispatch(addItemQuantity(product))}
                >
                  Add
                </Button>
              </CardActions>
            </Card>
          ))}
          <Pagination
            count={Math.ceil(length / pageSize)}
            page={pageIndex + 1}
            onChange={handlePageChange}
            showFirstButton
            showLastButton
          />
        </div>
      )}
    </div>
  );
}

export default Product