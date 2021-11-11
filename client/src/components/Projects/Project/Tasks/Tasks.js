import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { getTasks } from "../../../../actions/tasks.js";
import TaskPreview from "./TaskPreview/TaskPreview.js";

import Form from "../TaskForm/Form";

const Tasks = ({ projectId, projectTasks }) => {
  const user = JSON.parse(localStorage.getItem("profile"));
  const dispatch = useDispatch();

  const [statusFilter, setStatusFilter] = useState("To do");
  const [priorityFilter, setPriorityFilter] = useState("Low");
  const [assignedFilter, setAssignedFilter] = useState(false);
  const [filtersOn, setFiltersOn] = useState(true);

  useEffect(() => {
    dispatch(getTasks());
  }, [dispatch]);

  const switchAssignedFilter = (value) => {
    console.log(value);
    value === "true" ? setAssignedFilter(true) : setAssignedFilter(false);
  };

  const switchFilters = () => {
    setFiltersOn(!filtersOn);
  };

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
        <div className="d-flex flex-wrap filters">
          <div className="form-check form-switch">
            <input
              className="form-check-input"
              type="checkbox"
              role="switch"
              id="flexSwitchCheckDefault"
              onChange={switchFilters}
              defaultChecked
            />
            <label
              className="form-check-label"
              htmlFor="flexSwitchCheckDefault"
            >
              Enable filters
            </label>
          </div>
          <div>
            <div className="input-group shadow">
              <label className="input-group-text" htmlFor="inputGroupSelect01">
                status
              </label>
              <select
                className="form-select"
                id="inputGroupSelect01"
                onChange={(e) => setStatusFilter(e.target.value)}
              >
                <option value="To do" defaultValue>
                  To do
                </option>
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
                onChange={(e) => setPriorityFilter(e.target.value)}
              >
                <option value="Low" defaultValue>
                  Low
                </option>
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
                onChange={(e) => switchAssignedFilter(e.target.value)}
              >
                <option value={false} defaultValue>
                  Unassigned
                </option>
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
              {filtersOn
                ? projectTasks
                    .filter((task) =>
                      task.allowedUsers.includes(user.result.name)
                    )
                    .filter((task) => task.status === statusFilter)
                    .filter((task) => task.priority === priorityFilter)
                    .filter((task) =>
                      assignedFilter
                        ? task.assigned !== "Unassigned"
                        : task.assigned === "Unassigned"
                    )
                    .map((task) => (
                      <div className="d-flex mb-3" key={task._id}>
                        <TaskPreview task={task} projectId={projectId} />
                      </div>
                    ))
                : projectTasks
                    .filter((task) =>
                      task.allowedUsers.includes(user.result.name)
                    )
                    .map((task) => (
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
