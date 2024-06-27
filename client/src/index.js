import React from "react";
import ReactDOM from "react-dom/client"; // Use the new 'react-dom/client' import
import { Provider } from "react-redux";
import { createStore, applyMiddleware, compose } from "redux";
import { thunk } from "redux-thunk";
// import { BrowserRouter as Router } from "react-router-dom";
// import { GoogleOAuthProvider } from "@react-oauth/google";
import "bootstrap/dist/css/bootstrap.min.css"; // Import Bootstrap CSS
import "./index.css";

import reducers from "./reducers";

import App from "./App";

const store = createStore(reducers, compose(applyMiddleware(thunk)));

const container = document.getElementById("root");
const root = ReactDOM.createRoot(container); // Use 'createRoot' instead of 'render'

root.render(
  <Provider store={store}>
    <App />
  </Provider>
);
