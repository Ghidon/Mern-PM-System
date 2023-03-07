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

  return (
    <div className="d-flex align-items-center justify-content-between flex-wrap mb-3">
      <div
        className="col-sm-3 col-xs-12"
        style={{
          maxHeight: "150px",
          overflow: "hidden",
        }}
      >
        {!project.selectedFile ? (
          <img
            src={mindBlowImage}
            alt={initials}
            style={{
              width: "100%",
            }}
          />
        ) : (
          <img
            src={project.selectedFile}
            alt={initials}
            style={{
              backgroundColor: "lightyellow",
              width: "100%",
              objectFit: "cover",
              objectPosition: "0% 0%",
            }}
          />
        )}
      </div>
      <div className="col-sm-6 col-xs-12 d-flex flex-column">
        <h5 className="">{project.title}</h5>
        <p className="">
          <small className="text-muted">
            Created by: {project.name}, {moment(project.createdAt).fromNow()}
          </small>
        </p>
        <p className="">{project.description}</p>
      </div>
      <div className="col-sm-2 col-xs-12 d-flex flex-row justify-content-end">
        <button
          className="btn btn-primary shadow"
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
