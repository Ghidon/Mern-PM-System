import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useHistory } from "react-router-dom";
import FileBase from "react-file-base64";

import Tasks from "./Tasks/Tasks.js";
import MindBlowing from "../../../images/mind-blowing.jpg";
import { deleteProject, updateProject } from "../../../actions/projects";
import { getTasks } from "../../../actions/tasks.js";

const Project = () => {
  let { projectId } = useParams();
  const dispatch = useDispatch();
  const history = useHistory();
  const projects = useSelector((state) => state.projects);
  const tasks = useSelector((state) => state.tasks);
  const project = projects.find((x) => x._id === projectId);
  // give time to the component to rerender and get back the tasks from useEffect
  const projectTasks = tasks.length
    ? tasks.filter((task) => task.projectId === projectId)
    : [];
  ///
  const user = JSON.parse(localStorage.getItem("profile"));

  const [projectData, setProjectData] = useState({
    creator: "",
    name: "",
    title: "",
    description: "",
    active: true,
    status: "",
    selectedFile: "",
  });

  useEffect(() => {
    dispatch(getTasks);
    if (projects.length) {
      setProjectData({
        creator: project.creator,
        name: project.name,
        title: project.title,
        description: project.description,
        active: project.active,
        status: project.status,
        selectedFile: project.selectedFile,
      });
    }
  }, [projects.length]);

  const handleSubmit = () => {
    dispatch(
      updateProject(projectId, { ...projectData, name: user?.result?.name })
    );
    document.getElementById("projectForm").disabled = true;
    document.getElementById("saveButton").classList.add("disabled");
  };

  const handleDelete = () => {
    if (projectTasks.length) {
      alert("Cannot delete a project with active tasks");
    } else {
      dispatch(deleteProject(projectId));
      history.push("/read/projects");
    }
  };

  return (
    <div>
      {!projects.length ? (
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      ) : (
        <div className="d-flex justify-content-between flex-wrap-reverse">
          <div className="col-12 col-md-6 d-flex-column">
            <form autoComplete="off" noValidate onSubmit={handleSubmit}>
              <fieldset disabled id="projectForm">
                <div>
                  <label htmlFor="inputCreator" className="form-label-sm">
                    Project Author
                  </label>
                  <input
                    type="text"
                    className="form-control form-control shadow"
                    name="projectCreator"
                    value={projectData.name}
                    onChange={(e) =>
                      setProjectData({
                        ...projectData,
                        creator: e.target.value,
                      })
                    }
                  />
                </div>
                <div>
                  <label htmlFor="inputTitle" className="form-label-sm">
                    Title
                  </label>
                  <input
                    type="text"
                    className="form-control form-control shadow"
                    name="projectTitle"
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
                    className="form-control form-control shadow"
                    name="projectDescription"
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
                    Change Cover Image
                  </label>
                  <div className="form-control form-control-sm mb-3 shadow">
                    <FileBase
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
                  className="btn btn-secondary shadow"
                  onClick={() => {
                    document.getElementById("projectForm").disabled = false;
                    document
                      .getElementById("saveButton")
                      .classList.remove("disabled");
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
                  className="btn btn-primary ms-3 disabled shadow"
                >
                  Save
                </button>
              </div>
              <button
                className="btn btn-danger shadow"
                onClick={() => {
                  handleDelete();
                }}
              >
                Delete Project
              </button>
            </div>
          </div>
          <div className="col-12 col-md-5 my-4">
            {projectData.selectedFile ? (
              <img
                src={projectData.selectedFile}
                style={{ maxHeight: "300px" }}
                alt=""
                className="card-img-top shadow"
              />
            ) : (
              <img
                src={MindBlowing}
                className="card-img-top shadow"
                alt={project.name?.charAt(0)}
              />
            )}
          </div>
        </div>
      )}
      <Tasks projectId={projectId} projectTasks={projectTasks} />
    </div>
  );
};

export default Project;
