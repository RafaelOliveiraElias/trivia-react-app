import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';

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
    const { player: { score, assertions } } = this.props;
    localStorage.setItem('score', score);
    localStorage.setItem('assertions', assertions);
  }

  scoreboardResult = () => {
    const { player: { assertions } } = this.props;
    const MIN_SCORE = 3;
    if (assertions < MIN_SCORE) return 'Could be better...';
    return 'Well Done!';
  }

  render() {
    const { player } = this.props;
    const { name, score, gravatarEmail, assertions } = player;
    const { restarted, toRanking } = this.state;
    console.log(typeof assertions);
    return (
      <>
        <header>
          <h1>Feedback</h1>
          <img data-testid="header-profile-picture" src={ `https://www.gravatar.com/avatar/${gravatarEmail}` } alt="headerprofile" />
          <h3 data-testid="header-player-name">{ name }</h3>
          <h3 data-testid="header-score">{ score }</h3>
        </header>
        <main>
          <h1 data-testid="feedback-text">{ this.scoreboardResult() }</h1>
          <h2 data-testid="feedback-total-score">{ score }</h2>
          <h2 data-testid="feedback-total-question">{ assertions }</h2>
          <section>
            <button
              type="button"
              data-testid="btn-play-again"
              onClick={ () => this.setState({ restarted: true }) }
            >
              Play Again
            </button>
          </section>
          { restarted && <Redirect to="/" />}
          <section>
            <button
              type="button"
              data-testid="btn-ranking"
              onClick={ () => this.setState({ toRanking: true }) }
            >
              Ranking
            </button>
          </section>
          { toRanking && <Redirect to="/ranking" />}
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
