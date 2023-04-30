import React from "react";
import { useHistory } from "react-router-dom";
import MindBlowing from "../../../images/mind-blowing.jpg";

function MockupProjectPreview() {
  const { push } = useHistory();

  return (
    <div className="card" style={{ width: "15rem" }}>
      <img src={`${MindBlowing}`} className="card-img-top" alt="MB" />
      <div className="card-body d-flex flex-column">
        <h5 className="card-title">Your Project</h5>
        <p className="card-text">
          <small className="text-muted">
            Created by: You in a not so distant future
          </small>
        </p>
        <p className="card-text">Your revolutionary idea</p>
        <button
          className="btn btn-primary mt-auto align-self-start"
          onClick={() => push(`/auth`)}
        >
          Sign In Now!
        </button>
      </div>
    </div>
  );
}

export default MockupProjectPreview;
