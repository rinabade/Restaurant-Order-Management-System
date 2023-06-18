import React, { useRef, useEffect, useState, useContext } from "react";
import "./AdminLogin.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { forgetPassword, loginUser, resetPassword } from "../../../api/authAction";
import PropTypes from "prop-types";
import AuthContext from "../../../context/AuthProvider";

function AdminLogin({ setToken }) {
  const { setAuth } = useContext(AuthContext);
  const userRef = useRef();
  const errRef = useRef();

  //   const [values, setValues] = useState([]);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    userRef.current.focus();
  }, []);

  useEffect(() => {
    setErrMsg("");
  }, [email, password]);

  const handleSubmit = async (e) => {
    e.preventDefault();
      await loginUser({email, password})
      .then((response) => {
        // Handle successful response
        return response;
        // const token = response.token;
        // const roles = response.job_title;
  
        // setAuth({ email, password, roles, token });
        // console.log(token);
        // setEmail("");
        // setPassword("");
        // setToken(token);
        // setSuccess(true);
        // Optionally, perform additional actions after successful post
      })
      .catch((error) => {
        // Handle error response
        // return error
        if (!error?.status === 400) {
          setErrMsg("Missing email or password");
        } else if (!error?.status === 401) {
          setErrMsg("No Server Response");
        } else if (!error?.status === 404) {
          setErrMsg("Unauthorized");
        } else {
          setErrMsg("Login Failed");
        }
        errRef.current.focus();
        // Optionally, display an error message to the user
      });
  }

    
    // const token = await loginUser({
    //   email,
    //   password,
    // });

//   const navigate = useNavigate();


  const [showPopup, setShowPopup] = useState(false);
  const [showPopup1, setShowPopup1] = useState(false);

  const [resetEmail, setResetEmail] = useState({
    email: "",
  });
const [resetPswd, setResetPassword] = useState({
    n_password: "",
    c_password: ""
  });
  const handleResetEmailChange = (event) => {
    setResetEmail((prevItem) => ({
      ...prevItem,
      email: event.target.value,
    }));

};

const handleResetPasswordChange = (event)=>{    
    setResetPassword((prevItem) => ({
      ...prevItem,
      n_password: event.target.value,
      c_password: event.target.value,
    
    }));
  }

  const handleSendResetEmail = (e) => {
    e.preventDefault();
    forgetPassword(resetEmail)
      .then((response) => {
        console.log(response.data);
        setShowPopup(false);
        setShowPopup1(true);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleResetPassword = (e) => {
    e.preventDefault();
    resetPassword(resetPswd)
      .then((response) => {
        console.log(response.data);
        setShowPopup1(false);
      })
      .catch((error) => {
        console.log(error);
      });
    }


  return (
    // <>
    //   {success ? (
    //     <section>
            
    //       <h1>You are logged in!</h1>
    //       <br />
    //       <p onSubmit={handle}>
    //         <a href="/admin/MainDash"> Go to Home</a>
    //       </p>
    //     </section>
    //   ) : (
        <div className="login d-flex justify-content-center align-items-center vh-100">
          <div className="glass p-3 rounded w-45">
            <section>
              <p
                ref={errRef}
                // color="red"
                className={errMsg ? "errMsg" : "offscreen"}
                aria-live="assertive"
              >
                {errMsg}
              </p>
              <h2>Sign In</h2>
              <form className="mt-4" onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label htmlFor="email">
                    <strong>Email</strong>
                  </label>
                  <input
                    type="email"
                    id="email"
                    ref={userRef}
                    placeholder="Enter Email"
                    name="name"
                    // autoComplete="off"
                    onChange={(e) => setEmail(e.target.value)}
                    value={email.email}
                    className="form-control rounded-0"
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="password">
                    <strong>Password</strong>
                  </label>
                  <input
                    type="password"
                    id="password"
                    placeholder="Enter Password"
                    name="password"
                    onChange={(e) => setPassword(e.target.value)}
                    value={password.password}
                    className="form-control rounded-0"
                    required
                  />
                </div>
                <div className="forget text-primary">
                  <p onClick={() => setShowPopup(true)}>Forget Password?</p>
                </div>
                <div className="align-items-center d-flex justify-content-center">
                  <button
                    type="submit"
                    className="btn btn3 w-50 rounded-12  mt-3 mb-3"
                    onClick={handleSubmit}
                  >
                    Log in
                  </button>
                </div>
              </form>
            </section>
          </div>

          {showPopup && (
            <div className="popup">
              <div className="popup-content">
                <button
                  type="button"
                  className="btn btn-close"
                  onClick={() => setShowPopup1(true)}
                ></button>
                <h3>Reset Password</h3>
                <form className="mt-4">
                  <div className="mb-3">
                    <label htmlFor="reset-email">
                      <strong>Email</strong>
                    </label>
                    <input
                      type="email"
                      placeholder="Enter Email"
                      name="reset-email"
                      value={resetEmail.email}
                      onChange={handleResetEmailChange}
                      className="form-control rounded-0"
                      required
                    />
                  </div>
                  <div className="align-items-center d-flex justify-content-center">
                    <button
                      type="submit"
                      className="btn btn3 w-50 rounded-12 mt-3 mb-3"
                      onClick={handleSendResetEmail}
                    //   onSubmit={() => setShowPopup(true)}
                    >
                      Send
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}


            {showPopup1 && (
            <div className="popup">
              <div className="popup-content">
                {/* <button
                  type="button"
                  className="btn btn-close"
                  onClick={() => setShowPopup1(true)}
                ></button> */}
                <h3>Change Password</h3>
                <form className="mt-4">
                  <div className="mb-3">
                  <label htmlFor="name">New password</label>
                  <input
                    type="password"
                    placeholder="Enter New password"
                    name="n_password"
                    value={resetPassword.n_password}
                      onChange={handleResetPasswordChange}
                    className="form-control rounded-0"
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="name">Confirm password</label>
                  <input
                    type="password"
                    placeholder="Enter Confirm password"
                    name="c_password"
                    value={resetPassword.c_password}
                      onChange={handleResetPasswordChange}
                    className="form-control rounded-0"
                    required
                  />
                </div>
                  <div className="align-items-center d-flex justify-content-center">
                    <button
                      type="submit"
                      className="btn btn3 w-50 rounded-12 mt-3 mb-3"
                      onClick={handleResetPassword}
                    //   onSubmit={() => setShowPopup(true)}
                    >
                      Send
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}


        </div>
    //   )}
    // </>
  );
}
AdminLogin.propTypes = {
  setToken: PropTypes.func.isRequired,
};
export default AdminLogin;
