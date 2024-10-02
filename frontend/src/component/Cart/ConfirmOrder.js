import React, { useState } from "react";
import CheckoutSteps from "../Cart/CheckoutSteps";
import { useSelector } from "react-redux";
import MetaData from "../layout/MetaData";
import "./ConfirmOrder.css";
import { Link } from "react-router-dom";
import { Typography } from "@material-ui/core";

const ConfirmOrder = ({ history }) => {
  const { shippingInfo, cartItems } = useSelector((state) => state.cart);
  const { user } = useSelector((state) => state.user);

  // Payment method state to track user's selection
  const [paymentMethod, setPaymentMethod] = useState("online");

  const formatPrice = (price) => {
    const parsedPrice = parseFloat(price);
    return isNaN(parsedPrice) ? price : `₹${parsedPrice.toFixed(2)}`;
  };

  const subtotal = cartItems.reduce(
    (acc, item) => acc + item.quantity * item.price,
    0
  );

  // Determine shipping charges based on subtotal and payment method
  let shippingCharges = 0;

  if (paymentMethod === "online") {
    shippingCharges = subtotal > 1500 ? 0 : 90; // Online: free above 1500, else 90
  } else if (paymentMethod === "COD") {
    if (subtotal < 2500) {
      shippingCharges = 180; // COD: Rs 180 for orders below 2500
    } else {
      shippingCharges = subtotal * 0.08; // COD: 8% of subtotal for orders above 2500
    }
  }

  // Apply discount based on subtotal range
  let discount = 0;
  if (subtotal >= 50000) {
    discount = 4000;
  } else if (subtotal >= 30000 && subtotal < 50000) {
    discount = 2000;
  } else if (subtotal >= 20000 && subtotal < 30000) {
    discount = 1100;
  } else if (subtotal >= 10000 && subtotal < 20000) {
    discount = 500;
  } else if (subtotal >= 5000 && subtotal < 10000) {
    discount = 200;
  }

  const totalPrice = subtotal + shippingCharges - discount;

  const address = `${shippingInfo.address}, ${shippingInfo.city}, ${shippingInfo.state}, ${shippingInfo.pinCode}, ${shippingInfo.country}`;

  const proceedToPayment = () => {
    const data = {
      subtotal,
      shippingCharges,
      discount, // Already calculated discount
      totalPrice, // Total price after discount
      paymentMethod, // Include selected payment method
    };
    sessionStorage.setItem("orderInfo", JSON.stringify(data));
    // Save the selected payment method in sessionStorage
    sessionStorage.setItem("paymentMethod", paymentMethod);
    history.push("/process/payment");
  };
  

  return (
    <>
      <MetaData title="Confirm Order" />
      <CheckoutSteps activeStep={1} />
      <div className="confirmOrderPage">
        <div>
          <div className="confirmshippingArea">
            <Typography>Shipping Info</Typography>
            <div className="confirmshippingAreaBox">
              <div>
                <p>Name:</p>
                <span>{user.name}</span>
              </div>
              <div>
                <p>Phone:</p>
                <span>{shippingInfo.phoneNo}</span>
              </div>
              <div>
                <p>Address:</p>
                <span>{address}</span>
              </div>
            </div>
          </div>
          <div className="confirmCartItems">
            <Typography>Your Cart Items:</Typography>
            <div className="confirmCartItemsContainer">
              {cartItems &&
                cartItems.map((item) => (
                  <div key={item.product}>
                    <img src={item.image} alt="Product" />
                    <Link to={`/product/${item.product}`}>{item.name}</Link>{" "}
                    <span>
                      {item.quantity} X {formatPrice(item.price)} ={" "}
                      <b>{formatPrice(item.price * item.quantity)}</b>
                    </span>
                  </div>
                ))}
            </div>
          </div>
        </div>
        <div>
          <div className="orderSummary">
            <Typography>Order Summary</Typography>
            <div>
              <div>
                <p>Subtotal:</p>
                <span>{formatPrice(subtotal)}</span>
              </div>
              <div>
                <p>Shipping Charges:</p>
                <span>{formatPrice(shippingCharges)}</span>
              </div>
              {discount > 0 && (
                <div>
                  <p>Discount:</p>
                  <span>- {formatPrice(discount)}</span>
                </div>
              )}
            </div>

            <div className="orderSummaryTotal">
              <p>
                <b>Total:</b>
              </p>
              <span>{formatPrice(totalPrice)}</span>
            </div>

            <div className="payment-method">
              <p>Choose Payment Method:</p>
              <label>
                <input
                  type="radio"
                  value="online"
                  checked={paymentMethod === "online"}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                />
                Online Payment
              </label>
              <label>
                <input
                  type="radio"
                  value="COD"
                  checked={paymentMethod === "COD"}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                />
                Cash on Delivery (COD)
              </label>
            </div>

            <button onClick={proceedToPayment}>Proceed To Payment</button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ConfirmOrder;
