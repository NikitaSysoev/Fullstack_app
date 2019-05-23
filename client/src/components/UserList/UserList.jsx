import React, { useEffect } from 'react';
import { connect } from 'react-redux';

import { getUsers } from '../../actions/userAction';

const UserList = ({ getUsers, list }) => {
  useEffect(() => {
    getUsers();
  }, []);
  return (
    <div className="UserList">
      <ul>
        {list.map(item => (
          <li key={item._id}>{item.login}</li>
        ))}
      </ul>
    </div>
  );
};

const mapStateToProps = state => {
  return {
    list: state.users.users
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getUsers: () => getUsers(dispatch)
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UserList);
