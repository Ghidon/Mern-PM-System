import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar/Navbar";
import Home from "./components/Home/Home";
import Auth from "./components/Auth/Auth";
import Project from "./components/Projects/Project/Project";
import Users from "./components/Users/Users";
import Projects from "./components/Projects/Projects";
import Task from "./components/Projects/Project/Tasks/Task/Task";

import { getUsers } from "./actions/users";

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUsers());
  }, [dispatch]);

  return (
    <Router>
      <React.Fragment>
        <Navbar />
        <div className="container mt-3">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/auth" element={<Auth />} />
            <Route path="/manage/users" element={<Users />} />
            <Route path="/read/projects" element={<Projects />} />
            <Route path="/view/project/:projectId" element={<Project />} />
            <Route
              path="/view/project/:projectId/task/:taskId"
              element={<Task />}
            />
          </Routes>
        </div>
      </React.Fragment>
    </Router>
  );
};

export default App;
