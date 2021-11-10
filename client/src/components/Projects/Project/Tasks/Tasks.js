import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getTasks } from "../../../../actions/tasks.js";
import TaskPreview from "./TaskPreview/TaskPreview.js";

import Form from "../TaskForm/Form";

const Tasks = ({ projectId, projectTasks }) => {
  const user = JSON.parse(localStorage.getItem("profile"));
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getTasks());
  }, [dispatch]);

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
      <div className="d-flex justify-content-between flex-wrap">
        <div className="mt-3 col-12 col-md-6">
          <h5>Active Tasks</h5>
          <div className="align-self-stretch">
            {projectTasks
              .filter((task) => task.allowedUsers.includes(user.result.name))
              .filter((task) => task.status !== "Done")
              .map((task) => (
                <div className="d-flex mb-3" key={task._id}>
                  <TaskPreview task={task} projectId={projectId} />
                </div>
              ))}
          </div>
        </div>
        <div className="mt-3 col-12 col-md-4 col-lg-3">
          <h5>Closed Tasks</h5>
          <div className="">
            {projectTasks
              .filter((task) => task.allowedUsers.includes(user.result.name))
              .filter((task) => task.status === "Done")
              .map((task) => (
                <div className="d-flex mb-3" key={task._id}>
                  <TaskPreview task={task} projectId={projectId} />
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Tasks;
