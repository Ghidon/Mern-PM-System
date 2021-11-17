import { combineReducers } from "redux";

import projects from "./projects";
import tasks from "./tasks";
import subtasks from "./subtasks";
import users from "./users";
import auth from "./auth";

export default combineReducers({
  projects,
  tasks,
  subtasks,
  users,
  auth,
});
