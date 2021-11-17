/* eslint-disable import/no-anonymous-default-export */

import {
  FETCH_ALL_SUBTASKS,
  CREATE_SUBTASK,
  UPDATE_SUBTASK,
  FETCH_ONE_SUBTASK,
  DELETE_ONE_SUBTASK,
} from "../constants/actionTypes";

export default (subtasks = [], action) => {
  switch (action.type) {
    case FETCH_ALL_SUBTASKS:
      return action.payload;
    case CREATE_SUBTASK:
      return [...subtasks, action.payload];
    default:
      return subtasks;
    case DELETE_ONE_SUBTASK:
      return subtasks.filter((subtask) => subtask.id === action.payload);
    case UPDATE_SUBTASK:
      return subtasks.map((subtask) =>
        subtask._id === action.payload._id ? action.payload : subtask
      );

    case FETCH_ONE_SUBTASK:
      return action.payload;
  }
};
