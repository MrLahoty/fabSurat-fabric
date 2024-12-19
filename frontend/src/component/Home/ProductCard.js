import React from "react";
import { Link } from "react-router-dom";
import { Rating } from "@material-ui/lab";

const ProductCard = ({ product }) => {
  const options = {
    value: product.ratings,
    readOnly: true,
    precision: 0.5,
  };

  // Function to format price
  const formatPrice = (price) => {
    const parsedPrice = parseFloat(price);
    return isNaN(parsedPrice) ? price : `₹${parsedPrice.toFixed(2)}`;
  };

  // Function to calculate discount percentage
  const calculateDiscountPercentage = (mrp, price) => {
    const discount = ((mrp - price) / mrp) * 100;
    return Math.round(discount);
  };

  return (
    <Link className="productCard" to={`/product/${product._id}`}>
      <img src={product.images[0].url} alt={product.name} />
      <p>{product.name}</p>
      <div>
        <Rating {...options} />{" "}
        <span className="productCardSpan">({product.numOfReviews} Reviews)</span>
      </div>
      <div className="col-12">
        <span className="col-12">
          <span style={{ textDecoration: 'line-through', color: 'grey' }}>
            {formatPrice(product.mrp)}
          </span>{" "}
          <span>
            {product.category === "Fabric"
              ? `${formatPrice(product.price)} /meter`
              : formatPrice(product.price)}
          </span>
           {/* Display discount percentage when greater than or equal to 0% */}
           {product.price <= product.mrp && (
            <span className="discount-percentage" style={{ color: '#C84450', marginLeft: '8px', fontWeight: 'bold' }}>
              {`(-${calculateDiscountPercentage(product.mrp, product.price)}%)`}
            </span>
          )}
        </span>
      </div>
    </Link>
  );
};

export default ProductCard;
