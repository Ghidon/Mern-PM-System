import React, { useState } from "react";
import FileBase from "react-file-base64";
import { useDispatch } from "react-redux";
import { createTask } from "../../../../actions/tasks";

const initialState = {
  title: "",
  description: "",
  active: true,
  status: "To do",
  attachedFiles: [],
};

const Form = ({ projectId }) => {
  const [taskData, setTaskData] = useState({
    ...initialState,
    projectId: projectId,
  });
  const dispatch = useDispatch();
  const user = JSON.parse(localStorage.getItem("profile"));

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(taskData);
    dispatch(createTask({ ...taskData, name: user?.result?.name }));
    setTaskData({ ...initialState, projectId: projectId });
  };

  const addFile = (file) => {
    const newFileList = [];
    newFileList.push(file);
    console.log(newFileList);
    setTaskData({ ...taskData, attachedFiles: newFileList });
  };

  return (
    <div className="">
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
            value={taskData.title}
            onChange={(e) =>
              setTaskData({ ...taskData, title: e.target.value })
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
            value={taskData.description}
            onChange={(e) =>
              setTaskData({ ...taskData, description: e.target.value })
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
            Add New Task
          </button>
        </div>
      </form>
    </div>
  );
};

export default Form;
