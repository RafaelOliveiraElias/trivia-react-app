import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { Redirect, Link } from 'react-router-dom';
import md5 from 'crypto-js/md5';
import { fetchToken, saveLogin, fetchQuestion, fetchCategories } from '../redux/actions';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      name: '',
      isInvalid: true,
      clicked: false,
    };
  }

  componentDidMount() {
    const { dispatchCates } = this.props;
    dispatchCates();
  }

  validateEmail = (email) => {
    const re = /\S+@\S+\.\S+/;
    return re.test(email);
  }

  onInputChange = ({ target }) => {
    const { name } = target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    this.setState({
      [name]: value,
    }, () => this.buttonCheck());
  }

  buttonCheck = () => {
    const { name, email } = this.state;
    if (name.length > 0 && email.length > 0) {
      this.setState({
        isInvalid: false,
      });
    } else {
      this.setState({
        isInvalid: true,
      });
    }
  }

  handleClick= async () => {
    const { login, getToken, settings } = this.props;
    await getToken();
    const { email, name } = this.state;
    const emailGenerated = await md5(email).toString();
    login({ email, name, emailGenerated });
    console.log(settings);
    // await dispatchQuestion(token, settings.amount, settings.link);
    this.setState({ clicked: true });
  }

  render() {
    const { isInvalid, clicked, name, email } = this.state;
    return (
      <div>
        <label htmlFor="name">
          Nome
          <input
            id="name"
            data-testid="input-player-name"
            type="text"
            name="name"
            onChange={ this.onInputChange }
            value={ name }
          />
        </label>
        <label htmlFor="email">
          Email:
          <input
            id="email"
            data-testid="input-gravatar-email"
            type="email"
            name="email"
            onChange={ this.onInputChange }
            value={ email }
          />
        </label>
        <button
          type="button"
          data-testid="btn-play"
          disabled={ isInvalid }
          onClick={ this.handleClick }
        >
          Play
        </button>
        {clicked && <Redirect to="/play" />}

        <Link to="/settings">
          <button
            type="button"
            data-testid="btn-settings"
          >
            Settings
          </button>
        </Link>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  login: (e) => dispatch(saveLogin(e)),
  getToken: () => dispatch(fetchToken()),
  dispatchQuestion: (token, amount, plus) => dispatch(fetchQuestion(token, amount, plus)),
  dispatchCates: () => dispatch(fetchCategories()),
});

const mapStateToProps = (state) => ({
  token: state.token,
});

Login.propTypes = ({
  login: PropTypes.func,
  getToken: PropTypes.func,
}).isRequire;

export default connect(mapStateToProps, mapDispatchToProps)(Login);
