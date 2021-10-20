import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useHistory } from "react-router-dom";
import FileBase from "react-file-base64";

import Tasks from "./Tasks/Tasks.js";
import {
  getProjects,
  deleteProject,
  updateProject,
} from "../../../actions/projects";

const Project = () => {
  const [projectData, setProjectData] = useState({
    creator: "",
    title: "",
    description: "",
    active: "yes",
    selectedFile: "",
  });
  const dispatch = useDispatch();

  const history = useHistory();
  const projects = useSelector((state) => state.projects);
  console.log(projects);

  useEffect(() => {
    (async () => {
      await dispatch(getProjects()).then(projects);
    })();
  }, [dispatch]);

  let { id } = useParams();

  const project = projects.find((x) => x._id === id);

  const handleSubmit = () => {
    dispatch(updateProject(id, projectData));
  };

  return (
    <div>
      {!projects.length ? (
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      ) : (
        <div className="d-flex-column">
          <form autoComplete="off" noValidate onSubmit={handleSubmit}>
            <fieldset disabled id="projectForm">
              <div>
                <label htmlFor="inputCreator" className="form-label-sm">
                  Project Creator
                </label>
                <input
                  type="text"
                  className="form-control form-control"
                  name="projectCreator"
                  placeholder={project.creator}
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
                  className="form-control form-control"
                  name="projectTitle"
                  placeholder={project.title}
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
                  className="form-control form-control"
                  name="projectDescription"
                  placeholder={project.description}
                  value={projectData.description}
                  onChange={(e) =>
                    setProjectData({
                      ...projectData,
                      description: e.target.value,
                    })
                  }
                />
              </div>
              <div>
                <label htmlFor="formFileSm" className="form-label-sm">
                  Select Cover Image
                </label>
                <div className="form-control form-control-sm mb-3">
                  <FileBase
                    disabled
                    type="file"
                    multiple={false}
                    onDone={({ base64 }) =>
                      setProjectData({ ...projectData, selectedFile: base64 })
                    }
                  />
                </div>
              </div>
            </fieldset>
          </form>
          <div className="d-flex justify-content-between mb-3">
            <div>
              <button
                className="btn btn-secondary"
                onClick={() => {
                  document.getElementById("projectForm").disabled = false;
                  document
                    .getElementById("saveButton")
                    .classList.remove("invisible");
                }}
              >
                Edit
              </button>

              <button
                type="submit"
                id="saveButton"
                onClick={() => {
                  handleSubmit();
                }}
                className="btn btn-primary ms-3 invisible"
              >
                Save
              </button>
            </div>
            <button
              className="btn btn-danger"
              onClick={() => {
                dispatch(deleteProject(id));
                history.push("/read/projects");
              }}
            >
              Delete Project
            </button>
          </div>
        </div>
      )}
      <Tasks projectId={id} />
    </div>
  );
};

export default Project;
