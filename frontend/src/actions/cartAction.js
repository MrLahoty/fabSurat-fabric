import {
  ADD_TO_CART,
  REMOVE_CART_ITEM,
  SAVE_SHIPPING_INFO,
} from "../constants/cartConstants";
import axios from "axios";

// Add to Cart
export const addItemsToCart = (id, quantity = 1, size) => async (dispatch, getState) => {
  const { data } = await axios.get(`/api/v1/product/${id}`);

  // Determine if the product is Readymade
  const isReadymade = data.product.category === 'Readymade';

  // Ensure the quantity is at least 1
  const adjustedQuantity = quantity < 1 ? 1 : quantity;

  dispatch({
    type: ADD_TO_CART,
    payload: {
      product: data.product._id,
      name: data.product.name,
      price: data.product.price,
      image: data.product.images[0].url,
      stock: data.product.Stock,
      quantity: adjustedQuantity, // Use adjusted quantity
      size: isReadymade ? size : null, // Use size only for Readymade products
    },
  });

  localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));
};

// REMOVE FROM CART
export const removeItemsFromCart = (id, size) => async (dispatch, getState) => {
  dispatch({
    type: REMOVE_CART_ITEM,
    payload: { id, size }, // Pass size to identify the correct item
  });

  localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));
};

// SAVE SHIPPING INFO
export const saveShippingInfo = (data) => async (dispatch) => {
  dispatch({
    type: SAVE_SHIPPING_INFO,
    payload: data,
  });

  localStorage.setItem("shippingInfo", JSON.stringify(data));
};
