import React, { useState } from "react";
import { NavLink } from "react-router-dom";

// We use Route in order to define the different routes of our application
import { BrowserRouter, Switch, Route } from "react-router-dom";

// We import all the components we need in our app
import Navbar from "./components/Navbar";
import Project from "./components/Projects/Project/Project";
import NewUser from "./components/NewUser";
import Projects from "./components/Projects/Projects";
import ViewArchived from "./components/ViewArchived";
import Home from "./components/Home";
import Login from "./components/users/Login";
import Register from "./components/users/Register";

const App = () => {
  const [projectId, setProjectId] = useState(null);
  return (
    <BrowserRouter>
      <div className="">
        <Navbar />

        <div className="container-fluid">
          <div className="row col-12">
            <div className="col-auto">
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
            <div className="col-auto">
              <div className="container-fluid">
                <Route exact path="/">
                  <Login />
                </Route>
                <Route exact path="/register">
                  <Register />
                </Route>
                <Route exact path="/home">
                  <Home />
                </Route>
                <Route exact path="/create/user">
                  <NewUser />
                </Route>
                <Route exact path="/view/project/:id">
                  <Project />
                </Route>
                <Route exact path="/read/projects">
                  <Projects setProjectId={setProjectId} />
                </Route>
                <Route exact path="/read/archived">
                  <ViewArchived />
                </Route>
              </div>
            </div>
          </div>
        </div>
      </div>
    </BrowserRouter>
  );
};

export default App;
