import * as api from "../api";

// Action Creators

export const getProjects = () => async (dispatch) => {
  //We can use here an async function thanks to thunk from redux

  try {
    const { data } = await api.fetchProjects();

    dispatch({ type: "FETCH_ALL_PROJECTS", payload: data }); // also here thanks to Thunk from redux we can dispatch the action and not just return it
  } catch (error) {
    console.log(error.message);
  }
};

export const createProject = (project) => async (dispatch) => {
  try {
    const { data } = await api.createProject(project);

    dispatch({ type: "CREATE_PROJECT", payload: data });
  } catch (error) {
    console.log(error.message);
  }
};

export const updateProject = (id, project) => async (dispatch) => {
  try {
    const { data } = await api.updateProject(id, project);

    dispatch({ type: "UPDATE_PROJECT", payload: data });
  } catch (error) {
    console.log(error.message);
  }
};

export const getProject = (id) => async (dispatch) => {
  try {
    const { data } = await api.getProject(id);

    dispatch({ type: "FETCH_ONE_PROJECT", payload: data });
  } catch (error) {
    console.log(error.message);
  }
};

export const deleteProject = (id) => async (dispatch) => {
  try {
    await api.deleteProject(id);
    dispatch({ type: "DELETE_ONE_PROJECT", payload: id });
  } catch (error) {
    console.log(error.message);
  }
};
