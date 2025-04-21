import React, { useState, useEffect, useMemo } from 'react';
import { ReactNavbar } from "overlay-navbar";
import { FaSearch, FaShoppingCart, FaPhone, FaUser } from 'react-icons/fa';
import { Link, useLocation  } from "react-router-dom";
import { useSelector } from "react-redux";
import logo from "../../../images/logo.png";

// Sample category images
import FabricsImage from "../../../images/c1.jpg";
import SareesImage from "../../../images/c2.jpg";
import BlousesImage from "../../../images/c3.jpg";
import JacketImage from "../../../images/c4.jpg";
import HakobaImage from "../../../images/HakobaFabrics.jpeg";
import CottonImage from "../../../images/CottonEmbroideryy.jpeg";
// import MensWearImage from "../../../images/box6.jpg";
import Fabric from "../../../images/box6.jpg";

const options = {
  burgerColorHover: "rgb(161,161,225)",
  logo,
  logoHeight: "6vmax",
  logoWidth: "10vmax",
  navColor1: "#e9f3ff",
  logoHoverSize: "17px",
  logoHoverColor: "rgb(161,161,225)",
  link1Text: "Home",
  link2Text: "Products",
  link3Text: "Login",
  link4Text: "About",
  link1Font: "Playfair Display, serif", 
  link2Font: "Playfair Display, serif",
  link3Font: "Playfair Display, serif",
  link4Font: "Playfair Display, serif",
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
  link1ColorHover:  "rgb(161,161,225)",
  link1Margin: "1vmax",
  profileIconUrl: "/login",
  profileIconColor: "rgba(35, 35, 35,0.8)",
  profileIconSize: "1.7vmax",
  cartIconSize: "1.8vmax",
  searchIconSize: "1.8vmax",
  searchIconColor: "rgba(35, 35, 35,0.8)",
  cartIconColor: "rgba(35, 35, 35,0.8)",
  profileIconColorHover: "rgb(161,161,225)",
  searchIconColorHover: "rgb(161,161,225)",
  cartIconColorHover: "rgb(161,161,225)",
  cartIconMargin: "1.5vmax",
  profileIcon: true,
  ProfileIconElement: FaUser,  // Profile icon
  searchIcon: true,
  SearchIconElement: FaSearch,  // Search icon
  cartIcon: true,
  CartIconElement: FaShoppingCart  // Cart icon
};

