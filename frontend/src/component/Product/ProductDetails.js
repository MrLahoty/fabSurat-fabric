import React, { useEffect, useState } from "react";
import Carousel from "react-material-ui-carousel";
import "./ProductDetails.css";
import { useSelector, useDispatch } from "react-redux";
import {
  clearErrors,
  getProductDetails,
  newReview,
} from "../../actions/productAction";
import ReviewCard from "./ReviewCard";
import Loader from "../layout/Loader/Loader";
import { useAlert } from "react-alert";
import MetaData from "../layout/MetaData";
import { addItemsToCart } from "../../actions/cartAction";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
} from "@material-ui/core";
import { Rating } from "@material-ui/lab";
import { NEW_REVIEW_RESET } from "../../constants/productConstants";
import ProductCard from "../Home/ProductCard"; 
import { getCategoryProducts } from "../../actions/productAction";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation } from "swiper/modules"; // Correct import path for the latest Swiper version
import "swiper/css";
import "swiper/css/pagination"; // If you're using pagination
import "swiper/css/navigation"; // If you're using navigation

// Importing Material-UI Icons
import LocalShippingIcon from "@material-ui/icons/LocalShipping";
import VerifiedUserIcon from "@material-ui/icons/VerifiedUser";
import ReplayIcon from "@material-ui/icons/Replay";

