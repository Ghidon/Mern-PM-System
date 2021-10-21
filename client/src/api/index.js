import axios from "axios";

const projectsUrl = "http://localhost:5000/projects";
const tasksUrl = "http://localhost:5000/tasks";

//Projects requests
export const fetchProjects = () => axios.get(projectsUrl);
export const createProject = (newProject) =>
  axios.post(projectsUrl, newProject);
export const updateProject = (id, updatedProject) =>
  axios.patch(`${projectsUrl}/${id}`, updatedProject);
export const getProject = (id) => axios.get(`${projectsUrl}/${id}`);
export const deleteProject = (id) => axios.delete(`${projectsUrl}/${id}`);

//Tasks requests
export const fetchTasks = () => axios.get(tasksUrl);
export const createTask = (newTask) => axios.post(tasksUrl, newTask);
export const updateTask = (id, updatedTask) =>
  axios.patch(`${tasksUrl}/${id}`, updatedTask);
export const getTask = (id) => axios.get(`${tasksUrl}/${id}`);
export const deleteTask = (id) => axios.delete(`${tasksUrl}/${id}`);
