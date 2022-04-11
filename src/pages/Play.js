import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import Timer from '../components/Timer';
import {
  fetchQuestion, fetchToken, requestAnswered, requestNextQuestion, saveLogin, sumPoints,
} from '../redux/actions';
import '../css/Play.css';
import WhoWant from '../images/who-want-to-be-a-millionaire.png';
import music from '../components/music.mp3';

const he = require('he');

const correctAnswer = 'correct-answer';

class Play extends React.Component {
  audio = new Audio(music)

  constructor() {
    super();
    this.state = {
      clicked: false,
      questioNumber: 0,
      timeIsOver: false,
      sortedArr: [],
      play: true,
    };
  }

  async componentDidMount() {
    this.arraySort(0);
    this.audio.play();
    const { dispatchQuestion, token, getToken, matrix } = this.props;
    await dispatchQuestion(matrix, token);
    const number = 3;
    const { question } = this.props;
    if (question.response_code === number) {
      await getToken();
      await dispatchQuestion(matrix, token);
    }
    this.arraySort(0);
    this.setState({
      difficulty: question.results[0].difficulty,
    });
  }

  componentWillUnmount() {
    this.audio.removeEventListener('ended', () => this.setState({ play: false }));
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
    this.setState({ sortedArr: this.shuffleArray(result) });
  }

  togglePlay = () => {
    this.setState({ play: !this.state.play }, () => {
      this.state.play ? this.audio.play() : this.audio.pause();
    });
  }

  handleNext = () => {
    const { dispatchNext, question, history } = this.props;
    const { questioNumber } = this.state;
    if (questioNumber === question.results.length - 1) {
      this.audio.pause();
      history.push('/feedback');
    }
    if (questioNumber !== question.results.length - 1) {
      this.arraySort(questioNumber + 1);
    }
    this.setState((prevState) => ({
      clicked: false,
      timeIsOver: false,
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
      <div className="box-play">
        <header>
          <div className="box-header">
            <img data-testid="header-profile-picture" src={ `https://www.gravatar.com/avatar/${gravatarEmail}` } alt="headerprofile" />
            <h2 data-testid="header-player-name">{ `Player: ${name}` }</h2>
            <h2 data-testid="header-score">{ `Score: ${score}` }</h2>
            <button
              className="btn-music"
              type="button"
              onClick={ this.togglePlay }
            >
              { this.play ? 'Pause' : 'Play' }
            </button>
          </div>
        </header>
        <section className="box-timer">
          {clicked || timeIsOver
            ? (
              <div className="timerBg">
                <span className="numberStop">
                  { time }
                </span>
              </div>)
            : <Timer timeOverFunc={ this.timeOverFunc } clicked={ clicked } />}
        </section>
        <main className="box-play-game">
          <div data-testid="answer-options" className="box-question">
            <img src={ WhoWant } alt="logo do jogo" />
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
            {
              clicked || timeIsOver
                ? (
                  <button
                    data-testid="btn-next"
                    type="button"
                    className="btn-next"
                    onClick={ this.handleNext }
                  >
                    Next
                  </button>)
                : null
            }
          </div>
          <div data-testid="answer-options" className="box-answers">
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
          </div>
        </main>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  login: (e) => dispatch(saveLogin(e)),
  dispatchQuestion: (matrix, token) => dispatch(fetchQuestion(matrix, token)),
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
  matrix: state.matrix,
});

Play.propTypes = ({
  player: PropTypes.shape({
    name: PropTypes.string,
    gravatarEmail: PropTypes.string,
  }).isRequired,
  getToken: PropTypes.func,
}).isRequire;

export default connect(mapStateToProps, mapDispatchToProps)(Play);
