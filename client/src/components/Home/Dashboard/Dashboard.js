import React from "react";
import { useSelector } from "react-redux";

function Dashboard({ project }) {
  const tasks = useSelector((state) => state.tasks);
  // const subtasks = useSelector((state) => state.subtasks);

  const projectTasks = tasks.filter((task) => task.projectId === project._id);

  const taskDone = projectTasks.filter((task) => task.status === "Done").length;
  const taskInProgress = projectTasks.filter(
    (task) => task.status === "In progress"
  ).length;
  const taskBlocked = projectTasks.filter(
    (task) => task.status === "Blocked"
  ).length;
  const taskToDo = projectTasks.filter(
    (task) => task.status === "To do"
  ).length;

  const total = taskDone + taskInProgress + taskBlocked + taskToDo;

  const resultDone = Math.round((taskDone / total) * 100);
  const resultInProgress = Math.round((taskInProgress / total) * 100);
  const resultBlocked = Math.round((taskBlocked / total) * 100);
  const resultToDo = Math.round((taskToDo / total) * 100);

  const bar = (bg, valueNow, result, status) => {
    return (
      <div
        className={`progress-bar  ${bg}`}
        data-bs-toggle="tooltip"
        data-bs-placement="top"
        title={status}
        role="progressbar"
        aria-valuenow={valueNow}
        aria-valuemin="0"
        aria-valuemax={total}
        style={{ width: `${result}%` }}
      >
        {result}%
      </div>
    );
  };

  return (
    <div>
      <h5>{project.title}</h5>
      {projectTasks.length ? (
        <div className="progress">
          {bar("bg-success", taskDone, resultDone, "Done")}
          {bar(
            "bg-warning progress-bar-striped progress-bar-animated",
            taskInProgress,
            resultInProgress,
            "In progress"
          )}
          {bar("bg-secondary", taskToDo, resultToDo, "To do")}
          {bar(
            "bg-danger progress-bar-striped",
            taskBlocked,
            resultBlocked,
            "Blocked"
          )}
        </div>
      ) : (
        <div className="progress">
          <div
            className="progress-bar"
            role="progressbar"
            aria-valuenow="0"
            aria-valuemin="0"
            aria-valuemax="100"
          ></div>
        </div>
      )}
    </div>
  );
}

export default Dashboard;
