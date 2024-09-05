import React, { useState, useEffect, useMemo, useCallback } from "react";
import "./Home.css";
import ProductCard from "./ProductCard.js";
import MetaData from "../layout/MetaData";
import { clearErrors, getProduct } from "../../actions/productAction";
import { Carousel } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import Loader from "../layout/Loader/Loader";
import { useAlert } from "react-alert";
import { Link } from "react-router-dom";
import axios from 'axios';
import videoFile from '../../images/video.mp4';
import videoFiles from '../../images/video1.mp4';


import MakeInIndia from "../../images/india_map.webp";
import Quality from "../../images/ThumbsUp.png";
import COD from "../../images/cash_on_delivery.png";
import FastShipping from "../../images/Fast_Delivery.png";
import EasyReturns from "../../images/Package.png";
import CustomPainting from "../../images/Customized_printing.webp";

import Image1 from '../../images/fab.avif';
import Image2 from '../../images/fabs.avif';
import Image3 from '../../images/fabss.avif';

import NewsletterPopup from './NewsletterPopup';
import LatestCollection from './LatestCollection'; // Import the new component
import BestSellers from './BestSellers'; 


const Home = () => {

  const alert = useAlert();
  const dispatch = useDispatch();
  const { loading, error, products = [] } = useSelector((state) => state.products);
  const [searchTerm] = useState("");

  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState(''); 
 
  const [placeholderText, setPlaceholderText] = useState('');
  const [textIndex, setTextIndex] = useState(0);
  const [fullText, setFullText] = useState('Your email address...');
  const [charIndex, setCharIndex] = useState(0);

  const placeholderOptions = useMemo(() => [
    'Your email address...',
  ], []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCharIndex((prevCharIndex) => {
        const newCharIndex = (prevCharIndex + 1) % (fullText.length + 1);
        if (newCharIndex === 0) {
          setTextIndex((prevTextIndex) => (prevTextIndex + 1) % placeholderOptions.length);
          setFullText(placeholderOptions[(textIndex + 1) % placeholderOptions.length]);
        }
        return newCharIndex;
      });
    }, 100);

    return () => clearInterval(interval);
  }, [charIndex, fullText, textIndex, placeholderOptions]);

  useEffect(() => {
    setPlaceholderText(fullText.substring(0, charIndex));
  }, [charIndex, fullText]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post('/api/v1/subscribers/subscribe', { email });
      setMessage(data.msg);
      setMessageType('success'); // Set message type to success
      setEmail('');
    } catch ({ response }) {
      setMessage(response.data.msg);
      setMessageType('error'); // Set message type to error
    }
  };

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
    dispatch(getProduct());
  }, [dispatch, error, alert]);

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleOrderNowClick = () => {
    window.location.href = "/products";
  };

  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    { image: Image1, alt: 'Slide 1' },
    { image: Image2, alt: 'Slide 2' },
    { image: Image3, alt: 'Slide 3' }
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

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <MetaData title="FabSurat" />

          <NewsletterPopup />

          <div className="slideshow-container">
            <div className="slides" style={{ transform: `translateX(-${currentSlide * 100}%)` }}>
              {slides.map((slide, index) => (
                <div
                  className={`slide ${index === currentSlide ? 'active' : ''}`}
                  key={index}
                >
                  <Link to="/products">
                    <img src={slide.image} alt={slide.alt} />
                  </Link>
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

          <h2 className="homeHeading">Featured Products</h2>
          <div className="container" id="container">
            {filteredProducts.length > 0 && (
              <Carousel className="custom-carousel" style={{ width: '100%', height: '100%' }}>
                {filteredProducts.map((product, index) => (
                  <Carousel.Item key={product._id} style={{ width: '100%', height: '100%' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%', height: '100%' }}>
                      <ProductCard product={filteredProducts[index]} style={{ flex: '1 1 auto' }} />
                      {index + 1 < filteredProducts.length && <ProductCard product={filteredProducts[index + 1]} style={{ flex: '1 1 auto' }} />}
                      {index + 2 < filteredProducts.length && <ProductCard product={filteredProducts[index + 2]} style={{ flex: '1 1 auto' }} />}
                    </div>
                    {index < filteredProducts.length - 3 && <hr style={{ margin: '20px 0', width: '100%' }} />} {/* Add a horizontal line between items */}
                  </Carousel.Item>
                ))}
              </Carousel>
            )}
          </div>
        </>
      )}
      
      <BestSellers/>

      <Link to = {"/products"}>
     <div className="video-sections">
        <video autoPlay muted loop playsInline>
          <source src={videoFiles} type="video/mp4" />
       </video>
     </div>
     </Link>

      <LatestCollection/>
     
      <Link to = {"/products"}>
     <div className="video-section">
        <video autoPlay muted loop playsInline>
          <source src={videoFile} type="video/mp4" />
       </video>
     </div>
     </Link>


      {/* <h2 className="shop">NEW ARRIVALS</h2>
      <div className="shop-section">
        <div className="box">
          <div className="box-content">
          <Link to="/product/661fb9bfc8635135460c6e8f">
              <div className="box-i1"></div>
            </Link>
            <h2>Silk</h2>           
          </div>
        </div>
        <div className="box">
          <div className="box-content">
            <Link to="/product/661fc27ebacffa0ac73492f9">
              <div className="box-i2"></div>
            </Link>
            <h2>Fabric12</h2>
          </div>
        </div>
        <div className="box">
          <div className="box-content">           
            <Link to="/product/661fc3817b484217e77b5176">
              <div className="box-i3"></div>
            </Link>
            <h2>Fabric13</h2>
          </div>
        </div>
        <div className="box">
          <div className="box-content">          
            <Link to="/product/661fc4001e4226bc07a4805a">
              <div className="box-i4"></div>
            </Link>
            <h2>Fabric14</h2>
          </div>
        </div>
        <div className="box">
          <div className="box-content">           
            <Link to="/product/661fc650cdd55940cf1e8ec3">
              <div className="box-i5"></div>
            </Link>
            <h2>Fabric15</h2>
          </div>
        </div>
        <div className="box">
          <div className="box-content">
            <Link to="/product/661fc71c0bc3eb7b9408d89f">
              <div className="box-i6"></div>
            </Link>
            <h2>Fabric16</h2>
          </div>
        </div>
        <div className="box">
          <div className="box-content">
            <Link to="/product/661fc80ea040cb5b8debc656">
              <div className="box-i7"></div>
            </Link>
            <h2>Fabric17</h2>
          </div>
        </div>
        <div className="box">
          <div className="box-content">
            <Link to="/product/661fed3301b5cf7b14fc35ff">
              <div className="box-i8"></div>
            </Link>
            <h2>Fabric18</h2>
          </div>
        </div>
      </div> */}

      {/* <h2 className="shop">BEST SELLERS</h2>
      <div className="shop-section">
        <div className="box">
          <div className="box-content">
            <h2>Fabric19</h2>
            <Link to="/product/661fedb9dc26c4b094560ffa">
              <div className="box-i9"></div>
              <p>See more</p>
            </Link>
          </div>
        </div>
        <div className="box">
          <div className="box-content">
            <h2>Fabric20</h2>
            <Link to="/product/661fee9a7307ed4b21c45368">
              <div className="box-i10"></div>
              <p>See more</p>
            </Link>
          </div>
        </div>
        <div className="box">
          <div className="box-content">
            <h2>Fabric21</h2>
            <Link to="/product/661fef1c6a50d391c2c2453c">
              <div className="box-i11"></div>
              <p>See more</p>
            </Link>
          </div>
        </div>
        <div className="box">
          <div className="box-content">
            <h2>Fabric22</h2>
            <Link to="/product/661fefde263f7c6d97a6d9ed">
              <div className="box-i12"></div>
              <p>See more</p>
            </Link>
          </div>
        </div>
        <div className="box">
          <div className="box-content">
            <h2>Fabric23</h2>
            <Link to="/product/661ff032027adc28d144cd34">
              <div className="box-i13"></div>
              <p>See more</p>
            </Link>
          </div>
        </div>
        <div className="box">
          <div className="box-content">
            <h2>Fabric24</h2>
            <Link to="/product/661ff097615afdf3a5afb024">
              <div className="box-i14"></div>
              <p>See more</p>
            </Link>
          </div>
        </div>
      </div>

      <h2 className="shop">MOST TRENDING</h2>
          <div className="shop-section">
            <div className="box">
              <div className="box-content">
              <h2>Fabric27</h2>
              <Link to = "/product/661ff1ebbc86a8a9c52149f7">
              <div className="box-img1"></div>
             <p>See more</p>
             </Link>
              </div>
            </div>
            <div className="box">
            <div className="box-content">
              <h2>Fabric28</h2>
              <Link to = "/product/661ff2ac9b1bfb8ccd896392">
              <div className="box-img2"></div>
             <p>See more</p>
             </Link>
              </div>
            </div>
            <div className="box">
            <div className="box-content">
              <h2>Fabric29</h2>
              <Link to = "/product/661ff30c7147d91380e0cd1a">
              <div className="box-img3"></div>
             <p>See more</p>
             </Link>
              </div>
            </div>
            <div className="box">
            <div className="box-content">
              <h2>Fabric30</h2>
              <Link to = "/product/661ff5a18017a1a82f71a859">
              <div className="box-img4"></div>
             <p>See more</p>
             </Link>
              </div>
            </div>

            <div className="box">
            <div className="box-content">
              <h2>fab</h2>
              <Link to = "/product/664f82b08d030a6077e9394a">
              <div className="box-img222"></div>
             <p>See more</p>
             </Link>
              </div>
            </div>
          </div> */}
         
          <div className="bulk-orders-section">
      <h2>We take <span className="highlight">Bulk Orders</span> too!</h2>
      <p>
        Looking for bulk fabric orders? Look no further! Our extensive selection features <strong>premium quality</strong> materials, including luxurious silks, durable cottons, versatile blends, and more, all designed to elevate your creations. Whether you're crafting elegant evening wear, comfortable everyday outfits, or bespoke home decor, we have the perfect fabric to bring your vision to life. Enjoy exceptional customer service, fast shipping, and competitive prices that make it easy to get exactly what you need. Don't miss out on the opportunity to transform your projects with the best fabrics available—order now and experience the difference!
      </p>
      <p><strong>Order now</strong> and get the best fabric for your needs!</p>
      
      <button className="order-now-button" onClick={handleOrderNowClick}>Order Now</button>
    </div>

    <section id="newsletter">
      
          <div className="newstext">
            <h3>Subscribe to receive exciting offers!</h3>
            <p>Get Exclusive Offers On Your Email And Stay Updated</p>
          </div>  
          {message && (
            <p className={`message ${messageType}`}>{message}</p>
          )} 

          <form className="form" onSubmit={handleSubmit}>
            <input 
              type="text" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder={placeholderText}
            />
            <button className="normal" type="submit">Subscribe</button>
          </form>
          
    </section>
    </>  
  );
};

export default Home; 
