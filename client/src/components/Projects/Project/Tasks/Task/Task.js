import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useHistory } from "react-router-dom";
import FileBase from "react-file-base64";

// import SubTasks from "./SubTasks/SubTasks.js";
import { getTasks, deleteTask, updateTask } from "../../../../../actions/tasks";

const Task = () => {
  const [taskData, setTaskData] = useState({
    creator: "",
    title: "",
    description: "",
    active: "yes",
    selectedFile: "",
  });
  const dispatch = useDispatch();

  const history = useHistory();
  const tasks = useSelector((state) => state.tasks);

  useEffect(() => {
    (async () => {
      await dispatch(getTasks()).then(tasks);
    })();
  }, [dispatch]);

  let { taskId } = useParams();
  let { projectId } = useParams();

  const task = tasks.find((x) => x._id === taskId);

  const handleSubmit = () => {
    dispatch(updateTask(taskId, taskData));
    document.getElementById("taskForm").disabled = true;
    document.getElementById("saveButton").classList.add("invisible");
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
                  placeholder={task.creator}
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
                  placeholder={task.title}
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
                  placeholder={task.description}
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
            <div>
              <button
                className="btn btn-secondary"
                onClick={() => {
                  document.getElementById("taskForm").disabled = false;
                  document
                    .getElementById("saveButton")
                    .classList.remove("invisible");
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
                className="btn btn-primary ms-3 invisible"
              >
                Save
              </button>
            </div>
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
      )}
      {/* <SubTasks taskId={id} /> */}
    </div>
  );
};

export default Task;
