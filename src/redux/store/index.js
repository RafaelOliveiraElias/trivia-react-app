import { applyMiddleware, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
// import rootReducer from '../reducers';
import token from '../reducers/token';

const store = createStore(
  // rootReducer,
  token,
  composeWithDevTools(applyMiddleware(thunk)),
);

if (window.Cypress) {
  window.store = store;
}

export default store;
