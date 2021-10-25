import React from "react";
import { useDispatch } from "react-redux";
import "bootstrap/dist/css/bootstrap.min.css";

// We use Route in order to define the different routes of our application
import { BrowserRouter, Switch, Route } from "react-router-dom";

// We import all the components we need in our app
import Header from "./components/Header";
import Project from "./components/Projects/Project/Project";
import NewUser from "./components/NewUser";
import Projects from "./components/Projects/Projects";
import ViewArchived from "./components/ViewArchived";
import Home from "./components/Home";
import Login from "./components/users/Login";
import Register from "./components/users/Register";
import Task from "./components/Projects/Project/Tasks/Task/Task";

import { getTasks } from "./actions/tasks";
import { getProjects } from "./actions/projects";

const App = () => {
  const dispatch = useDispatch();
  dispatch(getProjects());
  dispatch(getTasks());

  return (
    <BrowserRouter>
      <div className="">
        <Header />
        <div className="container-fluid">
          <div className="row mt-3">
            <div className="col-12 col-sm-7 col-md-6 col-lg-9">
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
              <Route exact path="/view/project/:projectId">
                <Project />
              </Route>
              <Route exact path="/view/project/:projectId/task/:taskId">
                <Task />
              </Route>
              <Route exact path="/read/projects">
                <Projects />
              </Route>
              <Route exact path="/read/archived">
                <ViewArchived />
              </Route>
            </div>
          </div>
        </div>
      </div>
    </BrowserRouter>
  );
};

export default App;
