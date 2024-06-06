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

const Home = () => {
  const [currentSlide] = useState(0);
  const handleShopNowClick = () => {
    window.location.href = "/products";
  };

  const data = [
    "https://images.pexels.com/photos/1549200/pexels-photo-1549200.jpeg?auto=compress&cs=tinysrgb&w=1600",
  ];

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

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <MetaData title="FabSurat" />
          <div className="slider">
            <div className="container" style={{ transform: `translateX(-${currentSlide * 100}vw)` }}>
              {data.map((src, index) => (
                <div className="slide" key={index}>
                  <img src={src} alt={`Slide ${index + 1}`} />
                  <div className="welcomeText">
                    <p>WELCOME TO FABSURAT TEXTILE</p>
                    <h5>BY</h5>
                    <p>HOUSE OF FASHION</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="icons">
              <button className="shopnowbutton" onClick={handleShopNowClick}>
                Shop Now
              </button>
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
            <h2>Fabric11</h2>
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
