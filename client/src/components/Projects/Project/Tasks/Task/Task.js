import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useHistory } from "react-router-dom";
import FileBase from "react-file-base64";
import DayPickerInput from "react-day-picker/DayPickerInput";
import moment from "moment";
import "react-day-picker/lib/style.css";

import { formatDate, parseDate } from "react-day-picker/moment";

// import SubTasks from "./SubTasks/SubTasks.js";
import { deleteTask, updateTask } from "../../../../../actions/tasks";

const Task = () => {
  let { taskId } = useParams();
  let { projectId } = useParams();
  const dispatch = useDispatch();
  const history = useHistory();
  const tasks = useSelector((state) => state.tasks);
  const task = tasks.find((x) => x._id === taskId);
  const user = JSON.parse(localStorage.getItem("profile"));

  const [taskData, setTaskData] = useState({
    creator: "",
    name: "",
    title: "",
    description: "",
    active: true,
    status: "",
    attachedFiles: [],
    dueDate: null,
  });

  const [isEmpty, setIsEmpty] = useState(true);
  const [isDisabled, setIsDisabled] = useState(false);

  useEffect(() => {
    if (tasks.length) {
      setTaskData({
        creator: task.creator,
        name: task.name,
        title: task.title,
        description: task.description,
        active: task.active,
        status: task.status,
        attachedFiles: task.attachedFiles,
        dueDate: task.dueDate,
      });
    }
  }, [tasks.length]);

  const handleSubmit = () => {
    dispatch(updateTask(taskId, { ...taskData, name: user?.result?.name }));
    document.getElementById("taskForm").disabled = true;
    document.getElementById("saveButton").classList.add("disabled");
  };

  const setNewStatus = (e) => {
    setTaskData({ ...taskData, status: e.target.value });
    dispatch(updateTask(taskId, { ...taskData, status: e.target.value }));
  };

  const addFile = (file) => {
    //weird but it works... shouldn't work only with setTaskData??
    taskData.attachedFiles.push(file);
  };

  const handleDayChange = (dueDate, modifiers, dayPickerInput) => {
    const input = dayPickerInput.getInput();
    setTaskData({ ...taskData, dueDate: dueDate });
    dispatch(updateTask(taskId, { ...taskData, dueDate: dueDate }));
    setIsEmpty(!input.value.trim());
    setIsDisabled(modifiers.disabled === true);
  };

  return (
    <div>
      {!tasks.length ? (
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      ) : (
        <div className="d-flex justify-content-between flex-wrap">
          <div className="col-12 col-md-6">
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
                    value={taskData.name}
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
                    Attach a file
                  </label>
                  <div className="form-control form-control-sm">
                    <FileBase type="file" multiple={false} onDone={addFile} />
                  </div>
                </div>
              </fieldset>
              <div className="mb-3">
                <label htmlFor="formFileSm" className="form-label-sm">
                  Due date
                </label>
                {taskData.name === user?.result?.name ? (
                  <div className="d-flex justify-content-between">
                    <DayPickerInput
                      onDayChange={handleDayChange}
                      formatDate={formatDate}
                      parseDate={parseDate}
                      placeholder={
                        !taskData.dueDate
                          ? " Set a Due Date"
                          : `${formatDate(taskData.dueDate)}`
                      }
                      dayPickerProps={{
                        selectedDays: taskData.dueDate,
                        disabledDays: {
                          before: new Date(),
                        },
                      }}
                    />
                    <span className="mx-2">
                      {!isEmpty &&
                        !taskData.dueDate &&
                        "This is not a valid day"}
                      {taskData.dueDate &&
                        isDisabled &&
                        "This day can't be selected"}
                    </span>
                    {taskData.dueDate && (
                      <span>
                        Expires is {moment(taskData.dueDate).fromNow()}
                      </span>
                    )}
                  </div>
                ) : (
                  <span>
                    {taskData.dueDate
                      ? ` is ${formatDate(taskData.dueDate)}`
                      : " is not defined yet"}
                  </span>
                )}
              </div>
            </form>
          </div>
          <div className="col-12 col-md-5 mb-3">
            <span>Attached files</span>
            {taskData.attachedFiles.map((file) => (
              <div className="card d-flex flex-row p-1 mb-1" key={file.base64}>
                <span>{file.name}</span>
                <span className="ms-auto">
                  <a download={file.name} href={file.base64}>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="18"
                      height="18"
                      fill="currentColor"
                      className="bi bi-file-earmark-arrow-down"
                      viewBox="0 0 16 16"
                    >
                      <path d="M8.5 6.5a.5.5 0 0 0-1 0v3.793L6.354 9.146a.5.5 0 1 0-.708.708l2 2a.5.5 0 0 0 .708 0l2-2a.5.5 0 0 0-.708-.708L8.5 10.293V6.5z" />
                      <path d="M14 14V4.5L9.5 0H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2zM9.5 3A1.5 1.5 0 0 0 11 4.5h2V14a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h5.5v2z" />
                    </svg>
                  </a>
                </span>
              </div>
            ))}
          </div>

          <div className="mb-3 col-12 col-sm-12 col-md-6 col-lg-5 col-xl-5 col-xxl-4">
            <div className="d-flex ">
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
                  <option value="default" defaultValue>
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
          </div>
          <div className="ms-auto mb-3">
            <button
              className="btn btn-danger"
              onClick={() => {
                dispatch(deleteTask(taskId));
                history.push(`/view/project/${projectId}`);
              }}
            >
              Delete Task
            </button>
            <button
              className="btn btn-secondary ms-3"
              onClick={() => {
                history.push(`/view/project/${projectId}`);
              }}
            >
              Back
            </button>
          </div>
        </div>
      )}
      {/* <SubTasks taskId={id} /> */}
    </div>
  );
};

export default Task;
