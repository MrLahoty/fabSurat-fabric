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

// Importing Material-UI Icons
import LocalShippingIcon from "@material-ui/icons/LocalShipping";
import VerifiedUserIcon from "@material-ui/icons/VerifiedUser";
import ReplayIcon from "@material-ui/icons/Replay";

const ProductDetails = ({ match }) => {
  const dispatch = useDispatch();
  const alert = useAlert();

  const { product, loading, error } = useSelector((state) => state.productDetails);
  const { success, error: reviewError } = useSelector((state) => state.newReview);

  const options = {
    size: "large",
    value: product.ratings,
    readOnly: true,
    precision: 0.5,
  };

  const [quantity, setQuantity] = useState(product.category === "Fabric" ? 2.5 : 1);
  const [size, setSize] = useState("");
  const [open, setOpen] = useState(false);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");

  useEffect(() => {
    if (product.category === "Fabric") {
      setQuantity(2.5);
    } else if (product.category === "Readymade") {
      setQuantity(1);
    }
  }, [product.category]);

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
    if (product.category === "Fabric") {
      if (product.Stock <= quantity) return;
      setQuantity(quantity + 0.5);
    } else if (product.category === "Readymade") {
      if (product.Stock <= quantity) return;
      setQuantity(quantity + 1);
    }
  };

  const decreaseQuantity = () => {
    const minQty = product.category === "Fabric" ? 2.5 : 1;
    if (quantity <= minQty) return;

    if (product.category === "Fabric") {
      setQuantity(quantity - 0.5);
    } else if (product.category === "Readymade") {
      setQuantity(quantity - 1);
    }
  };

  const addToCartHandler = () => {
    const minQty = product.category === "Fabric" ? 2.5 : 1;
    if (product.Stock < minQty) {
      alert.error("Product is out of stock");
      return;
    }
    if (product.category === "Readymade" && !size) {
      alert.error("Please select a size");
      return;
    }
    dispatch(addItemsToCart(match.params.id, quantity, size));
    alert.success("Item Added To Cart");
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
                <h1>
                  {product.category === "Fabric"
                    ? `₹${product.price} /meter`
                    : `₹${product.price}`}
                </h1>
                <div className="detailsBlock-3-1">
                  <div className="detailsBlock-3-1-1">
                    <button onClick={decreaseQuantity}>-</button>
                    <input readOnly type="number" value={quantity} />
                    <button onClick={increaseQuantity}>+</button>
                  </div>
                  <button
                    disabled={
                      product.category === "Fabric"
                        ? product.Stock < 2.5
                        : product.Stock < 1
                    }
                    onClick={addToCartHandler}
                  >
                    Add to Cart
                  </button>
                </div>

                <p>
                  Status:
                  <b
                    className={
                      product.category === "Fabric"
                        ? product.Stock < 2.5
                          ? "redColor"
                          : "greenColor"
                        : product.Stock < 1
                        ? "redColor"
                        : "greenColor"
                    }
                  >
                    {product.category === "Fabric"
                      ? product.Stock < 2.5
                        ? "OutOfStock"
                        : "InStock"
                      : product.Stock < 1
                      ? "OutOfStock"
                      : "InStock"}
                  </b>
                </p>
              </div>

              {product.category === "Readymade" && (
                <div className="detailsBlock-3">
                  <h3>Select Size:</h3>
                  <div className="sizeOptions">
                    {Object.keys(product.sizes).map(
                      (sizeOption) =>
                        product.sizes[sizeOption] && (
                          <button
                            key={sizeOption}
                            className={`sizeButton ${
                              size === sizeOption ? "active" : ""
                            }`}
                            onClick={() => setSize(sizeOption)}
                          >
                            {sizeOption}
                          </button>
                        )
                    )}
                  </div>
                </div>
              )}

              <div className="detailsBlock-4">
                Description : <p>{product.description}</p>
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

              <button onClick={submitReviewToggle} className="submitReview">
                Submit Review
              </button>
            </div>
          </div>

          <h3 className="reviewsHeading">REVIEWS</h3>

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
        </>
      )}
    </>
  );
};

export default ProductDetails;
