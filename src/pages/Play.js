import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { saveLogin, fetchQuestion, fetchToken } from '../redux/actions';
import './Play.css';
import Timer from '../components/Timer';

const correctAnswer = 'correct-answer';

class Play extends React.Component {
  constructor() {
    super();
    this.state = {
      clicked: false,
    };
  }

  async componentDidMount() {
    const { dispatchQuestion, token, question, getToken } = this.props;
    await dispatchQuestion(token);
    const number = 3;
    if (question.response_code === number) {
      getToken();
      dispatchQuestion(token);
    }
  }

  handleClick = () => {
    this.setState({ clicked: true });
    console.log('123');
    /*  if (target.id === correctAnswer) {
      target.style.border = '3px solid rgb(6, 240, 15)';
    } else {
      target.style.border = '3px solid rgb(255, 0, 0)';
    } */
  }

  // Referência: https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array
  shuffleArray = (array) => {
    const result = array
      .map((value) => ({ value, sort: Math.random() }))
      .sort((a, b) => a.sort - b.sort)
      .map(({ value }) => value);

    return result;
  }

  arraySort = () => {
    const { question } = this.props;
    const incorrectAnswer = question.results[0]
      .incorrect_answers.map((element, index) => ({
        value: element,
        index,
        incorrect: 'wrong-answer',
      }));
    const result = [{ value: question.results[0].correct_answer,
      incorrect: correctAnswer }, ...incorrectAnswer];
    console.log(result);
    return this.shuffleArray(result);
  }

  render() {
    const { player, question } = this.props;
    const { gravatarEmail, name, score } = player;
    const { clicked } = this.state;
    return (
      <div>
        <header>
          <img data-testid="header-profile-picture" src={ `https://www.gravatar.com/avatar/${gravatarEmail}` } alt="headerprofile" />
          <p data-testid="header-player-name">{ name }</p>
          <p data-testid="header-score">{ score }</p>
        </header>
        <Timer clicked={ clicked } />
        <main>
          <p
            data-testid="question-category"
          >
            {
              question.results[0].category
            }
          </p>
          <p
            data-testid="question-text"
          >
            {
              question.results[0].question
            }
          </p>
          <div data-testid="answer-options">
            {
              this.arraySort().map((element, index) => (
                <button
                  type="button"
                  key={ index }
                  id={
                    element.incorrect
                  }
                  className={
                    clicked
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
});

const mapStateToProps = (state) => ({
  token: state.token,
  player: state.player,
  question: state.question,
  isFetchingQuestion: state.isFetchingQuestion,
});

Play.propTypes = ({
  player: PropTypes.shape({
    name: PropTypes.string,
    gravatarEmail: PropTypes.string,
  }).isRequired,
  getToken: PropTypes.func,
}).isRequire;

export default connect(mapStateToProps, mapDispatchToProps)(Play);
