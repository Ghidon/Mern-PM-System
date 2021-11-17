import React, { useState } from "react";
import FileBase from "react-file-base64";
import { useDispatch } from "react-redux";
import { createSubTask } from "../../../../../../actions/subtasks";

const initialState = {
  title: "",
  description: "",
  active: true,
  status: "To do",
  assigned: "Unassigned",
  attachedFiles: [],
  dueDate: null,
  allowedUsers: [],
  priority: "Low",
};

const Form = ({ taskId, taskAssigned }) => {
  const [subTaskData, setSubTaskData] = useState({
    ...initialState,
    taskId: taskId,
    assigned: taskAssigned,
  });
  const dispatch = useDispatch();
  const user = JSON.parse(localStorage.getItem("profile"));

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(
      createSubTask({
        ...subTaskData,
        name: user?.result?.name,
        allowedUsers: user?.result?.name,
      })
    );
    setSubTaskData({ ...initialState, taskId: taskId, assigned: taskAssigned });
  };

  const addFile = (file) => {
    const newFileList = [];
    newFileList.push(file);
    setSubTaskData({ ...subTaskData, attachedFiles: newFileList });
  };

  return (
    <div>
      <form autoComplete="off" noValidate onSubmit={handleSubmit}>
        <div>
          <label htmlFor="inputTitle" className="form-label-sm">
            Title
          </label>
          <input
            type="text"
            className="form-control form-control-sm"
            name="projectTitle"
            placeholder="Title"
            value={subTaskData.title}
            onChange={(e) =>
              setSubTaskData({ ...subTaskData, title: e.target.value })
            }
          />
        </div>
        <div>
          <label htmlFor="inputDescription" className="form-label-sm">
            Description
          </label>
          <textarea
            type="text"
            className="form-control form-control-sm"
            name="projectDescription"
            placeholder="Description"
            value={subTaskData.description}
            onChange={(e) =>
              setSubTaskData({ ...subTaskData, description: e.target.value })
            }
          />
        </div>
        <div>
          <label htmlFor="formFileSm" className="form-label-sm">
            Attach file
          </label>
          <div className="form-control form-control-sm mb-3">
            <FileBase type="file" multiple={false} onDone={addFile} />
          </div>
        </div>
        <div className="d-flex">
          <button type="submit" className="ms-auto btn btn-primary">
            Add New SubTask
          </button>
        </div>
      </form>
    </div>
  );
};

export default Form;
