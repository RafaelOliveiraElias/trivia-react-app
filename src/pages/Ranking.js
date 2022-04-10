import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import WhoWant from '../images/who-want-to-be-a-millionaire.png';
import GoldMedal from '../images/goldMedal.png';
import '../css/Ranking.css';

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
        <header>
          <div className="box-header-ranking">
            <div>
              <img
                src={ GoldMedal }
                alt="imagem medalha de ouro"
                className="gold-medal-img"
              />
            </div>
            <div className="box-header-title">
              <img src={ WhoWant } alt="logo do jogo" className="who-want-img" />
              <h1 data-testid="ranking-title">Ranking</h1>
            </div>
          </div>
        </header>
        <section className="box-main-ranking">
          <section className="box-list-ranking">
            {ranking.map((each, index) => (
              <div key={ index } className="box-each-ranking">
                <div className="box-position-ranking">
                  <h3>{`${index + 1}.`}</h3>
                  <img src={ `https://www.gravatar.com/avatar/${each.picture}` } alt={ each.name } />
                </div>
                <div className="box-details-ranking">
                  <h3 data-testid={ `player-name-${index}` }>{each.name}</h3>
                  <h3 data-testid={ `player-score-${index}` }>{each.score}</h3>
                </div>
              </div>
            ))}
          </section>
          <section className="box-button-ranking">
            <button
              type="button"
              data-testid="btn-go-home"
              onClick={ () => this.setState({ redirect: true }) }
            >
              Play Again
            </button>
            { redirect && <Redirect to="/" />}
          </section>
        </section>
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  token: state.token,
});

export default connect(mapStateToProps)(Ranking);
