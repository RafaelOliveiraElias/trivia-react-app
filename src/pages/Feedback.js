import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Feedback extends Component {
  scoreboardResult = () => {
    const { player } = this.props;
    const { score } = player;
    const MIN_SCORE = 3;
    if (score < MIN_SCORE) return 'Could be better...';
    return 'Well Done!';
  }

  render() {
    const { player } = this.props;
    const { name, score, gravatarEmail } = player;
    console.log(name, score, gravatarEmail);
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
