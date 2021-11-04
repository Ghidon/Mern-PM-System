/* eslint-disable import/no-anonymous-default-export */

import {
  FETCH_ALL_USERS,
  FETCH_ONE_USER,
  UPDATE_USER,
} from "../constants/actionTypes";

export default (users = [], action) => {
  switch (action.type) {
    case FETCH_ALL_USERS:
      return action.payload;
    case UPDATE_USER:
      return users.map((user) =>
        user._id === action.payload._id ? action.payload : user
      );
    case FETCH_ONE_USER:
      return action.payload;
    default:
      return users;
  }
};
