import React, { useRef, useState, useEffect } from "react";
import "./LoginSignUp.css";
import Loader from "../layout/Loader/Loader";
import { Link } from "react-router-dom";
import MailOutlineIcon from "@material-ui/icons/MailOutline";
import LockOpenIcon from "@material-ui/icons/LockOpen";
import FaceIcon from "@material-ui/icons/Face";
import { useDispatch, useSelector } from "react-redux";
import { clearErrors, login, register } from "../../actions/userAction";
import { useAlert } from "react-alert";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";

const LoginSignUp = ({ history, location }) => {
  const dispatch = useDispatch();
  const alert = useAlert();

  const { error, loading, isAuthenticated } = useSelector(
    (state) => state.user
  );

  const loginTab = useRef(null);
  const registerTab = useRef(null);
  const switcherTab = useRef(null);

  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [showLoginPassword, setShowLoginPassword] = useState(false);

  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [showRegisterPassword, setShowRegisterPassword] = useState(false);

  const { name, email, password } = user;

  const loginSubmit = (e) => {
    e.preventDefault();
    dispatch(login(loginEmail, loginPassword));
  };

  const registerSubmit = (e) => {
    e.preventDefault();

    const myForm = new FormData();
    myForm.set("name", name);
    myForm.set("email", email);
    myForm.set("password", password);
    myForm.set("avatar", "/Profile.png");

    dispatch(register(myForm));
  };

  const registerDataChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const redirect = location.search ? location.search.split("=")[1] : "/";

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    if (isAuthenticated) {
      history.push(redirect);
    }
  }, [dispatch, error, alert, history, isAuthenticated, redirect]);

  const switchTabs = (e, tab) => {
    if (tab === "login") {
      switcherTab.current.classList.add("shiftToNeutral");
      switcherTab.current.classList.remove("shiftToRight");

      registerTab.current.classList.remove("shiftToNeutralForm");
      loginTab.current.classList.remove("shiftToLeft");
    }
    if (tab === "register") {
      switcherTab.current.classList.add("shiftToRight");
      switcherTab.current.classList.remove("shiftToNeutral");

      registerTab.current.classList.add("shiftToNeutralForm");
      loginTab.current.classList.add("shiftToLeft");
    }
  };

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <div className="LoginSignUpContainer">
            <div className="LoginSignUpBox">
              <div>
                <div className="login_signUp_toggle">
                  <p onClick={(e) => switchTabs(e, "login")}>LOGIN</p>
                  <p onClick={(e) => switchTabs(e, "register")}>REGISTER</p>
                </div>
                <button ref={switcherTab}></button>
              </div>
              <form className="loginForm" ref={loginTab} onSubmit={loginSubmit}>
              <div className="inputContainer loginEmail">
                <MailOutlineIcon />
               <input
                type="email"
                id="loginEmail"
                placeholder=" "
                required
                value={loginEmail}
                onChange={(e) => setLoginEmail(e.target.value)}
               />
        <label htmlFor="loginEmail">Email *</label>
      </div>
  
       <div className="inputContainer loginPassword">
                <LockOpenIcon />
               <input
               type={showLoginPassword ? "text" : "password"}
               id="loginPassword"
               placeholder=" "
               required
               value={loginPassword}
               onChange={(e) => setLoginPassword(e.target.value)}
              />
      <label htmlFor="loginPassword">Password *</label>
      <span
       className="passwordToggleIcon"
       onClick={() => setShowLoginPassword(!showLoginPassword)}
      >
        {showLoginPassword ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
      </span>
    </div>
                <Link to="/password/forgot">Lost your password?</Link>
                <input type="submit" value="Login" className="loginBtn" />

                {/* Create an Account link */}
                <p
                  className="switchToRegister"
                  onClick={(e) => switchTabs(e, "register")}
                >
                  Create an account
                </p>
              </form>
              <form
                className="signUpForm"
                ref={registerTab}
                encType="multipart/form-data"
                onSubmit={registerSubmit}
              >
                <div className="inputContainer signUpName">
                <FaceIcon />
            <input
            type="text"
            id="signUpName"
            placeholder=" "
            required
            name="name"
            value={name}
            onChange={registerDataChange}
            />
          <label htmlFor="signUpName">Name *</label>
       </div>

        <div className="inputContainer signUpEmail">
            <MailOutlineIcon />
         <input
         type="email"
         id="signUpEmail"
         placeholder=" "
         required
         name="email"
         value={email}
         onChange={registerDataChange}
        />
      <label htmlFor="signUpEmail">Email *</label>
      </div>

      <div className="inputContainer signUpPassword">
       <LockOpenIcon />
        <input
        type={showRegisterPassword ? "text" : "password"}
        id="signUpPassword"
        placeholder=" "
        required
        name="password"
        value={password}
        onChange={registerDataChange}
       />
       <label htmlFor="signUpPassword">Password *</label>
       <span
        className="passwordToggleIcon"
        onClick={() => setShowRegisterPassword(!showRegisterPassword)}
       >
        {showRegisterPassword ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
      </span>
      </div>
                <input type="submit" value="Register" className="signUpBtn" />

                {/* Already has an Account link */}
                <p
                  className="switchToLogin"
                  onClick={(e) => switchTabs(e, "login")}
                >
                  Already has an account?
                </p>
              </form>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default LoginSignUp;
