const userReducer = (state = { users: [] }, action) => {
  if (action.type === 'USER_GET') {
    return {
      ...state,
      users: action.payload
    };
  }
  return state;
};

export default userReducer;