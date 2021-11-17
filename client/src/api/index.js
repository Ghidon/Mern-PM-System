import axios from "axios";

const API = axios.create({ baseURL: "http://localhost:5000" });

API.interceptors.request.use((req) => {
  if (localStorage.getItem("profile")) {
    req.headers.authorization = `Bearer ${
      JSON.parse(localStorage.getItem("profile")).token
    }`;
  }
  return req;
});

//Projects requests
export const fetchProjects = () => API.get("/projects");
export const createProject = (newProject) => API.post("/projects", newProject);
export const updateProject = (id, updatedProject) =>
  API.patch(`/projects/${id}`, updatedProject);
export const getProject = (id) => API.get(`/projects/${id}`);
export const deleteProject = (id) => API.delete(`/projects/${id}`);

//Tasks requests
export const fetchTasks = () => API.get("/tasks");
export const createTask = (newTask) => API.post("/tasks", newTask);
export const updateTask = (id, updatedTask) =>
  API.patch(`/tasks/${id}`, updatedTask);
export const getTask = (id) => API.get(`/tasks/${id}`);
export const deleteTask = (id) => API.delete(`/tasks/${id}`);

//Subtasks requests
export const fetchSubTasks = () => API.get("/subtasks");
export const createSubTask = (newSubTask) => API.post("/subtasks", newSubTask);
export const updateSubTask = (id, updatedSubTask) =>
  API.patch(`/subtasks/${id}`, updatedSubTask);
export const getSubTask = (id) => API.get(`/subtasks/${id}`);
export const deleteSubTask = (id) => API.delete(`/subtasks/${id}`);

//User requests
export const signIn = (formData) => API.post("/user/signin", formData);
export const signUp = (formData) => API.post("/user/signup", formData);

export const googleSignUp = (result) => API.post("/user/googlesignup", result);

export const fetchUsers = () => API.get("/user");
export const updateUser = (id, updatedUser) =>
  API.patch(`/user/${id}`, updatedUser);
export const getUser = (id) => API.get(`/user/${id}`);
