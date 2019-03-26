import React, { useEffect, useState } from 'react';

import Api from '../../api/Api';

const UserList = () => {
  const [list, setList] = useState([]);
  useEffect(() => {
    Api.get('/users').then(data => setList(data));
  }, []);
  return (
    <div className="UserList">
      <ul>
        {list.map(item => {
          return <li key={item._id}>{item.login}</li>
        })}
      </ul>
    </div>
  );
};

export default UserList;
