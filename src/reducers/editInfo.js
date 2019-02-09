import { evalUpdate } from "utils/eval";

export default (state = {}, action) => {
  // console.log(`store action here ${action.type}`)
  if (action.target === "editInfo") {
    let { value, nestedKey } = action.payload;
    switch (action.type) {
      case "replace":
        return action.payload;
      case "update":
        return evalUpdate(state, nestedKey, value);

      /* 不加这个注释就会有 warning */
      default:
        return state;
    }
  } else {
    return state;
  }
};
