import React from "react";
import { useHistory } from "react-router-dom";
import moment from "moment";

const TaskPreview = ({ task }) => {
  const history = useHistory();
  return (
    <>
      <td>{task.title}</td>
      <td>{task.description}</td>
      <td>{task.creator}</td>
      <td>{moment(task.createdAt).fromNow()}</td>
    </>
  );
};

export default TaskPreview;
