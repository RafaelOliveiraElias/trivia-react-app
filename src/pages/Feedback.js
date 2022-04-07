import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Feedback extends Component {
  componentDidMount() {
    this.saveLocalStorage();
  }

  saveLocalStorage = () => {
    const { player: { score } } = this.props;
    const { assertions } = this.props;
    localStorage.setItem('score', score);
    localStorage.setItem('assertions', assertions);
  }

  scoreboardResult = () => {
    const { assertions } = this.props;
    const MIN_SCORE = 3;
    if (assertions < MIN_SCORE) return 'Could be better...';
    return 'Well Done!';
  }

  render() {
    const { player, assertions } = this.props;
    const { name, score, gravatarEmail } = player;
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
        </main>
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  player: state.player,
  assertions: state.assertions,
});

Feedback.propTypes = ({
  player: PropTypes.shape({
    name: PropTypes.string,
    gravatarEmail: PropTypes.string,
  }).isRequired,
  getToken: PropTypes.func,
}).isRequire;

export default connect(mapStateToProps)(Feedback);
