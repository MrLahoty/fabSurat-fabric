import React from "react";
import { ReactNavbar } from "overlay-navbar";
import logo from "../../../images/logo.png";
import { Link } from "react-router-dom";
import { FaSearch } from "react-icons/fa";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";

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
  link1ColorHover: "#eb4034",
  link1Margin: "1vmax",
  profileIconUrl: "/login",
  profileIconColor: "rgba(35, 35, 35,0.8)",
  searchIconColor: "rgba(35, 35, 35,0.8)",
  cartIconColor: "rgba(35, 35, 35,0.8)",
  profileIconColorHover: "#eb4034",
  searchIconColorHover: "#eb4034",
  cartIconColorHover: "#eb4034",
  cartIconMargin: "1vmax",
};

const Header = () => {
  const location = useLocation(); // Use useLocation to get the current path
  const { isAuthenticated } = useSelector((state) => state.user); // Adjust the path according to your store structure

  const handleCategoryChange = (event) => {
    if (["All Categories", "Fabric", "Readymade"].includes(event.target.value)) {
      window.location.href = "/products";
    }
  };

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
          <select className="search-select" onChange={handleCategoryChange}>
            <option>All Categories</option>
            <option>Fabric</option>
            <option>Readymade</option>
          </select>
          <Link to="/search">
            <input placeholder="Search..." className="search-input" />
          </Link>
          <div className="search-icon">
            <FaSearch />
          </div>
        </div>

        <div>
          {!isAuthenticated && (
            <div className="auth-buttons">
              <Link to="/login" className="auth-button">Login/SignUp</Link>
            </div>
          )}
        </div>
      </div>

      {/* Conditionally render category links only on the homepage */}
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