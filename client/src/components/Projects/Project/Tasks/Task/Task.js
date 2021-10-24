import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useHistory } from "react-router-dom";
import FileBase from "react-file-base64";

// import SubTasks from "./SubTasks/SubTasks.js";
import { deleteTask, updateTask } from "../../../../../actions/tasks";

const Task = () => {
  let { taskId } = useParams();
  let { projectId } = useParams();
  const dispatch = useDispatch();
  const history = useHistory();
  const tasks = useSelector((state) => state.tasks);
  const task = tasks.find((x) => x._id === taskId);

  const [taskData, setTaskData] = useState({
    creator: "",
    title: "",
    description: "",
    active: true,
    status: "",
    selectedFile: "",
  });

  useEffect(() => {
    if (tasks.length) {
      setTaskData({
        creator: task.creator,
        title: task.title,
        description: task.description,
        active: task.active,
        status: task.status,
        selectedFile: task.selectedFile,
      });
    }
  }, [tasks.length]);

  const handleSubmit = () => {
    dispatch(updateTask(taskId, taskData));
    document.getElementById("taskForm").disabled = true;
    document.getElementById("saveButton").classList.add("disabled");
  };

  const setNewStatus = (e) => {
    setTaskData({ ...taskData, status: e.target.value });
    dispatch(updateTask(taskId, { ...taskData, status: e.target.value }));
  };

  return (
    <div>
      {!tasks.length ? (
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      ) : (
        <div className="d-flex-column">
          <form autoComplete="off" noValidate onSubmit={handleSubmit}>
            <fieldset disabled id="taskForm">
              <div>
                <label htmlFor="inputCreator" className="form-label-sm">
                  Task Creator
                </label>
                <input
                  type="text"
                  className="form-control form-control"
                  name="taskCreator"
                  value={taskData.creator}
                  onChange={(e) =>
                    setTaskData({ ...taskData, creator: e.target.value })
                  }
                />
              </div>
              <div>
                <label htmlFor="inputTitle" className="form-label-sm">
                  Title
                </label>
                <input
                  type="text"
                  className="form-control form-control"
                  name="taskTitle"
                  value={taskData.title}
                  onChange={(e) =>
                    setTaskData({ ...taskData, title: e.target.value })
                  }
                />
              </div>
              <div>
                <label htmlFor="inputDescription" className="form-label-sm">
                  Description
                </label>
                <textarea
                  type="text"
                  className="form-control form-control"
                  name="taskDescription"
                  value={taskData.description}
                  onChange={(e) =>
                    setTaskData({
                      ...taskData,
                      description: e.target.value,
                    })
                  }
                />
              </div>
              <div>
                <label htmlFor="formFileSm" className="form-label-sm">
                  Select Cover Image
                </label>
                <div className="form-control form-control-sm mb-3">
                  <FileBase
                    disabled
                    type="file"
                    multiple={false}
                    onDone={({ base64 }) =>
                      setTaskData({ ...taskData, selectedFile: base64 })
                    }
                  />
                </div>
              </div>
            </fieldset>
          </form>
          <div className="d-flex justify-content-between mb-3">
            <div className="d-flex justify-content-between mb-3">
              <button
                className="btn btn-secondary"
                onClick={() => {
                  document.getElementById("taskForm").disabled = false;
                  document
                    .getElementById("saveButton")
                    .classList.remove("disabled");
                }}
              >
                Edit
              </button>

              <button
                type="submit"
                id="saveButton"
                onClick={() => {
                  handleSubmit();
                }}
                className="btn btn-primary ms-3 disabled"
              >
                Save
              </button>
              <div className="input-group ms-3">
                <label
                  className="input-group-text"
                  htmlFor="inputGroupSelect01"
                >
                  status
                </label>
                <select
                  className="form-select"
                  id="inputGroupSelect01"
                  onChange={(e) => setNewStatus(e)}
                >
                  <option value="default" selected>
                    {taskData.status}
                  </option>
                  {taskData.status !== "To do" ? (
                    <option value="To do">To do</option>
                  ) : null}
                  {taskData.status !== "In progress" ? (
                    <option value="In progress">In progress</option>
                  ) : null}
                  {taskData.status !== "Blocked" ? (
                    <option value="Blocked">Blocked</option>
                  ) : null}
                  {taskData.status !== "Done" ? (
                    <option value="Done">Done</option>
                  ) : null}
                </select>
              </div>
            </div>
            <div>
              <button
                className="btn btn-danger"
                onClick={() => {
                  dispatch(deleteTask(taskId));
                  history.push(`/view/project/${projectId}`);
                }}
              >
                Delete Task
              </button>
            </div>
          </div>
        </div>
      )}
      {/* <SubTasks taskId={id} /> */}
    </div>
  );
};

export default Task;
