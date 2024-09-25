import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useSelector } from 'react-redux'
import Cart from "../Cart/Cart"
import {useDispatch} from "react-redux"
import { openCart } from "../Cart/CartSlice";
import logo from "../../assets/images/logo/logo.svg";
function MainNavigation(props) {

  console.log("[MainNavigation.js]");
  const containerRef = React.useRef(null);
  let navigate = useNavigate()
  let isLogged =  useSelector((state) => state.auth.isLogged)
  let currentUser = useSelector((state) => state.auth.name)
  let cartState = useSelector((state) => state.cart.open)
  let cartStates = useSelector((state) => state.cart)
  let dispatch = useDispatch()

  return (
  <>
  <Cart containerRef={containerRef}/>
  <div className="top__header black-area pt-30 pb-30">

    <div className="container">
      <div className="top__wrapper">
        <a className="main__logo">
          <img onClick={() => navigate("/")} src={logo} alt="logo__image" />
        </a>
        <div className="search__wrp">
          <input placeholder="Search for" aria-label="Search" />
          <button>
            <i className="fa-solid fa-search" />
          </button>
        </div>
        <div className="account__wrap">
          <div className="account d-flex align-items-center">
            <div className="user__icon">
              <a href="#0">
                <i className="fa-regular fa-user" />
              </a>
            </div>
           <a href="#0" className="acc__cont">
            {isLogged ?  <span className="text-white">{currentUser}</span> :  
            <span onClick={() => navigate("/authenticate")} className="text-white">My Account</span>}
            </a>
          </div>
          <div className="cart d-flex align-items-center" onClick={() => dispatch(openCart(!cartState))} ref={containerRef}>
            <span className="cart__icon">
              <i className="fa-regular fa-cart-shopping" />
            </span>
            <a href="#0" className="c__one">
              <span className="text-white">£{cartStates.totalPrice}</span>
            </a>
            <span className="one text-white">{cartStates.total}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
  <header className="header-section black-area">
    <div className="container">
      <div className="header-wrapper">
        <div className="header-bar d-lg-none">
          <span />
          <span />
          <span />
        </div>
        <ul className="main-menu">
          <li>
            <a href="#0">
              Top Products
              <i className="fa-regular fa-angle-down" />
            </a>
            <ul className="sub-menu">
              <li className="subtwohober">
                <a href="#">Mega Box</a>
              </li>
              <li className="subtwohober">
                <a href="#">Rocket X</a>
              </li>
              <li className="subtwohober">
                <a href="#">Alien Max</a>
              </li>
              <li className="subtwohober">
                <a href="#">Black &amp; Golden</a>
              </li>
              <li className="subtwohober">
                <a href="#">Falcon X</a>
              </li>
              <li className="subtwohober">
                <a href="#">Infinity Box</a>
              </li>
            </ul>
          </li>
          <li>
            <a href="#">E-Liquid</a>
          </li>
          <li>
            <a href="#0">
              Disposeable Vapes <i className="fa-regular fa-angle-down" />
            </a>
            <ul className="sub-menu">
              <li className="subtwohober">
                <a href="#">Mega Box</a>
              </li>
              <li className="subtwohober">
                <a href="#">Rocket X</a>
              </li>
              <li className="subtwohober">
                <a href="#">Alien Max</a>
              </li>
              <li className="subtwohober">
                <a href="#">Black &amp; Golden</a>
              </li>
              <li className="subtwohober">
                <a href="#">Falcon X</a>
              </li>
              <li className="subtwohober">
                <a href="#">Infinity Box</a>
              </li>
            </ul>
          </li>
          <li>
            <a href="#0">
              Nic Salts <i className="fa-regular fa-angle-down" />
            </a>
            <ul className="sub-menu">
              <li className="subtwohober">
                <a href="#">Mega Box</a>
              </li>
              <li className="subtwohober">
                <a href="#">Rocket X</a>
              </li>
              <li className="subtwohober">
                <a href="#">Alien Max</a>
              </li>
              <li className="subtwohober">
                <a href="#">Black &amp; Golden</a>
              </li>
              <li className="subtwohober">
                <a href="#">Falcon X</a>
              </li>
              <li className="subtwohober">
                <a href="#">Infinity Box</a>
              </li>
            </ul>
          </li>
          <li>
            <a href="#">Vape Kits</a>
          </li>
          <li>
          <NavLink to="/" className={({ isActive }) => isActive ? "nav-link-active" : "nav-link"}>Home</NavLink>
          </li>
          <li>
          <NavLink to="/about" className={({ isActive }) => isActive ? "nav-link-active" : "nav-link"}>About</NavLink>
          </li>
          <li>
          <NavLink to="/admin" className={({ isActive }) => isActive ? "nav-link-active" : "nav-link"}>Admin</NavLink>

          </li>
          <li>
            <a href="#">Coils</a>
          </li>
          <li>
            <a href="#">Tanks</a>
          </li>
          <li>
            <a href="#">Wholesale</a>
          </li>
          <li>
            <a href="#">Accessories</a>
          </li>
          <li>
            <a href="#">Clearence</a>
          </li>
        </ul>
    
      </div>
    </div>
 
  </header>

{/* End here */}
    {/* <div className="toolbar mat-elevation-z8 " style={{ width: "100%" }}>

      <nav style={{marginLeft : "10px"}}>
        <NavLink to="/" className={({ isActive }) => isActive ? "nav-link-active" : "nav-link"}>Home</NavLink>
        <NavLink to="/products" className={({ isActive }) => isActive ? "nav-link-active" : "nav-link"}>Products</NavLink>
        <NavLink to="/about" className={({ isActive }) => isActive ? "nav-link-active" : "nav-link"}>About</NavLink>
        <NavLink to="/admin" className={({ isActive }) => isActive ? "nav-link-active" : "nav-link"}>Admin</NavLink>
        <NavLink to="/sheesha" className={({ isActive }) => isActive ? "nav-link-active" : "nav-link"}>Sheesha</NavLink>
      </nav>

      <span className="spacer"></span>
      <div className="auth-info-container">
        {!isLogged ? (
          <NavLink to="/authenticate" className="nav-link auth-button">Authenticate</NavLink>
        ) : (
          <div className="container">
            <small>{currentUser}</small>
            <button className="icon-button">
           
            </button>
            <div className="profile-menu">
              <NavLink to="/profile" className="menu-item">
         
              </NavLink>
              <NavLink to="/settings" className="menu-item">
               
              </NavLink>
              <button onClick={() => alert("Logging out")} className="menu-item">
                Logout
              </button>
            </div>
          </div>
        )}
      </div>

      <div className="cart-info-container">
        <button className="small-button" onClick={() => dispatch(openCart(!cartState))} ref={containerRef}>
          Cart
           </button >
      </div>
      
    </div>
    <Cart containerRef={containerRef}/> */}
    </>
  );
}

export default MainNavigation;
