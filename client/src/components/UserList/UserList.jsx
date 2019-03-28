import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';

import Api from '../../api/Api';
import { getUsers } from '../../actions/userAction';

const UserList = ({ getUsers, list }) => {
  // const [list, setList] = useState([]);
  useEffect(() => {
    // Api.get('/users').then(data => setList(data));
    getUsers();
  },[]);
  return (
    <div className="UserList">
      <ul>
        {list.map(item => {
          return <li key={item._id}>{item.login}</li>;
        })}
      </ul>
    </div>
  );
};

function mapStateToProps(state) {
  return {
    list: state.users.users
  };
}

const mapDispatchToProps = dispatch => {
  return {
    getUsers: () => getUsers(dispatch)
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UserList);
