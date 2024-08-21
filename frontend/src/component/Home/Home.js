import React, { useState, useEffect } from "react";
import "./Home.css";
import ProductCard from "./ProductCard.js";
import MetaData from "../layout/MetaData";
import { clearErrors, getProduct } from "../../actions/productAction";
import { Carousel } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import Loader from "../layout/Loader/Loader";
import { useAlert } from "react-alert";
import { Link } from "react-router-dom";

import MakeInIndia from "../../images/india_map.webp";
import Quality from "../../images/ThumbsUp.png";
import COD from "../../images/cash_on_delivery.png";
import FastShipping from "../../images/Fast_Delivery.png";
import EasyReturns from "../../images/Package.png";
import CustomPainting from "../../images/Customized_printing.webp";

import Image1 from '../../images/fab.avif';
import Image2 from '../../images/fabs.avif';
import Image3 from '../../images/fabss.avif';

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

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleOrderNowClick = () => {
    // Navigate to the /products page
    window.location.href = "/products";
  };

  const [currentSlide, setCurrentSlide] = useState(0);

    const slides = [
      { image: Image1, alt: 'Slide 1' },
      { image: Image2, alt: 'Slide 2' },
      { image: Image3, alt: 'Slide 3' }
    ];

  const nextSlide = () => {
    setCurrentSlide((prevSlide) => (prevSlide + 1) % slides.length);
};

const prevSlide = () => {
    setCurrentSlide((prevSlide) => (prevSlide - 1 + slides.length) % slides.length);
};

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

      <h2 className="shop">NEW ARRIVALS</h2>
      <div className="shop-section">
        <div className="box">
          <div className="box-content">
            <h2>Silk</h2>
            <Link to="/product/661fb9bfc8635135460c6e8f">
              <div className="box-i1"></div>
              <p>See more</p>
            </Link>
          </div>
        </div>
        <div className="box">
          <div className="box-content">
            <h2>Fabric12</h2>
            <Link to="/product/661fc27ebacffa0ac73492f9">
              <div className="box-i2"></div>
              <p>See more</p>
            </Link>
          </div>
        </div>
        <div className="box">
          <div className="box-content">
            <h2>Fabric13</h2>
            <Link to="/product/661fc3817b484217e77b5176">
              <div className="box-i3"></div>
              <p>See more</p>
            </Link>
          </div>
        </div>
        <div className="box">
          <div className="box-content">
            <h2>Fabric14</h2>
            <Link to="/product/661fc4001e4226bc07a4805a">
              <div className="box-i4"></div>
              <p>See more</p>
            </Link>
          </div>
        </div>
        <div className="box">
          <div className="box-content">
            <h2>Fabric15</h2>
            <Link to="/product/661fc650cdd55940cf1e8ec3">
              <div className="box-i5"></div>
              <p>See more</p>
            </Link>
          </div>
        </div>
        <div className="box">
          <div className="box-content">
            <h2>Fabric16</h2>
            <Link to="/product/661fc71c0bc3eb7b9408d89f">
              <div className="box-i6"></div>
              <p>See more</p>
            </Link>
          </div>
        </div>
        <div className="box">
          <div className="box-content">
            <h2>Fabric17</h2>
            <Link to="/product/661fc80ea040cb5b8debc656">
              <div className="box-i7"></div>
              <p>See more</p>
            </Link>
          </div>
        </div>
        <div className="box">
          <div className="box-content">
            <h2>Fabric18</h2>
            <Link to="/product/661fed3301b5cf7b14fc35ff">
              <div className="box-i8"></div>
              <p>See more</p>
            </Link>
          </div>
        </div>
      </div>

      <h2 className="shop">BEST SELLERS</h2>
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
          </div>
         
          <div className="bulk-orders-section">
      <h2>We take <span className="highlight">Bulk Orders</span> too!</h2>
      <p>
        Looking for bulk fabric orders? Look no further! Our extensive selection features <strong>premium quality</strong> materials, including luxurious silks, durable cottons, versatile blends, and more, all designed to elevate your creations. Whether you're crafting elegant evening wear, comfortable everyday outfits, or bespoke home decor, we have the perfect fabric to bring your vision to life. Enjoy exceptional customer service, fast shipping, and competitive prices that make it easy to get exactly what you need. Don't miss out on the opportunity to transform your projects with the best fabrics available—order now and experience the difference!
      </p>
      <p><strong>Order now</strong> and get the best fabric for your needs!</p>
      
      <button className="order-now-button" onClick={handleOrderNowClick}>Order Now</button>
    </div>

          <div
  className="foot-panel1"
  style={{ cursor: "pointer" }}
  onClick={() => {
    const container = document.getElementById('container');
    if (container) {
      container.scrollIntoView({ behavior: 'smooth' });
    }
  }}
>
  Back To Top
</div>

    </>  
  );
};

export default Home; 
