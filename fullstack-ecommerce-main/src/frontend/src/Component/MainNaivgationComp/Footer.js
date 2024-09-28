import React from 'react'
import backgrounimg from "../../assets/images/footer/footer-bg.jpg"
function Footer(props) {
  return (
  <>
  <>
  <footer
    className="footer-area black-area bg-image"
    style={{ backgroundImage: `url(${backgrounimg})` }}
  >
    <div className="container">
      <div className="footer__wrp pt-65 pb-65 bor-top bor-bottom">
        <div className="row g-4">
          <div
            className="col-xl-3 col-lg-6 col-md-6 wow fadeInUp"
            data-wow-duration="1.1s"
            data-wow-delay=".1s"
          >
            <div className="footer__item">
              <h4 className="footer-title">Customer Service</h4>
              <ul>
                <li>
                  <a href="contact.html">
                    <span />
                    Help Portal
                  </a>
                </li>
                <li>
                  <a href="contact.html">
                    <span />
                    Contact Us
                  </a>
                </li>
                <li>
                  <a href="error.html">
                    <span />
                    Delivery Information
                  </a>
                </li>
                <li>
                  <a href="error.html">
                    <span />
                    Click and Collect
                  </a>
                </li>
                <li>
                  <a href="error.html">
                    <span />
                    Refunds and Returns
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div
            className="col-xl-3 col-lg-6 col-md-6 wow fadeInUp"
            data-wow-duration="1.2s"
            data-wow-delay=".2s"
          >
            <div className="footer__item">
              <h4 className="footer-title">Get to Know Us</h4>
              <ul>
                <li>
                  <a href="about.html">
                    <span />
                    About Us
                  </a>
                </li>
                <li>
                  <a href="blog-grid.html">
                    <span />
                    News &amp; Blog
                  </a>
                </li>
                <li>
                  <a href="error.html">
                    <span />
                    Careers
                  </a>
                </li>
                <li>
                  <a href="error.html">
                    <span />
                    Investors
                  </a>
                </li>
                <li>
                  <a href="contact.html">
                    <span />
                    Contact Us
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div
            className="col-xl-3 col-lg-6 col-md-6 wow fadeInUp"
            data-wow-duration="1.3s"
            data-wow-delay=".3s"
          >
            <div className="footer__item">
              <h4 className="footer-title">vapes new collections</h4>
              <ul>
                <li>
                  <a href="shop.html">
                    <span />
                    E-Cigarettes
                  </a>
                </li>
                <li>
                  <a href="shop.html">
                    <span />
                    Vape Pens
                  </a>
                </li>
                <li>
                  <a href="shop.html">
                    <span />
                    Pod Systems
                  </a>
                </li>
                <li>
                  <a href="shop.html">
                    <span />
                    Disposable Vapes
                  </a>
                </li>
                <li>
                  <a href="shop.html">
                    <span />
                    Nicotine Salt Devices
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div
            className="col-xl-3 col-lg-6 col-md-6 wow fadeInUp"
            data-wow-duration="1.4s"
            data-wow-delay=".4s"
          >
            <div className="footer__item newsletter">
              <h4 className="footer-title">get newsletter</h4>
              <div className="subscribe">
                <input type="email" placeholder="Your Email" />
                <button>
                  <i className="fa-solid fa-paper-plane" />
                </button>
              </div>
              <div className="social-icon mt-40">
                <a href="#0">
                  <i className="fa-brands fa-facebook-f" />
                </a>
                <a href="#0">
                  <i className="fa-brands fa-twitter" />
                </a>
                <a href="#0">
                  <i className="fa-brands fa-linkedin-in" />
                </a>
                <a href="#0">
                  <i className="fa-brands fa-youtube" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="footer__copy-text pt-50 pb-50">
        <a href="index.html" className="logo d-block">
          <img src="assets/images/logo/logo.svg" alt="logo" />
        </a>
        <p>
          © Copyright 2023{" "}
          <a href="#0" className="primary-hover">
            odor
          </a>{" "}
          All Rights Reserved
        </p>
        <a href="#0" className="payment d-block image">
          <img src="assets/images/icon/payment.png" alt="icon" />
        </a>
      </div>
    </div>
  </footer>
  {/* Footer area end here */}
  {/* Back to top area start here */}
  <div className="scroll-up">
    <svg
      className="scroll-circle svg-content"
      width="100%"
      height="100%"
      viewBox="-1 -1 102 102"
    >
      <path d="M50,1 a49,49 0 0,1 0,98 a49,49 0 0,1 0,-98" />
    </svg>
  </div>
</>
</>
  )
}

export default Footer