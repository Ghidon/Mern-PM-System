import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Form from "../ProjectForm/Form";
import ProjectPreview from "./ProjectPreview/ProjectPreview.js";

import { getProjects } from "../../actions/projects";

const Projects = () => {
  const dispatch = useDispatch();
  const projects = useSelector((state) => state.projects);

  useEffect(() => {
    dispatch(getProjects());
  });

  return (
    <div>
      <div className="d-flex">
        <button
          type="button"
          className="btn btn-primary mb-3"
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

      {!projects.length ? (
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      ) : (
        <div className="d-flex flex-wrap justify-content-start">
          {projects.map((project) => (
            <div className="d-flex me-3 mb-3" key={project._id}>
              <ProjectPreview project={project} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Projects;
