const focusedUserImageReducer = (state = [], action) => {
  switch (action.type) {
    case "SET_FOCUSED_USER_IMAGES":
      return [...action.payload];
    default:
      return state;
  }
};

export default focusedUserImageReducer;
