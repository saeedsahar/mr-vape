import React from "react";
import { Outlet } from "react-router-dom";
import MainNavigation from "./Component/MainNaivgationComp/MainNavigation";
import Footer from "./Component/MainNaivgationComp/Footer";

function RootLayout(props) {
  console.log("[RootLayout.js]");

  return (
    <>
      <MainNavigation />
      <Outlet />
      <Footer/>
    </>
  );
}

export default RootLayout;
