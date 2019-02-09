import { evalUpdate } from "utils/eval";
import actionTypes from "constants/action-types";

export default (state = {}, action) => {
  const { payload } = action;
  switch (action.type) {
    case actionTypes.UPDATE_ADMINISTRATOR:
      return evalUpdate(state, payload.nestedKey, payload.value);
    case actionTypes.RESET_ADMINISTRATOR:
      return payload;
    default:
      return state;
  }
};
