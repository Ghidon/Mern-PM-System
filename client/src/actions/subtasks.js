import {
  FETCH_ALL_SUBTASKS,
  CREATE_SUBTASK,
  UPDATE_SUBTASK,
  FETCH_ONE_SUBTASK,
  DELETE_ONE_SUBTASK,
} from "../constants/actionTypes";
import * as api from "../api";

export const getSubTasks = () => async (dispatch) => {
  try {
    const { data } = await api.fetchSubTasks();

    dispatch({ type: FETCH_ALL_SUBTASKS, payload: data });
  } catch (error) {
    console.log(error.message);
  }
};

export const createSubTask = (subtask) => async (dispatch) => {
  try {
    const { data } = await api.createSubTask(subtask);

    dispatch({ type: CREATE_SUBTASK, payload: data });
  } catch (error) {
    console.log(error.message);
  }
};

export const updateSubTask = (id, subtask) => async (dispatch) => {
  try {
    const { data } = await api.updateSubTask(id, subtask);

    dispatch({ type: UPDATE_SUBTASK, payload: data });
  } catch (error) {
    console.log(error.message);
  }
};

export const getSubTask = (id) => async (dispatch) => {
  try {
    const { data } = await api.getSubTask(id);

    dispatch({ type: FETCH_ONE_SUBTASK, payload: data });
  } catch (error) {
    console.log(error.message);
  }
};

export const deleteSubTask = (id) => async (dispatch) => {
  try {
    await api.deleteSubTask(id);
    dispatch({ type: DELETE_ONE_SUBTASK, payload: id });
  } catch (error) {
    console.log(error.message);
  }
};
