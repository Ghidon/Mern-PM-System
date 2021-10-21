/* eslint-disable import/no-anonymous-default-export */
export default (tasks = [], action) => {
  switch (action.type) {
    case "FETCH_ALL_TASKS":
      return action.payload;
    case "CREATE_TASK":
      return [...tasks, action.payload];
    default:
      return tasks;
    case "DELETE_ONE_TASK":
      return tasks.filter((task) => task.id === action.payload);
    case "UPDATE_TASK":
      return tasks.map((task) =>
        task._id === action.payload._id ? action.payload : task
      );

    case "FETCH_ONE_TASK":
      return action.payload;
  }
};
