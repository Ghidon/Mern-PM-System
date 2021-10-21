import React from "react";
import { Link } from "react-router-dom";
import moment from "moment";

const TaskPreview = ({ task, projectId }) => {
  return (
    <>
      <td className="col-2">{task.title}</td>
      <td>{task.description}</td>
      <td>{task.creator}</td>
      <td>{moment(task.createdAt).fromNow()}</td>
      <td>
        <Link
          className=""
          to={{ pathname: `/view/project/${projectId}/task/${task._id}` }}
        >
          ...
        </Link>
      </td>
    </>
  );
};

export default TaskPreview;
