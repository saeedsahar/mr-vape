import React, { useEffect } from "react";
import { CircularProgress } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { getRequests, base_url } from "../../axios/API";
import { useDispatch, useSelector } from "react-redux";
import ProductDisplay from "../../Component/HomePage/Product/ProductDisplay";
import { setLoading, setProducts, setTrendingProducts } from "./ProductSlice";
import SwiperComponent, {
  SwiperComponentCustom,
} from "../../Component/Swiper/Swiper";
import { SwiperSlide } from "swiper/react";

function Product(props) {
  const navigate = useNavigate();
  let dispatch = useDispatch();
  let productState = useSelector((state) => state.product);

  useEffect(() => {
    if (productState.categoryId && productState.categoryId != "") {
      fetchProductsByCategory(productState.categoryId);
    } else if (productState.brandId && productState.brandId != "") {
      fetchProductsByBrand(productState.brandId);
    } else {
      fetchProducts(
        productState.query,
        productState.pageIndex,
        productState.pageSize
      );
    }
  }, [
    productState.query,
    productState.pageIndex,
    productState.pageSize,
    productState.categoryId,
    productState.brandId,
  ]);

  useEffect(() => {
    if (productState.trendingProducts?.length > 0) {
    } else {
      fetchProductsTrending("Trending");
    }
  }, []);

  const fetchProductsTrending = async (query, pageIndex, pageSize) => {
    // dispatch(setLoading(true))
    try {
      const response = await getRequests(
        `${base_url}/api/v1/product?q=${query}&pageNumber=${0}&pageSize=${20}`
      ); // Assuming productService.products$ returns list and total
      let { list, total } = response.data;
      dispatch(setTrendingProducts({ products: list, length: total }));
    } catch (error) {
      console.error("Error fetching products", error);
      dispatch(setTrendingProducts({ products: [], length: 0 }));
    } finally {
      // dispatch(setLoading(false))
    }
  };

  const fetchProducts = async (query, pageIndex, pageSize) => {
    dispatch(setLoading(true));
    try {
      const response = await getRequests(
        `${base_url}/api/v1/product?q=${query}&pageNumber=${pageIndex}&pageSize=${pageSize}`
      ); // Assuming productService.products$ returns list and total
      let { list, total } = response.data;
      dispatch(setProducts({ products: list, length: total }));
    } catch (error) {
      console.error("Error fetching products", error);
      dispatch(setProducts({ products: [], length: 0 }));
    } finally {
      dispatch(setLoading(false));
    }
  };
  const fetchProductsByCategory = async (categoryId) => {
    dispatch(setLoading(true));
    try {
      const response = await getRequests(
        `${base_url}/api/v1/category/${categoryId}`
      );
      // let { list, total } = response.data;
      dispatch(setProducts({ products: [], length: 0 }));
    } catch (error) {
      console.error("Error fetching products", error);
      dispatch(setProducts({ products: [], length: 0 }));
    } finally {
      dispatch(setLoading(false));
    }
  };
  const fetchProductsByBrand = async (brandId) => {
    dispatch(setLoading(true));
    try {
      const response = await getRequests(`${base_url}/api/v1/brand/${brandId}`);
      let { productList } = response.data;
      dispatch(
        setProducts({ products: productList, length: productList?.length })
      );
    } catch (error) {
      console.error("Error fetching products", error);
      dispatch(setProducts({ products: [], length: 0 }));
    } finally {
      dispatch(setLoading(false));
    }
  };

  const customSwiperProduct = (item) => {
    return (
      <SwiperSlide>
        <div className="swiper-slide">
          <div className="brand__item bor radius-10 text-center p-4">
            <img src={item.image} alt="icon" />
          </div>
        </div>
      </SwiperSlide>
    );
  };

  // const handlePageChange = (event, newPageIndex) => {
  //   setPageIndex(newPageIndex);
  //   window.scrollTo({ top: 0, behavior: 'smooth' });
  // };

  // const handlePageSizeChange = (event) => {
  //   setPageSize(event.target.value);
  //   setPageIndex(0); // Reset to first page when changing page size
  // };

  // const handleQueryChange = (newQuery) => {
  //   setQuery(newQuery);
  //   setPageIndex(0); // Reset to first page when searching
  // };

  // const selectProduct = (id) => {
  //   navigate(`/products/${id}`);
  // };

  // const shouldAddButtonDisable = (product) => {
  //   let item = cartStates.items.filter(ele => ele.id == product.id)
  //   if(item.length <= 0) return false

  //   return item[0].availableQuantity <= 0
  // }

  return (
    <main>
      <section className=" page-banner bg-image category-area black-area category-two pb-60 pt-80">
        <div className="container">
          <div className="bor-bottom pb-100">
            <div
              className="sub-title text-center mb-65 wow fadeInUp"
              data-wow-delay=".1s"
            >
              <h3>
                <span className="title-icon" /> Trending Products{" "}
                <span className="title-icon" />
              </h3>
            </div>
            <SwiperComponent
              slidesPerView={5}
              swiperProduct={productState.trendingProducts}
            />
          </div>
        </div>
      </section>
      <section className="banner-two banner-two-light black-area">
        {productState.loading ? (
          <div style={{ textAlign: "center" }}>
            <CircularProgress style={{ margin: "auto", marginTop: "100px" }} />
          </div>
        ) : (
          <div className="tab-content">
            <div id="latest-item" className="tab-pane fade show active">
              <div className="row g-4">
                {productState.products?.map((product) => {
                  return <ProductDisplay product={product} />;
                })}
              </div>
            </div>
          </div>
        )}
      </section>
      <section className="brand-area black-area pt-130 pb-130">
        <div className="container">
          <div className="sub-title text-center mb-65">
            <h3>
              <span className="title-icon" /> our top brands{" "}
              <span className="title-icon" />
            </h3>
          </div>
          <SwiperComponentCustom
            slidesPerView={5}
            swiperProduct={[
              { image: "assets/images/brand/brand1.png" },
              { image: "assets/images/brand/brand2.png" },
              { image: "assets/images/brand/brand3.png" },
              { image: "assets/images/brand/brand4.png" },
              { image: "assets/images/brand/brand5.png" },
              { image: "assets/images/brand/brand6.png" },
            ]}
            customSwiperProduct={customSwiperProduct}
          />
        </div>
      </section>
    </main>
    // <div style={{ height: '100%' }}>
    //   <div className="search-bar-container" style={{width : "100%" , height : "100%" , padding : "10px"}}>
    //     <input value={query} onChange={(e) => handleQueryChange(e.target.value)}/>
    //   </div>
    //   {loading ? (
    //     <CircularProgress style={{ margin: 'auto', marginTop: '100px' }} />
    //   ) : (
    //     <div className="products-container">
    //       {query && (
    //         <div className="result-info">
    //           Searched for <i>'{query}'</i> ({length} items found)
    //         </div>
    //       )}
    //       {products.map(product => (
    //         <Card key={product.id} className="card">
    //           <CardHeader onClick={() => selectProduct(product.id)}>
    //             <img style={{ width: '100%' }} src={product.image} alt={product.name} />
    //           </CardHeader>
    //           <CardContent onClick={() => selectProduct(product.id)}>
    //             {/* <img src={}/> */}
    //             <Typography variant="h5">{product.name}</Typography>
    //             <Typography variant="subtitle1">{product.categoryName || ""}</Typography>
    //             <Typography>{product.shortDescription.substring(0, 25)}...</Typography>
    //           </CardContent>
    //           <CardActions>
    //             {product.quantity >= 1 ? (
    //               <Typography variant="h6" className="price">{product.price} EUR</Typography>
    //             ) : (
    //               <Typography variant="h6" className="text-danger">Out of Stock</Typography>
    //             )}
    //             <Button
    //               variant="contained"
    //               color="primary"
    //               disabled={shouldAddButtonDisable(product)}
    //               onClick={() => dispatch(addItemQuantity(product))}
    //             >
    //               Add
    //             </Button>
    //           </CardActions>
    //         </Card>
    //       ))}
    //       <Pagination
    //         count={Math.ceil(length / pageSize)}
    //         page={pageIndex + 1}
    //         onChange={handlePageChange}
    //         showFirstButton
    //         showLastButton
    //       />
    //     </div>
    //   )}
    // </div>
  );
}

export default Product;
