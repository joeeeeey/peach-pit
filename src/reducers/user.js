import { evalUpdate } from "utils/eval";

export default (state = {}, action) => {
  if (action.target === "user") {
    const { value, nestedKey } = action.payload;
    switch (action.type) {
      case "update":
        return evalUpdate(state, nestedKey, value);
      case "replace":
        return Object.assign({
          state,
          ...action.payload
        });
      // state.user = action.payload;
      // return state;
      /* 不加这个注释就会有 warning */
      default:
        return state;
    }
  } else {
    return state;
  }
};
