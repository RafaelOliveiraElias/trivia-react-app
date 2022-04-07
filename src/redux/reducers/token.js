import {
  ANSWERED, RECEIVE_TOKEN_SUCCESS, REQUEST_TOKEN,
  RECEIVE_QUESTION_SUCCESS, REQUEST_QUESTION, HANDLETIME, NEXT_QUEST,
} from '../actions';

const INITIAL_STATE = {
  token: '',
  question: {
    response_code: 0,
    results: [
      {
        category: 'Loading',
        question: 'loading',
        correct_answer: 'A crowbar',
        incorrect_answers: [
          'A pistol',
          'The H.E.V suit',
          'Your fists',
        ],
      },
    ],
  },
  player: { name: '',
    email: '',
    score: 0,
    gravatarEmail: '',
  },
  answer: {
    time: 30,
    click: false,
  },
  isFetchingQuestion: true,
  isFetching: false,
};

function token(state = INITIAL_STATE, action) {
  switch (action.type) {
  case REQUEST_QUESTION:
    return { ...state, isFetchingQuestion: true };
  case REQUEST_TOKEN:
    return { ...state, isFetching: true };
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
    return { ...state, isFetching: false, token: action.token };
  case RECEIVE_QUESTION_SUCCESS:
    return { ...state, isFetchingQuestion: false, question: action.question };
  case HANDLETIME:
    return { ...state, answer: { time: action.time },
    };
  case ANSWERED:
    return {
      ...state,
      answer: {
        click: true,
      },
    };
  case NEXT_QUEST:
    return {
      ...state,
      answer: {
        click: false,
        time: 30,
      },
    };
  default:
    return state;
  }
}

export default token;
