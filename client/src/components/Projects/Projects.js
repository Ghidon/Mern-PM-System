import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Form from "../ProjectForm/Form";
import ProjectPreview from "./ProjectPreview/ProjectPreview.js";
import { getProjects } from "../../actions/projects";
import MockupProjectPreview from "./MockupProjectPreview/MockupProjectPreview";

const Projects = () => {
  const user = JSON.parse(localStorage.getItem("profile"));
  const dispatch = useDispatch();
  const projects = useSelector((state) => state.projects);

  useEffect(() => {
    dispatch(getProjects());
  }, [dispatch]);

  return (
    <div>
      {user?.result ? (
        <div>
          <div className="d-flex">
            <button
              type="button"
              className="btn btn-primary mb-3 shadow"
              data-bs-toggle="modal"
              data-bs-target="#exampleModal"
            >
              Create a new Project
            </button>
          </div>
          <div
            className="modal fade"
            id="exampleModal"
            tabIndex="-1"
            aria-labelledby="exampleModalLabel"
            aria-hidden="true"
          >
            <div className="modal-dialog modal-dialog-centered">
              <div className="modal-content">
                <div className="modal-body">
                  <Form />
                </div>
              </div>
            </div>
          </div>

          {projects.length ? (
            <div className="">
              {projects.map((project) => (
                <div className="" key={project._id}>
                  <ProjectPreview project={project} />
                </div>
              ))}
            </div>
          ) : (
            <div className="spinner-border text-primary" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          )}
        </div>
      ) : (
        <MockupProjectPreview />
      )}
    </div>
  );
};

export default Projects;
