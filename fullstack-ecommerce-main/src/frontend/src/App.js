import React from 'react'
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import RootLayout from "./RootLayout";
import Home from "./Pages/Home";
import Product from './Pages/Product/Product';
import Authenticate from './Pages/Authenticate/Authenticate';
import ProductDetailPage from './Pages/Product/ProductDetailPage';
import Checkout from './Pages/Checkout/Checkout';
import Payment from './Pages/Payment/Payment';
import About from './Pages/About/About';
import Admin from './Pages/Admin/Admin';
import './assets/css/bootstrap.min.css'; // Ensure all CSS files are imported correctly
import './assets/css/all.min.css';
import './assets/css/style.css';
import Cart from './Pages/Cart/Cart';
// import 'swiper/swiper-bundle.min.css'; // Make sure the CSS is imported
// import 'swiper/swiper.min.css';

function App() {
  console.log("[App.js]");
  const router = createBrowserRouter([
    {
      path: "/",
      element: <RootLayout />,
      children: [
        { path: "/", element: <Home /> },
        { id: "products" , path: "/products", element: <Product /> },
        { id: "productsDetail" , path:"/products/:id", element:<ProductDetailPage /> },
        { path:"/checkout", element:<Checkout/> },
        { path:"/checkout/payment", element:<Payment/> },
        { path:"/about", element:<About/> },
        { path:"/admin", element:<Admin/> },
        {path : "/authenticate" , element : <Authenticate/>},
        {path : "/cart" , element : <Cart/>}
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}


export default App;
