export default (state = {}, action) => {
  if (action.target === "upYun") {
    switch (action.type) {
      case "replace":
        return action.payload;
      default:
        return state;
    }
  } else {
    return state;
  }
};
