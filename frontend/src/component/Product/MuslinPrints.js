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
import "./Embroidered.css";

const MuslinPrints = ({ match }) => {
  const dispatch = useDispatch();
  const alert = useAlert();

  const [currentPage, setCurrentPage] = useState(1);
  const [price, setPrice] = useState([0, 10000]);
  const [committedPrice, setCommittedPrice] = useState([0, 10000]);

  const [ratings, setRatings] = useState(0);
  const [committedRatings, setCommittedRatings] = useState(0);

  const [showFilters, setShowFilters] = useState(false);

  const { products, loading, error, productsCount, resultPerPage, filteredProductsCount } = useSelector((state) => state.products);

  const keyword = match.params.keyword;

  const setCurrentPageNo = (e) => {
    setCurrentPage(e);
  };

  const priceHandler = (event, newPrice) => {
    setPrice(newPrice);
  };

  const priceChangeCommitted = (event, newPrice) => {
    setCommittedPrice(newPrice);
  };

  const ratingsHandler = (event, newRating) => {
    setRatings(newRating);
  };

  const ratingsChangeCommitted = (event, newRating) => {
    setCommittedRatings(newRating);
  };

  const toggleFilters = () => {
    setShowFilters(!showFilters);
  };

  // Fetch products when page loads or state changes
  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    // Fetch only "Muslin Prints" sub-sub-category products
    dispatch(
      getProduct(
        keyword,
        currentPage,
        committedPrice,
        "Fabric", // Main category remains "Fabric"
        "Prints", // Sub-category remains "Prints"
        "Muslin Prints", // Directly filter by "Muslin Prints" sub-sub-category
        committedRatings
      )
    );
  }, [dispatch, keyword, currentPage, committedPrice, committedRatings, alert, error]);

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <MetaData title="Muslin Prints PRODUCTS -- FABSURAT" />
          <div className="productss">
            <h2 className="productssssssssHeadingsss">Muslin Prints</h2>

            {/* Filter Section */}
            <div className="filterBox">
              <Button
                variant="contained"
                onClick={toggleFilters}
                className="filterButton"
              >
                Filter
                <FilterList style={{ marginLeft: "4px", fontSize: "14px" }} />
              </Button>

              <div className={`filter ${showFilters ? "show" : ""}`}>
                {/* Price Filter */}
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
                      <p>
                        Price: ₹ {price[0].toFixed(2)} — ₹ {price[1].toFixed(2)}
                      </p>
                    </>
                  )}
                </div>

                {/* Ratings Filter */}
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
                      <p>Rating: {ratings}</p>
                    </>
                  )}
                </div>
              </div>
            </div>

            {/* Display Products */}
            <div className="products">
              {products &&
                products.map((product) => (
                  <ProductCard key={product._id} product={product} />
                ))}
            </div>

            {/* Pagination */}
            {resultPerPage < filteredProductsCount && (
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

export default MuslinPrints;
