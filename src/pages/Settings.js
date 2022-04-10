import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { actionSettings } from '../redux/actions';
import '../css/Settings.css';
import WhoWant from '../images/who-want-to-be-a-millionaire.png';

class Settings extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      category: '',
      difficulty: '',
      type: '',
      amount: 5,
      redirect: false,
    };
  }

  onInputChange = ({ target }) => {
    const { name } = target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    this.setState({
      [name]: value,
    });
  }

  handleClick = () => {
    const { amount, type, difficulty, category } = this.state;
    const { dispatchSettings } = this.props;
    const matriz = [{ type }, { difficulty }, { category }];
    const linkGen = matriz.reduce((latest, each) => {
      if (Object.values(each)[0]) {
        let result = latest;
        result += `&${Object.keys(each)[0]}=${Object.values(each)[0]}`;
        return result;
      }
      return latest;
    }, '');
    const result = {
      amount, link: linkGen,
    };
    dispatchSettings(result);
    console.log(linkGen);
  }

  render() {
    const { categories } = this.props;
    const { amount, redirect } = this.state;
    return (
      <main className="main-settings">
        <div className="box-settings">
          <img src={ WhoWant } alt="logo do jogo" />
          <h1 data-testid="settings-title">
            Settings
          </h1>
          </div>
          <label htmlFor="amount">
            Number of Questions:
            <input
              type="number"
              name="amount"
              id="amount"
              min="1"
              max="50"
              value={ amount }
              onChange={ this.onInputChange }
            />
          </label>
          <label htmlFor="category">
            Category:
            <select id="category" name="category" onChange={ this.onInputChange }>
              {categories.map((each) => (
                <option
                  value={ each.id }
                  key={ each.id }
                >
                  {each.name}
                </option>
              ))}
            </select>
          </label>
          <label htmlFor="difficulty">
            Difficulty:
            <select id="difficulty" name="difficulty" onChange={ this.onInputChange }>
              <option value="">Any difficulty</option>
              <option value="easy">Easy</option>
              <option value="medium">Medium</option>
              <option value="hard">Hard</option>
            </select>
          </label>
          <label htmlFor="type">
            Type:
            <select id="type" name="type" onChange={ this.onInputChange }>
              <option value="">Any type</option>
              <option value="multiple">Multiple Choice</option>
              <option value="boolean">True / false</option>
            </select>
          </label>
          <button
            type="button"
            onClick={ this.handleClick }
          >
            Save Seetings
          </button>
          <button
            type="button"
            data-testid="btn-go-home"
            onClick={ () => this.setState({ redirect: true }) }
          >
            Play Again
          </button>
          { redirect && <Redirect to="/" />}
        </div>
      </main>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  dispatchSettings: (value) => dispatch(actionSettings(value)),
});

const mapStateToProps = (state) => ({
  categories: state.categories,
});

Settings.propTypes = ({
  player: PropTypes.shape({
    name: PropTypes.string,
    gravatarEmail: PropTypes.string,
  }).isRequired,
  getToken: PropTypes.func,
}).isRequire;

export default connect(mapStateToProps, mapDispatchToProps)(Settings);
