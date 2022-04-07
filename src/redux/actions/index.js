import getToken from '../../fetchToken';
import getQuestion from '../../fetchQuestion';

export const REQUEST_TOKEN = 'REQUEST_TOKEN';
export const RECEIVE_TOKEN_SUCCESS = 'RECEIVE_TOKEN_SUCCESS';
export const RECEIVE_TOKEN_FAILURE = 'RECEIVE_TOKEN_FAILURE';
export const HANDLETIME = 'HANDLETIME';
export const LOGIN = 'LOGIN';
export const ANSWERED = 'ANSWERED';
export const NEXT_QUEST = 'NEXT_QUEST';

export const requestAnswered = () => ({
  type: ANSWERED,
});

export const requestNextQuestion = () => ({
  type: NEXT_QUEST,
});

export const requestToken = () => ({
  type: REQUEST_TOKEN,
});

export const receiveAnswer = (data) => ({
  type: HANDLETIME,
  time: data,
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

export const REQUEST_QUESTION = 'REQUEST_QUESTION';
export const RECEIVE_QUESTION_SUCCESS = 'RECEIVE_QUESTION_SUCCESS';
export const RECEIVE_QUESTION_FAILURE = 'RECEIVE_QUESTION_FAILURE';

export const requestQuestion = () => ({
  type: REQUEST_QUESTION,
});

export const receiveQuestionSuccess = (data) => ({
  type: RECEIVE_QUESTION_SUCCESS,
  question: data,
});

export const receiveQuestionFailure = (error) => ({
  type: RECEIVE_QUESTION_FAILURE,
  error,
});

export function fetchQuestion(token) {
  return async (dispatch) => {
    dispatch(requestQuestion());
    try {
      const data = await getQuestion(token);
      dispatch(receiveQuestionSuccess(data));
    } catch (error) {
      dispatch(receiveQuestionFailure(error));
    }
  };
}
