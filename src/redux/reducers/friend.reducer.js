/**
 * Holds user's friends as array.
 * Updated whenever the friends list is expanded.
 */
const friendReducer = (state = [], action) => {
  switch (action.type) {
    case "SET_FRIENDS":
      return [...action.payload];
    default:
      return state;
  }
};

export default friendReducer;
