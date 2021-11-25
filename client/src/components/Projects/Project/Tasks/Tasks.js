import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { getTasks } from "../../../../actions/tasks.js";
import TaskPreview from "./TaskPreview/TaskPreview.js";

import Form from "../TaskForm/Form";

const Tasks = ({ project, projectTasks }) => {
  const user = JSON.parse(localStorage.getItem("profile"));
  const dispatch = useDispatch();

  const [statusFilter, setStatusFilter] = useState("All");
  const [priorityFilter, setPriorityFilter] = useState("All");
  const [assignedFilter, setAssignedFilter] = useState("All");

  const [searchTask, setSearchTask] = useState("");

  useEffect(() => {
    dispatch(getTasks());
  }, [dispatch]);

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

  const setSearchParameter = (e) => {
    const toLowerCase = e.target.value.toLowerCase();
    setSearchTask(toLowerCase);
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

  const finalTaskList =
    searchTask !== ""
      ? assignedFilteredList.filter((task) =>
          task.title.toLowerCase().includes(searchTask)
        )
      : assignedFilteredList;

  return (
    <div>
      <div>
        <div className="d-flex flex-wrap">
          <div className="col-6 col-md-3 col-lg-2">
            <button
              type="button"
              className="btn btn-primary shadow mb-3"
              data-bs-toggle="modal"
              data-bs-target="#exampleModal"
            >
              Create a new Task
            </button>
          </div>
          <div className="col-6 col-md-3">
            <input
              type="text"
              className="form-control shadow"
              placeholder="Search Task by title.."
              aria-label="Search.."
              aria-describedby="basic-addon1"
              onChange={(e) => setSearchParameter(e)}
            />
          </div>
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
                <Form projectId={project._id} />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="d-flex flex-wrap mt-3">
        <div className="col-7 col-md-3 me-3 mb-3">
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
        <div className="col-7 col-md-3 me-3 mb-3">
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
        <div className="col-7 col-md-3 mr-3 mb-3">
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

      <div className="d-flex flex-column">
        <div className="mt-3">
          <div className="align-self-stretch">
            {finalTaskList.map((task) => (
              <div className="d-flex mb-3" key={task._id}>
                <TaskPreview task={task} project={project} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Tasks;
