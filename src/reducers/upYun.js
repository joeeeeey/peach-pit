export default (state = {}, action) => {
if (action.target === "upYun") {
    switch (action.type) {
      case "replace":
        // state.upYun = action.payload;
        // return state;
        return Object.assign({
          state,
          ...action.payload
        });
      /* 不加这个注释就会有 warning */
      default:
        return state;
    }
  } else {
    return state;
  }
};
