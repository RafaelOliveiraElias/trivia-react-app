import React from 'react';
import { connect } from 'react-redux';

class Play extends React.Component {
  render() {
    console.log(this.props);
    return (
      <h1>Play</h1>
    );
  }
}

const mapStateToProps = (state) => ({
  token: state.token,
});

export default connect(mapStateToProps)(Play);
