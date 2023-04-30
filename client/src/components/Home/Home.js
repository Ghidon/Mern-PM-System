import React, { useState, useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProjects } from "../../actions/projects";
import { getSubTasks } from "../../actions/subtasks";
import { getTasks } from "../../actions/tasks";
import Dashboard from "./Dashboard/Dashboard";

const Home = () => {
  const { profile } = useSelector((state) => state.auth);
  const { projects } = useSelector((state) => state);
  const dispatch = useDispatch();

  const getProjectsMemoized = useCallback(
    () => dispatch(getProjects()),
    [dispatch]
  );
  const getTasksMemoized = useCallback(() => dispatch(getTasks()), [dispatch]);
  const getSubTasksMemoized = useCallback(
    () => dispatch(getSubTasks()),
    [dispatch]
  );

  useEffect(() => {
    getProjectsMemoized();
    getTasksMemoized();
    getSubTasksMemoized();
  }, [getProjectsMemoized, getTasksMemoized, getSubTasksMemoized]);

  return (
    <div>
      {profile && profile.result ? (
        <div>
          <h1>Dashboard</h1>
          <p>You can see here how your projects are progressing.</p>
          {projects.map((project) => (
            <Dashboard key={project._id} project={project} />
          ))}
        </div>
      ) : (
        <div>
          <h1>Mock Up Dashboard page</h1>
        </div>
      )}
    </div>
  );
};

export default Home;
