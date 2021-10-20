import React, { useState } from "react";
import FileBase from "react-file-base64";
import { useDispatch } from "react-redux";
import { createProject } from "../../actions/projects";

const Form = () => {
  const [projectData, setProjectData] = useState({
    creator: "",
    title: "",
    description: "",
    active: true,
    selectedFile: "",
  });
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();

    dispatch(createProject(projectData));
  };

  return (
    <div className="col col-sm-8 col-md-7 col-lg-5 col-xl-3 input-group-sm mb-3">
      <form autoComplete="off" noValidate onSubmit={handleSubmit}>
        <div>
          <label htmlFor="inputCreator" className="form-label-sm">
            Project Creator
          </label>
          <input
            type="text"
            className="form-control form-control-sm"
            name="projectCreator"
            placeholder="Creator"
            value={projectData.creator}
            onChange={(e) =>
              setProjectData({ ...projectData, creator: e.target.value })
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
        <div>
          <button type="submit" className="btn btn-primary">
            Create New Project
          </button>
        </div>
      </form>
    </div>
  );
};

export default Form;
