import React, { useState, useRef, useEffect } from "react";
import CheckoutSteps from "../Cart/CheckoutSteps";
import { useSelector, useDispatch } from "react-redux";
import MetaData from "../layout/MetaData";
import "./ConfirmOrder.css";
import { Link } from "react-router-dom";
import { Typography } from "@material-ui/core";
import axios from 'axios';
import { useAlert } from 'react-alert';
import { createOrder, clearErrors } from "../../actions/orderAction";
import { applyCoupon, removeCoupon } from '../../actions/couponActions';

const ConfirmOrder = ({ history }) => {
  const { shippingInfo, cartItems } = useSelector((state) => state.cart);
  const { user } = useSelector((state) => state.user);
  const { coupon, error: couponError } = useSelector((state) => state.coupon);
  const dispatch = useDispatch();
  const alert = useAlert();
  const payBtn = useRef(null);

  const [paymentMethod, setPaymentMethod] = useState("online");
  const [couponCode, setCouponCode] = useState('');

  const formatPrice = (price) => {
    const parsedPrice = parseFloat(price);
    return isNaN(parsedPrice) ? price : `₹${parsedPrice.toFixed(2)}`;
  };

  const subtotal = cartItems.reduce(
    (acc, item) => acc + item.quantity * item.price,
    0
  );

  let shippingCharges = 0;

  if (paymentMethod === "online") {
    shippingCharges = subtotal > 1500 ? 0 : 90; // Online: free above 1500, else 90
  } else if (paymentMethod === "COD") {
    if (subtotal < 2500) {
      shippingCharges = 180; // COD: Rs 180 for orders below 2500
    } else {
      shippingCharges = subtotal * 0.07; // COD: 7% of subtotal for orders above 2500
    }
  }

  let discount = coupon ? coupon.discount : 0; // Use discount from coupon

  const totalPrice = subtotal + shippingCharges - discount;

  const address = `${shippingInfo.address}, ${shippingInfo.city}, ${shippingInfo.state}, ${shippingInfo.pinCode}, ${shippingInfo.country}`;

  const order = {
    shippingInfo,
    orderItems: cartItems,
    itemsPrice: subtotal,
    shippingPrice: shippingCharges,
    totalPrice,
  };

  const displayRazorpay = async (amount) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };

      const baseURL = process.env.NODE_ENV === 'PRODUCTION' ? 'http://localhost:4000' : 'https://fabsurat.onrender.com';

      const { data: { key } } = await axios.get(`${baseURL}/api/v1/razorpay-key`);
      const paymentAmount = Math.round(amount * 100); // Convert to paise

      const { data } = await axios.post(`${baseURL}/api/v1/razorpay`, { amount: paymentAmount }, config);

      const options = {
        key, // Use the fetched key here
        currency: data.currency,
        amount: data.amount,
        description: 'Order Payment',
        image: `${baseURL}/logo.png`,
        order_id: data.id,
        handler: function (response) {
          order.paymentInfo = {
            id: response.razorpay_payment_id,
            status: 'succeeded',
          };
          // Create order after payment success
          dispatch(createOrder(order));
          history.push("/success");
        },
        prefill: {
          name: user.name,
          email: user.email,
          contact: shippingInfo.phoneNo,
        },
      };

      const paymentObject = new window.Razorpay(options);
      paymentObject.open();
    } catch (error) {
      payBtn.current.disabled = false;
      alert.error(error.response?.data?.message || "An error occurred while processing the payment.");
    }
  };

  const handlePayment = (e) => {
    e.preventDefault();
    payBtn.current.disabled = true;

    if (paymentMethod === "online") {
      // Pay the total price including shipping charges for online
      displayRazorpay(totalPrice);
    } else if (paymentMethod === "COD") {
      // Pay the shipping charges first
      displayRazorpay(shippingCharges);
    }
  };

  const applyCouponHandler = () => {
    // Remove existing coupon before applying a new one
    if (coupon) {
      dispatch(removeCoupon());
    }
    dispatch(applyCoupon(couponCode));
  };

  const removeCouponHandler = () => {
    dispatch(removeCoupon());
    setCouponCode(''); // Clear coupon code input
  };

  useEffect(() => {
    if (couponError) {
      alert.error(couponError);
      dispatch(clearErrors());
    }
  }, [dispatch, couponError, alert]);

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

            {/* Coupon Code Section */}
            <div className="coupon-container">
              <input
                type="text"
                placeholder="Enter Coupon Code"
                value={couponCode}
                onChange={(e) => setCouponCode(e.target.value)}
              />
              <button onClick={applyCouponHandler}>Apply Coupon</button>
              {coupon && (
                <button onClick={removeCouponHandler}>Remove Coupon</button>
              )}
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

            <button className="payment-submit" onClick={handlePayment} ref={payBtn}>
              Pay Now - {formatPrice(paymentMethod === "online" ? totalPrice : shippingCharges)}
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ConfirmOrder;
