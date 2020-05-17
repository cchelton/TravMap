/**
 * Holds images to display as array.
 * @param {[]} state Array of images to currently display to user.
 */
const imageReducer = (state = [], action) => {
  switch (action.type) {
    case "SET_IMAGES":
      return [...action.payload];
    default:
      return state;
  }
};

export default imageReducer;
