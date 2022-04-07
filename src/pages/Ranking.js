import React from 'react';
import { connect } from 'react-redux';

class Ranking extends React.Component {
  render() {
    console.log(this.props);
    return (
      <h1 data-testid="ranking-title">Settings</h1>
    );
  }
}

const mapStateToProps = (state) => ({
  token: state.token,
});

export default connect(mapStateToProps)(Ranking);
