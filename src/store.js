import { createStore, applyMiddleware } from 'redux';
import { createLogger } from 'redux-logger';
import thunk from 'redux-thunk';
import reducer from './reducers/index';
import Immutable from 'immutable';

const middlewares = [thunk];
let store = null; // eslint-disable-line import/no-mutable-exports

// Config logger for redux
const logger = createLogger({
  stateTransformer: (state) => {
    const newState = {};
    const keys = Object.keys(state);
    for (let i = 0; i < keys.length; i++) {
      const key = keys[i];
      if (Immutable.Iterable.isIterable(state[key])) {
        newState[key] = state[key].toJS();
      } else {
        newState[key] = state[key];
      }
    }

    return newState;
  },
});


if (process.env.NODE_ENV !== 'production') {
  middlewares.push(logger);
}

store = createStore(
  reducer,
  applyMiddleware(...middlewares),
);

export default store;
