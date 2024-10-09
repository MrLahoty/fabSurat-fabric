import React from "react";
import "./Cart.css";
import CartItemCard from "./CartItemCard";
import { useSelector, useDispatch } from "react-redux";
import { addItemsToCart, removeItemsFromCart } from "../../actions/cartAction";
import { Typography } from "@material-ui/core";
import RemoveShoppingCartIcon from "@material-ui/icons/RemoveShoppingCart";
import { Link } from "react-router-dom";

const Cart = ({ history }) => {
  const dispatch = useDispatch();
  const { cartItems } = useSelector((state) => state.cart);

  const isReadymade = (size) => !!size;

  const increaseQuantity = (id, quantity, stock, size) => {
    let newQty;

    if (isReadymade(size)) {
      newQty = quantity + 1; // Increase by 1 for readymade
    } else {
      newQty = quantity + 0.5; // Increase by 0.5 for fabric
    }

    // Check if the new quantity exceeds stock
    if (newQty > stock) {
      return; // Prevent increasing beyond available stock
    }

    // Update quantity in the cart
    dispatch(addItemsToCart(id, newQty, size));
  };

  const decreaseQuantity = (id, quantity, size) => {
    let newQty;

    if (isReadymade(size)) {
      newQty = quantity - 1; // Decrease by 1 for readymade
    } else {
      newQty = quantity - 0.5; // Decrease by 0.5 for fabric
    }

    if (newQty < 1) {
      return; // Prevent going below 1 for both categories
    }

    // Update quantity in the cart
    dispatch(addItemsToCart(id, newQty, size));
  };

  const deleteCartItems = (id, size) => {
    dispatch(removeItemsFromCart(id, size));
  };

  const checkoutHandler = () => {
    history.push("/login?redirect=shipping");
  };

  return (
    <>
      {cartItems.length === 0 ? (
        <div className="emptyCart">
          <RemoveShoppingCartIcon />
          <Typography>No Product in Your Cart</Typography>
          <Link to="/products">View Products</Link>
        </div>
      ) : (
        <>
          <div className="cartPage">
            <div className="cartHeader">
              <p>Product</p>
              <p>Quantity</p>
              <p>Subtotal</p>
            </div>

            {cartItems &&
              cartItems.map((item) => (
                <div className="cartContainer" key={`${item.product}-${item.size || "fabric"}`}>
                  <CartItemCard item={item} deleteCartItems={deleteCartItems} />
                  <div className="cartInput">
                    <button
                      onClick={() =>
                        decreaseQuantity(
                          item.product,
                          item.quantity,
                          item.size
                        )
                      }
                    >
                      -
                    </button>
                    <input type="number" value={item.quantity} readOnly />
                    <button
                      onClick={() =>
                        increaseQuantity(
                          item.product,
                          item.quantity,
                          item.stock,
                          item.size
                        )
                      }
                    >
                      +
                    </button>
                  </div>
                  <p className="cartSubtotal">{`₹${(parseFloat(item.price) * item.quantity).toFixed(2)}`}</p>
                </div>
              ))}

            <div className="cartGrossProfit">
              <div></div>
              <div className="cartGrossProfitBox">
                <p>Gross Total:</p>
                <p>{`₹${cartItems.reduce(
                  (acc, item) => acc + item.quantity * parseFloat(item.price),
                  0
                ).toFixed(2)}`}</p>
              </div>
              <div></div>
              <div className="checkOutBtn">
                <button onClick={checkoutHandler}>Check Out</button>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Cart;
