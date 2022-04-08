import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

class Ranking extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      redirect: false,
      ranking: [],
    };
  }

  componentDidMount() {
    const ranking = window.localStorage.getItem('ranking');
    const rankingValues = JSON.parse(ranking);
    const sortedPlayers = rankingValues.sort((a, b) => b.score - a.score);
    this.setState({ ranking: sortedPlayers });
  }

  render() {
    console.log(this.props);
    const { redirect, ranking } = this.state;
    return (
      <>
        <h1 data-testid="ranking-title">Ranking</h1>
        <section>
          {ranking.map((each, index) => (
            <div key={ index }>
              <h3>{`${index + 1}.`}</h3>
              <img src={ `https://www.gravatar.com/avatar/${each.picture}` } alt={ each.name } />
              <h3 data-testid={ `player-name-${index}` }>{each.name}</h3>
              <h3 data-testid={ `player-score-${index}` }>{each.score}</h3>
            </div>
          ))}
        </section>
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
