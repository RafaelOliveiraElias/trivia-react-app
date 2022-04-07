import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {
  saveLogin, fetchQuestion, fetchToken, requestAnswered, requestNextQuestion,
} from '../redux/actions';
import './Play.css';
import Timer from '../components/Timer';

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
    const { dispatchQuestion, token, question, getToken } = this.props;
    await dispatchQuestion(token);
    const number = 3;
    if (question.response_code === number) {
      getToken();
      dispatchQuestion(token);
    }
    this.arraySort(0);
  }

  timeOverFunc = () => {
    this.setState({
      timeIsOver: true,
    });
  }

  handleClick = () => {
    this.setState({ clicked: true });
    const { answered } = this.props;
    /*  if (target.id === correctAnswer) {
      target.style.border = '3px solid rgb(6, 240, 15)';
    } else {
      target.style.border = '3px solid rgb(255, 0, 0)';
    } */
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
    const { dispatchNext } = this.props;
    this.setState((prevState) => ({
      clicked: false,
      questioNumber: prevState.questioNumber + 1,
    }));
    dispatchNext();
  }

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
              question.results[questioNumber].question
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
                  onClick={ this.handleClick }
                >
                  { element.value }
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
  dispatchQuestion: (token) => dispatch(fetchQuestion(token)),
  getToken: () => dispatch(fetchToken()),
  answered: () => dispatch(requestAnswered()),
  dispatchNext: () => dispatch(requestNextQuestion()),
});

const mapStateToProps = (state) => ({
  token: state.token,
  player: state.player,
  question: state.question,
  isFetchingQuestion: state.isFetchingQuestion,
  time: state.answer.time,
});

Play.propTypes = ({
  player: PropTypes.shape({
    name: PropTypes.string,
    gravatarEmail: PropTypes.string,
  }).isRequired,
  getToken: PropTypes.func,
}).isRequire;

export default connect(mapStateToProps, mapDispatchToProps)(Play);
