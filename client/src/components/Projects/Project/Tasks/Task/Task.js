import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useHistory, useLocation } from "react-router-dom";
import FileBase from "react-file-base64";
import DayPickerInput from "react-day-picker/DayPickerInput";
import moment from "moment";
import "react-day-picker/lib/style.css";

import { formatDate, parseDate } from "react-day-picker/moment";

import SubTasks from "./SubTasks/SubTasks.js";
import { deleteTask, updateTask } from "../../../../../actions/tasks";
import { getSubTasks } from "../../../../../actions/subtasks.js";
import { updateProject } from "../../../../../actions/projects.js";

const Task = () => {
  let { taskId } = useParams();
  let { projectId } = useParams();
  const dispatch = useDispatch();
  const location = useLocation();
  const history = useHistory();
  const subtasks = useSelector((state) => state.subtasks);
  const users = useSelector((state) => state.users);

  const user = JSON.parse(localStorage.getItem("profile"));
  const taskSubtasks = subtasks.filter((subtask) => subtask.taskId === taskId);
  const viewersFilteredlist = taskSubtasks.filter((task) =>
    task.allowedUsers.includes(user.result.name)
  );

  localStorage.setItem("taskSubtasks", JSON.stringify(viewersFilteredlist));

  const [projectData, setProjectData] = useState({});

  const [taskData, setTaskData] = useState({
    creator: "",
    name: "",
    title: "",
    description: "",
    active: true,
    status: "",
    assigned: "Unassigned",
    attachedFiles: [],
    dueDate: null,
    allowedUsers: [],
    priority: "Low",
  });

  const [isEmpty, setIsEmpty] = useState(true);
  const [isDisabled, setIsDisabled] = useState(false);
  const [searchUser, setSearchUser] = useState(null);

  useEffect(() => {
    const task = location.state.task;
    const project = location.state.project;
    dispatch(getSubTasks());
    setTaskData(task);
    setProjectData(project);
  }, [location, dispatch]);

  const handleSubmit = () => {
    dispatch(updateTask(taskId, { ...taskData, name: user?.result?.name }));
    document.getElementById("taskForm").disabled = true;
    document.getElementById("saveButton").classList.add("disabled");
    history.replace({ state: { task: taskData, project: projectData } });
  };

  const handleDelete = () => {
    if (viewersFilteredlist.length) {
      alert("Cannot delete a Task with active subtasks");
    } else {
      dispatch(deleteTask(taskId));
      history.push({
        pathname: `/view/project/${projectId}`,
        state: { project: location.state.project },
      });
    }
  };

  const setNewStatus = (e) => {
    setTaskData({ ...taskData, status: e.target.value });
    dispatch(updateTask(taskId, { ...taskData, status: e.target.value }));
  };

  const setNewAssigned = (value) => {
    if (!taskData.allowedUsers.includes(value) && value !== "Unassigned") {
      taskData.allowedUsers.push(value);
    }

    setTaskData({ ...taskData, assigned: value });
    dispatch(updateTask(taskId, { ...taskData, assigned: value }));
  };

  const setNewPriority = (value) => {
    setTaskData({ ...taskData, priority: value });
    dispatch(updateTask(taskId, { ...taskData, priority: value }));
  };

  const addFile = (file) => {
    //weird but it works... shouldn't work only with setTaskData??
    taskData.attachedFiles.push(file);
  };

  const removeFile = (file) => {
    const newAttachmentList = taskData.attachedFiles.filter(
      (attachment) => attachment.name !== file.name
    );
    setTaskData({ ...taskData, attachedFiles: newAttachmentList });
    dispatch(
      updateTask(taskId, { ...taskData, attachedFiles: newAttachmentList })
    );
  };

  const handleDayChange = (dueDate, modifiers, dayPickerInput) => {
    const input = dayPickerInput.getInput();
    setTaskData({ ...taskData, dueDate: dueDate });
    dispatch(updateTask(taskId, { ...taskData, dueDate: dueDate }));
    setIsEmpty(!input.value.trim());
    setIsDisabled(modifiers.disabled === true);
  };

  const setSearchParameter = (e) => {
    const toLowerCase = e.target.value.toLowerCase();
    setSearchUser(toLowerCase);
  };

  const addAllowedUser = (email) => {
    const newList = taskData.allowedUsers;
    newList.push(email);
    setTaskData({ ...taskData, allowedUsers: newList });
    dispatch(updateTask(taskId, { ...taskData, allowedUsers: newList }));
    dispatch(updateProject(projectId, { ...projectData, users: email }));
  };

  const removeAlloweduser = (email) => {
    const list = taskData.allowedUsers;
    console.log(list.length);
    if (list.length === 1) {
      alert(
        "Cannot remove last user, there must always be at least one user invited"
      );
    } else {
      const newList = list.filter((agent) => agent !== email);
      if (taskData.assigned === email) {
        setTaskData({
          ...taskData,
          assigned: "Unassigned",
          allowedUsers: newList,
        });
        dispatch(
          updateTask(taskId, {
            ...taskData,
            allowedUsers: newList,
            assigned: "Unassigned",
          })
        );
      } else {
        setTaskData({ ...taskData, allowedUsers: newList });
        dispatch(updateTask(taskId, { ...taskData, allowedUsers: newList }));
      }
    }
  };

  return (
    <div>
      <div className="d-flex justify-content-between flex-wrap">
        <div className="col-12 col-md-6">
          <form autoComplete="off" noValidate onSubmit={handleSubmit}>
            <fieldset disabled>
              <label htmlFor="inputCreator" className="form-label-sm">
                Task Creator
              </label>
              <input
                type="text"
                className="form-control form-control shadow"
                name="taskCreator"
                value={taskData.name}
                onChange={(e) =>
                  setTaskData({ ...taskData, creator: e.target.value })
                }
              />
            </fieldset>
            <fieldset disabled id="taskForm">
              <div>
                <label htmlFor="inputTitle" className="form-label-sm">
                  Title
                </label>
                <input
                  type="text"
                  className="form-control form-control shadow"
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
                  className="form-control form-control shadow"
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
            </fieldset>
            <fieldset>
              <label htmlFor="formFileSm" className="form-label-sm">
                Attach a file
              </label>
              <div className="form-control form-control-sm shadow">
                <FileBase type="file" multiple={false} onDone={addFile} />
              </div>
            </fieldset>
            <div className="mb-3">
              <label htmlFor="formFileSm" className="form-label-sm">
                Due date
              </label>
              {taskData.name === user?.result?.name ? (
                <div className="d-flex flex-wrap justify-content-between">
                  <div className="shadow">
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
                  </div>
                  <span className="mx-2">
                    {!isEmpty && !taskData.dueDate && "This is not a valid day"}
                    {taskData.dueDate &&
                      isDisabled &&
                      "This day can't be selected"}
                  </span>
                  {taskData.dueDate && (
                    <span>Expires {moment(taskData.dueDate).fromNow()}</span>
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
          <div className="d-flex flex-wrap justify-content-between">
            <div className="d-flex mb-3">
              <button
                className="btn btn-secondary shadow"
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
                className="btn btn-primary disabled shadow mx-3"
              >
                Save
              </button>
              <div>
                <div className="input-group shadow">
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
                    {taskData.status !== "To do" && (
                      <option value="To do">To do</option>
                    )}
                    {taskData.status !== "In progress" && (
                      <option value="In progress">In progress</option>
                    )}
                    {taskData.status !== "Blocked" && (
                      <option value="Blocked">Blocked</option>
                    )}
                    {/* If every subtask is done and the Task Status is not already "Done", show the option "Done" */}
                    {viewersFilteredlist.every(
                      (subtask) => subtask.status === "Done"
                    ) &&
                      taskData.status !== "Done" && (
                        <option value="Done">Done</option>
                      )}
                  </select>
                </div>
              </div>
            </div>
            <div className="ms-auto">
              <button
                className="btn btn-danger shadow"
                onClick={() => {
                  handleDelete();
                }}
              >
                Delete Task
              </button>

              <button
                className="btn btn-secondary shadow ms-3"
                onClick={() => {
                  history.push({
                    pathname: `/view/project/${projectId}`,
                    state: { project: location.state.project },
                  });
                }}
              >
                Back
              </button>
            </div>
          </div>
        </div>
        <div className="d-flex flex-column col-12 col-md-5 mt-4">
          <div className="input-group mb-3 shadow">
            <div className="input-group-prepend">
              <label className="input-group-text" htmlFor="inputGroupSelect01">
                Assign Task to:
              </label>
            </div>
            <select
              className="form-select"
              id="inputGroupSelect01"
              onChange={(e) => setNewAssigned(e.target.value)}
            >
              <option defaultValue>
                {taskData.assigned ? taskData.assigned : "Unassigned"}
              </option>
              {taskData.assigned !== "Unassigned" && (
                <option>Unassigned</option>
              )}
              {users
                .filter((agent) => agent.email !== taskData.assigned)
                .map((agent) => (
                  <option key={agent._id}>{agent.email}</option>
                ))}
            </select>
          </div>
          <div className="input-group mb-3 shadow">
            <div className="input-group-prepend">
              <label className="input-group-text" htmlFor="inputGroupSelect01">
                Priority:
              </label>
            </div>
            <select
              className="form-select"
              id="inputGroupSelect02"
              onChange={(e) => setNewPriority(e.target.value)}
            >
              <option defaultValue>{taskData.priority}</option>
              {taskData.priority !== "Low" && <option>Low</option>}
              {taskData.priority !== "Medium" && <option>Medium</option>}
              {taskData.priority !== "High" && <option>High</option>}
            </select>
          </div>
          {taskData.attachedFiles.length ? (
            <div className="col-12 mb-3">
              <span>Attached files</span>
              {taskData.attachedFiles.map((file) => (
                <div
                  className="card d-flex flex-row p-1 mb-1 shadow"
                  key={file.base64}
                >
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
                    <a href={file.base64} onClick={() => removeFile(file)}>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="18"
                        height="18"
                        fill="currentColor"
                        className="bi bi-file-earmark-excel text-danger"
                        viewBox="0 0 16 16"
                      >
                        <path d="M5.884 6.68a.5.5 0 1 0-.768.64L7.349 10l-2.233 2.68a.5.5 0 0 0 .768.64L8 10.781l2.116 2.54a.5.5 0 0 0 .768-.641L8.651 10l2.233-2.68a.5.5 0 0 0-.768-.64L8 9.219l-2.116-2.54z" />
                        <path d="M14 14V4.5L9.5 0H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2zM9.5 3A1.5 1.5 0 0 0 11 4.5h2V14a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h5.5v2z" />
                      </svg>
                    </a>
                  </span>
                </div>
              ))}
            </div>
          ) : (
            <div className="col-12 mb-3">
              <span>Attached files</span>
              <div className="card d-flex flex-row p-1 mb-1 shadow">
                <span>No files attached</span>
              </div>
            </div>
          )}
          <div className="d-flex flex-row flex-wrap justify-content-between">
            <div className="col-12 col-lg-6">
              <label htmlFor="formFileSm" className="form-label-sm">
                Invited Users
              </label>
              {taskData.allowedUsers.length &&
                taskData.allowedUsers.map((agent) => (
                  <div
                    key={agent}
                    className="card d-flex flex-row p-2 mb-1 justify-content-between align-items-center shadow"
                  >
                    <span>{agent}</span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="18"
                      height="18"
                      fill="currentColor"
                      className="bi bi-person-x-fill text-danger"
                      viewBox="0 0 16 16"
                      onClick={() => {
                        removeAlloweduser(agent);
                      }}
                    >
                      <path
                        fillRule="evenodd"
                        d="M1 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H1zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm6.146-2.854a.5.5 0 0 1 .708 0L14 6.293l1.146-1.147a.5.5 0 0 1 .708.708L14.707 7l1.147 1.146a.5.5 0 0 1-.708.708L14 7.707l-1.146 1.147a.5.5 0 0 1-.708-.708L13.293 7l-1.147-1.146a.5.5 0 0 1 0-.708z"
                      />
                    </svg>
                  </div>
                ))}
            </div>
            <div className="col-12 col-lg-5">
              <label htmlFor="formFileSm" className="form-label-sm">
                Invite Users
              </label>
              <div className="input-group mb-1">
                <input
                  type="text"
                  className="form-control shadow"
                  placeholder="Add user"
                  aria-label="Add user"
                  aria-describedby="basic-addon1"
                  onChange={(e) => setSearchParameter(e)}
                />
              </div>
              <div className="mb-3">
                {searchUser !== "" &&
                  users
                    .filter(
                      (agent) => !taskData.allowedUsers.includes(agent.email)
                    )
                    .filter((agent) =>
                      agent.name.toLowerCase().includes(searchUser)
                    )
                    .map((agent) => (
                      <div
                        key={agent._id}
                        className="card d-flex flex-row p-2 mb-1 justify-content-between align-items-center shadow"
                      >
                        <span>{agent.name}</span>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="18"
                          height="18"
                          fill="currentColor"
                          className="bi bi-person-plus-fill text-success"
                          viewBox="0 0 16 16"
                          onClick={() => {
                            addAllowedUser(agent.email);
                          }}
                        >
                          <path d="M1 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H1zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6z" />
                          <path
                            fillRule="evenodd"
                            d="M13.5 5a.5.5 0 0 1 .5.5V7h1.5a.5.5 0 0 1 0 1H14v1.5a.5.5 0 0 1-1 0V8h-1.5a.5.5 0 0 1 0-1H13V5.5a.5.5 0 0 1 .5-.5z"
                          />
                        </svg>
                      </div>
                    ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      <SubTasks
        taskId={taskId}
        taskAssigned={taskData.assigned}
        projectId={taskData.projectId}
      />
    </div>
  );
};

export default Task;
