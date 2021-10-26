import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { NavLink, useHistory, useLocation } from "react-router-dom";

const Navbar = () => {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("profile")));
  const dispatch = useDispatch();
  const history = useHistory();
  const location = useLocation();

  const logout = () => {
    dispatch({ type: "LOGOUT" });
    history.push("/");
    setUser(null);
  };

  useEffect(() => {
    const token = user?.token;
    setUser(JSON.parse(localStorage.getItem("profile")));
  }, [location]);

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="d-flex container-fluid">
        <NavLink className="navbar-brand" to="/">
          PM System
        </NavLink>
        <div className="d-flex">
          <div className="mx-3 d-flex">
            {user ? (
              <div className="d-flex align-items-center text-white">
                <img
                  className="rounded-circle mx-3"
                  style={{ height: "35px" }}
                  alt={user.result.name.charAt(0)}
                  src={user.result.imageUrl}
                />

                <h6>{user.result.name}</h6>
                <button className="btn btn-secondary ms-3" onClick={logout}>
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

        <div className="collapse navbar-collapse" id="navbarScroll">
          <ul
            className="navbar-nav ms-auto my-2 my-lg-0 navbar-nav-scroll"
            // style={{ "--bs-scroll-height": "100px;" }}
          >
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
                to="/create/user"
              >
                Add new User
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
          {/* <form class="d-flex">
            <input
              class="form-control mx-2"
              type="search"
              placeholder="Search"
              aria-label="Search"
            />
            <button class="btn btn-outline-success" type="submit">
              Search
            </button>
          </form> */}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
