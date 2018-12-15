import { evalUpdate } from "utils/eval";

export default (state = {}, action) => {
  if (action.target === "administrator") {
    const { value, nestedKey } = action.payload;
    switch (action.type) {
      case "update":
        // evalUpdate(state["administrator"], action.payload.nestedKey, value);
        // return state;
        return evalUpdate(state, nestedKey, value);
      case "replace":
        return Object.assign({
          state,
          ...action.payload
        });
      // state.administrator = action.payload;
      // return state;
      /* 不加这个注释就会有 warning */
      default:
        return state;
    }
  } else {
    return state;
  }
};
