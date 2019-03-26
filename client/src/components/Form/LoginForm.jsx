import React, { useState } from 'react';

import Api from '../../api/Api';
import './LoginForm.scss';

const LoginForm = () => {
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');

  const submit = e => {
    e.preventDefault();
    Api.post('/login', { login, password });
    console.log('login');
  };

  const register = e => {
    e.preventDefault();
    Api.post('/register', { login, password });
    console.log('register');
  };

  return (
    <form>
      <input
        type="text"
        value={login}
        name="login"
        placeholder="You login"
        onChange={e => setLogin(e.target.value)}
      />
      <br />
      <input
        type="password"
        value={password}
        name="password"
        placeholder="Your password"
        onChange={e => setPassword(e.target.value)}
      />
      <br />
      <input type="button" value="LOGIN" onClick={submit} />
      <input type="button" value="REGISTER" onClick={register} />
    </form>
  );
};

export default LoginForm;
