import "./App.scss";
import 'bootstrap/dist/css/bootstrap.min.css';
import { useEffect, useState } from "react";
import Header from "./component/layout/Header/Header.js";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import WebFont from "webfontloader";
import React from "react";
import Footer from "./component/layout/Footer/Footer";
import Home from "./component/Home/Home";
import ProductDetails from "./component/Product/ProductDetails";
import Products from "./component/Product/Products";
import Search from "./component/Product/Search.js";
import LoginSignUp from "./component/User/LoginSignUp";
import store from "./store";
import { loadUser } from "./actions/userAction";
import UserOptions from "./component/layout/Header/UserOptions";
import { useSelector } from "react-redux";
import Profile from "./component/User/Profile";
import ProtectedRoute from "./component/Route/ProtectedRoute";
import UpdateProfile from "./component/User/UpdateProfile";
import UpdatePassword from "./component/User/UpdatePassword";
import ForgotPassword from "./component/User/ForgotPassword";
import ResetPassword from "./component/User/ResetPassword";
import Cart from "./component/Cart/Cart";
import Shipping from "./component/Cart/Shipping";
import ConfirmOrder from "./component/Cart/ConfirmOrder";
import Payment from "./component/Cart/Payment";
import OrderSuccess from "./component/Cart/OrderSuccess";
import MyOrders from "./component/Order/MyOrders";
import OrderDetails from "./component/Order/OrderDetails";
import Dashboard from "./component/Admin/Dashboard.js";
import ProductList from "./component/Admin/ProductList.js";
import NewProduct from "./component/Admin/NewProduct";
import UpdateProduct from "./component/Admin/UpdateProduct";
import OrderList from "./component/Admin/OrderList";
import ProcessOrder from "./component/Admin/ProcessOrder";
import UsersList from "./component/Admin/UsersList";
import UpdateUser from "./component/Admin/UpdateUser";
import ProductReviews from "./component/Admin/ProductReviews";
import Contact from "./component/layout/Contact/Contact";
import About from "./component/layout/About/About";
import 'bootstrap/dist/css/bootstrap.css';
import FabricProducts from "./component/Product/FabricProducts.js";
import ReadymadeProducts from "./component/Product/ReadymadeProducts.js";
import Embroidered from "./component/Product/Embroidered.js";
import PositionPrints from "./component/Product/PositionPrints.js";
import Prints from "./component/Product/Prints.js";
import Plain from "./component/Product/Plain.js";

function App() {
  
  const { isAuthenticated, user } = useSelector((state) => state.user);
  const [originalTitle] = useState(document.title);

  const loadScript = (src) => {
    return new Promise((resolve) => {
      const script = document.createElement('script');
      script.src = src;
      script.onload = () => {
        resolve(true);
      };
      script.onerror = () => {
        resolve(false);
      };
      document.body.appendChild(script);
    });   
  };

  useEffect(() => {
    loadScript("https://checkout.razorpay.com/v1/checkout.js");
  }, []);

  useEffect(() => {
    WebFont.load({
      google: {
        families: ["Roboto", "Droid Sans", "Chilanka"],
      },
    });

    store.dispatch(loadUser());
  }, []);

  useEffect(() => {
    let intervalId;

    const handleVisibilityChange = () => {
      if (document.hidden) {
        let messageIndex = 0;
        const messages = ["🔥 You left this...", "🔥 Come back!"];
        intervalId = setInterval(() => {
          document.title = messages[messageIndex];
          messageIndex = (messageIndex + 1) % messages.length;
        }, 2000);
      } else {
        clearInterval(intervalId);
        document.title = originalTitle;
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      clearInterval(intervalId);
    };
  }, [originalTitle]);

  return (
    <Router>
      <Header />

      {isAuthenticated && <UserOptions user={user} />}

      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/fabrics" component={FabricProducts} />
        <Route path="/fabric/embroidered" component={Embroidered} />
        <Route path="/fabric/positionprints" component={PositionPrints} />
        <Route path="/fabric/prints" component={Prints} />
        <Route path="/fabric/plain" component={Plain} />
        <Route path="/readymades" component={ReadymadeProducts} />
        <Route exact path="/product/:id" component={ProductDetails} />
        <Route exact path="/products" component={Products} />
        <Route exact path="/products/:keyword" component={Products} />
        <Route exact path="/search" component={Search} />
        <Route exact path="/contact" component={Contact} />
        <Route exact path="/about" component={About} />
        <ProtectedRoute exact path="/account" component={Profile} />
        <ProtectedRoute exact path="/me/update" component={UpdateProfile} />
        <ProtectedRoute exact path="/password/update" component={UpdatePassword} />
        <Route exact path="/password/forgot" component={ForgotPassword} />
        <Route exact path="/password/reset/:token" component={ResetPassword} />
        <Route exact path="/login" component={LoginSignUp} />
        <Route exact path="/cart" component={Cart} />
        <ProtectedRoute exact path="/shipping" component={Shipping} />
        <ProtectedRoute exact path="/success" component={OrderSuccess} />
        <ProtectedRoute exact path="/orders" component={MyOrders} />
        <ProtectedRoute exact path="/order/confirm" component={ConfirmOrder} />
        <ProtectedRoute exact path="/order/:id" component={OrderDetails} />
        <ProtectedRoute isAdmin={true} exact path="/admin/dashboard" component={Dashboard} />
        <ProtectedRoute exact path="/admin/products" isAdmin={true} component={ProductList} />
        <ProtectedRoute exact path="/admin/product" isAdmin={true} component={NewProduct} />
        <ProtectedRoute exact path="/admin/product/:id" isAdmin={true} component={UpdateProduct} />
        <ProtectedRoute exact path="/admin/orders" isAdmin={true} component={OrderList} />
        <ProtectedRoute exact path="/admin/order/:id" isAdmin={true} component={ProcessOrder} />
        <ProtectedRoute exact path="/admin/users" isAdmin={true} component={UsersList} />
        <ProtectedRoute exact path="/admin/user/:id" isAdmin={true} component={UpdateUser} />
        <ProtectedRoute exact path="/admin/reviews" isAdmin={true} component={ProductReviews} />
        <ProtectedRoute exact path="/process/payment" component={Payment} />
      </Switch>

      <Footer />
    </Router>
  );
}

export default App;
