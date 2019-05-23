import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

import LoginForm from './components/Form/LoginForm';
import UserList from './components/UserList/UserList';



const App = () => {
  return (
    <div className="App d-flex justify-content-around">
      <LoginForm />
      <UserList />
    </div>
  );
};

export default App;
