import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { receiveAnswer } from '../redux/actions';

class Timer extends Component {
  constructor() {
    super();
    this.state = {
      second: 30,
    };
  }

  componentDidMount() {
    this.timer();
  }

  timer = () => {
    const SEC = 1000;
    const timer = setInterval(() => {
      const { second } = this.state;
      const { clicked, dispatchTime } = this.props;
      this.setState((prevState) => ({
        second: prevState.second - 1,
      }));
      if (second === 1 || clicked) {
        clearInterval(timer);
        dispatchTime(second - 1);
      }
      console.log(second);
    }, SEC);
  }

  render() {
    const { second } = this.state;
    return (
      <div>
        <h1>Timer</h1>
        <h1>{ second }</h1>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  dispatchTime: (answer) => dispatch(receiveAnswer(answer)),
});

const mapStateToProps = (state) => ({
  player: state.player,
});

Timer.propTypes = ({
  player: PropTypes.shape({
    name: PropTypes.string,
    gravatarEmail: PropTypes.string,
  }).isRequired,
  getToken: PropTypes.func,
}).isRequire;

export default connect(mapStateToProps, mapDispatchToProps)(Timer);
