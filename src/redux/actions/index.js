import getToken from '../../fetchToken';

export const REQUEST_TOKEN = 'REQUEST_TOKEN';
export const RECEIVE_TOKEN_SUCCESS = 'RECEIVE_TOKEN_SUCCESS';
export const RECEIVE_TOKEN_FAILURE = 'RECEIVE_TOKEN_FAILURE';
export const LOGIN = 'LOGIN';

export const requestToken = () => ({
  type: REQUEST_TOKEN,
});

export const receiveTokensSuccess = (data) => ({
  type: RECEIVE_TOKEN_SUCCESS,
  token: data.token,
});

export const receiveTokensFailure = (error) => ({
  type: RECEIVE_TOKEN_FAILURE,
  error,
});

export const saveLogin = (value) => ({
  type: LOGIN,
  value,
});

export function fetchToken() {
  return async (dispatch) => {
    dispatch(requestToken());
    try {
      const data = await getToken();
      dispatch(receiveTokensSuccess(data));
    } catch (error) {
      dispatch(receiveTokensFailure(error));
    }
  };
}