const Header = () => {
  const { isAuthenticated } = useSelector((state) => state.user); 

  const cartItems = useSelector((state) => state.cart.cartItems); // Access cart items from Redux state

  // Calculate total cart quantity
  const totalQuantity = cartItems.reduce((acc, item) => acc + item.quantity, 0); 

  const [placeholderText, setPlaceholderText] = useState('');
  const [textIndex, setTextIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);

  const placeholderOptions = useMemo(() => [
    'Search for Fabrics...',
    'Search for Readymades...',
  ], []);

  const [isDesktop, setIsDesktop] = useState(window.innerWidth > 768); // Define state for desktop check

   // Get current page path
   const location = useLocation();

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

  const hideCategoryLinksInMobile = !isDesktop && [
    "/Shipping&Payment",
    "/Return&Refund",
    "/PrivacyPolicy",
    "/Terms&Condition",
  ].includes(location.pathname);


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
              {/* Display the total quantity as a badge only if the user is authenticated and totalQuantity > 0 */}
              {isAuthenticated && totalQuantity >= 0 && (
                <span className="cart-badge">{totalQuantity}</span>
              )}
              {/* If not authenticated, don't show the badge at all */}
              {!isAuthenticated && totalQuantity >= 0 && (
                <span className="cart-badges" style={{ totalQuantity}}>0</span>
              )}
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

    {/* {location.pathname === "/" && ( */}
       {/* Conditionally render the category-links based on the page and screen size */}
       {!hideCategoryLinksInMobile && (
        <div className="category-links">
          {isDesktop ? ( // Desktop view
       <>
        <div className="dropdown">
          <button className="dropbtn">
          <a href="/PositionPrints" className="dropdown-link">POSITION PRINTS</a>
          <span className="arrow"></span>
          </button>
          <div className="dropdown-content">
            <a href="/MuslinPositionPrints">Muslin Position Prints</a>
            <a href="/ChinonPositionPrints">Chinon Position Prints</a>
            <a href="/GeorgettePositionPrints">Georgette Position Prints</a>
            <a href="/OpadaPositionPrints">Opada Position Prints</a>
            <a href="/JacquardPositionPrints">Jacquard Position Prints</a>
            <a href="/OrganzaPositionPrints">Organza Position Prints</a>
            <a href="/TissueZariPositionPrints">Tissue Zari Position Prints</a>
            <a href="/CrepePositionPrints">Crepe Position Prints</a>
            <a href="/SilkPositionPrints">Silk Position Prints</a>
            <a href="/ChanderiPositionPrints">Chanderi Position Prints</a>

          </div>
        </div>
        <div className="dropdown">
          <button className="dropbtn">
          <a href="/Embroidered" className="dropdown-link">EMBROIDERED </a>
          <span className="arrow"></span>
          </button>
          <div className="dropdown-content">
            <a href="/ChinonEmbroidery">Chinon Embroidery</a>
            <a href="/FauxGeorgetteEmbroidery">Faux Georgette Embroidery</a>
            <a href="/ViscoseGeorgetteEmbroidery">Viscose Georgette Embroidery</a>
            <a href="/SilkEmbroidery">Silk Embroidery</a>
            <a href="/RayonEmbroidery">Rayon Embroidery</a>
            <a href="/VelvetEmbroidery">Velvet Embroidery</a>
            <a href="/OrganzaEmbroidery">Organza Embroidery</a>
            <a href="/CottonEmbroidery">Cotton Embroidery</a>
            <a href="/ShimmerEmbroidery">Shimmer Embroidery</a>
            <a href="/NetEmbroidery">Net Embroidery</a>
            <a href="/SatinEmbroidery">Satin Embroidery</a>
            <a href="/SpaceSilkEmbroidery">Space Silk Embroidery</a>
            <a href="/CrepeEmbroidery">Crepe Embroidery</a>

          </div>
        </div>
        <div className="dropdown">
          <button className="dropbtn">
          <a href="/hakobafabric" className="dropdown-link">HAKOBA FABRIC </a>
          <span className="arrow"></span>
          </button>
          <div className="dropdown-content">
            <a href="/DyeableHakobafabric">Dyeable Hakoba Fabric</a>
            <a href="/PrintedHakobaFabric">Printed Hakoba Fabric</a>
          </div>
        </div>
        <div className="dropdown">
          <button className="dropbtn">
          <a href="/cottonfabric" className="dropdown-link">COTTON FABRIC </a>
          <span className="arrow"></span>
          </button>
          <div className="dropdown-content">
            <a href="/UnstitchedCombo">Unstitched Combo</a>
            <a href="/DyeableCottonEmbroidery">Dyeable Cotton Embroidery</a>
            <a href="/AlloverCottonEmbroidery">AllOver Cotton Embroidery</a>
          </div>
        </div>
        <div className="dropdown">
          <button className="dropbtn">
          <a href="/Prints" className="dropdown-link"> PRINTS </a>
          <span className="arrow"></span>
          </button>
          <div className="dropdown-content">
            {/* <a href="/HakobaPrints">Hakoba Prints</a> */}
            <a href="/SatinPrints">Satin Prints</a>
            <a href="/GeorgettePrints">Georgette Prints</a>
            <a href="/MuslinPrints">Muslin Prints</a>
            <a href="/RayonPrints">Rayon Prints</a>
            <a href="/VelvetPrints">Velvet Prints</a>
            <a href="/SugarcanePrints">Sugarcane Prints</a>
            <a href="/ChinonPrints">Chinon Prints</a>
            <a href="/SilkPrints">Silk Prints</a>
            <a href="/CottonPrints">Cotton Prints</a>

          </div>
        </div>
        <div className="dropdown">
          <button className="dropbtn">
          <a href="/Plain" className="dropdown-link"> PLAIN </a> 
            <span className="arrow"></span>
          </button>
          <div className="dropdown-content">
            {/* <a href="/Hakoba">Hakoba</a> */}
            <a href="/Velvet">Velvet</a>
            <a href="/Dyeable">Dyeable</a>
            <a href="/PureViscose">Pure/Viscose</a>
            <a href="/Others">Others</a>
          </div>
        </div>
      {/* <div className="dropdown">
       <button className="dropbtn">
       <a href="/Comingsoon" className="dropdown-link"> READYMADE </a>           
       <span className="arrow"></span>
       </button>
      <div className="dropdown-content">
        <a href="/Comingsoon">Kurti On Sale</a>
        <a href="/Comingsoon">Co-Ord Set On Sale</a>
        <a href="/Comingsoon">Dupatta</a>
        <a href="/Comingsoon">Others</a>
        <a href="/Comingsoon">Pure Muslin Kurti On Sale</a>
        <a href="/Comingsoon">Floral Print Co-ord set On Sale</a>
      </div>
      </div> */}

        <div className="dropdown">
          <button className="dropbtn">
          <a href="/products" className="dropdown-link"> SALE </a>            
            <span className="arrow"></span>
          </button>
          <div className="dropdown-content">
            <a href="/products">Fabric On Sale</a>
            <a href="/products">Readymade On Sale</a>
          </div>
        </div>
      </>
    ) : ( // Mobile view (circle-style links)
      <>
        <a href="/PositionPrints">
          <img src={FabricsImage} alt="Position Prints" />
          <span>Position Prints</span>
        </a>
        <a href="/Embroidered">
          <img src={SareesImage} alt="Embroidered" />
          <span>Embroidery</span>
        </a>
        <a href="/hakobafabric">
          <img src={HakobaImage} alt="Hakoba" />
          <span>Hakoba</span>
        </a>
        <a href="/cottonfabric">
          <img src={CottonImage} alt="Cotton" />
          <span>Cotton</span>
        </a>
        <a href="/Prints">
          <img src={BlousesImage} alt="Prints" />
          <span>Prints</span>
        </a>
        <a href="/Plain">
          <img src={JacketImage} alt="Plain" />
          <span>Plain</span>
        </a>
        {/* <a href="/Comingsoon">
          <img src={MensWearImage} alt="Comingsoon" />
          <span>Readymade</span>
        </a> */}
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
