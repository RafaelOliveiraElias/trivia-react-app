import { RECEIVE_TOKEN_FAILURE, RECEIVE_TOKEN_SUCCESS, REQUEST_TOKEN } from '../actions';

const INITIAL_STATE = {
  token: '',
  player: { name: '',
    email: '',
    score: 0,
    gravatarEmail: '',
  },
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
      player: { name: action.value.name,
        email: action.value.email,
        gravatarEmail: action.value.emailGenerated,
        score: 0,
      },
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
