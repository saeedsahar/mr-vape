import React, { useEffect, useState } from "react";
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
  setQuery,
  setTrendingProducts,
} from "./ProductSlice";
import "./Product.css";
import { SwiperComponentCustom } from "../../Component/Swiper/Swiper";
import { SwiperSlide } from "swiper/react";

function Product(props) {
  const navigate = useNavigate();
  let dispatch = useDispatch();
  let homeStates = useSelector((state) => state.home);
  let productState = useSelector((state) => state.product);
  const [mainTile, setMainTitle] = useState("Search results");
  const [openMenu, setOpenMenu] = useState(null); // ✅ Track open submenu


  useEffect(() => {
    if (productState.categoryId && productState.categoryId != "") {
      let tile = homeStates.menu?.filter(
        (item) => item.id == productState.categoryId
      );
      fetchProductsByCategory(productState.categoryId);
      setMainTitle(tile[0]?.name);
    } else if (productState.brandId && productState.brandId != "") {
      let tile = [];
      homeStates.menu?.forEach((category) => {
        if (tile?.length <= 0) {
          tile = category?.brandList?.filter(
            (item) => item.id == productState.brandId
          );
        }
      });
      fetchProductsByBrand(productState.brandId);
      setMainTitle(tile[0]?.name);
    } else {
      fetchProducts(
        productState.query,
        productState.pageIndex,
        productState.pageSize
      );
      setMainTitle(
        `Search Results for ${productState.query} items at VapePlanet UK`
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
      dispatch(
        setProducts({ products: response.data, length: response.data?.length })
      );
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
        <div className="container-lg">
          <div className="bor-bottom pb-50">
            <div
              className="sub-title text-center wow fadeInUp"
              data-wow-delay=".1s"
            >
              <h3>
                <span className="title-icon" />
                {mainTile} <span className="title-icon" />
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
    <div className="row">
      {/* Filter Products Menu */}
      <div className="col-lg-3 product-filter-menu d-none d-lg-block">
      {homeStates.menu?.map((menuEle, i) => {
        const hasSubMenu = menuEle.brandList?.length > 0;
        const isOpen = openMenu === i; // ✅ Check if submenu is open

        return (
          <div className="menu-accordion mb-4" key={i}>
            {/* Parent Menu Item */}
            <div className="menu-accordion-item">
              <div className="menu-accordion-header d-flex align-items-center">
                {/* Smooth Colored Icon for Parent */}
                <i className="fa-solid fa-layer-group menu-icon"></i>

                {/* Parent Button */}
                <button
                  className={`menu-accordion-button ${isOpen ? "" : "collapsed"}`}
                  type="button"
                  aria-expanded={isOpen}
                  onClick={() => {
                    if (!hasSubMenu) {
                      if (menuEle.id === 1) {
                        dispatch(setQuery("Trending"));
                      } else {
                        dispatch(setCategoryId(menuEle.id));
                      }
                    } else {
                      setOpenMenu(isOpen ? null : i); // ✅ Toggle submenu
                    }
                  }}
                >
                  {menuEle.name}
                  {hasSubMenu && (
                    <i className={`fa-solid fa-chevron-down menu-arrow-icon ${isOpen ? "open" : ""}`}></i>
                  )}
                </button>
              </div>

              {/* Submenu for Children */}
              {hasSubMenu && isOpen && (
                <div className="menu-accordion-collapse show">
                  <div className="menu-accordion-body">
                    <ul className="submenu-list">
                      {menuEle.brandList.map((subMenuEle, subIndex) => (
                        <li
                          className="submenu-item pointer"
                          key={subIndex}
                          onClick={(e) => {
                            e.stopPropagation(); // ✅ Prevent menu collapse
                            dispatch(setBrandId(subMenuEle.id));
                          }}
                        >
                          {/* Smooth Colored Submenu Icon */}
                          <i className="fa-regular fa-circle menu-submenu-icon"></i>
                          <strong>{subMenuEle.name}</strong>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}
            </div>
          </div>
        );
      })}
    </div>

      {/* Product Display Section */}
      <div className="col-lg-9 product-display-section-unique">
        <div className="row">
          {productState.products?.map((product) => {
            return (
              <div className="col-lg-4 col-md-6 mb-4">
                <ProductDisplay product={product} />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  </div>
</div>


        )}
      </section>
      <section className="brand-area black-area pt-130 pb-130">
        <div className="container-lg">
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
    
  );
}

export default Product;
