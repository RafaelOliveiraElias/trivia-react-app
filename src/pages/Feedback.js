import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import '../css/Feedback.css';
import WhoWant from '../images/who-want-to-be-a-millionaire.png';

class Feedback extends Component {
  constructor(props) {
    super(props);
    this.state = {
      restarted: false,
      toRanking: false,
    };
  }

  componentDidMount() {
    this.saveLocalStorage();
  }

  saveLocalStorage = () => {
    const { player: { score, assertions, name, gravatarEmail } } = this.props;
    localStorage.setItem('score', score);
    localStorage.setItem('assertions', assertions);

    const ranking = localStorage.getItem('ranking');
    const arr = '[]';
    const playersJSON = ranking || arr;
    const players = JSON.parse(playersJSON);
    const latestPlayer = { name, score, picture: gravatarEmail };
    players.push(latestPlayer);
    localStorage.setItem('ranking', JSON.stringify(players));
  }

  scoreboardResult = () => {
    const { player: { assertions } } = this.props;
    const MIN_SCORE = 3;
    if (assertions < MIN_SCORE) return (<>Could be better...&#128577;</>);
    return (<>Well Done!&#128515;</>);
  }

  render() {
    const { player } = this.props;
    const { name, score, gravatarEmail, assertions } = player;
    const { restarted, toRanking } = this.state;
    console.log(typeof assertions);
    return (
      <>
        <header>
          <div className="box-header">
            <img data-testid="header-profile-picture" src={ `https://www.gravatar.com/avatar/${gravatarEmail}` } alt="headerprofile" />
            <h2 data-testid="header-player-name">{ `Player: ${name}` }</h2>
            <h2 data-testid="header-score">{ `Score: ${score}` }</h2>
          </div>
        </header>
        <main>
          <div className="box-feedback">
            <div className="box-score-feedback">
              <img src={ WhoWant } alt="logo do jogo" />
              <h1 data-testid="feedback-text">{ this.scoreboardResult() }</h1>
              <h2 data-testid="feedback-total-score">{ `Score Total: ${score}` }</h2>
              <h2
                data-testid="feedback-total-question"
              >
                { `Assertions: ${assertions}` }
              </h2>
              <button
                type="button"
                data-testid="btn-play-again"
                onClick={ () => this.setState({ restarted: true }) }
              >
                Play Again
              </button>
              { restarted && <Redirect to="/" />}
              <button
                type="button"
                data-testid="btn-ranking"
                onClick={ () => this.setState({ toRanking: true }) }
              >
                Ranking
              </button>
              { toRanking && <Redirect to="/ranking" />}
            </div>
          </div>
        </main>
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  player: state.player,
});

Feedback.propTypes = ({
  player: PropTypes.shape({
    name: PropTypes.string,
    gravatarEmail: PropTypes.string,
  }).isRequired,
  getToken: PropTypes.func,
}).isRequire;

export default connect(mapStateToProps)(Feedback);
