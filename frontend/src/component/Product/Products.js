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
import { FilterList } from "@material-ui/icons"; // Import filter icon

const categories = [
  "Fabric",
  "Readymade",
];

const Products = ({ match }) => {
  const dispatch = useDispatch();
  const alert = useAlert();

  const [currentPage, setCurrentPage] = useState(1);
  const [price, setPrice] = useState([0, 10000]);
  const [category, setCategory] = useState("");
  const [categoriesVisible, setCategoriesVisible] = useState(false);
  const [showFilters, setShowFilters] = useState(false); // To toggle filters

  const [ratings, setRatings] = useState(0);

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

  const priceHandler = (event, newPrice) => {
    if (newPrice !== null) {
      setPrice(newPrice); // Ensure newPrice is valid before updating
    }
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

    dispatch(getProduct(keyword, currentPage, price, category, ratings));
  }, [dispatch, keyword, currentPage, price, category, ratings, alert, error]);

  const toggleCategories = () => {
    setCategoriesVisible(!categoriesVisible);
  };

  const selectCategory = (selectedCategory) => {
    setCategory(selectedCategory);
    setCategoriesVisible(false); // Close the dropdown when a category is selected
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
    <FilterList style={{ marginLeft: "4px", fontSize: "14px" }} /> {/* Filter icon */}
    </Button>

  {/* Sliding filter section */}
  <div className={`filter ${showFilters ? "show" : ""}`}>
    <div className="price">
      <h3>PRICE</h3>
      {/* Only render the Slider component when price is available */}
      {price && (
        <>
          <Slider
            value={price}
            onChange={priceHandler}
            onChangeCommitted={(event, newValue) => setPrice(newValue)} // Handle final change on interaction commit
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
      {/* Only render the Slider component when ratings is available */}
      {ratings !== null && (
        <>
          <Slider
            value={ratings}
            onChange={(e, newRating) => {
              if (newRating !== null) {
                setRatings(newRating);
              }
            }}
            onChangeCommitted={(event, newValue) => setRatings(newValue)} // Handle final change on interaction commit
            aria-labelledby="continuous-slider"
            valueLabelDisplay="auto"
            min={0}
            max={5}
          />
          {/* Display selected rating */}
          <p>
            Rating: {ratings}
          </p>
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
      className={`categories-toggle ${categoriesVisible ? "rotate" : ""}`}
      onClick={toggleCategories}
    >
      ▼
    </button>
  </div>
</div>

{/* Toggle the category list */}
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
