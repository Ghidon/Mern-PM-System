import React, { useState } from "react";
import FileBase from "react-file-base64";
import { useDispatch } from "react-redux";
import { createTask } from "../../../../actions/tasks";

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

const Form = ({ projectId }) => {
  const dispatch = useDispatch();
  const user = JSON.parse(localStorage.getItem("profile"));
  const [taskData, setTaskData] = useState(() => ({
    ...initialState,
    projectId: projectId,
  }));

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(
      createTask({
        ...taskData,
        name: user?.result?.name,
        allowedUsers: user?.result?.email,
        projectId: projectId,
      })
    );
    setTaskData((prevState) => ({
      ...prevState,
      ...initialState,
      projectId: projectId,
    }));
  };

  const addFile = (file) => {
    setTaskData((prevState) => ({
      ...prevState,
      attachedFiles: [file],
    }));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setTaskData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  return (
    <form autoComplete="off" noValidate onSubmit={handleSubmit}>
      <div>
        <label htmlFor="inputTitle" className="form-label-sm">
          Title
        </label>
        <input
          type="text"
          className="form-control form-control-sm"
          name="title"
          placeholder="Title"
          value={taskData.title}
          onChange={handleInputChange}
        />
      </div>
      <div>
        <label htmlFor="inputDescription" className="form-label-sm">
          Description
        </label>
        <textarea
          type="text"
          className="form-control form-control-sm"
          name="description"
          placeholder="Description"
          value={taskData.description}
          onChange={handleInputChange}
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
  );
};

export default Form;
