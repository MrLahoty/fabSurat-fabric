import React from "react";
import { ReactNavbar } from "overlay-navbar";
import logo from "../../../images/logo.png";
import { Link } from "react-router-dom";
import { FaSearch } from "react-icons/fa";

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

  const handleCategoryChange = (event) => {
    if (event.target.value === "All Categories") {
      window.location.href = "/products";
    }

    if (event.target.value === "Cotton Fabric") {
      window.location.href = "/products";
    }

    if (event.target.value === "Embroidered") {
      window.location.href = "/products";
    }

    if (event.target.value === "Silk") {
      window.location.href = "/products";
    }
  }; 

  return (
    <div className="navbar">
      <div className="burger-icon">
        <ReactNavbar {...options} />
      </div>
    
      <a href="/" className="logos">
        <p>F A B S U R A T</p>
      </a>

      <div className="nav-search">
        <select className="search-select" onChange={handleCategoryChange}>
          <option>All Categories </option>
          <option>Cotton Fabric</option>
          <option>Embroidered</option>
          <option>Silk</option>              
        </select>
        <Link to="/search">   
        <input placeholder="Search..." className="search-input" ></input>         
        </Link>
        <div className="search-icon">
        <FaSearch />
        </div>
      </div>
    </div>    
  );
};

export default Header;
