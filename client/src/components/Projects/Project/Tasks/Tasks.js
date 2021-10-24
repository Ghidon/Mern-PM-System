import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getTasks } from "../../../../actions/tasks.js";
import TaskPreview from "./TaskPreview/TaskPreview.js";

import Form from "../TaskForm/Form";

const Tasks = ({ projectId }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    (async () => {
      await dispatch(getTasks());
    })();
  }, [dispatch]);
  const tasks = useSelector((state) => state.tasks);

  const ProjectTasks = tasks.filter((task) => task.projectId === projectId);

  return (
    <div className="d-flex flex-wrap d-flex justify-content-between">
      <Form projectId={projectId} />

      <div className="col col-sm-12 col-md-12 col-lg-7 col-xl-8 ps-2 pe-2">
        <table className="table table-light mt-4">
          <thead>
            <tr>
              <th scope="col">Title</th>
              <th scope="col">Description</th>
              <th scope="col">Creator</th>
              <th scope="col">Created</th>
              <th scope="col"></th>
            </tr>
          </thead>
          {/* {!tasks.length ? (
            <div className="col col-md-9">
              <div className="spinner-border text-primary" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
            </div>
          ) : ( */}
          <tbody>
            {ProjectTasks.map((task) => (
              <tr key={task._id}>
                <TaskPreview task={task} projectId={projectId} />
              </tr>
            ))}
          </tbody>
          {/* )} */}
        </table>
      </div>
    </div>
  );
};

export default Tasks;
