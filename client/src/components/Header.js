import React from "react";
import { NavLink } from "react-router-dom";

const Header = () => {
  return (
    <div className="col-12 col-sm-4 col-md-3 col-xl-2">
      <div
        className="nav flex-column nav-pills"
        id="v-pills-tab"
        role="tablist"
        aria-orientation="vertical"
      >
        <NavLink
          className="nav-link"
          id="v-pills-home-tab"
          data-toggle="pill"
          to="/create/user"
          role="tab"
          aria-controls="v-pills-home"
          aria-selected="false"
        >
          Add new User
        </NavLink>

        <NavLink
          className="nav-link"
          id="v-pills-messages-tab"
          data-toggle="pill"
          to="/read/projects"
          role="tab"
          aria-controls="v-pills-messages"
          aria-selected="false"
        >
          Active Projects
        </NavLink>
        <NavLink
          className="nav-link"
          id="v-pills-settings-tab"
          data-toggle="pill"
          to="/read/archived"
          role="tab"
          aria-controls="v-pills-settings"
          aria-selected="false"
        >
          Archived Projects
        </NavLink>
      </div>
    </div>
  );
};

export default Header;
