import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { receiveAnswer } from '../redux/actions';

class Timer extends Component {
  componentDidMount() {
    this.timer();
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  timer = () => {
    const SEC = 1000;
    this.interval = setInterval(() => {
      const { dispatchTime, timeOverFunc, time } = this.props;
      dispatchTime(time - 1);
      if (time <= 1) {
        clearInterval(this.interval);
        timeOverFunc();
      }
    }, SEC);
  }

  render() {
    const { time, click } = this.props;
    if (click) {
      clearInterval(this.interval);
    }
    return (
      <div>
        <h1>{ time }</h1>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  dispatchTime: (answer) => dispatch(receiveAnswer(answer)),
});

const mapStateToProps = (state) => ({
  click: state.answer.click,
  time: state.answer.time,
});

Timer.propTypes = ({
  player: PropTypes.shape({
    name: PropTypes.string,
    gravatarEmail: PropTypes.string,
  }).isRequired,
  getToken: PropTypes.func,
}).isRequire;

export default connect(mapStateToProps, mapDispatchToProps)(Timer);
