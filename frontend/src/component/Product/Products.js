import React, { useEffect, useState } from "react";
import "./Products.css";
import { useSelector, useDispatch } from "react-redux";
import { clearErrors, getProduct } from "../../actions/productAction";
import Loader from "../layout/Loader/Loader";
import ProductCard from "../Home/ProductCard";
import Pagination from "react-js-pagination";
import Slider from "@material-ui/core/Slider";
import { useAlert } from "react-alert";
import MetaData from "../layout/MetaData";
import { Button } from "@material-ui/core";
import { FilterList } from "@material-ui/icons";

const categories = ["Fabric", "Readymade"];

const Products = ({ match }) => {
  const dispatch = useDispatch();
  const alert = useAlert();

  const [currentPage, setCurrentPage] = useState(1);
  const [price, setPrice] = useState([0, 10000]); 
  const [committedPrice, setCommittedPrice] = useState([0, 10000]); 
  const [category, setCategory] = useState("");
  const [categoriesVisible, setCategoriesVisible] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  
  // Separate states for ratings
  const [ratings, setRatings] = useState(0); 
  const [committedRatings, setCommittedRatings] = useState(0); 

  const {
    products,
    loading,
    error,
    productsCount,
    resultPerPage,
    filteredProductsCount,
  } = useSelector((state) => state.products);

  const keyword = match.params.keyword;

  const setCurrentPageNo = (e) => {
    setCurrentPage(e);
  };

  // Handle price slider change without triggering product fetch
  const priceHandler = (event, newPrice) => {
    setPrice(newPrice); 
  };

  // Trigger product fetch only when the slider interaction is committed
  const priceChangeCommitted = (event, newPrice) => {
    setCommittedPrice(newPrice); 
  };

  // Handle ratings slider change without triggering product fetch
  const ratingsHandler = (event, newRating) => {
    setRatings(newRating); 
  };

  // Trigger product fetch only when the slider interaction is committed
  const ratingsChangeCommitted = (event, newRating) => {
    setCommittedRatings(newRating); 
  };

  const toggleFilters = () => {
    setShowFilters(!showFilters);
  };

  let count = filteredProductsCount;

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    // Fetch products with committed price and ratings
    dispatch(getProduct(keyword, currentPage, committedPrice, category, committedRatings));
  }, [dispatch, keyword, currentPage, committedPrice, category, committedRatings, alert, error]);

  const toggleCategories = () => {
    setCategoriesVisible(!categoriesVisible);
  };

  const selectCategory = (selectedCategory) => {
    setCategory(selectedCategory);
    setCategoriesVisible(false); 
  };

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <MetaData title="PRODUCTS -- FABSURAT" />
          <div className="productss">
            <h2 className="productsHeading">Products</h2>

            <div className="filterBox">
              {/* Filter Button */}
              <Button
                variant="contained"
                onClick={toggleFilters}
                className="filterButton"
              >
                Filter
                <FilterList style={{ marginLeft: "4px", fontSize: "14px" }} />
              </Button>

              {/* Sliding filter section */}
              <div className={`filter ${showFilters ? "show" : ""}`}>
                <div className="price">
                  <h3>PRICE</h3>
                  {price && (
                    <>
                      <Slider
                        value={price}
                        onChange={priceHandler} 
                        onChangeCommitted={priceChangeCommitted} 
                        valueLabelDisplay="auto"
                        aria-labelledby="range-slider"
                        min={0}
                        max={10000}
                      />
                      {/* Display selected price range */}
                      <p>
                        Price: ₹ {price[0].toFixed(2)} — ₹ {price[1].toFixed(2)}
                      </p>
                    </>
                  )}
                </div>

                <div className="ratings">
                  <h3>RATING</h3>
                  {ratings !== null && (
                    <>
                      <Slider
                        value={ratings}
                        onChange={ratingsHandler} 
                        onChangeCommitted={ratingsChangeCommitted} 
                        aria-labelledby="continuous-slider"
                        valueLabelDisplay="auto"
                        min={0}
                        max={5}
                      />
                      {/* Display selected rating */}
                      <p>Rating: {ratings}</p>
                    </>
                  )}
                </div>
              </div>
            </div>

            <div className="categories-container">
              <div className="square-box">
                <div className="categories-heading" onClick={toggleCategories}>
                  Categories
                </div>
                <button
                  className={`categories-toggle ${
                    categoriesVisible ? "rotate" : ""
                  }`}
                  onClick={toggleCategories}
                >
                  ▼
                </button>
              </div>
            </div>

            <ul className={`categoryBox ${categoriesVisible ? "show" : "hide"}`}>
              {categories.map((category) => (
                <li
                  className="category-link"
                  key={category}
                  onClick={() => selectCategory(category)}
                >
                  {category}
                </li>
              ))}
            </ul>

            <div className="products">
              {products &&
                products.map((product) => (
                  <ProductCard key={product._id} product={product} />
                ))}
            </div>

            {resultPerPage < count && (
              <div className="paginationBox">
                <Pagination
                  activePage={currentPage}
                  itemsCountPerPage={resultPerPage}
                  totalItemsCount={productsCount}
                  onChange={setCurrentPageNo}
                  nextPageText="Next"
                  prevPageText="Prev"
                  firstPageText="1st"
                  lastPageText="Last"
                  itemClass="page-item"
                  linkClass="page-link"
                  activeClass="pageItemActive"
                  activeLinkClass="pageLinkActive"
                />
              </div>
            )}
          </div>
        </>
      )}
    </>
  );
};

export default Products;
