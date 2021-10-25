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
    <div className="d-flex flex-column">
      <div className="d-flex">
        <button
          type="button"
          className="btn btn-primary"
          data-bs-toggle="modal"
          data-bs-target="#exampleModal"
        >
          Create a new Task
        </button>
      </div>
      <div
        className="modal fade"
        id="exampleModal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-body">
              <Form projectId={projectId} />
            </div>
          </div>
        </div>
      </div>

      <div className="mt-3">
        <h5>Active Tasks</h5>
        <table className="table table-light border-dark table-bordered">
          <thead>
            <tr>
              <th scope="col">Title</th>
              <th scope="col">Description</th>
              <th scope="col">Creator</th>
              <th scope="col">Created</th>
              <th scope="col"></th>
            </tr>
          </thead>
          <tbody>
            {ProjectTasks.filter((task) => task.status !== "Done").map(
              (task) => (
                <tr key={task._id}>
                  <TaskPreview task={task} projectId={projectId} />
                </tr>
              )
            )}
          </tbody>
        </table>
      </div>
      <div className="mt-3">
        <h5>Closed Tasks</h5>
        <table className="table table-light border-dark table-bordered">
          <thead>
            <tr>
              <th scope="col">Title</th>
              <th scope="col">Description</th>
              <th scope="col">Creator</th>
              <th scope="col">Created</th>
              <th scope="col"></th>
            </tr>
          </thead>
          <tbody>
            {ProjectTasks.filter((task) => task.status === "Done").map(
              (task) => (
                <tr key={task._id}>
                  <TaskPreview task={task} projectId={projectId} />
                </tr>
              )
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Tasks;
