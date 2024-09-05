import React from "react";
import { Link } from "react-router-dom";
import { Rating } from "@material-ui/lab";

const ProductCard = ({ product }) => {
  const options = {
    value: product.ratings,
    readOnly: true,
    precision: 0.5,
  };

  return (
    <Link className="productCard" to={`/product/${product._id}`}>
    <img src={product.images[0].url} alt={product.name} />
    <p>{product.name}</p>
    <div>
      <Rating {...options} />{" "}
      <span className="productCardSpan">
        {" "}
        ({product.numOfReviews} Reviews)
      </span>
    </div>
          <div className="col-12">
            <span className="col-12">
              {product.category === "Fabric"
                ? `₹${product.price} /meter`
                : `₹${product.price}`}
            </span>
          </div>
      </Link>
  );
};

export default ProductCard;
