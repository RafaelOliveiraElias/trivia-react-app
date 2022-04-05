import { RECEIVE_TOKEN_FAILURE, RECEIVE_TOKEN_SUCCESS, REQUEST_TOKEN } from '../actions';

const INITIAL_STATE = {
  token: '',
  name: '',
  email: '',
};

function token(state = INITIAL_STATE, action) {
  switch (action.type) {
  case REQUEST_TOKEN:
    return {
      ...state,
      isFetching: true,
    };
  case 'LOGIN':
    return {
      ...state,
      name: action.value.name,
      email: action.value.email,
    };
  case RECEIVE_TOKEN_SUCCESS:
    return {
      ...state,
      isFetching: false,
      token: action.token,
    };
  case RECEIVE_TOKEN_FAILURE:
    return {
      ...state,
      isFetching: false,
      error: action.error,
    };
  default:
    return state;
  }
}

export default token;
