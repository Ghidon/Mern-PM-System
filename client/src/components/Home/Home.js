import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProjects } from "../../actions/projects";
import { getSubTasks } from "../../actions/subtasks";
import { getTasks } from "../../actions/tasks";

import Dashboard from "./Dashboard/Dashboard";

const Home = () => {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("profile")));
  const projects = useSelector((state) => state.projects);

  const dispatch = useDispatch();

  useEffect(() => {
    setUser(JSON.parse(localStorage.getItem("profile")));
    dispatch(getProjects());
    dispatch(getTasks());
    dispatch(getSubTasks());
  }, [dispatch]);

  const projectTitles = projects.map((project) => project.title);

  return (
    <div>
      {user?.result ? (
        <div>
          <h1>Dashboard</h1>
          <p>You can see here how your projects are progressing.</p>
          {projects &&
            projects.map((project) => (
              <Dashboard key={project._id} project={project} />
            ))}
        </div>
      ) : (
        <div>
          <h1>Some Mock Up Dashboard page</h1>
        </div>
      )}
    </div>
  );
};

export default Home;
