import {
  ADD_TO_CART,
  REMOVE_CART_ITEM,
  SAVE_SHIPPING_INFO,
} from "../constants/cartConstants";
import axios from "axios";

// Add to Cart
export const addItemsToCart = (id, quantity, size) => async (dispatch, getState) => {
  const { data } = await axios.get(`/api/v1/product/${id}`);

  // Determine if the product is Readymade
  const isReadymade = data.product.category === 'Readymade';

  // For Readymade products, use the given quantity
  if (isReadymade) {
    dispatch({
      type: ADD_TO_CART,
      payload: {
        product: data.product._id,
        name: data.product.name,
        price: data.product.price,
        image: data.product.images[0].url,
        stock: data.product.Stock,
        quantity: quantity,
        size: size,
      },
    });
  } else {
    // For Fabric products, ensure initial quantity and adjustments
    const adjustedQuantity = quantity || 2.5; // Use 2.5 if quantity is not provided
    dispatch({
      type: ADD_TO_CART,
      payload: {
        product: data.product._id,
        name: data.product.name,
        price: data.product.price,
        image: data.product.images[0].url,
        stock: data.product.Stock,
        quantity: adjustedQuantity,
        size: null, // No size needed for Fabric products
      },
    });
  }

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
