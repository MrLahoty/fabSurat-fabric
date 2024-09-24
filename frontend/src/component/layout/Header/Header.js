import React, { useState, useEffect, useMemo } from 'react';
import { ReactNavbar } from "overlay-navbar";
import { FaSearch, FaShoppingCart, FaPhone, FaUser } from 'react-icons/fa';
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import logo from "../../../images/logo.png";

// Sample category images
import FabricsImage from "../../../images/box1.jpg";
import SareesImage from "../../../images/box3.jpg";
import BlousesImage from "../../../images/box4.jpg";
import JacketImage from "../../../images/box5.jpg";
import MensWearImage from "../../../images/box6.jpg";
import Fabric from "../../../images/box6.jpg";
import Cotton from "../../../images/box1.jpg";

const options = {
  burgerColorHover: "#eb4034",
  logo,
  logoHeight: "6vmax",
  logoWidth: "10vmax",
  navColor1: "#e9f3ff",
  logoHoverSize: "15px",
  logoHoverColor: "#eb4034",
  link1Text: "Home",
  link2Text: "Products",
  link3Text: "Login",
  link4Text: "About",
  link1Font: "Playfair Display, serif", // Add font-family to link1
  link2Font: "Playfair Display, serif", // Add font-family to link2
  link3Font: "Playfair Display, serif", // Add font-family to link3
  link4Font: "Playfair Display, serif", // Add font-family to link4
  link1Url: "/",
  link2Url: "/products",
  link3Url: "/login",
  link4Url: "/about",
  link1Size: "1.3vmax",
  link1Color: "rgba(35, 35, 35,0.8)",
  nav1justifyContent: "flex-end", 
  nav2justifyContent: "flex-end",
  nav3justifyContent: "flex-start",
  nav4justifyContent: "flex-start",
  link1ColorHover:  "#ABB747",
  link1Margin: "1vmax",
  profileIconUrl: "/login",
  profileIconColor: "rgba(35, 35, 35,0.8)",
  profileIconSize: "1.7vmax",
  cartIconSize: "1.8vmax",
  searchIconSize: "1.8vmax",
  searchIconColor: "rgba(35, 35, 35,0.8)",
  cartIconColor: "rgba(35, 35, 35,0.8)",
  profileIconColorHover: "#ABB747",
  searchIconColorHover: "#ABB747",
  cartIconColorHover: "#ABB747",
  cartIconMargin: "1.5vmax",
  profileIcon: true,
  ProfileIconElement: FaUser,  // Profile icon
  searchIcon: true,
  SearchIconElement: FaSearch,  // Search icon
  cartIcon: true,
  CartIconElement: FaShoppingCart  // Cart icon
};

const Header = () => {
  const location = useLocation(); 
  const { isAuthenticated } = useSelector((state) => state.user); 

  const [placeholderText, setPlaceholderText] = useState('');
  const [textIndex, setTextIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);

  const placeholderOptions = useMemo(() => [
    'Search for Fabrics...',
    'Search for Readymades...',
  ], []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCharIndex((prevCharIndex) => prevCharIndex + 1);

      if (charIndex === placeholderOptions[textIndex].length) {
        setTimeout(() => {
          setTextIndex((prevTextIndex) => (prevTextIndex + 1) % placeholderOptions.length);
          setCharIndex(0);
        }, 1000); // Pause before switching to the next text
      }
    }, 100); 

    return () => clearInterval(interval);
  }, [charIndex, textIndex, placeholderOptions]);

  useEffect(() => {
    setPlaceholderText(placeholderOptions[textIndex].substring(0, charIndex));
  }, [charIndex, textIndex, placeholderOptions]);


  return (
    <div>
      <div className="navbar">
        <div className="burger-icon">
          <ReactNavbar {...options} />
        </div>

        <a href="/" className="logos">
          <p>F A B S U R A T</p>
        </a>

        <div className="nav-search">
          <Link to="/search">
            <input placeholder={placeholderText} className="search-input" />
          </Link>
          <Link to="/search">
            <div className="search-icon">
              <FaSearch />
            </div>
          </Link>
        </div>

        <div className="iconss">          
  <a href="tel:+917003798513" data-title="Call Us">
    <div className="phone-icons">
      <FaPhone />
    </div>
  </a>
  <Link to="/cart" data-title="My Cart">
    <div className="cart-icons">
      <FaShoppingCart />
    </div>
  </Link>
</div>

<div>
  {!isAuthenticated && (
    <div className="auth-buttons">
      <Link to="/login" className="auth-button" data-title="Sign In">
        <FaUser />
      </Link>
    </div>
  )}
</div>
</div>

      {location.pathname === "/" && (
        <div className="category-links">
          <a href="/products">
            <img src={FabricsImage} alt="Fabrics" />
            <span>Fabrics</span>
          </a>
          <a href="/products">
            <img src={SareesImage} alt="Kurti" />
            <span>Readymade</span>
          </a>
          <a href="/products">
            <img src={BlousesImage} alt="Blouses" />
            <span>Blouses</span>
          </a>
          <a href="/products">
            <img src={JacketImage} alt="Jacket" />
            <span>Jacket</span>
          </a>
          <a href="/products">
            <img src={MensWearImage} alt="Men's Wear" />
            <span>Men's Wear</span>
          </a>
          <a href="/products">
            <img src={Fabric} alt="Fabric" />
            <span>Fabric</span>
          </a>
          <a href="/products">
            <img src={Cotton} alt="Cotton" />
            <span>Cotton</span>
          </a>
        </div>
      )}
    </div>
  );
};

export default Header;
