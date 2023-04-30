import React, { useState, useMemo } from "react";
import FileBase from "react-file-base64";
import { useDispatch } from "react-redux";
import { createProject } from "../../actions/projects";

const Form = () => {
  const user = useMemo(() => JSON.parse(localStorage.getItem("profile")), []);

  const [projectData, setProjectData] = useState(() => ({
    title: "",
    description: "",
    active: true,
    selectedFile: "",
    admins: [user?.result?.email],
    managers: [],
    users: [],
  }));
  const dispatch = useDispatch();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProjectData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleFileUpload = (base64) => {
    setProjectData((prevData) => ({ ...prevData, selectedFile: base64 }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(
      createProject({
        ...projectData,
        name: user?.result?.name,
      })
    );
    setProjectData((prevData) => ({
      ...prevData,
      title: "",
      description: "",
      active: true,
      selectedFile: "",
    }));
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
            name="title"
            placeholder="Title"
            value={projectData.title}
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
            value={projectData.description}
            onChange={handleInputChange}
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
              onDone={({ base64 }) => handleFileUpload(base64)}
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
