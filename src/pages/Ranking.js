import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

class Ranking extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      redirect: false,
    };
  }

  render() {
    console.log(this.props);
    const { redirect } = this.state;
    return (
      <>
        <h1 data-testid="ranking-title">Ranking</h1>
        <section>
          <button
            type="button"
            data-testid="btn-go-home"
            onClick={ () => this.setState({ redirect: true }) }
          >
            Play Again
          </button>
          { redirect && <Redirect to="/" />}
        </section>
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  token: state.token,
});

export default connect(mapStateToProps)(Ranking);
