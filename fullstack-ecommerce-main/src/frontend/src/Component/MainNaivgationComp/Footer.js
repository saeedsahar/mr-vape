import React from "react";
import backgrounimg from "../../assets/images/footer/footer-bg.jpg";
import { useDispatch, useSelector } from "react-redux";
import { setCategoryId, setQuery } from "../../Pages/Product/ProductSlice";
import { useNavigate } from "react-router-dom";

function Footer(props) {
  const homeStates = useSelector((state) => state.home);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  return (
    <footer
      className="footer-area black-area bg-image"
      style={{
        backgroundImage: `url(${backgrounimg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="container-lg">
        {/* Footer Content */}
        <div className="footer__wrp pt-65 pb-65 bor-top bor-bottom">
          <div className="row g-4">
            {/* Contact Us Section */}
            <div
              className="col-xl-3 col-lg-6 col-md-6 wow fadeInUp"
              data-wow-duration="1.1s"
              data-wow-delay=".1s"
            >
              <div className="footer__item">
                <h4 className="footer-title" style={{ color: "#fff" }}>
                  Contact Us
                </h4>
                <ul>
                  <li>
                    <a
                      href="tel:12344777"
                      style={{ color: "#fff", fontSize: "16px" }}
                    >
                      <i className="fa-solid fa-phone me-2" style={{ color: "#4caf50" }} />
                      +1 234 4777
                    </a>
                  </li>
                  <li>
                    <a
                      href="mailto:info@vapeplanet.co.uk"
                      style={{ color: "#fff", fontSize: "16px" }}
                    >
                      <i className="fa-solid fa-envelope me-2" style={{ color: "#ff5722" }} />
                      info@vapeplanet.co.uk
                    </a>
                  </li>
                  <li>
                    <a
                      href="/fastDelivery"
                      style={{ color: "#fff", fontSize: "16px" }}
                    >
                      <i className="fa-solid fa-truck-fast me-2" style={{ color: "#3f51b5" }} />
                      Delivery Information
                    </a>
                  </li>
                </ul>
              </div>
            </div>

            {/* Get to Know Us Section */}
            <div
              className="col-xl-3 col-lg-6 col-md-6 wow fadeInUp"
              data-wow-duration="1.2s"
              data-wow-delay=".2s"
            >
              <div className="footer__item">
                <h4 className="footer-title" style={{ color: "#fff" }}>
                  Get to Know Us
                </h4>
                <ul>
                  <li>
                    <a
                      href="/about"
                      style={{ color: "#fff", fontSize: "16px" }}
                    >
                      <i className="fa-solid fa-info-circle me-2" style={{ color: "#ff9800" }} />
                      About Us
                    </a>
                  </li>
                  <li>
                    <a
                      href="/allBlogs"
                      style={{ color: "#fff", fontSize: "16px" }}
                    >
                      <i className="fa-solid fa-newspaper me-2" style={{ color: "#2196f3" }} />
                      News & Blog
                    </a>
                  </li>
                  <li>
                    <a
                      href="/contact"
                      style={{ color: "#fff", fontSize: "16px" }}
                    >
                      <i className="fa-solid fa-headset me-2" style={{ color: "#673ab7" }} />
                      Contact Us
                    </a>
                  </li>
                </ul>
              </div>
            </div>

            {/* Vapes New Collections Section */}
            <div
              className="col-xl-3 col-lg-6 col-md-6 wow fadeInUp"
              data-wow-duration="1.3s"
              data-wow-delay=".3s"
            >
              <div className="footer__item">
                <h4 className="footer-title" style={{ color: "#fff" }}>
                  Vapes New Collections
                </h4>
                <ul>
                  {homeStates.menu?.slice(0, 5).map((menuEle) => (
                    <li key={menuEle.id}>
                      <a
                        href="#0"
                        onClick={() => {
                          if (menuEle.id === 1) {
                            dispatch(setQuery("Trending"));
                            navigate("/products");
                          } else {
                            dispatch(setCategoryId(menuEle.id));
                            navigate("/products");
                          }
                        }}
                        style={{ color: "#fff", fontSize: "16px" }}
                      >
                        <i className="fa-solid fa-chevron-right me-2" style={{ color: "#00bcd4" }} />
                        {menuEle.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Newsletter Section */}
            <div
              className="col-xl-3 col-lg-6 col-md-6 wow fadeInUp"
              data-wow-duration="1.4s"
              data-wow-delay=".4s"
            >
              <div className="footer__item newsletter">
                <h4 className="footer-title" style={{ color: "#fff" }}>
                  Get Newsletter
                </h4>
                <div className="subscribe">
                  <input
                    type="email"
                    placeholder="Your Email"
                    style={{
                      borderRadius: "5px",
                      border: "1px solid #fff",
                      padding: "8px 12px",
                      marginRight: "8px",
                      width: "70%",
                      color: "#000",
                    }}
                  />
                  <button
                    style={{
                      backgroundColor: "#ff5722",
                      border: "none",
                      borderRadius: "5px",
                      padding: "8px 12px",
                      color: "#fff",
                      cursor: "pointer",
                    }}
                  >
                    <i className="fa-solid fa-paper-plane" />
                  </button>
                </div>
                <div className="social-icon mt-40 d-flex justify-content-center gap-3">
                  <a href="https://www.facebook.com/Vapeplanet.co.uk" target="_blank" rel="noopener noreferrer">
                    <i className="fa-brands fa-facebook-f" style={{ color: "#4267B2", fontSize: "20px" }} />
                  </a>
                  <a href="https://x.com/vapeplanetuk" target="_blank" rel="noopener noreferrer">
                    <i className="fa-brands fa-x" style={{ color: "#1DA1F2", fontSize: "20px" }} />
                  </a>
                  <a href="https://www.tiktok.com/@vapeplanetuk" target="_blank" rel="noopener noreferrer">
                    <i className="fa-brands fa-tiktok" style={{ color: "white", fontSize: "20px" }} />
                  </a>
                  <a href="https://www.youtube.com/@vapeplanetuk" target="_blank" rel="noopener noreferrer">
                    <i className="fa-brands fa-youtube" style={{ color: "#FF0000", fontSize: "20px" }} />
                  </a>
                  <a href="https://www.instagram.com/vapeplanetuk" target="_blank" rel="noopener noreferrer">
                    <i className="fa-brands fa-instagram" style={{ color: "#E4405F", fontSize: "20px" }} />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Bottom Section */}
        <div
          className="footer__copy-text text-center pt-50 pb-50"
          style={{
            borderTop: "1px solid rgba(255, 255, 255, 0.2)",
            color: "#fff",
          }}
        >
          <a className="logo d-block mb-3">
            <img src="https://mrvape-frontend.s3.eu-west-2.amazonaws.com/VapePlanet+Logo.png" alt="logo" />
          </a>
          <p>
            © Copyright 2025 <a className="primary-hover">VapePlanet</a> - All
            Rights Reserved
          </p>
          <a className="payment d-block mt-3">
            <img src="assets/images/icon/payment.png" alt="icon" />
          </a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
