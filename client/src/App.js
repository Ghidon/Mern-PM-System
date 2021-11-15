import React from "react";
import { useDispatch } from "react-redux";
import { BrowserRouter, Switch, Route } from "react-router-dom";

import Navbar from "./components/Navbar/Navbar";
import Home from "./components/Home/Home";
import Auth from "./components/Auth/Auth";

import Project from "./components/Projects/Project/Project";
import NewUser from "./components/NewUser";
import Projects from "./components/Projects/Projects";
import Task from "./components/Projects/Project/Tasks/Task/Task";

import { getTasks } from "./actions/tasks";
import { getProjects } from "./actions/projects";
import { getUsers } from "./actions/users";

const App = () => {
  const dispatch = useDispatch();
  dispatch(getProjects());
  dispatch(getTasks());
  dispatch(getUsers());

  return (
    <BrowserRouter>
      <Navbar />
      <div className="container mt-3">
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/auth" component={Auth} />
        </Switch>
        <Route exact path="/create/user">
          <NewUser />
        </Route>
        <Route exact path="/read/projects">
          <Projects />
        </Route>
        <Route exact path="/view/project/:projectId">
          <Project />
        </Route>
        <Route exact path="/view/project/:projectId/task/:taskId">
          <Task />
        </Route>
      </div>
    </BrowserRouter>
  );
};

export default App;
