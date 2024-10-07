import React, { useEffect } from "react";
import { CircularProgress } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { getRequests, base_url } from "../../axios/API";
import { useDispatch, useSelector } from "react-redux";
import ProductDisplay from "../../Component/HomePage/Product/ProductDisplay";
import {
  setBrandId,
  setCategoryId,
  setLoading,
  setProducts,
  setTrendingProducts,
} from "./ProductSlice";
import { SwiperComponentCustom } from "../../Component/Swiper/Swiper";
import { SwiperSlide } from "swiper/react";

function Product(props) {
  const navigate = useNavigate();
  let dispatch = useDispatch();
  let homeStates = useSelector((state) => state.home);
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
            <img style={{ width: "150px" }} src={item.image} alt="icon" />
          </div>
        </div>
      </SwiperSlide>
    );
  };

  return (
    <main>
      <section className=" page-banner bg-image category-area black-area category-two pb-60 pt-80">
        <div className="container">
          <div className="bor-bottom pb-50">
            <div
              className="sub-title text-center wow fadeInUp"
              data-wow-delay=".1s"
            >
              <h3>
                <span className="title-icon" /> E-Liquid{" "}
                <span className="title-icon" />
              </h3>
              <span style={{ fontWeight: "500", padding: "5px 50px" }}>
                Our premium collection offers a diverse range of meticulously
                crafted e-liquids, ensuring a delightful vaping experience for
                every palate. Explore a world of rich flavors and superior
                quality that elevates your vaping journey.{" "}
              </span>
            </div>
          </div>
        </div>
      </section>
      <section className="banner-two banner-two-light black-area">
        {productState.loading ? (
          <div style={{ textAlign: "center" }}>
            <CircularProgress style={{ margin: "auto", marginTop: "100px" }} />
          </div>
        ) : (
          <div className="tab-content container">
            <div id="latest-item" className="tab-pane fade show active">
              <div className="row g-4">
                <div className="col-2 product-page-filter" id="filter products">
                  {homeStates.menu?.map((menuEle, i) => {
                    let hasSubMenu = menuEle.brandList.length > 0;
                    return (
                      <div class="accordion" id={i}>
                        <div class="accordion-item">
                          <div class="accordion-header">
                            <button
                              className={`${
                                !hasSubMenu ? "accordion-custom-button" : ""
                              } accordion-button collapsed`}
                              type="button"
                              data-bs-toggle="collapse"
                              data-bs-target={`#flush-${i}`}
                              aria-expanded="false"
                              aria-controls={`flush-${i}`}
                              onClick={() => {
                                if (!hasSubMenu)
                                  dispatch(setCategoryId(menuEle.id));
                              }}
                            >
                              {menuEle.name}
                            </button>
                          </div>
                          {hasSubMenu &&
                            menuEle.brandList?.map((subMenuEle) => {
                              return (
                                <>
                                  <div
                                    id={`flush-${i}`}
                                    class="accordion-collapse collapse pointer"
                                    data-bs-parent={`${i}`}
                                  >
                                    <div class="accordion-body">
                                      <ul>
                                        <li className="pointer">
                                          <a
                                            onClick={() => {
                                              dispatch(
                                                setBrandId(subMenuEle.id)
                                              );
                                            }}
                                          >
                                            {subMenuEle.name}
                                          </a>
                                        </li>
                                      </ul>
                                    </div>
                                  </div>
                                </>
                              );
                            })}
                        </div>
                      </div>
                    );
                  })}
                </div>
                <div className="col-10 product-display-page-filter">
                  <div className="row g-4">
                    {productState.products?.map((product) => {
                      return <ProductDisplay product={product} />;
                    })}
                  </div>
                </div>
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
              { image: "assets/images/brand/Geek-Bar.webp" },
              { image: "assets/images/brand/Magic-Bar.webp" },
              { image: "assets/images/brand/lost-mary.webp" },
              { image: "assets/images/brand/Kingston.webp" },
              { image: "assets/images/brand/JNR-Logo.webp" },
              { image: "assets/images/brand/hayati-logo.webp" },
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
