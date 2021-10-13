import * as api from "../api";

// Action Creators

export const getProjects = () => async (dispatch) => {
  //We can use here an async function thanks to thunk from redux

  try {
    const { data } = await api.fetchProjects();

    dispatch({ type: "FETCH_ALL", payload: data }); // also here thanks to Thunk from redux we can dispatch the action and not just return it
  } catch (error) {
    console.log(error.message);
  }
};

export const createProject = (project) => async (dispatch) => {
  try {
    const { data } = await api.createProject(project);

    dispatch({ type: "CREATE", payload: data });
  } catch (error) {
    console.log(error.message);
  }
};
