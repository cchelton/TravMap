const focusedUserReducer = (state = {}, action) => {
  switch (action.type) {
    case "SET_FOCUSED_USER":
      return { ...action.payload };
    default:
      return state;
  }
};

export default focusedUserReducer;
