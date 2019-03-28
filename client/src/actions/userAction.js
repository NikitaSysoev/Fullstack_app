import Api from '../api/Api';

export function getUsers(dispatch) {
  return Api.get('/users').then(data => {
    return dispatch({
      type: 'USER_GET',
      payload: data
    });
  });
}
