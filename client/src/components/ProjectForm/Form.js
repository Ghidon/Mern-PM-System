import React, { useState } from "react";
import FileBase from "react-file-base64";
import { useDispatch } from "react-redux";
import { createProject } from "../../actions/projects";

const Form = () => {
  const user = JSON.parse(localStorage.getItem("profile"));

  const [projectData, setProjectData] = useState({
    title: "",
    description: "",
    active: true,
    selectedFile: "",
    allowedUsers: [user?.result?.name],
  });
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(
      createProject({
        ...projectData,
        name: user?.result?.name,
      })
    );
    setProjectData({
      title: "",
      description: "",
      active: true,
      selectedFile: "",
      allowedUsers: [],
    });
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
            value={projectData.title}
            onChange={(e) =>
              setProjectData({ ...projectData, title: e.target.value })
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
            value={projectData.description}
            onChange={(e) =>
              setProjectData({ ...projectData, description: e.target.value })
            }
          />
        </div>
        <div>
          <label htmlFor="formFileSm" className="form-label-sm">
            Cover Image
          </label>
          <div className="form-control form-control-sm mb-3">
            <FileBase
              type="file"
              multiple={false}
              onDone={({ base64 }) =>
                setProjectData({ ...projectData, selectedFile: base64 })
              }
            />
          </div>
        </div>
        <div className="d-flex">
          <button type="submit" className="ms-auto btn btn-primary">
            Add New Project
          </button>
        </div>
      </form>
    </div>
  );
};

export default Form;
