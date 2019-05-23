import Api from '../api/Api';

export const getUsers = async dispatch => {
  const users = await Api.get('/users');
  return dispatch({
    type: 'USER_GET',
    payload: users
  });
};

export const addUser = user => {
  return {
    type: 'ADD_USER',
    payload: user
  };
};

export const deleteUser = user => {
  return {
    type: 'DELETE_USER',
    payload: user
  };
};

export const updateUser = (user, updates) => {
  return {
    type: 'UPDATE_USER',
    payload: {
      user,
      updates
    }
  };
};
