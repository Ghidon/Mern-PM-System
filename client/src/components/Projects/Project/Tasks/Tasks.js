import React, { useState } from "react";

import TaskPreview from "./TaskPreview/TaskPreview.js";

import Form from "../TaskForm/Form";

const Tasks = ({ projectId, projectTasks }) => {
  const user = JSON.parse(localStorage.getItem("profile"));

  const [statusFilter, setStatusFilter] = useState("All");
  const [priorityFilter, setPriorityFilter] = useState("All");
  const [assignedFilter, setAssignedFilter] = useState("All");

  const filterAssigned = (value) => {
    value === "All"
      ? setAssignedFilter("All")
      : value === "true"
      ? setAssignedFilter(true)
      : setAssignedFilter(false);
  };

  const filterStatus = (value) => {
    setStatusFilter(value);
  };

  const filterPriority = (value) => {
    setPriorityFilter(value);
  };

  const viewersFilteredlist = projectTasks.filter((task) =>
    task.allowedUsers.includes(user.result.name)
  );
  const statusFilteredList =
    statusFilter === "All"
      ? viewersFilteredlist
      : viewersFilteredlist.filter((task) => task.status === statusFilter);
  const priorityFilteredList =
    priorityFilter === "All"
      ? statusFilteredList
      : statusFilteredList.filter((task) => task.priority === priorityFilter);
  const assignedFilteredList =
    assignedFilter === "All"
      ? priorityFilteredList
      : priorityFilteredList.filter((task) =>
          assignedFilter
            ? task.assigned !== "Unassigned"
            : task.assigned === "Unassigned"
        );

  return (
    <div>
      <div className="d-flex flex-row flex-wrap justify-content-between">
        <div>
          <div className="d-flex">
            <button
              type="button"
              className="btn btn-primary shadow mb-3"
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
        </div>
        <div className="d-flex flex-wrap">
          <div>
            <div className="input-group shadow">
              <label className="input-group-text" htmlFor="inputGroupSelect01">
                status
              </label>
              <select
                className="form-select"
                id="inputGroupSelect01"
                onChange={(e) => filterStatus(e.target.value)}
              >
                <option value="All" defaultValue>
                  All
                </option>
                <option value="To do">To do</option>
                <option value="In progress">In progress</option>
                <option value="Blocked">Blocked</option>
                <option value="Done">Done</option>
              </select>
            </div>
          </div>
          <div>
            <div className="input-group shadow">
              <label className="input-group-text" htmlFor="inputGroupSelect01">
                Priority
              </label>
              <select
                className="form-select"
                id="inputGroupSelect01"
                onChange={(e) => filterPriority(e.target.value)}
              >
                <option value="All" defaultValue>
                  All
                </option>
                <option value="Low">Low</option>
                <option value="Medium">Medium</option>
                <option value="High">High</option>
              </select>
            </div>
          </div>
          <div>
            <div className="input-group shadow">
              <label className="input-group-text" htmlFor="inputGroupSelect01">
                Is
              </label>
              <select
                className="form-select"
                id="inputGroupSelect01"
                onChange={(e) => filterAssigned(e.target.value)}
              >
                <option value="All" defaultValue>
                  All
                </option>
                <option value={false}>Unassigned</option>
                <option value={true}>Assigned</option>
              </select>
            </div>
          </div>
        </div>
      </div>
      <div className="d-flex flex-column">
        <div className="d-flex justify-content-between flex-wrap">
          <div className="mt-3 col-12 col-md-6">
            <h5>Active Tasks</h5>
            <div className="align-self-stretch">
              {assignedFilteredList.map((task) => (
                <div className="d-flex mb-3" key={task._id}>
                  <TaskPreview task={task} projectId={projectId} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Tasks;
