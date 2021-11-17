import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getSubTasks } from "../../../../../../actions/subtasks.js";
import Subtask from "./SubTask/Subtask.js";

import Form from "../SubTaskForm/Form";

const SubTasks = ({ taskId, taskSubtasks, taskAssigned }) => {
  const user = JSON.parse(localStorage.getItem("profile"));
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getSubTasks());
  }, [dispatch]);

  const viewersFilteredlist = taskSubtasks.filter((task) =>
    task.allowedUsers.includes(user.result.name)
  );

  return (
    <div>
      <div>
        <div className="d-flex">
          <button
            type="button"
            className="btn btn-primary shadow mb-3"
            data-bs-toggle="modal"
            data-bs-target="#exampleModal"
          >
            Create a SubTask
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
                <Form taskId={taskId} taskAssigned={taskAssigned} />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="d-flex flex-column">
        <div className="mt-3">
          <div className="align-self-stretch">
            {viewersFilteredlist.map((subtask) => (
              <div className="d-flex mb-3" key={subtask._id}>
                <Subtask subtask={subtask} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SubTasks;
