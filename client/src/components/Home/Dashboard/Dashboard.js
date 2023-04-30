import React from "react";
import { useSelector } from "react-redux";

function Dashboard({ project }) {
  const tasks = useSelector((state) => state.tasks);

  const projectTasks = tasks.filter((task) => task.projectId === project._id);

  const taskStatusCount = projectTasks.reduce((acc, task) => {
    acc[task.status] = (acc[task.status] || 0) + 1;
    return acc;
  }, {});

  const total = projectTasks.length;

  const result = {};

  Object.entries(taskStatusCount).forEach(([status, count]) => {
    result[status] = Math.round((count / total) * 100);
  });

  const bar = (bg, valueNow, result, status) => {
    return (
      <div
        className={`progress-bar ${bg}`}
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
          {bar("bg-success", taskStatusCount["Done"], result["Done"], "Done")}
          {bar(
            "bg-danger progress-bar-striped",
            taskStatusCount["Blocked"],
            result["Blocked"],
            "Blocked"
          )}
          {bar(
            "bg-warning progress-bar-striped progress-bar-animated",
            taskStatusCount["In progress"],
            result["In progress"],
            "In progress"
          )}
          {bar(
            "bg-secondary",
            taskStatusCount["To do"],
            result["To do"],
            "To do"
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
