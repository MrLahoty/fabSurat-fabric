import React, { useState, useEffect, useCallback } from "react";
import "./Home.css";
import ProductCard from "./ProductCard.js";
import MetaData from "../layout/MetaData";
import { clearErrors, getProduct } from "../../actions/productAction";
import { Carousel } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import Loader from "../layout/Loader/Loader";
import { useAlert } from "react-alert";
import { Link } from "react-router-dom";
import videoFiles from '../../images/banner.mp4';

import MakeInIndia from "../../images/india_map1.webp";
import Quality from "../../images/ThumbsUp1.png";
import COD from "../../images/cash_on_delivery1.png";
import FastShipping from "../../images/Fast_Delivery1.png";
import EasyReturns from "../../images/Package1.png";
import CustomPainting from "../../images/Customized_printing1.webp";

import Image1 from '../../images/SHOP NOW.png';
// import Image2 from '../../images/banner.mp4';
// import videoFile from '../../images/banner.mp4'; 

import LatestCollection from './LatestCollection';
import BestSellers from './BestSellers'; 
import HappyCustomers from './HappyCustomers'; 

const Home = () => {

  const alert = useAlert();
  const dispatch = useDispatch();
  const { loading, error, products = [] } = useSelector((state) => state.products);
  const [searchTerm] = useState("");

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
    dispatch(getProduct());
  }, [dispatch, error, alert]);

  const handleUnder199Click = () => {
    window.location.href = "/under199";
  };

  const handleUnder299Click = () => {
    window.location.href = "/under299";
  };

  const handleUnder399Click = () => {
    window.location.href = "/under399";
  };

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleOrderNowClick = () => {
    window.location.href = "/products";
  };

  const handleOrderNowClicks = () => {
    const phoneNumber = "918013267616"; // WhatsApp number in international format
    const message = "Hello, I'm interested in placing a bulk order for Fabrics/Readymades"; // Optional pre-filled message
    const whatsappURL = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    // Open WhatsApp chat in a new tab
    window.open(whatsappURL, '_blank');
  };

  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    // { image: Image1, alt: 'Slide 1' },
    {image: Image1, alt: 'Slide 2'}
  ];

  const nextSlide = useCallback(() => {
    setCurrentSlide((prevSlide) => (prevSlide + 1) % slides.length);
  }, [slides.length]);

  const prevSlide = () => {
    setCurrentSlide((prevSlide) => (prevSlide - 1 + slides.length) % slides.length);
  };

  useEffect(() => {
    const interval = setInterval(nextSlide, 4000); // 4 seconds interval

    return () => clearInterval(interval);
  }, [nextSlide]);

   // Create a duplicate array for infinite scrolling
   const infiniteProducts = [...filteredProducts, ...filteredProducts, ...filteredProducts]; // Duplicate the array three times

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <MetaData title="FabSurat" />

          <div className="slideshow-container">
            <div className="slides" style={{ transform: `translateX(-${currentSlide * 100}%)` }}>
              {slides.map((slide, index) => (
                <div
                  className={`slide ${index === currentSlide ? 'active' : ''}`}
                  key={index}
                >
                {/* Image for mobile view */}
              <div className="mobile-image-container">
               <Link to="/products">
                 <img
                   className="mobile-image"
                   src={slide.image} // Replace with slide.mobileImage if separate mobile image
                   alt={slide.alt}
                   style={{ width: '100%', height: 'auto', objectFit: 'cover' }}
                 />
               </Link>
              </div>

              {/* Image for desktop view */}
              <div className="desktop-view">
                <Link to="/products">
                  <img
                    src={slide.image} // Replace with slide.desktopImage if separate desktop image
                    alt={slide.alt}
                    style={{ width: '100%', height: 'auto', objectFit: 'cover' }}
                  />
                </Link>
              </div>

                  <div className="shop-now-button-container">
                    <button onClick={handleOrderNowClick}>Shop Now</button>
                  </div>
                </div>
              ))}
            </div>
            <button className="prev" onClick={prevSlide}>❮</button>
            <button className="next" onClick={nextSlide}>❯</button>
            <div className="dot-container">
              {slides.map((_, index) => (
                <span
                  key={index}
                  className={`dot ${index === currentSlide ? 'active-dot' : ''}`}
                  onClick={() => setCurrentSlide(index)}
                ></span>
              ))}
            </div>
          </div>

          {/* New Arrivals Section */}
          <h2 className="homeHeading">New Arrival</h2>
          <div className="container" id="container">
            {filteredProducts.length > 0 && (
              <Carousel className="custom-carousel" interval={4000} fade>
                {infiniteProducts.map((product, index) => (
                  <Carousel.Item key={product._id} style={{ width: '100%', height: '100%' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%', height: '100%' }}>
                      <ProductCard product={infiniteProducts[index % filteredProducts.length]} style={{ flex: '1 1 auto' }} />
                      {index + 1 < infiniteProducts.length && <ProductCard product={infiniteProducts[(index + 1) % filteredProducts.length]} style={{ flex: '1 1 auto' }} />}
                      {index + 2 < infiniteProducts.length && <ProductCard product={infiniteProducts[(index + 2) % filteredProducts.length]} style={{ flex: '1 1 auto' }} />}
                    </div>
                    {index < infiniteProducts.length - 3 && <hr style={{ margin: '20px 0', width: '100%' }} />}
                  </Carousel.Item>
                ))}
              </Carousel>
            )}
          </div>

          <div className="feature-section">
            <div className="feature-box">
              <img src={MakeInIndia} alt="Make in India" />
              <p>Make in India</p>
            </div>
            <div className="feature-box">
              <img src={Quality} alt="Assured Quality" />
              <p>Assured Quality</p>
            </div>
            <div className="feature-box">
              <img src={COD} alt="Cash On Delivery" />
              <p>Cash On Delivery</p>
            </div>
            <div className="feature-box">
              <img src={FastShipping} alt="Fast Shipping" />
              <p>Fast Shipping</p>
            </div>
            <div className="feature-box">
              <img src={EasyReturns} alt="Easy Returns" />
              <p>Easy Returns</p>
            </div>
            <div className="feature-box">
              <img src={CustomPainting} alt="Custom Printing" />
              <p>Custom Printing</p>
            </div>
          </div>
        </>
      )}

     <div className="shop-by-price">
      <h2>Shop By Price</h2>
        <button onClick={handleUnder199Click} className="btn-under299">
          Under ₹199
        </button>
        <button onClick={handleUnder299Click} className="btn-under299">
          Under ₹299
        </button>
        <button onClick={handleUnder399Click} className="btn-under299">
          Under ₹399
        </button>
     </div>

    <LatestCollection/>

    <div className="bulk-orders-section">
      <h2>We take <span className="highlight">Bulk Orders</span> too!</h2>
      <p>
        Looking for bulk fabric orders? Look no further! Our extensive selection features <strong>premium quality</strong> materials, including luxurious silks, durable cottons, versatile blends, and more, all designed to elevate your creations. Whether you're crafting elegant evening wear, comfortable everyday outfits, or bespoke home decor, we have the perfect fabric to bring your vision to life. Enjoy exceptional customer service, fast shipping, and competitive prices that make it easy to get exactly what you need. Don't miss out on the opportunity to transform your projects with the best fabrics available—order now and experience the difference!
      </p>
      <p><strong>Order now</strong> and get the best fabric for your needs!</p>
      
      <button className="order-now-button" onClick={handleOrderNowClicks}>Order Now</button>
    </div>

    <BestSellers/>

    <Link to = {"/products"}>
     <div className="video-sections">
        <video autoPlay muted loop playsInline>
          <source src={videoFiles} type="video/mp4" />
       </video>
     </div>
    </Link>

    <HappyCustomers /> 

    </>  
  );
};

export default Home; 
