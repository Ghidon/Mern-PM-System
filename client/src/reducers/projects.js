/* eslint-disable import/no-anonymous-default-export */
export default (projects = [], action) => {
  switch (action.type) {
    case "FETCH_ALL":
      return action.payload;
    case "CREATE":
      return [...projects, action.payload];
    default:
      return projects;
  }
};
