import React from "react";
import { useSelector } from "react-redux";

import Form from "../ProjectForm/Form";
import Project from "./Project/Project.js";

const Projects = () => {
  const projects = useSelector((state) => state.projects);

  console.log(projects);
  return (
    <div>
      <h1> Active projects </h1>
      <Form />
      <Project />
    </div>
  );
};

export default Projects;
