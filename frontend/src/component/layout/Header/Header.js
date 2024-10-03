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

  const [isDesktop, setIsDesktop] = useState(window.innerWidth > 768); // Define state for desktop check

  useEffect(() => {
    const handleResize = () => {
      setIsDesktop(window.innerWidth > 768); // Update state on resize
    };

    window.addEventListener('resize', handleResize); // Add event listener for window resize
    handleResize(); // Call initially to set the state

    return () => window.removeEventListener('resize', handleResize); // Cleanup listener on component unmount
  }, []);
  

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
        {isDesktop ? ( // Desktop view
       <>
        <div className="dropdown">
          <button className="dropbtn">
          POSITION PRINTS <span className="arrow"></span>
          </button>
          <div className="dropdown-content">
            <a href="/products">Muslin Position Prints</a>
            <a href="/products/">Chinon Position Prints</a>
            <a href="/products/">Georgette Position Prints</a>
            <a href="/products/">Opada Position Prints</a>
            <a href="/products/">Dola Silk Jacquard Position Prints</a>
            <a href="/products/">Organza Position Prints</a>
            <a href="/products/">Tissue Zari Position Prints</a>
            <a href="/products/">Crepe Position Prints</a>
          </div>
        </div>
        <div className="dropdown">
          <button className="dropbtn">
          EMBROIDERED <span className="arrow"></span>
          </button>
          <div className="dropdown-content">
            <a href="/products">Chinon Embroidery</a>
            <a href="/products">Faux Georgette Embroidery</a>
            <a href="/products">Viscose Georgette Embroider</a>
            <a href="/products">Silk Embroidery</a>
            <a href="/products">Rayon Embroidery</a>
            <a href="/products">Velvet Embroidery</a>
            <a href="/products">Organza Embroidery</a>
            <a href="/products">Cotton Embroidery</a>
            <a href="/products">Shimmer Embroidery</a>
          </div>
        </div>
        <div className="dropdown">
          <button className="dropbtn">
          PRINTS <span className="arrow"></span>
          </button>
          <div className="dropdown-content">
            <a href="/products">Hakoba Prints</a>
            <a href="/products">Satin Prints</a>
            <a href="/products">Georgette Prints</a>
            <a href="/products">Muslin Prints</a>
            <a href="/products">Rayon Prints</a>
            <a href="/products">Velvet Prints</a>
            <a href="/products">Sugarcane Prints</a>
            <a href="/products">Chinon Prints</a>
          </div>
        </div>
        <div className="dropdown">
          <button className="dropbtn">
            PLAIN <span className="arrow"></span>
          </button>
          <div className="dropdown-content">
            <a href="/products">Hakoba</a>
            <a href="/products">Dyeable</a>
            <a href="/products">Pure/Viscose</a>
            <a href="/products">Semi Pure</a>
          </div>
        </div>
        <div className="dropdown">
          <button className="dropbtn">
          READYMADE <span className="arrow"></span>
          </button>
          <div className="dropdown-content">
            <a href="/products">Fabric On Sale</a>
            <a href="/products">Jacket On Sale</a>
            <a href="/products">Blouse On Sale</a>
            <a href="/products">Saree On Sale</a>
          </div>
        </div>
        <div className="dropdown">
          <button className="dropbtn">
            SALE <span className="arrow"></span>
          </button>
          <div className="dropdown-content">
            <a href="/products">Fabric On Sale</a>
            <a href="/products">Readymade On Sale</a>
          </div>
        </div>
      </>
    ) : ( // Mobile view (circle-style links)
      <>
        <a href="/products">
          <img src={FabricsImage} alt="Position Prints" />
          <span>Position Prints</span>
        </a>
        <a href="/products">
          <img src={SareesImage} alt="Embroidered" />
          <span>Embroidered</span>
        </a>
        <a href="/products">
          <img src={BlousesImage} alt="Prints" />
          <span>Prints</span>
        </a>
        <a href="/products">
          <img src={JacketImage} alt="Plain" />
          <span>Plain</span>
        </a>
        <a href="/products">
          <img src={MensWearImage} alt="Readymade" />
          <span>Readymade</span>
        </a>
        <a href="/products">
          <img src={Fabric} alt="Sale" />
          <span>Sale</span>
        </a>
      </>
    )}
  </div>
)}
    </div>
  );
};

export default Header;
