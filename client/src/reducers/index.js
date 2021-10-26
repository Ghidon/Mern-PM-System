import { combineReducers } from "redux";

import projects from "./projects";
import tasks from "./tasks";
import auth from "./auth";

export default combineReducers({
  projects,
  tasks,
  auth,
});
