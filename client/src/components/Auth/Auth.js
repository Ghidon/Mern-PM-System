import React, { useState } from "react";
import { GoogleLogin } from "react-google-login";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";

import Icon from "./Icon";

function Auth() {
  const [isSignup, setIsSignup] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const dispatch = useDispatch();
  const history = useHistory();

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = () => {};

  const handleChange = () => {};

  const switchMode = () => {
    setIsSignup(!isSignup);
    handleShowPassword(false);
  };

  const googleSuccess = async (res) => {
    const result = res?.profileObj;
    const token = res?.tokenId;

    try {
      dispatch({ type: "AUTH", data: { result, token } });
      history.push("/");
    } catch (error) {
      console.log(error);
    }
  };
  const googleFailure = (error) => {
    console.log(error);
    console.log("Google Sing In was Unsuccessfull");
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
                    type="text"
                    className="form-control"
                    id="floatingInput"
                    placeholder="name@example.com"
                    onChange={handleChange}
                    autoFocus
                  />
                  <label htmlFor="floatingInput">First Name</label>
                </div>
                <div className="col-md-6 form-floating">
                  <input
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
                type="email"
                className="form-control"
                id="floatingEmail"
                name="email"
                placeholder="Enter Email"
                onChange={handleChange}
              />
              <label htmlFor="floatingEmail">Email Address</label>
            </div>

            <div className="col-12 form-floating">
              <input
                type={showPassword ? "text" : "password"}
                handleShowPassword={handleShowPassword}
                className="form-control"
                id="floatingPassword"
                name="password"
                placeholder="Enter Password"
                onChange={handleChange}
              />
              <label htmlFor="floatingPassword">Password</label>
            </div>
            {isSignup && (
              <div className="col-12 form-floating">
                <input
                  type="password"
                  className="form-control"
                  id="floatingRepeatPassword"
                  name="confirmPassword"
                  placeholder="Repeat Password"
                  onChange={handleChange}
                />
                <label htmlFor="floatingRepeatPassword">Repeat Password</label>
              </div>
            )}
          </form>

          {/* {error && (
            <div className="alert alert-light" role="alert">
              {messageError}
            </div> //May add a link to Login page from here if error
          )} */}
        </div>

        <button type="submit" className="btn btn-primary mx-3 mb-3">
          {isSignup ? "Sign Up" : "Sign in"}
        </button>
        <GoogleLogin
          clientId="158755587504-l4re63s92abqpp4agiqkrmjv81l6612t.apps.googleusercontent.com"
          render={(renderProps) => (
            <button
              className="btn btn-primary mx-3"
              onClick={renderProps.onClick}
              disabled={renderProps.disabled}
            >
              <Icon />
              Google Sign In
            </button>
          )}
          onSuccess={googleSuccess}
          onFailure={googleFailure}
          cookiePolicy="single_host_origin"
        />
        <button onClick={switchMode} className="ms-auto btn my-2 me-3">
          {isSignup
            ? "Already have an account? Sign In"
            : "Don't have an account? Sign Up"}
        </button>
      </div>
    </div>
  );
}

export default Auth;
