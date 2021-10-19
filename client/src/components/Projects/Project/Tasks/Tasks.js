import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getTasks } from "../../../../actions/tasks.js";
import TaskPreview from "./TaskPreview/TaskPreview.js";

import Form from "../TaskForm/Form";

const Tasks = ({ projectId }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    (async () => {
      await dispatch(getTasks());
    })();
  }, [dispatch]);
  const tasks = useSelector((state) => state.tasks);

  const ProjectTasks = tasks.filter((task) => task.projectId === projectId);

  return (
    <div className="d-flex flex-wrap d-flex justify-content-between">
      <div>
        <Form projectId={projectId} />
      </div>
      <div className="col-auto">
        <table className="table">
          <thead>
            <tr>
              <th scope="col">Title</th>
              <th scope="col">Description</th>
              <th scope="col">Creator</th>
              <th scope="col">Created</th>
            </tr>
          </thead>
          {!tasks.length ? (
            <div className="col-9">
              <div className="spinner-border text-primary" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
            </div>
          ) : (
            <tbody>
              {ProjectTasks.map((task) => (
                <tr key={task._id}>
                  <TaskPreview task={task} />
                </tr>
              ))}
            </tbody>
          )}
        </table>
      </div>
    </div>
  );
};

export default Tasks;
