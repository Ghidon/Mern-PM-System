import React, { useState } from "react";
import { useDispatch } from "react-redux";
import moment from "moment";

import { deleteSubTask } from "../../../../../../../actions/subtasks";

const Subtask = ({ subtask }) => {
  const [trashActive, setTrashActive] = useState(false);
  const dispatch = useDispatch();

  const statusIcon = () => {
    if (subtask.status === "To do") {
      return (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="18"
          height="18"
          fill="currentColor"
          className="bi bi-shield-fill text-secondary"
          viewBox="0 0 16 16"
        >
          <path d="M5.072.56C6.157.265 7.31 0 8 0s1.843.265 2.928.56c1.11.3 2.229.655 2.887.87a1.54 1.54 0 0 1 1.044 1.262c.596 4.477-.787 7.795-2.465 9.99a11.775 11.775 0 0 1-2.517 2.453 7.159 7.159 0 0 1-1.048.625c-.28.132-.581.24-.829.24s-.548-.108-.829-.24a7.158 7.158 0 0 1-1.048-.625 11.777 11.777 0 0 1-2.517-2.453C1.928 10.487.545 7.169 1.141 2.692A1.54 1.54 0 0 1 2.185 1.43 62.456 62.456 0 0 1 5.072.56z" />
        </svg>
      );
    } else if (subtask.status === "In progress") {
      return (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="18"
          height="18"
          fill="currentColor"
          className="bi bi-shield-shaded text-warning"
          viewBox="0 0 16 16"
        >
          <path
            fillRule="evenodd"
            d="M8 14.933a.615.615 0 0 0 .1-.025c.076-.023.174-.061.294-.118.24-.113.547-.29.893-.533a10.726 10.726 0 0 0 2.287-2.233c1.527-1.997 2.807-5.031 2.253-9.188a.48.48 0 0 0-.328-.39c-.651-.213-1.75-.56-2.837-.855C9.552 1.29 8.531 1.067 8 1.067v13.866zM5.072.56C6.157.265 7.31 0 8 0s1.843.265 2.928.56c1.11.3 2.229.655 2.887.87a1.54 1.54 0 0 1 1.044 1.262c.596 4.477-.787 7.795-2.465 9.99a11.775 11.775 0 0 1-2.517 2.453 7.159 7.159 0 0 1-1.048.625c-.28.132-.581.24-.829.24s-.548-.108-.829-.24a7.158 7.158 0 0 1-1.048-.625 11.777 11.777 0 0 1-2.517-2.453C1.928 10.487.545 7.169 1.141 2.692A1.54 1.54 0 0 1 2.185 1.43 62.456 62.456 0 0 1 5.072.56z"
          />
        </svg>
      );
    } else if (subtask.status === "Blocked") {
      return (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="18"
          height="18"
          fill="currentColor"
          className="bi bi-shield-fill-exclamation text-danger"
          viewBox="0 0 16 16"
        >
          <path
            fillRule="evenodd"
            d="M8 0c-.69 0-1.843.265-2.928.56-1.11.3-2.229.655-2.887.87a1.54 1.54 0 0 0-1.044 1.262c-.596 4.477.787 7.795 2.465 9.99a11.777 11.777 0 0 0 2.517 2.453c.386.273.744.482 1.048.625.28.132.581.24.829.24s.548-.108.829-.24a7.159 7.159 0 0 0 1.048-.625 11.775 11.775 0 0 0 2.517-2.453c1.678-2.195 3.061-5.513 2.465-9.99a1.541 1.541 0 0 0-1.044-1.263 62.467 62.467 0 0 0-2.887-.87C9.843.266 8.69 0 8 0zm-.55 8.502L7.1 4.995a.905.905 0 1 1 1.8 0l-.35 3.507a.552.552 0 0 1-1.1 0zM8.002 12a1 1 0 1 1 0-2 1 1 0 0 1 0 2z"
          />
        </svg>
      );
    } else if (subtask.status === "Done") {
      return (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="18"
          height="18"
          fill="currentColor"
          className="bi bi-shield-fill-check text-success"
          viewBox="0 0 16 16"
        >
          <path
            fillRule="evenodd"
            d="M8 0c-.69 0-1.843.265-2.928.56-1.11.3-2.229.655-2.887.87a1.54 1.54 0 0 0-1.044 1.262c-.596 4.477.787 7.795 2.465 9.99a11.777 11.777 0 0 0 2.517 2.453c.386.273.744.482 1.048.625.28.132.581.24.829.24s.548-.108.829-.24a7.159 7.159 0 0 0 1.048-.625 11.775 11.775 0 0 0 2.517-2.453c1.678-2.195 3.061-5.513 2.465-9.99a1.541 1.541 0 0 0-1.044-1.263 62.467 62.467 0 0 0-2.887-.87C9.843.266 8.69 0 8 0zm2.146 5.146a.5.5 0 0 1 .708.708l-3 3a.5.5 0 0 1-.708 0l-1.5-1.5a.5.5 0 1 1 .708-.708L7.5 7.793l2.646-2.647z"
          />
        </svg>
      );
    }
  };

  const priorityBG = () => {
    if (subtask.priority === "Low") {
      return "card-header d-flex justify-content-between align-items-center";
    } else if (subtask.priority === "Medium") {
      return "card-header d-flex justify-content-between align-items-center bg-warning bg-opacity-25";
    } else if (subtask.priority === "High") {
      return "card-header d-flex justify-content-between align-items-center bg-danger bg-opacity-50";
    }
  };

  return (
    <div className="card col-12 shadow">
      <h5 className={priorityBG()}>
        {subtask.title}
        <span>{statusIcon()}</span>
      </h5>
      <div className="card-body">
        <p className="card-text">{subtask.description}</p>
        <div className="d-flex justify-content-between align-items-center">
          <p style={{ fontWeight: "bold", color: "blue" }}>
            {subtask.dueDate && (
              <small>Expires {moment(subtask.dueDate).fromNow()}</small>
            )}
          </p>
        </div>
        <div className="d-flex justify-content-between">
          <small className="text-muted">
            Created by: {subtask.name}, {moment(subtask.createdAt).fromNow()}
          </small>
          <span
            onMouseEnter={() => setTrashActive(!trashActive)}
            onMouseLeave={() => setTrashActive(!trashActive)}
            style={{ cursor: "pointer" }}
            onClick={() => dispatch(deleteSubTask(subtask._id))}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              height="18"
              fill="currentColor"
              className={
                trashActive
                  ? "bi bi-trash-fill text-danger"
                  : "bi bi-trash-fill text-secondary"
              }
              viewBox="0 0 16 16"
            >
              <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0z" />
            </svg>
          </span>
        </div>
      </div>
    </div>
  );
};

export default Subtask;
