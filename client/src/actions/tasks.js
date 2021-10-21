import * as api from "../api";

export const getTasks = () => async (dispatch) => {
  try {
    const { data } = await api.fetchTasks();

    dispatch({ type: "FETCH_ALL_TASKS", payload: data });
  } catch (error) {
    console.log(error.message);
  }
};

export const createTask = (task) => async (dispatch) => {
  try {
    const { data } = await api.createTask(task);

    dispatch({ type: "CREATE_TASK", payload: data });
  } catch (error) {
    console.log(error.message);
  }
};

export const updateTask = (id, task) => async (dispatch) => {
  try {
    const { data } = await api.updateTask(id, task);

    dispatch({ type: "UPDATE_TASK", payload: data });
  } catch (error) {
    console.log(error.message);
  }
};

export const getTask = (id) => async (dispatch) => {
  try {
    const { data } = await api.getTask(id);

    dispatch({ type: "FETCH_ONE_TASK", payload: data });
  } catch (error) {
    console.log(error.message);
  }
};

export const deleteTask = (id) => async (dispatch) => {
  try {
    await api.deleteTask(id);
    dispatch({ type: "DELETE_ONE_TASK", payload: id });
  } catch (error) {
    console.log(error.message);
  }
};
