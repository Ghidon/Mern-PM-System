/* eslint-disable import/no-anonymous-default-export */
export default (projects = [], action) => {
  switch (action.type) {
    case "FETCH_ALL_PROJECTS":
      return action.payload;
    case "CREATE_PROJECT":
      return [...projects, action.payload];
    default:
      return projects;
    case "DELETE_ONE_PROJECT":
      return projects.filter((project) => project.id === action.payload);
    case "UPDATE_PROJECT":
      return projects.map((project) =>
        project._id === action.payload._id ? action.payload : project
      );

    case "FETCH_ONE_PROJECT":
      return action.payload;
  }
};
