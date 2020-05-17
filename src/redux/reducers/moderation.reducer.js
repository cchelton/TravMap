/**
 * Holds array of all images for moderator. This is how the moderation table is secured
 * If a non moderator user reaches this page, the request gets an empty result;
 */
const moderationReducer = (state = [], action) => {
  switch (action.type) {
    case "SET_MODERATION_IMAGES":
      return [...action.payload];
    default:
      return state;
  }
};

export default moderationReducer;
