import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import Timer from '../components/Timer';
import {
  fetchQuestion, fetchToken, requestAnswered, requestNextQuestion, saveLogin, sumPoints,
} from '../redux/actions';
import './Play.css';

const he = require('he');

const correctAnswer = 'correct-answer';

class Play extends React.Component {
  constructor() {
    super();
    this.state = {
      clicked: false,
      questioNumber: 0,
      timeIsOver: false,
      sortedArr: [],
    };
  }

  async componentDidMount() {
    this.arraySort(0);
    const { dispatchQuestion, token, getToken, settings } = this.props;
    await dispatchQuestion(token, settings.amount, settings.link);
    const number = 3;
    const { question } = this.props;
    if (question.response_code === number) {
      await getToken();
      await dispatchQuestion(token, settings.amount);
    }
    this.arraySort(0);
    this.setState({
      difficulty: question.results[0].difficulty,
    });
  }

  timeOverFunc = () => {
    this.setState({
      timeIsOver: true,
    });
  }

  handleClick = (value) => {
    this.setState({ clicked: true });
    const { answered, time, scoreHandle } = this.props;
    const { difficulty } = this.state;
    let diffValue = 0;
    const max = 3;
    const ten = 10;
    switch (difficulty) {
    case 'hard':
      diffValue = max;
      break;
    case 'medium':
      diffValue = 2;
      break;
    default:
      diffValue = 1;
    }
    if (value === correctAnswer) {
      const points = ten + (time * diffValue);
      scoreHandle(points);
    }
    answered();
  }

  // Referência: https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array
  shuffleArray = (array) => {
    const result = array
      .map((value) => ({ value, sort: Math.random() }))
      .sort((a, b) => a.sort - b.sort)
      .map(({ value }) => value);

    return result;
  }

  arraySort = (value) => {
    const { question } = this.props;
    const incorrectAnswer = question.results[value]
      .incorrect_answers.map((element, index) => ({
        value: element,
        index,
        incorrect: 'wrong-answer',
      }));
    const result = [{ value: question.results[value].correct_answer,
      incorrect: correctAnswer }, ...incorrectAnswer];
    console.log(result);
    this.setState({ sortedArr: this.shuffleArray(result) });
  }

  handleNext = () => {
    const { dispatchNext, question, history, settings } = this.props;
    const { questioNumber } = this.state;
    if (questioNumber === settings.amount - 1) {
      history.push('/feedback');
    }
    if (questioNumber !== settings.amount - 1) {
      this.arraySort(questioNumber + 1);
    }
    this.setState((prevState) => ({
      clicked: false,
      questioNumber: prevState.questioNumber + 1,
      difficulty: question.results[prevState.questioNumber + 1].difficulty,
    }));
    dispatchNext();
  }

  // this.arraySort(questioNumber + 1);

  render() {
    const { player, question, time } = this.props;
    const { gravatarEmail, name, score } = player;
    const { clicked, questioNumber, timeIsOver, sortedArr } = this.state;
    return (
      <div>
        <header>
          <img data-testid="header-profile-picture" src={ `https://www.gravatar.com/avatar/${gravatarEmail}` } alt="headerprofile" />
          <p data-testid="header-player-name">{ name }</p>
          <p data-testid="header-score">{ score }</p>
        </header>
        {clicked || timeIsOver
          ? (
            <h1>
              { time }
            </h1>)
          : <Timer timeOverFunc={ this.timeOverFunc } clicked={ clicked } />}
        <main>
          <p
            data-testid="question-category"
          >
            {
              question.results[questioNumber].category
            }
          </p>
          <p
            data-testid="question-text"
          >
            {
              he.decode(question.results[questioNumber].question)
            }
          </p>
          <div data-testid="answer-options">
            {
              sortedArr.map((element, index) => (
                <button
                  type="button"
                  key={ index }
                  disabled={ clicked || timeIsOver }
                  className={
                    clicked || timeIsOver
                      ? element.incorrect
                      : 'normal'
                  }
                  data-testid={
                    element.incorrect === 'wrong-answer'
                      ? `wrong-answer-${index}`
                      : correctAnswer
                  }
                  onClick={ () => this.handleClick(element.incorrect) }
                >
                  { he.decode(element.value) }
                </button>
              ))
            }
            {
              clicked || timeIsOver
                ? (
                  <button
                    data-testid="btn-next"
                    type="button"
                    onClick={ this.handleNext }
                  >
                    Next
                  </button>)
                : null
            }

          </div>
        </main>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  login: (e) => dispatch(saveLogin(e)),
  dispatchQuestion: (token, amount, plus) => dispatch(fetchQuestion(token, amount, plus)),
  getToken: () => dispatch(fetchToken()),
  answered: () => dispatch(requestAnswered()),
  dispatchNext: () => dispatch(requestNextQuestion()),
  scoreHandle: (score) => dispatch(sumPoints(score)),
});

const mapStateToProps = (state) => ({
  token: state.token,
  player: state.player,
  question: state.question,
  isFetchingQuestion: state.isFetchingQuestion,
  time: state.answer.time,
  settings: state.settings,
});

Play.propTypes = ({
  player: PropTypes.shape({
    name: PropTypes.string,
    gravatarEmail: PropTypes.string,
  }).isRequired,
  getToken: PropTypes.func,
}).isRequire;

export default connect(mapStateToProps, mapDispatchToProps)(Play);
