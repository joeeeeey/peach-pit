import { evalUpdate } from "utils/eval";
import actionTypes from "constants/action-types";

export default (state = {}, action) => {
  const { payload } = action;
  switch (action.type) {
    case actionTypes.RESET_EDIT_INFO:
      return action.payload;
    case actionTypes.UPDATE_EDIT_INFO:
      return evalUpdate(state, payload.nestedKey, payload.value);
    default:
      return state;
  }
};
