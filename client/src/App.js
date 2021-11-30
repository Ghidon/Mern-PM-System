import React from "react";
import { useDispatch } from "react-redux";
import { BrowserRouter, Switch, Route } from "react-router-dom";

import Navbar from "./components/Navbar/Navbar";
import Home from "./components/Home/Home";
import Auth from "./components/Auth/Auth";

import Project from "./components/Projects/Project/Project";
import Users from "./components//Users/Users";
import Projects from "./components/Projects/Projects";
import Task from "./components/Projects/Project/Tasks/Task/Task";

import { getUsers } from "./actions/users";

const App = () => {
  const dispatch = useDispatch();
  dispatch(getUsers());

  return (
    <BrowserRouter>
      <Navbar />
      <div className="container mt-3">
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/auth" component={Auth} />
        </Switch>
        <Route exact path="/manage/users">
          <Users />
        </Route>
        <Route exact path="/read/projects">
          <Projects />
        </Route>
        <Route
          exact
          path="/view/project/:projectId"
          render={(props) => <Project {...props} />}
        ></Route>
        <Route
          exact
          path="/view/project/:projectId/task/:taskId"
          render={(props) => <Task {...props} />}
        ></Route>
      </div>
    </BrowserRouter>
  );
};

export default App;
