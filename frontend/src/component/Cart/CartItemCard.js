import React from "react";
import "./CartItemCard.css";
import { Link } from "react-router-dom";

const CartItemCard = ({ item, deleteCartItems }) => {
  return (
    <div className="CartItemCard">
      <img src={item.image} alt={item.name} />
      <div>
        <Link to={`/product/${item.product}`}>{item.name}</Link>
        <span>{`Price: ₹${item.price}`}</span>
        {item.size && <span>{`Size: ${item.size}`}</span>}
        <p onClick={() => deleteCartItems(item.product, item.size)}>Remove</p>
      </div>
    </div>
  );
};

export default CartItemCard;
