import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { store } from "./store";
import { Provider } from "react-redux";

// Imporing all styles from source folder
import "swiper/swiper-bundle.css";
import "./assets/css/bootstrap.min.css";
import "./assets/css/all.min.css";
import "./assets/css/nice-select.css";
import "./assets/css/magnific-popup.css";
import "./assets/css/animate.css";
import "./assets/css/style.css";
import "./assets/css/style.css.map";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <App />
  </Provider>
);

reportWebVitals();
