// Esse reducer NÃO ESTÁ EM FUNCIONAMENTO!!!
const initialState = {
  name: '',
  email: '',
};

function user(state = initialState, action) {
  switch (action.type) {
  case 'LOGIN':
    return {
      name: action.value.name,
      email: action.value.email,
    };
  default:
    return state;
  }
}

export default user;
