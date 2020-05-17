/**
 * Holds user ids for displaying map images on any page other than a user page.
 */
const displayIDs = (state = [], action) => {
  switch (action.type) {
    case "SET_DISPLAY_IDS":
      return [...action.payload];
    default:
      return state;
  }
};

export default displayIDs;
