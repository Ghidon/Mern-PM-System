import React from "react";
import { useHistory } from "react-router-dom";
import moment from "moment";

import "./Styles.css";

const Project = ({ project }) => {
  const history = useHistory();
  return (
    <div className="card" style={{ width: "22rem" }}>
      {!project.selectedFile ? (
        <div className="header">{project.creator[0]}</div>
      ) : (
        <img src={project.selectedFile} className="card-img-top" alt="..." />
      )}

      <div className="card-body d-flex flex-column">
        <h5 className="card-title">{project.title}</h5>
        <p className="card-text">
          <small className="text-muted">
            Created by: {project.creator} {moment(project.createdAt).fromNow()}
          </small>
        </p>
        <p className="card-text">{project.description}</p>
        <button
          className="btn btn-primary mt-auto align-self-start"
          onClick={() => {
            let path = `/view/project/${project._id}`;
            history.push(path);
          }}
        >
          View Project
        </button>
      </div>
    </div>
  );
};

export default Project;