const ProductDetails = ({ match }) => {
  const [isOpen, setIsOpen] = useState(false); 
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 480); // Set initial isMobile state

  // Function to handle toggle
  const handleToggle = () => {
    setIsOpen(prev => !prev);
  };
  const dispatch = useDispatch();
  const alert = useAlert();

  const [relatedProducts, setRelatedProducts] = useState([]);

  const { product, loading, error } = useSelector((state) => state.productDetails);
  const { success, error: reviewError } = useSelector((state) => state.newReview);

  const options = {
    size: "large",
    value: product.ratings,
    readOnly: true,
    precision: 0.5,
  };

  const [quantity, setQuantity] = useState(product.category === "Fabric" ? 2.5 : 1);
  const [selectedSizes, setSelectedSizes] = useState([]); // Store multiple selected sizes
  const [open, setOpen] = useState(false);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");

  useEffect(() => {
    setQuantity(1); // Set initial quantity to 1 for both categories
  }, [product.category]);

   // Fetch related products
   useEffect(() => {
    if (product.subSubCategory) {
      // Fetch products based on the same category
      dispatch(getCategoryProducts(product.subSubCategory)).then((related) => {
        // Exclude the current product from related products
        const filteredProducts = related.filter(p => p._id !== product._id);
        setRelatedProducts(filteredProducts.slice(0, 4));
      });
    }
  }, [dispatch, product.subSubCategory, product._id]);

   // Listen for window resize to update isMobile state
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 480);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    if (reviewError) {
      alert.error(reviewError);
      dispatch(clearErrors());
    }

    if (success) {
      alert.success("Review Submitted Successfully");
      dispatch({ type: NEW_REVIEW_RESET });
    }
    dispatch(getProductDetails(match.params.id));
  }, [dispatch, match.params.id, error, alert, reviewError, success]);

  const increaseQuantity = () => {
    if (product.Stock <= quantity) return;
  
    if (product.category === "Fabric") {
      setQuantity(quantity + 0.5); // Increment by 0.5 for Fabric
    } else if (product.category === "Readymade") {
      setQuantity(quantity + 1);   // Increment by 1 for Readymade
    }
  };

  const decreaseQuantity = () => {
    const minQty = product.category === "Fabric" ? 1 : 1; // Initial quantity set to 1 for both categories
    if (quantity <= minQty) return;
  
    if (product.category === "Fabric") {
      setQuantity(quantity - 0.5); // Decrement by 0.5 for Fabric
    } else if (product.category === "Readymade") {
      setQuantity(quantity - 1);   // Decrement by 1 for Readymade
    }
  };

  const addToCartHandler = () => {
    const minQty = product.category === "Fabric" ? 1 : 1; // Minimum quantity to add to cart is 1 for both categories
    if (quantity < minQty || product.Stock < minQty) {
    alert.error("Product is out of stock");
    return;
  }
    if (product.category === "Readymade" && selectedSizes.length === 0) {
      alert.error("Please select at least one size");
      return;
    }
    dispatch(addItemsToCart(match.params.id, quantity, selectedSizes));
    // Show the alert with the "View Cart" button
    alert.success(
      <div className="cart-notification">
      <span>Item Added To Cart</span>
      <a href="/cart">
        <button className="view-cart-button">
          View Cart
        </button>
      </a>
    </div>
);
};

  const submitReviewToggle = () => {
    setOpen(!open);
  };

  const reviewSubmitHandler = () => {
    const myForm = new FormData();

    myForm.set("rating", rating);
    myForm.set("comment", comment);
    myForm.set("productId", match.params.id);

    dispatch(newReview(myForm));

    setOpen(false);
  };

  const toggleSizeSelection = (sizeOption) => {
    if (selectedSizes.includes(sizeOption)) {
      setSelectedSizes(selectedSizes.filter((size) => size !== sizeOption)); // Remove size if already selected
    } else {
      setSelectedSizes([...selectedSizes, sizeOption]); // Add size to the selected array
    }
  };

  const handleOrderNowClicks = () => {
    const phoneNumber = "918013267616"; // WhatsApp number in international format
    const message = "Hello, I'm interested in placing a bulk order for Fabrics/Readymades"; // Optional pre-filled message
    const whatsappURL = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
     // Open WhatsApp chat in a new tab
  window.open(whatsappURL, '_blank');
  };

  function shareProduct(platform) {
    const productUrl = window.location.href; // Get the current URL of the product page
    let shareLink = '';
 
    if (platform === 'whatsapp') {
       shareLink = `https://wa.me/?text=${encodeURIComponent('Check out this product: ' + productUrl)}`;
    } else if (platform === 'instagram') {
       shareLink = `https://www.instagram.com/direct/new/?text=${encodeURIComponent('Check out this product: ' + productUrl)}`;
    } else if (platform === 'facebook') {
       shareLink = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(productUrl)}`;
    }
 
    window.open(shareLink, '_blank');
 } 

 // Function to format price
 const formatPrice = (price) => {
  const parsedPrice = parseFloat(price);
  return isNaN(parsedPrice) ? price : `₹${parsedPrice.toFixed(2)}`;
};

const calculateDiscountPercentage = (mrp, price) => {
  const discount = ((mrp - price) / mrp) * 100;
  return Math.round(discount);
};

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <MetaData title={`${product.name} -- FabSurat`} />
          <div className="ProductDetails">
           <div>
            <Carousel>
               {product.images &&
                 product.images.map((item, i) => (
                   <img
                     className="CarouselImage"
                     key={i}
                     src={item.url}
                     alt={`${i} Slide`}
                   />
                 ))}
           </Carousel>
  
           {/* Thumbnails section */} 
             <div className="ThumbnailContainer">
               {product.images &&
                 product.images.map((item, i) => (
                   <div className="ThumbnailWrapper" key={i}>
                     <img
                       className="ThumbnailImage"
                       src={item.url}
                       alt={`Thumbnail ${i}`}
                     />
                     <div className="ZoomIconWrapper">
                       <i className="fa fa-search-plus ZoomIcon"></i> {/* Font Awesome search icon */}
                     </div>
                   </div>
                 ))}
             </div>
          </div>
  
            <div>
              <div className="detailsBlock-1">
                <h2>{product.name}</h2>
                <p>Product # {product._id}</p>
              </div>
              <div className="detailsBlock-2">
                <Rating {...options} />
                <span className="detailsBlock-2-span">
                  ({product.numOfReviews} Reviews)
                </span>
              </div>
              <div className="detailsBlock-3">
                  <div className="price-container">
                    {product.mrp && (
                      <h2 className="crossed-out-price">
                        <del>
                          <span className="currency-symbol">₹</span> {formatPrice(product.mrp)}
                        </del>
                      </h2>
                    )}
                    <h1 className="sale-price">
                      {product.category === "Fabric"
                        ? `${formatPrice(product.price)} /meter`
                        : formatPrice(product.price)}
                    </h1>
                  </div>     
                  <div className="sony">
                    {/* Calculate and display the discount percentage */}
                    {product.price < product.mrp && (
                      <span className="discountpercentagess">
                        {`(-${calculateDiscountPercentage(product.mrp, product.price)}%)`}
                      </span>
                    )}
                    <p className="tax-info">(Incl. of All Taxes)</p>
                    </div>          

                <div className="detailsBlock-3-1">
                  <div className="detailsBlock-3-1-1">
                    <button onClick={decreaseQuantity}>-</button>
                    <input readOnly type="number" value={quantity} />
                    <button onClick={increaseQuantity}>+</button>
                  </div>
                  <button
                    disabled={
                      product.category === "Fabric"
                        ? product.Stock < 1
                        : product.Stock < 1
                    }
                    onClick={addToCartHandler}
                  >
                    Add to Cart
                  </button>
                </div>

                <p>
                  Status :
                  <b
                    className={
                      product.category === "Fabric"
                        ? product.Stock < 1
                          ? "redColor"
                          : "greenColor"
                        : product.Stock < 1
                        ? "redColor"
                        : "greenColor"
                    }
                  >
                    {product.category === "Fabric"
                      ? product.Stock < 1
                        ? "OutOfStock"
                        : "InStock"
                      : product.Stock < 1
                      ? "OutOfStock"
                      : "InStock"}
                  </b>
                </p>

              {/* Show stock quantity */}
          <p className="stockInfo">
          <span className="meterssText"> Available Stock : </span> 
               <b style={{ color: product.Stock > 0 ? "green" : "red" }}>
                {product.Stock}
              </b>
               {product.category === "Fabric" && <span className="metersText"> meters</span>}
          </p>

              </div>

              {product.category === "Readymade" && (
                <div className="detailsBlock-3">
                  <h3>Select Size(s):</h3>
                  <div className="sizeOptions">
                    {Object.keys(product.sizes).map(
                      (sizeOption) =>
                        product.sizes[sizeOption] && (
                          <button
                            key={sizeOption}
                            className={`sizeButton ${
                              selectedSizes.includes(sizeOption) ? "active" : ""
                            }`}
                            onClick={() => toggleSizeSelection(sizeOption)}
                          >
                            {sizeOption}
                          </button>
                        )
                    )}
                  </div>
                </div>
              )}

             <div className="detailsBlock-4" onClick={handleToggle}> {/* Move onClick here */}
              <span>Description</span>
              <button className="toggle-button">
                {isOpen ? '-' : '+'}
              </button>
            </div>
     
           {isOpen && (
             <div className="details-content">
               Description - <p>{product.description}</p>
     
               {product.category === "Fabric" && (
                 <div className="detailsBlocks-3">
                   Fabric Type - <p>{product.fabricType}</p>
                  Work -  <p>{product.work}</p>
                   Width - <p>{product.width}</p>
                   {/* Color - <p>{product.color}</p> */}
                   Care Instruction - <p>{product.careInstructions}</p>
                   Disclaimer - <p>{product.disclaimer}</p>
                 </div>
               )}
             </div>
           )}
     
                  <button onClick={submitReviewToggle} className="submitReview">
                    Submit Review
                  </button>
                  <div className="share-buttons">
                     <span className="share-text">Share:</span>
                     <button className="share-btn whatsapp" onClick={() => shareProduct('whatsapp')}>
                       <i className="fab fa-whatsapp"></i>
                     </button>
                     <button className="share-btn instagram" onClick={() => shareProduct('instagram')}>
                       <i className="fab fa-instagram"></i>
                     </button>
                     <button className="share-btn facebook" onClick={() => shareProduct('facebook')}>
                       <i className="fab fa-facebook"></i>
                     </button>
                   </div>


                <div className="additionalInfo">
                     <div className="infoItem">
                       <LocalShippingIcon />
                       <span>Free delivery <br /> over 1500+</span>
                </div>
                <div className="infoItem">
                  <VerifiedUserIcon />
                  <span>Assured quality</span>
                </div>
                <div className="infoItem">
                  <ReplayIcon />
                  <span>7 days return</span>
                </div>
              </div>
            </div>
          </div>

          <div className="related-products-section">
  <h3 className="relatedheading">Related Products</h3>
  {relatedProducts.length > 0 ? (
    isMobile ? (
      <Swiper
        className="swiper-container"
        spaceBetween={10}
        slidesPerView={2} // Show 2 products at a time
        loop={true} // Optional, for infinite scrolling
        pagination={{ 
          clickable: true,
          el: '.swiper-pagination', 
        }} 
        autoplay={{ delay: 2000 }} // Auto-slide every 2 seconds
        modules={[Autoplay, Pagination, Navigation]} // Register Swiper modules           
      >
        {relatedProducts.map((relatedProduct) => (
          <SwiperSlide key={relatedProduct._id}>
            <ProductCard product={relatedProduct} />
          </SwiperSlide>
        ))}
      </Swiper>
    ) : (
      <div className="related-products">
        {relatedProducts.map((relatedProduct) => (
          <ProductCard key={relatedProduct._id} product={relatedProduct} />
        ))}
      </div>
    )
  ) : (
    <div className="no-related-products">
      <p>No Related Products Available.</p>
    </div>
  )}
  {/* Add the pagination element outside of Swiper */}
  <div className="swiper-pagination"></div>
</div>



          <h3 className="reviewsHeading">CUSTOMER REVIEWS</h3>

          <Dialog
            aria-labelledby="simple-dialog-title"
            open={open}
            onClose={submitReviewToggle}
          >
            <DialogTitle>Submit Review</DialogTitle>
            <DialogContent className="submitDialog">
              <Rating
                onChange={(e) => setRating(e.target.value)}
                value={rating}
                size="large"
              />

              <textarea
                className="submitDialogTextArea"
                cols="30"
                rows="5"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
              ></textarea>
            </DialogContent>
            <DialogActions>
              <Button onClick={submitReviewToggle} color="secondary">
                Cancel
              </Button>
              <Button onClick={reviewSubmitHandler} color="primary">
                Submit
              </Button>
            </DialogActions>
          </Dialog>

          {product.reviews && product.reviews[0] ? (
            <div className="reviews">
              {product.reviews.map((review) => (
                <ReviewCard review={review} key={review._id} />
              ))}
            </div>
          ) : (
            <p className="noReviews">No Reviews Yet</p>
          )}
           <div className="bulk-orders-section">
      <h2>We take <span className="highlight">Bulk Orders</span> too!</h2>
      <p>
        Looking for bulk fabric orders? Look no further! Our extensive selection features <strong>premium quality</strong> materials, including luxurious silks, durable cottons, versatile blends, and more, all designed to elevate your creations. Whether you're crafting elegant evening wear, comfortable everyday outfits, or bespoke home decor, we have the perfect fabric to bring your vision to life. Enjoy exceptional customer service, fast shipping, and competitive prices that make it easy to get exactly what you need. Don't miss out on the opportunity to transform your projects with the best fabrics available—order now and experience the difference!
      </p>
      <p><strong>Order now</strong> and get the best fabric for your needs!</p>
      
      <button className="order-now-button" onClick={handleOrderNowClicks}>Order Now</button>
    </div>
        </>
      )}
    </>
  );
};

export default ProductDetails;
