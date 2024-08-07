import React, { useState, useEffect, useCallback } from "react";
import { useDispatch } from "react-redux";
import { NavLink, useNavigate, useLocation } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

import * as actionType from "../../constants/actionTypes";

const Navbar = () => {
  const [user, setUser] = useState(() =>
    JSON.parse(localStorage.getItem("profile"))
  );
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = useCallback(() => {
    dispatch({ type: actionType.LOGOUT });
    navigate("/auth");
    setUser(null);
  }, [dispatch, navigate]);

  useEffect(() => {
    const token = user?.token;

    if (token) {
      const decodedToken = jwtDecode(token);

      if (decodedToken.exp * 1000 < Date.now()) {
        handleLogout();
      }
    }

    setUser(() => JSON.parse(localStorage.getItem("profile")));
  }, [location, user?.token, handleLogout]);

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark shadow">
      <div className="d-flex container-fluid">
        <NavLink className="navbar-brand" to="/">
          PM System
        </NavLink>
        <div className="d-flex">
          <div className="mx-3 d-flex">
            {user?.result ? (
              <div className="d-flex align-items-center text-white">
                <img
                  className="avatar avatar-32 bg-light rounded-circle text-white mx-3"
                  style={{
                    height: "40px",
                    verticalAlign: "text-bottom",
                    padding: "2px",
                  }}
                  alt={user?.result.name.charAt(0)}
                  src={
                    user?.result.imageUrl ||
                    "https://raw.githubusercontent.com/twbs/icons/main/icons/person-fill.svg"
                  }
                />

                <h6>{user?.result.name}</h6>
                <button
                  className="btn btn-secondary ms-3"
                  onClick={handleLogout}
                >
                  Logout
                </button>
              </div>
            ) : (
              <NavLink className="btn btn-primary" to="/auth">
                Sign in
              </NavLink>
            )}
          </div>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarScroll"
            aria-controls="navbarScroll"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
        </div>

        <div
          className="collapse navbar-collapse"
          onMouseLeave={() => {
            document.getElementById("navbarScroll").classList.remove("show");
          }}
          id="navbarScroll"
        >
          <ul className="navbar-nav ms-auto my-2 my-lg-0 navbar-nav-scroll">
            <li className="nav-item">
              <NavLink
                className="nav-link"
                aria-current="page"
                to="/read/projects"
              >
                Active Projects
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                className="nav-link"
                aria-current="page"
                to="/manage/users"
              >
                Users
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                className="nav-link"
                aria-current="page"
                to="/read/archived"
              >
                Archived Projects
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
