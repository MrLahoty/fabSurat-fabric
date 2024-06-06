import React, { useState, useEffect, useRef } from 'react';
import CheckoutSteps from "../Cart/CheckoutSteps";
import { useSelector, useDispatch } from "react-redux";
import { useAlert } from 'react-alert';
import MetaData from "../layout/MetaData";
import './payment.css';
import axios from 'axios';
import { createOrder, clearErrors } from "../../actions/orderAction";
import { applyCoupon, removeCoupon } from '../../actions/couponActions';

function Payment({ history }) {
  const [paymentMethod, setPaymentMethod] = useState('online');
  const [couponCode, setCouponCode] = useState('');
  const orderInfo = JSON.parse(sessionStorage.getItem("orderInfo"));
  const payBtn = useRef(null);
  const dispatch = useDispatch();
  const alert = useAlert();
  const { shippingInfo, cartItems } = useSelector((state) => state.cart);
  const { error, success } = useSelector((state) => state.newOrder);
  const { coupon, error: couponError } = useSelector((state) => state.coupon);

  const calculateDiscountedTotal = () => {
    return orderInfo.totalPrice - (coupon ? coupon.discount : 0);
  };

  const amount = Math.round(calculateDiscountedTotal() * 100);

  const order = {
    shippingInfo,
    orderItems: cartItems,
    itemsPrice: orderInfo.subtotal,
    taxPrice: orderInfo.tax,
    shippingPrice: orderInfo.shippingCharges,
    totalPrice: calculateDiscountedTotal(),
  };

  const displayRazorpay = async () => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };

      const baseURL = process.env.NODE_ENV === 'PRODUCTION' ? 'http://localhost:4000' : 'https://fabsurat.onrender.com';

      const { data: { key } } = await axios.get(`${baseURL}/api/v1/razorpay-key`);
      const { data } = await axios.post(`${baseURL}/api/v1/razorpay`, { amount }, config);

      const options = {
        key, // Use the fetched key here
        currency: data.currency,
        amount: data.amount,
        description: 'Wallet Transaction',
        image: `${baseURL}/logo.png`,
        order_id: data.id,
        handler: function (response) {
          order.paymentInfo = {
            id: response.razorpay_payment_id,
            status: 'succeeded',
          };

          dispatch(createOrder(order));
          history.push("/success");
        },
      };

      const paymentObject = new window.Razorpay(options);
      paymentObject.open();
    } catch (error) {
      payBtn.current.disabled = false;
      alert.error(error.response?.data?.message || "An error occurred while processing the payment.");
      console.error("Error processing Razorpay payment:", error);
    }
  };

  const handlePayment = (e) => {
    e.preventDefault();
    payBtn.current.disabled = true;

    if (paymentMethod === 'online') {
      displayRazorpay();
    } else if (paymentMethod === 'cod') {
      order.paymentInfo = {
        id: 'COD',
        status: 'Pending', // Initially marked as pending
      };

      dispatch(createOrder(order));
      history.push("/success");
    }
  };

  const applyCouponHandler = () => {
    dispatch(applyCoupon(couponCode));
  };

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    if (couponError) {
      alert.error(couponError);
    }

    if (success) {
      dispatch(removeCoupon());
      history.push("/success");
    }
  }, [dispatch, error, alert, success, couponError, history]);

  return (
    <>
      <MetaData title="Payment" />
      <CheckoutSteps activeStep={2} />
      <div className="payment-container">
        <h2 className="payment-title">PAYMENT MODE</h2>
        <div className="payment-options">
          <label>
            <input
              type="radio"
              name="paymentMethod"
              value="online"
              checked={paymentMethod === 'online'}
              onChange={(e) => setPaymentMethod(e.target.value)}
            />
            Online Payment
          </label>
          <label>
            <input
              type="radio"
              name="paymentMethod"
              value="cod"
              checked={paymentMethod === 'cod'}
              onChange={(e) => setPaymentMethod(e.target.value)}
            />
            Cash on Delivery
          </label>
        </div>

        <div className="coupon-container">
          <input
            type="text"
            placeholder="Enter Coupon Code"
            value={couponCode}
            onChange={(e) => setCouponCode(e.target.value)}
          />
          <button onClick={applyCouponHandler}>Apply Coupon</button>
        </div>

        <button className="payment-submit" onClick={handlePayment} ref={payBtn}>
          Pay Now - ₹{calculateDiscountedTotal()}
        </button>
      </div>
    </>
  );
}

export default Payment;
