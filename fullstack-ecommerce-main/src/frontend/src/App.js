import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import RootLayout from "./RootLayout";
import Home from "./Pages/Home";
import Product from "./Pages/Product/Product";
import Authenticate from "./Pages/Authenticate/Authenticate";
import ProductDetailPage from "./Pages/Product/ProductDetailPage";
import Checkout from "./Pages/Checkout/Checkout";
import Payment from "./Pages/Payment/Payment";
import About from "./Pages/About/About";
import Admin from "./Pages/Admin/Admin";

import Cart from "./Pages/Cart/Cart";
import Register from "./Pages/Register/Register";
import Blog from "./Pages/Blog/Blog";
import FastDelivery from "./Pages/AccessOptionPages/FastDelivery";
import SameDayDispatch from "./Pages/AccessOptionPages/SameDayDispatch";
import Support from "./Pages/AccessOptionPages/Support";
import FreeShipping from "./Pages/AccessOptionPages/FreeShipping";
import ViewAllBlogs from "./Pages/Blog/ViewAllBlogs";

function App() {
  console.log("[App.js]");
  const router = createBrowserRouter([
    {
      path: "/",
      element: <RootLayout />,
      children: [
        { path: "/", element: <Home /> },
        { id: "products", path: "/products", element: <Product /> },
        {
          id: "productsDetail",
          path: "/products/:id",
          element: <ProductDetailPage />,
        },
        { path: "/checkout", element: <Checkout /> },
        { path: "/checkout/payment", element: <Payment /> },
        { path: "/about", element: <About /> },
        { path: "/admin", element: <Admin /> },
        { path: "/authenticate", element: <Authenticate /> },
        { path: "/register", element: <Register /> },
        { path: "/cart", element: <Cart /> },
        { path: "/blog", element: <Blog /> },
        { path: "/allBlogs", element: <ViewAllBlogs /> },
        { path: "/fastDelivery", element: <FastDelivery /> },
        { path: "/sameDayDispatch", element: <SameDayDispatch /> },
        { path: "/support", element: <Support /> },
        { path: "/freeShipping", element: <FreeShipping /> },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
