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
import ChinonEmbroidered from "./component/Product/ChinonEmbroidered.js";
import FauxGeorgetteEmbroidered from "./component/Product/FauxGeorgetteEmbroidered.js";
import ViscoseGeorgetteEmbroidered from "./component/Product/ViscoseGeorgetteEmbroidered.js";
import SilkEmbroidered from "./component/Product/SilkEmbroidered.js";
import RayonEmbroidered from "./component/Product/RayonEmbroidered.js";
import VelvetEmbroidered from "./component/Product/VelvetEmbroidered.js";
import OrganzaEmbroidered from "./component/Product/OrganzaEmbroidered.js";
import CottonEmbroidered from "./component/Product/CottonEmbroidered.js";
import ShimmerEmbroidered from "./component/Product/ShimmerEmbroidered.js";
import NetEmbroidery from "./component/Product/NetEmbroidery.js"
import MuslinPositionPrints from "./component/Product/MuslinPositionPrints.js";
import ChinonPositionPrints from "./component/Product/ChinonPositionPrints.js";
import GeorgettePositionPrints from "./component/Product/GeorgettePositionPrints.js";
import OpadaPositionPrints from "./component/Product/OpadaPositionPrints.js";
import DolaSilkJacquardPositionPrints from "./component/Product/DolaSilkJacquardPositionPrints.js";
import OrganzaPositionPrints from "./component/Product/OrganzaPositionPrints.js";
import TissueZariPositionPrints from "./component/Product/TissueZariPositionPrints.js";
import CrepePositionPrints from "./component/Product/CrepePositionPrints.js";
import SatinPrints from "./component/Product/SatinPrints.js";
import GeorgettePrints from "./component/Product/GeorgettePrints.js";
import HakobaPrints from "./component/Product/HakobaPrints.js";
import MuslinPrints from "./component/Product/MuslinPrints.js";
import RayonPrints from "./component/Product/RayonPrints.js";
import VelvetPrints from "./component/Product/VelvetPrints.js";
import SugarcanePrints from "./component/Product/SugarcanePrints.js";
import ChinonPrints from "./component/Product/ChinonPrints.js";
import Hakoba from "./component/Product/Hakoba.js";
import Velvet from "./component/Product/Velvet.js";
import Dyeable from "./component/Product/Dyeable.js";
import PureViscose from "./component/Product/PureViscose.js";
import SemiPure from "./component/Product/SemiPure.js";

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
        <Route path="/ChinonEmbroidery" component={ChinonEmbroidered} />
        <Route path="/FauxGeorgetteEmbroidery" component={FauxGeorgetteEmbroidered} />
        <Route path="/ViscoseGeorgetteEmbroidery" component={ViscoseGeorgetteEmbroidered} />
        <Route path="/SilkEmbroidery" component={SilkEmbroidered} />
        <Route path="/RayonEmbroidery" component={RayonEmbroidered} />
        <Route path="/VelvetEmbroidery" component={VelvetEmbroidered} />
        <Route path="/OrganzaEmbroidery" component={OrganzaEmbroidered} />
        <Route path="/CottonEmbroidery" component={CottonEmbroidered} />
        <Route path="/ShimmerEmbroidery" component={ShimmerEmbroidered} />
        <Route path="/NetEmbroidery" component={NetEmbroidery} />
        <Route path="/MuslinPositionPrints" component={MuslinPositionPrints} />
        <Route path="/ChinonPositionPrints" component={ChinonPositionPrints} />
        <Route path="/GeorgettePositionPrints" component={GeorgettePositionPrints} />
        <Route path="/OpadaPositionPrints" component={OpadaPositionPrints} />
        <Route path="/DolaSilkJacquardPositionPrints" component={DolaSilkJacquardPositionPrints} />
        <Route path="/OrganzaPositionPrints" component={OrganzaPositionPrints} />
        <Route path="/TissueZariPositionPrints" component={TissueZariPositionPrints} />
        <Route path="/CrepePositionPrints" component={CrepePositionPrints} />
        <Route path="/SatinPrints" component={SatinPrints} />
        <Route path="/GeorgettePrints" component={GeorgettePrints} />
        <Route path="/HakobaPrints" component={HakobaPrints} />
        <Route path="/MuslinPrints" component={MuslinPrints} />
        <Route path="/RayonPrints" component={RayonPrints} />
        <Route path="/VelvetPrints" component={VelvetPrints} />
        <Route path="/SugarcanePrints" component={SugarcanePrints} />
        <Route path="/ChinonPrints" component={ChinonPrints} />
        <Route path="/Hakoba" component={Hakoba} />
        <Route path="/Velvet" component={Velvet} />
        <Route path="/Dyeable" component={Dyeable} />
        <Route path="/PureViscose" component={PureViscose} />
        <Route path="/SemiPure" component={SemiPure} />
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
