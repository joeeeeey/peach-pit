import actionTypes from 'constants/action-types';

export const updateFlattenedNode = payload => (dispatch) => {
  dispatch({
    type: actionTypes.UPDATE_FLATTENED_NODE,
    payload,
  })
};

export const removeFlattenedNode = payload => (dispatch) => {
  dispatch({
    type: actionTypes.REMOVE_FLATTENED_NODE,
    payload,
  })
};
