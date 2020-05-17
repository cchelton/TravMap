/**
 * Holds arr of people who are requesting to be the user's friend.
 */
const requestReducer = (state = [], action) => {
  switch (action.type) {
    case "SET_FRIEND_REQUESTS":
      return [...action.payload];
    default:
      return state;
  }
};

export default requestReducer;
