import React, { useState } from "react";
import { GoogleLogin } from "react-google-login";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";

import Icon from "./Icon";
import { signin, signup } from "../../actions/auth";
import { AUTH } from "../../constants/actionTypes";

const initialState = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  confirmPassword: "",
};

function Auth() {
  const [formData, setFormData] = useState(initialState);
  const [isSignup, setIsSignup] = useState(false);
  const dispatch = useDispatch();
  const history = useHistory();

  const [showPassword, setShowPassword] = useState(false);
  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const switchMode = () => {
    setFormData(initialState);
    setIsSignup(!isSignup);
    setShowPassword(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (isSignup) {
      dispatch(signup(formData, history));
    } else {
      dispatch(signin(formData, history));
    }
  };

  const googleSuccess = async (res) => {
    const result = res?.profileObj;
    const token = res?.tokenId;

    try {
      dispatch({ type: AUTH, data: { result, token } });
      history.push("/");
    } catch (error) {
      console.log(error);
    }
  };
  const googleError = () =>
    alert("Google Sign In was Unsuccessfull, Try again");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className=" d-flex justify-content-center">
      <div className="card col col-sm-10 col-md-8 col-lg-6 col-xl-4">
        <div className="card-body d-flex flex-column align-items-center">
          <h4>{isSignup ? "Sign Up" : "Sign In"}</h4>
          <form className="row g-2" onSubmit={handleSubmit}>
            {isSignup && (
              <>
                <div className="col-md-6 form-floating">
                  <input
                    name="firstName"
                    type="text"
                    className="form-control"
                    id="floatingInput"
                    placeholder="FirstName"
                    onChange={handleChange}
                    autoFocus
                  />
                  <label htmlFor="floatingInput">First Name</label>
                </div>
                <div className="col-md-6 form-floating">
                  <input
                    name="lastName"
                    type="text"
                    className="form-control"
                    id="floatingPassword"
                    placeholder="LastName"
                    onChange={handleChange}
                  />
                  <label htmlFor="floatingPassword">Last Name</label>
                </div>
              </>
            )}
            <div className="col-12 form-floating">
              <input
                name="email"
                type="email"
                className="form-control"
                id="floatingEmail"
                placeholder="Email"
                onChange={handleChange}
              />
              <label htmlFor="floatingEmail">Email Address</label>
            </div>

            <div className="col-12 form-floating">
              <input
                name="password"
                type={showPassword ? "text" : "password"}
                handleShowPassword={handleShowPassword}
                className="form-control"
                id="floatingPassword"
                placeholder="Enter Password"
                onChange={handleChange}
              />
              <label htmlFor="floatingPassword">Password</label>
            </div>
            {isSignup && (
              <div className="col-12 form-floating">
                <input
                  name="confirmPassword"
                  type="password"
                  className="form-control"
                  id="floatingRepeatPassword"
                  placeholder="Repeat Password"
                  onChange={handleChange}
                />
                <label htmlFor="floatingRepeatPassword">Repeat Password</label>
              </div>
            )}
            <button type="submit" className="btn btn-primary ">
              {isSignup ? "Sign Up" : "Sign in"}
            </button>
            <GoogleLogin
              clientId="158755587504-l4re63s92abqpp4agiqkrmjv81l6612t.apps.googleusercontent.com"
              render={(renderProps) => (
                <button
                  className="btn btn-primary"
                  onClick={renderProps.onClick}
                  disabled={renderProps.disabled}
                >
                  <Icon />
                  Google Sign In
                </button>
              )}
              onSuccess={googleSuccess}
              onFailure={googleError}
              cookiePolicy="single_host_origin"
            />
            <button onClick={switchMode} className="ms-auto btn">
              {isSignup
                ? "Already have an account? Sign In"
                : "Don't have an account? Sign Up"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Auth;
