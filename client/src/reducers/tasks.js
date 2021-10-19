/* eslint-disable import/no-anonymous-default-export */
export default (tasks = [], action) => {
  switch (action.type) {
    case "FETCH_ALL_TASKS":
      return action.payload;
    case "CREATE_TASK":
      return [...tasks, action.payload];
    default:
      return tasks;
  }
};
