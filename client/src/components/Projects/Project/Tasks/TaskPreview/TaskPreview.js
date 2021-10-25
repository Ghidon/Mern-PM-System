import React from "react";
import { Link } from "react-router-dom";
import moment from "moment";

const TaskPreview = ({ task, projectId }) => {
  const statusColor = () => {
    if (task.status === "To do") {
      return "table-info border-dark table-bordered";
    } else if (task.status === "In progress") {
      return "table-warning border-dark table-bordered";
    } else if (task.status === "Blocked") {
      return "table-danger border-dark table-bordered";
    } else if (task.status === "Done") {
      return "table-success border-dark table-bordered";
    }
  };
  return (
    <>
      <td className="col-2">{task.title}</td>
      <td>{task.description}</td>
      <td>{task.creator}</td>
      <td>{moment(task.createdAt).fromNow()}</td>
      <td className={statusColor()}>
        <Link to={{ pathname: `/view/project/${projectId}/task/${task._id}` }}>
          ...
        </Link>
      </td>
    </>
  );
};

export default TaskPreview;
