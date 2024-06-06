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
    <div className="d-flex " style={{maxHeight:"400px",alignItems:"center"}}>
    <Link className="productCard d-flex" to={`/product/${product._id}`}>
      <div className="col-12 d-flex m-0 mt-3" style={{height:"200px", alignItems:"center",justifyContent:"center"}}>  <img src={product.images[0].url} alt={product.name} style={{height:"100%", width:"200px"}}/></div>
    <div className="col-12 d-flex flex-column m-0 p-4"> <p className="col-12 m-0 ">{product.name}</p>
    <div className="col-12 mt-2 d-flex flex-row align-items-center">
       
      
        <Rating {...options} />
          ({product.numOfReviews} Reviews)
        </div>
        <div className="col-12">   <span className="col-12">{`₹${product.price}`}</span></div>
      </div>
    
    </Link>
    </div>
  );
};

export default ProductCard;
