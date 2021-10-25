import React, { useState } from "react";
import FileBase from "react-file-base64";
import { useDispatch } from "react-redux";
import { createTask } from "../../../../actions/tasks";

const Form = ({ projectId }) => {
  const [taskData, setTaskData] = useState({
    projectId: projectId,
    creator: "",
    title: "",
    description: "",
    active: true,
    status: "To do",
    selectedFile: "",
  });
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(createTask(taskData));
    setTaskData({
      projectId: projectId,
      creator: "",
      title: "",
      description: "",
      active: true,
      status: "To do",
      selectedFile: "",
    });
  };

  return (
    <div className="">
      <form autoComplete="off" noValidate onSubmit={handleSubmit}>
        <div>
          <label htmlFor="inputCreator" className="form-label-sm">
            Task Creator
          </label>
          <input
            type="text"
            className="form-control form-control-sm"
            name="projectCreator"
            placeholder="Creator"
            value={taskData.creator}
            onChange={(e) =>
              setTaskData({ ...taskData, creator: e.target.value })
            }
          />
        </div>
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
            <FileBase
              type="file"
              multiple={false}
              onDone={({ base64 }) =>
                setTaskData({ ...taskData, selectedFile: base64 })
              }
            />
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
