import React from "react";

// We import bootstrap to make our application look better.
import "bootstrap/dist/css/bootstrap.css";

// We import NavLink to utilize the react router.
import { NavLink } from "react-router-dom";

// Here, we display our Navbar
const Header = () => {
  return (
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
      <div class="d-flex container-fluid">
        <NavLink className="navbar-brand" to="/">
          PM System
        </NavLink>

        <button
          class="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarScroll"
          aria-controls="navbarScroll"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarScroll">
          <ul
            class="navbar-nav ms-auto my-2 my-lg-0 navbar-nav-scroll"
            // style={{ "--bs-scroll-height": "100px;" }}
          >
            <li class="nav-item">
              <NavLink
                className="nav-link"
                aria-current="page"
                to="/read/projects"
              >
                Active Projects
              </NavLink>
            </li>
            <li class="nav-item">
              <NavLink
                className="nav-link"
                aria-current="page"
                to="/create/user"
              >
                Add new User
              </NavLink>
            </li>
            <li class="nav-item">
              <NavLink
                className="nav-link"
                aria-current="page"
                to="/read/archived"
              >
                Archived Projects
              </NavLink>
            </li>
          </ul>
          <form class="d-flex">
            <input
              class="form-control mx-2"
              type="search"
              placeholder="Search"
              aria-label="Search"
            />
            {/* <button class="btn btn-outline-success" type="submit">
              Search
            </button> */}
          </form>
        </div>
      </div>
    </nav>
  );
};

export default Header;
