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
      {/* <td>
        <button
          className="btn btn-primary mt-auto align-self-start"
          onClick={() => {
            let path = `/view/task/${task._id}`;
            history.push(path);
          }}
        >
          open
        </button>
      </td> */}
    </>
  );
};

export default TaskPreview;
