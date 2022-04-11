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
      allSettings: [],
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
    const matriz = { amount, type, difficulty, category };
    this.setState((prev) => ({
      category: '',
      difficulty: '',
      type: '',
      amount: 5,
      redirect: false,
      allSettings: [...prev.allSettings, matriz],
    }));
    const { allSettings } = this.state;
    console.log([...allSettings, matriz]);
    dispatchSettings([...allSettings, matriz]);
  }

  handleDelete = (index) => {
    const { allSettings } = this.state;
    const { dispatchSettings } = this.props;
    this.setState((prev) => ({
      allSettings: prev.allSettings.filter((actual, next) => next !== index),
    }));
    dispatchSettings(allSettings.filter((actual, next) => next !== index));
  }

  render() {
    const { categories } = this.props;
    const { amount, redirect, allSettings, category, difficulty, type } = this.state;
    return (
      <main className="main-settings">
        <div className="box-settings">
          <img src={ WhoWant } alt="logo do jogo" />
          <h1 data-testid="settings-title">
            Settings
          </h1>
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
            <select
              id="category"
              name="category"
              onChange={ this.onInputChange }
              value={ category }
            >
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
            <select
              id="difficulty"
              name="difficulty"
              onChange={ this.onInputChange }
              value={ difficulty }
            >
              <option value="">Any difficulty</option>
              <option value="easy">Easy</option>
              <option value="medium">Medium</option>
              <option value="hard">Hard</option>
            </select>
          </label>
          <label htmlFor="type">
            Type:
            <select id="type" name="type" value={ type } onChange={ this.onInputChange }>
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
        <table className="box-table">
          <thead>
            <tr>
              <th>Category</th>
              <th>Difficulty</th>
              <th>Type</th>
              <th>Amount</th>
              <th>Edit</th>
            </tr>
          </thead>
          <tbody>
            {allSettings.map((each, index) => (
              <tr id={ index } key={ index }>
                <td>
                  { each.category
                    ? categories
                      .find((cats) => cats.id === Number(each.category)).name
                    : 'Any category'}
                </td>
                <td>{each.difficulty ? each.difficulty : 'Any Difficulty'}</td>
                <td>{each.type ? each.type : 'Any Type'}</td>
                <td>{each.amount}</td>
                <td>
                  <button
                    type="button"
                    onClick={ () => this.handleDelete(index) }
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
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
