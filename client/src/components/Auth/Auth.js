import React, { useState } from "react";
import { GoogleLogin } from "react-google-login";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";

import Icon from "./Icon";
import { googleSignup, signin, signup } from "../../actions/auth";
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
  const [showPassword, setShowPassword] = useState(false);

  const dispatch = useDispatch();
  const history = useHistory();

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

    dispatch(googleSignup(result, history));

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

            <div className="col-12 input-group form-floating">
              <input
                name="password"
                type={showPassword ? "text" : "password"}
                className="form-control"
                id="floatingPassword"
                placeholder="Enter Password"
                autoComplete="false"
                onChange={handleChange}
              />
              <label htmlFor="floatingPassword">Password</label>
              <button
                className="input-group-text"
                type="button"
                id="addon-wrapping"
                onClick={handleShowPassword}
              >
                {!showPassword ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    fill="currentColor"
                    className="bi bi-eye"
                    viewBox="0 0 16 16"
                  >
                    <path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8zM1.173 8a13.133 13.133 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.133 13.133 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5c-2.12 0-3.879-1.168-5.168-2.457A13.134 13.134 0 0 1 1.172 8z" />
                    <path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5zM4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0z" />
                  </svg>
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    fill="currentColor"
                    className="bi bi-eye-slash"
                    viewBox="0 0 16 16"
                  >
                    <path d="M13.359 11.238C15.06 9.72 16 8 16 8s-3-5.5-8-5.5a7.028 7.028 0 0 0-2.79.588l.77.771A5.944 5.944 0 0 1 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.134 13.134 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755-.165.165-.337.328-.517.486l.708.709z" />
                    <path d="M11.297 9.176a3.5 3.5 0 0 0-4.474-4.474l.823.823a2.5 2.5 0 0 1 2.829 2.829l.822.822zm-2.943 1.299.822.822a3.5 3.5 0 0 1-4.474-4.474l.823.823a2.5 2.5 0 0 0 2.829 2.829z" />
                    <path d="M3.35 5.47c-.18.16-.353.322-.518.487A13.134 13.134 0 0 0 1.172 8l.195.288c.335.48.83 1.12 1.465 1.755C4.121 11.332 5.881 12.5 8 12.5c.716 0 1.39-.133 2.02-.36l.77.772A7.029 7.029 0 0 1 8 13.5C3 13.5 0 8 0 8s.939-1.721 2.641-3.238l.708.709zm10.296 8.884-12-12 .708-.708 12 12-.708.708z" />
                  </svg>
                )}
              </button>
            </div>
            {isSignup && (
              <div className="col-12  form-floating">
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
          </form>
          <button onClick={switchMode} className="ms-auto btn">
            {isSignup
              ? "Already have an account? Sign In"
              : "Don't have an account? Sign Up"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default Auth;
