import React, { useEffect, useState } from "react";
import MetaData from "../layout/MetaData";
import { Link } from "react-router-dom";
import SideBar from "./Sidebar";
import {
  getOrderDetails,
  clearErrors,
  updateOrder,
} from "../../actions/orderAction";
import { useSelector, useDispatch } from "react-redux";
import Loader from "../layout/Loader/Loader";
import { useAlert } from "react-alert";
import AccountTreeIcon from "@material-ui/icons/AccountTree";
import { Button } from "@material-ui/core";
import { UPDATE_ORDER_RESET } from "../../constants/orderConstants";
import "./processOrder.css";

const ProcessOrder = ({ history, match }) => {
  const { order, error, loading } = useSelector((state) => state.orderDetails);
  const { error: updateError, isUpdated } = useSelector((state) => state.order);

  const dispatch = useDispatch();
  const alert = useAlert();
  const [status, setStatus] = useState("");
  const [trackingId, setTrackingId] = useState(""); // State for tracking ID

  const updateOrderSubmitHandler = (e) => {
    e.preventDefault();

    const myForm = new FormData();
    myForm.set("status", status);
    myForm.set("trackingId", trackingId); // Add tracking ID to the form

    dispatch(updateOrder(match.params.id, myForm));
  };

  const addTrackingIdHandler = () => {
    if (trackingId.trim() === "") {
      alert.error("Please enter a valid tracking ID");
      return;
    }
    
    const myForm = new FormData();
    myForm.set("trackingId", trackingId); // Add tracking ID to the form

    // Dispatch action to update tracking ID
    dispatch(updateOrder(match.params.id, myForm));
  };

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
    if (updateError) {
      alert.error(updateError);
      dispatch(clearErrors());
    }
    if (isUpdated) {
      alert.success("Order Updated Successfully");
      dispatch({ type: UPDATE_ORDER_RESET });
    }

    dispatch(getOrderDetails(match.params.id));
  }, [dispatch, alert, error, match.params.id, isUpdated, updateError]);

  // Function to format price
  const formatPrice = (price) => {
    const parsedPrice = parseFloat(price);
    return isNaN(parsedPrice) ? price : parsedPrice.toFixed(2);
  };

  return (
    <>
      <MetaData title="Process Order" />
      <div className="dashboard">
        <SideBar />
        <div className="newProductContainer">
          {loading ? (
            <Loader />
          ) : (
            <div
              className="confirmOrderPage"
              style={{
                display: order.orderStatus === "Delivered" ? "block" : "grid",
              }}
            >
              <div>
                <div className="confirmshippingArea">
                  <h2>Shipping Info</h2>
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

                  <h2>Payment</h2>
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
                          : order.paymentMethod === "COD" && order.orderStatus !== "Delivered"
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

                  <h2>Order Status</h2>
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
                    </div>
                  </div>
                </div>
                <div className="confirmCartItems">
                  <h2>Your Cart Items:</h2>
                  <div className="confirmCartItemsContainer">
                    {order.orderItems &&
                      order.orderItems.map((item) => (
                        <div key={item.product}>
                          <img src={item.image} alt="Product" />
                          <Link to={`/product/${item.product}`}>
                            {item.name}
                          </Link>{" "}
                          {item.size && (
                            <div className="orderItemSize">
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

              {/* Status Update and Tracking ID Section */}
              <div className="processOrderTrackingContainer">
                {/* Status Update Section */}
                {order.orderStatus !== "Delivered" && (
                  <div>
                    <form
                      className="updateOrderForm"
                      onSubmit={updateOrderSubmitHandler}
                    >
                      <h1>Process Order</h1>

                      <div>
                        <AccountTreeIcon />
                        <select onChange={(e) => setStatus(e.target.value)}>
                          <option value="">Choose Status</option>
                          {order.orderStatus === "Processing" && (
                            <option value="Shipped">Shipped</option>
                          )}

                          {order.orderStatus === "Shipped" && (
                            <option value="Delivered">Delivered</option>
                          )}
                        </select>
                      </div>

                      <Button
                        id="createProductBtn"
                        type="submit"
                        disabled={loading || status === ""}
                      >
                        Process
                      </Button>
                    </form>
                  </div>
                )}

                {/* Tracking ID Section */}
                <div className="trackingIdSection">
                  <h1>Tracking ID:</h1>
                  <div>
                    <input
                      type="text"
                      placeholder="Enter Tracking ID"
                      value={trackingId}
                      onChange={(e) => setTrackingId(e.target.value)}
                    />
                    <Button
                      onClick={addTrackingIdHandler}
                      disabled={loading}
                    >
                      Add
                    </Button>
                  </div>
                  {/* Display the tracking ID if it exists */}
                    {order.trackingId && (
                      <div className="trackingIdDisplay">
                       <h3>This order's tracking ID is: <span>{order.trackingId}</span></h3>
                      </div>
                    )}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default ProcessOrder;
