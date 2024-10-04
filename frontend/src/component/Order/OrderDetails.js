import React, { useEffect, useState } from "react";
import "./orderDetails.css";
import { useSelector, useDispatch } from "react-redux";
import MetaData from "../layout/MetaData";
import { Link, useHistory } from "react-router-dom";
import { Typography } from "@material-ui/core";
import { getOrderDetails, clearErrors, cancelOrder } from "../../actions/orderAction";
import Loader from "../layout/Loader/Loader";
import { useAlert } from "react-alert";

const OrderDetails = ({ match }) => {
  const { order, error, loading } = useSelector((state) => state.orderDetails);
  const dispatch = useDispatch();
  const alert = useAlert();
  const history = useHistory();
  const [showConfirmation, setShowConfirmation] = useState(false);

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    dispatch(getOrderDetails(match.params.id));
  }, [dispatch, alert, error, match.params.id]);

  const cancelOrderHandler = () => {
    setShowConfirmation(true);
  };

  const handleCancelConfirm = () => {
    setShowConfirmation(false);
    dispatch(cancelOrder(order._id));
    history.push("/");
    alert.success("Order cancelled successfully");
  };

  const handleCancelCancel = () => {
    setShowConfirmation(false);
  };

  // Function to format price
  const formatPrice = (price) => {
    const parsedPrice = parseFloat(price);
    return isNaN(parsedPrice) ? price : parsedPrice.toFixed(2);
  };

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <MetaData title="Order Details" />
          <div className="orderDetailsPage">
            <div className="orderDetailsContainer">
              <Typography component="h1">
                Order ID: #{order && order._id}
              </Typography>
              {/* Tracking ID Section */}
              {order.trackingId && (
                <div className="trackingIdSections">
                  <h2>Tracking ID:  <span>{order.trackingId}</span> </h2>                
                </div>
              )}
              <Typography>Shipping Info</Typography>
              <div className="orderDetailsContainerBox">
                <div>
                  <p>Name:</p>
                  <span>{order.user && order.user.name}</span>
                </div>
                <div>
                  <p>Phone:</p>
                  <span>
                    {order.shippingInfo && order.shippingInfo.phoneNo}
                  </span>
                </div>
                <div>
                  <p>Address:</p>
                  <span>
                    {order.shippingInfo &&
                      `${order.shippingInfo.address}, ${order.shippingInfo.city}, ${order.shippingInfo.state}, ${order.shippingInfo.pinCode}, ${order.shippingInfo.country}`}
                  </span>
                </div>
              </div>
              <Typography>Payment</Typography>
              <div className="orderDetailsContainerBox">
                <div>
                  <p
                    className={
                      order.paymentInfo &&
                      order.paymentInfo.status === "succeeded" &&
                      order.orderStatus === "Delivered"
                        ? "greenColor"
                        : "redColor"
                    }
                  >
                    {order.paymentInfo && order.paymentInfo.status === "succeeded" && order.orderStatus === "Delivered"
                      ? "PAID"
                      : (order.paymentMethod === "COD" && order.orderStatus !== "Delivered") 
                      ? "NOT PAID" 
                      : "NOT PAID"}
                  </p>
                </div>

                <div>
                  <p>Item Total:</p>
                  <span>₹{order.itemsPrice && formatPrice(order.itemsPrice)}</span>
                </div>
                <div>
                  <p>Shipping Charges:</p>
                  <span>₹{order.shippingPrice && formatPrice(order.shippingPrice)}</span>
                </div>
                <div>
                  <p>Total Amount:</p>
                  <span>₹{order.totalPrice && formatPrice(order.totalPrice)}</span>
                </div>
              </div>

              <Typography>Order Status</Typography>
              <div className="orderDetailsContainerBox">
                <div>
                  <p
                    className={
                      order.orderStatus && order.orderStatus === "Delivered"
                        ? "greenColor"
                        : "redColor"
                    }
                  >
                    {order.orderStatus && order.orderStatus}
                  </p>
                  {order.orderStatus !== "Delivered" && (
                    <button onClick={cancelOrderHandler} className="cancelOrderButton">
                      Cancel Order
                    </button>
                  )}
                </div>
              </div>

              
            </div>

            {showConfirmation && (
              <div className="confirmationDialog">
                <p>Are you sure you want to cancel your order?</p>
                <button className="yes" onClick={handleCancelConfirm}>Yes</button>
                <button className="no" onClick={handleCancelCancel}>No</button>
              </div>
            )}

            <div className="orderDetailsCartItems">
              <h2>Order Items:</h2>
              <div className="orderDetailsCartItemsContainer">
                {order.orderItems &&
                  order.orderItems.map((item) => (
                    <div key={item.product}>
                      <img src={item.image} alt="Product" />
                      <Link to={`/product/${item.product}`}>
                        {item.name}
                      </Link>{" "}
                      {item.size && (
                        <div className="orderItemSizes">
                          <span>Size: {item.size}</span>
                        </div>
                      )}
                      <span>
                        {item.quantity} X ₹{formatPrice(item.price)} ={" "}
                        <b>₹{formatPrice(item.price * item.quantity)}</b>
                      </span>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default OrderDetails;
