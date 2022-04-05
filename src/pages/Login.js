import React from 'react';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      name: '',
      isInvalid: true,
    };
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

  render() {
    const { isInvalid } = this.state;
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
          />
        </label>
        <button
          type="button"
          data-testid="btn-play"
          disabled={ isInvalid }
        >
          Play
        </button>
      </div>
    );
  }
}

export default Login;
