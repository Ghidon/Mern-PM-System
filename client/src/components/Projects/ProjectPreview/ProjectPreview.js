import React from "react";
import { useHistory } from "react-router-dom";
import moment from "moment";
import mindBlowImage from "../../../images/mind-blowing.jpg";

const ProjectPreview = ({ project }) => {
  const history = useHistory();

  const initials = project.name
    ?.split(" ")
    .map((n) => n[0])
    .join("");

  const imageStyle = {
    width: "100%",
    objectFit: project.selectedFile ? "cover" : "none",
    objectPosition: "0% 0%",
    backgroundColor: project.selectedFile ? "lightyellow" : "transparent",
  };

  return (
    <div className="d-flex align-items-center justify-content-between flex-wrap mb-3">
      <div
        className="col-sm-3 col-xs-12"
        style={{
          maxHeight: "150px",
          overflow: "hidden",
        }}
      >
        <img
          src={project.selectedFile || mindBlowImage}
          alt={initials}
          style={imageStyle}
        />
      </div>
      <div className="col-sm-6 col-xs-12 d-flex flex-column">
        <h5>{project.title}</h5>
        <p>
          <small className="text-muted">
            Created by: {project.name}, {moment(project.createdAt).fromNow()}
          </small>
        </p>
        <p>{project.description}</p>
      </div>
      <div className="col-sm-2 col-xs-12 d-flex flex-row justify-content-end">
        <button
          className="btn btn-primary shadow"
          onClick={() => {
            history.push({
              pathname: `/view/project/${project._id}`,
              state: { project },
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
