// TODO useless, remove??
import actionTypes from "constants/action-types";

export default (state = {}, action) => {
  const { payload } = action;
  switch (action.type) {
    case actionTypes.RESET_UPYUN:
      return payload;
    default:
      return state;
  }
};
