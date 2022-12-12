import React from "react";
import { useHistory } from "react-router-dom";
import moment from "moment";
import MindBlowing from "../../../images/mind-blowing.jpg";

const ProjectPreview = ({ project }) => {
  const history = useHistory();
  return (
    <div className="card shadow" style={{ maxWidth: "15rem" }}>
      {!project.selectedFile ? (
        <img
          src={MindBlowing}
          className="card-img-top"
          alt={project.name?.charAt(0)}
        />
      ) : (
        <img
          src={project.selectedFile}
          className="card-img-top"
          alt="..."
          style={{
            maxHeight: "118px",
            width: "100%",
            objectFit: "cover",
            objectPosition: "0% 0%",
          }}
        />
      )}

      <div className="card-body d-flex flex-column">
        <h5 className="card-title">{project.title}</h5>
        <p className="card-text">
          <small className="text-muted">
            Created by: {project.name}, {moment(project.createdAt).fromNow()}
          </small>
        </p>
        <p className="card-text">{project.description}</p>
        <button
          className="btn btn-primary mt-auto align-self-center shadow"
          onClick={() => {
            history.push({
              pathname: `/view/project/${project._id}`,
              state: { project: project },
            });
          }}
        >
          View Project
        </button>
      </div>
    </div>
  );
};

export default ProjectPreview;
