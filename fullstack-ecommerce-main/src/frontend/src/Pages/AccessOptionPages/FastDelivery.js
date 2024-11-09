import React, { useEffect } from "react";
import "./AccessOption.css";
function FastDelivery() {
  useEffect(() => {
    // Dynamically load CSS
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.type = "text/css";
    link.href = `${process.env.PUBLIC_URL}/freeshipping.min.css`; // Correct path
    link.media = "all";
    document.head.appendChild(link);

    // Dynamically load JavaScript
    const script = document.createElement("script");
    script.src = `${process.env.PUBLIC_URL}/freeshipping.min.js`; // Correct path
    script.async = true;
    document.body.appendChild(script);

    // Cleanup to remove the files when unmounted
    return () => {
      document.head.removeChild(link);
      document.body.removeChild(script);
    };
  }, []);

  return (
    <section
      className="gallery-area gallery-light black-area"
      style={{ marginTop: "30px" }}
    >
      <div className="container-lg">
        <div className="product__wrp pb-30 mb-25 bor-bottom d-flex flex-wrap align-items-center justify-content-xl-between justify-content-center">
          <div
            className="section-header d-flex align-items-center wow fadeInUp"
            data-wow-delay=".1s"
          >
            <span className="title-icon mr-10" />
            <h2>Delivery and Shipping Information</h2>
          </div>
        </div>

        <div
          data-content-type="row"
          data-appearance="contained"
          data-element="main"
        >
          <div
            data-enable-parallax={0}
            data-parallax-speed="0.5"
            data-background-images="{}"
            data-background-type="image"
            data-video-loop="true"
            data-video-play-only-visible="true"
            data-video-lazy-load="true"
            data-video-fallback-src=""
            data-element="inner"
            data-pb-style="B0M0DHS"
          >
            <div
              data-content-type="text"
              data-appearance="default"
              data-element="main"
            >
              <div className="delivery-options">
                <h2
                  className="color-black"
                  style={{ color: "black !important" }}
                >
                  Our Delivery Options
                </h2>
                <div className="delivery-option">
                  <div className="delivery-option-apps">
                    <div>
                      <p>Download the Royal Mail app:</p>
                      <a
                        tabIndex={0}
                        title="Get the Royal Mail app from the app store"
                        href="https://apps.apple.com/gb/app/royal-mail/id1435168829"
                        target="_blank"
                        rel="noopener"
                      >
                        {" "}
                        <img
                          id="E0ST44Q"
                          alt="Get it on the App Store"
                          width={144}
                          height={49}
                          className=" lazyload lazypreload"
                          data-src="https://vapeuk.co.uk/media/wysiwyg/App_Store_iOS-Badge-Alternative_1.png"
                        />{" "}
                      </a>{" "}
                      <a
                        tabIndex={0}
                        title="Get the Royal Mail app from the Google Play store."
                        href="https://play.google.com/store/apps/details?id=com.royalmail.app.droid&hl=en_GB&gl=US"
                        target="_blank"
                        rel="noopener"
                      >
                        {" "}
                        <img
                          alt="Get it at the Google Play store"
                          width={144}
                          height={49}
                          className=" lazyload lazypreload"
                          data-src="https://vapeuk.co.uk/media/wysiwyg/get-it-on-google-play-logo.png"
                        />{" "}
                      </a>
                    </div>
                  </div>
                  <div className="delivery-option-content">
                    <div className="delivery-option-logo">
                      <img
                        alt="Royal Mail Logo"
                        width={125}
                        height={53}
                        className=" lazyload lazypreload"
                        data-src="https://vapeuk.co.uk/media/wysiwyg/Royal_Mail.svg.png"
                      />
                    </div>
                    <h3 id="royal-mail-tracked-24">
                      Royal Mail Tracked 24 - Next Day Service
                    </h3>
                    <ul>
                      <li>
                        Place your order <strong>before 9 pm</strong>&nbsp;for{" "}
                        <strong>same-day dispatch </strong>and
                        <strong> next-day delivery*</strong>
                      </li>
                      <li>
                        Deliveries are made every day (*excluding{" "}
                        <a
                          tabIndex={0}
                          title="Royal Mail Sunday Delivery restrictions"
                          href="https://vapeuk.co.uk/delivery-information#rm-sunday-exclusions"
                        >
                          Sunday exclusions
                        </a>{" "}
                        and bank holidays)
                      </li>
                      <li>
                        Fully tracked service with a 2-hour delivery window
                      </li>
                      <li>Safe place option</li>
                      <li>FREE on orders over £20</li>
                      <li>£2.99 for orders under £20</li>
                      <li>
                        *Orders to remote areas listed on{" "}
                        <a
                          tabIndex={0}
                          title="Royal Mail postcode exclusions list"
                          href="https://vapeuk.co.uk/delivery-information#rm-sunday-exclusions"
                        >
                          Royal Mails exclusions list
                        </a>{" "}
                        may not arrive until a day later
                      </li>
                      <li>
                        For more information, see our{" "}
                        <a
                          tabIndex={0}
                          title="See our Royal Mail Tracked 24 guidelines"
                          href="https://vapeuk.co.uk/royal-mail-tracked-24-guidelines"
                          target="_blank"
                          rel="noopener"
                        >
                          Royal Mail Tracked 24 Guidelines
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="delivery-option">
                  <div className="delivery-option-apps">
                    <div>
                      <p>Download the DPD Local app:</p>
                      <a
                        tabIndex={0}
                        title="Get the DPD app from the app store"
                        href="https://apps.apple.com/gb/app/dpd/id1064977107"
                        target="_blank"
                        rel="noopener"
                      >
                        {" "}
                        <img
                          alt="Get it on the App Store"
                          width={144}
                          height={49}
                          className=" lazyload lazypreload"
                          data-src="https://vapeuk.co.uk/media/wysiwyg/App_Store_iOS-Badge-Alternative_1.png"
                        />{" "}
                      </a>{" "}
                      <a
                        tabIndex={0}
                        title="Get the DPD app from the Google play store"
                        href="https://play.google.com/store/apps/details?id=com.dpd.yourdpd&hl=en_GB&gl=US"
                        target="_blank"
                        rel="noopener"
                      >
                        {" "}
                        <img
                          alt="Get it at the Google Play store"
                          width={144}
                          height={49}
                          className=" lazyload lazypreload"
                          data-src="https://vapeuk.co.uk/media/wysiwyg/get-it-on-google-play-logo.png"
                        />
                      </a>
                    </div>
                    <div>&nbsp;</div>
                  </div>
                  <div className="delivery-option-content">
                    <div className="delivery-option-logo">
                      <img
                        id="UM1JDFY"
                        alt="DPD Local Logo"
                        width={125}
                        height={53}
                        className=" lazyload lazypreload"
                        data-src="https://vapeuk.co.uk/media/wysiwyg/DPD-Local-Logo.jpg"
                      />
                    </div>
                    <h3 id="dpd-local-next-day">
                      DPD Local - Next Day Service
                    </h3>
                    <ul>
                      <li>
                        Place your order <strong>before 9 pm</strong> for{" "}
                        <strong>same-day dispatch</strong> and{" "}
                        <strong>next-day delivery*</strong>
                      </li>
                      <li>
                        Deliveries are made every day (*excluding bank holidays)
                      </li>
                      <li>
                        Fully tracked service with a 1-hour delivery window
                      </li>
                      <li>
                        Signature required, or safe place option and collection
                        point
                      </li>
                      <li>£4.99 for orders under £20 (£6.99 at weekends)</li>
                      <li>
                        £3.99 for orders between £20 and £59.99 (£5.99 at
                        weekends)
                      </li>
                      <li>£1.99 for orders over £60 (£3.99 at weekends)</li>
                      <li>FREE for orders over £100 (£150 at weekends)</li>
                      <li>
                        <a
                          tabIndex={0}
                          title="View DPD's informational video"
                          href="https://vimeo.com/dpdgroup/review/435039066/a3de80fcd9#"
                        >
                          DPD information video
                        </a>
                      </li>
                      <li>
                        For more information, see our{" "}
                        <a
                          tabIndex={0}
                          title="See our DPD Local Delivery Guidelines"
                          href="https://vapeuk.co.uk/dpd-local-delivery-guidelines"
                          target="_blank"
                          rel="noopener"
                        >
                          DPD Local Delivery Guidelines
                        </a>
                      </li>
                    </ul>
                    <img
                      id="IWFMRFT"
                      style={{ width: 100 }}
                      title="DPD Pickup"
                      alt="DPD Pickup"
                      width={120}
                      height={120}
                      className=" lazyload lazypreload"
                      data-src="https://vapeuk.co.uk/media/.renditions/wysiwyg/dpd-pickup-logo.jpg"
                    />
                    <h3>DPD Pickup - Next Day Service</h3>
                    <ul>
                      <li>
                        Place your order <strong>before 9 pm</strong> for{" "}
                        <strong>same-day dispatch</strong> and{" "}
                        <strong>next-day delivery* </strong>to a pickup shop of
                        your choice
                      </li>
                      <li>
                        Deliveries are made every day (*excluding bank holidays)
                      </li>
                      <li>
                        Tracked service with an alert when your order is ready
                        for collection from your chosen pickup shop
                      </li>
                      <li>FREE on orders over £20</li>
                      <li>£2.99 for orders under £20</li>
                      <li>
                        For more information, see our{" "}
                        <a
                          tabIndex={0}
                          title="See our DPD Local Delivery Guidelines"
                          href="https://vapeuk.co.uk/dpd-local-delivery-guidelines"
                          target="_blank"
                          rel="noopener"
                        >
                          DPD Local Delivery Guidelines
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="delivery-option">
                  <div className="delivery-option-apps">
                    <div>
                      <p>Download the Royal Mail app:</p>
                      <a
                        tabIndex={0}
                        title="Get the Royal Mail app from the app store"
                        href="https://apps.apple.com/gb/app/royal-mail/id1435168829"
                        target="_blank"
                        rel="noopener"
                      >
                        {" "}
                        <img
                          alt="Get it on the App Store"
                          width={144}
                          height={49}
                          className=" lazyload lazypreload"
                          data-src="https://vapeuk.co.uk/media/wysiwyg/App_Store_iOS-Badge-Alternative_1.png"
                        />{" "}
                      </a>{" "}
                      <a
                        tabIndex={0}
                        title="Get the Royal Mail app from the Google Play store."
                        href="https://play.google.com/store/apps/details?id=com.royalmail.app.droid&hl=en_GB&gl=US"
                        target="_blank"
                        rel="noopener"
                      >
                        {" "}
                        <img
                          alt="Get it at the Google Play store"
                          width={144}
                          height={49}
                          className=" lazyload lazypreload"
                          data-src="https://vapeuk.co.uk/media/wysiwyg/get-it-on-google-play-logo.png"
                        />
                      </a>
                    </div>
                    <div>&nbsp;</div>
                  </div>
                  <div className="delivery-option-content">
                    <div className="delivery-option-logo">
                      <img
                        id="H7Y7DNU"
                        alt="Royal Mail Logo"
                        width={125}
                        height={53}
                        className=" lazyload lazypreload"
                        data-src="https://vapeuk.co.uk/media/wysiwyg/Royal_Mail.svg.png"
                      />
                    </div>
                    <h3 id="royal-mail-special-delivery">
                      Royal Mail Special Delivery
                    </h3>
                    <ul>
                      <li>
                        Place your order <strong>before 4:30 pm</strong> on{" "}
                        <strong>weekdays</strong> for{" "}
                        <strong>same-day dispatch </strong>and
                        <strong> next-day delivery*</strong>
                      </li>
                      <li>
                        Place your order <strong>before 11 am</strong> on{" "}
                        <strong>Saturday</strong> for{" "}
                        <strong>same-day dispatch</strong>
                      </li>
                      <li>
                        *Deliveries made Monday to Saturday (excluding bank
                        holidays)
                      </li>
                      <li>Fully tracked service</li>
                      <li>Signature required</li>
                      <li>£7.99 for orders under £20</li>
                      <li>£6.99 for orders between £20 and £59.99</li>
                      <li>£5.99 for orders between £60 and £99.99</li>
                      <li>£4.99 for orders over £100</li>
                      <li>
                        Orders placed after 11 am Saturday will leave us Monday
                        (excluding bank holidays)
                      </li>
                      <li>
                        For more information, see our{" "}
                        <a
                          tabIndex={0}
                          title="See our Royal Mail Special Delivery Guidelines"
                          href="https://vapeuk.co.uk/royal-mail-special-delivery-guidelines"
                          target="_blank"
                          rel="noopener"
                        >
                          Royal Mail Special Delivery Guidelines
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              <h2 id="rm-sunday-exclusions">
                Royal Mail Sunday Delivery Exclusions
              </h2>
              <p>
                The following postcode exclusions apply for Royal Mail Tracked
                24 and Royal Mail Special Delivery Guaranteed services:
              </p>
              <ul style={{ paddingLeft: 20 }}>
                <li>AB</li>
                <li>BT</li>
                <li>DD</li>
                <li>DG5-9 &amp; 10-16</li>
                <li>FK17-21</li>
                <li>G58, G60, G62, G63, G65, G71-84</li>
                <li>GY</li>
                <li>HS</li>
                <li>IM</li>
                <li>IV</li>
                <li>JE</li>
                <li>KA</li>
                <li>KW</li>
                <li>KY10 &amp;&nbsp;KY14-16</li>
                <li>ML10-12</li>
                <li>PA20-38,&nbsp;PA41-49,&nbsp;PA60-78 &amp;&nbsp;PA80</li>
                <li>PH</li>
                <li>PO30-41</li>
                <li>TD</li>
                <li>TR21-25</li>
                <li>ZE</li>
              </ul>
              <h2>Important</h2>
              <p>
                Vape UK is a responsible retailer with a legal obligation to
                ensure all customers buying from us are at least 18 years of
                age. Your first order with us will be processed using the
                services of{" "}
                <a
                  tabIndex={0}
                  title="View 1account"
                  href="https://1account.net"
                  target="_blank"
                  rel="noopener"
                >
                  1Account
                </a>{" "}
                to verify your age.
              </p>
              <p>
                These checks are performed after your order has been placed. You
                will see a pop-up window on the order confirmation page. Please
                follow the instructions there. If we cannot verify your age, we
                cannot send your items until you have verified with 1Account. We
                cannot be held responsible for any delays this may cause in
                sending your order. More information is available on our&nbsp;
                <a
                  tabIndex={0}
                  title="View our age verification page"
                  href="/age-verification-process"
                  target="_blank"
                  rel="noopener"
                >
                  age verification
                </a>{" "}
                page.
              </p>
              <p>
                All orders are sent in <strong>discreet packaging.</strong>
              </p>
              <p>We do not dispatch orders on Bank Holidays.</p>
              <p>
                The order notes facility at checkout allows you to let us know
                about anything specific about your order. Notes made here
                concerning delivery requests can't be relayed and won't be seen
                by the delivery drivers.
              </p>
              <p>
                If you have selected the 'Deliver to Pick-Up Shop' option with
                DPD through their app or email notifications, please expect and
                allow a minimum 24-hour delay in receiving your order.
              </p>
              <p>
                If your order hasn't arrived within the specified timeframe
                shown for the chosen delivery method, please contact us within
                10 days of the date we dispatched your order so that we can
                investigate with the relevant handler. Unfortunately, we are
                unable to investigate or replace any missing deliveries reported
                to us after 10 working days.
              </p>
              <p>
                If there is a discrepancy with your delivery, please contact us
                immediately so we can help resolve any issues.
              </p>
              <h2>British Forces Post Office (BFPO)</h2>
              <p>
                Orders placed with a BFPO delivery address are estimated to
                arrive within 10-14 working days after leaving us. All BFPO
                orders are sent via Royal Mail, with the required CN22/23
                documentation attached.
              </p>
              <p>
                To avoid any delays in receiving your order or it being returned
                to us, it is important the correct BFPO number and accompanying
                BF postal code are entered, together with the required address
                format and information.
              </p>
              <h2>International Shipping</h2>
              <p>At present, we are unable to ship internationally.</p>
              <p>
                As always, if you have any questions, please do not hesitate to
                get in touch with us on +44 (0)1273 964 252, and we'll be happy
                to help.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default FastDelivery;
