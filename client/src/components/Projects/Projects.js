import React from "react";
import { useSelector } from "react-redux";
import Form from "../ProjectForm/Form";
import ProjectPreview from "./ProjectPreview/ProjectPreview.js";

const Projects = () => {
  const projects = useSelector((state) => state.projects);

  return (
    <div>
      <h1> Active projects </h1>
      <Form />
      {!projects.length ? (
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      ) : (
        <div className="d-flex flex-wrap">
          {projects.map((project) => (
            <div
              className="d-flex   align-self-stretch me-3 mb-3"
              key={project._id}
            >
              <ProjectPreview project={project} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Projects;
