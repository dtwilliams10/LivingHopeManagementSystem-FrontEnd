import React, { useState } from 'react';
import HeaderBar from 'components/headerBar';
import Home from 'pages/Home/Home';
import { authenticationService } from '../../services/authentication.service';

const LoginForm = () => {
const [username, setUsername] = useState("");
const [password, setPassword] = useState("");
const [user, setUser] = useState();

const handleSubmit = async e => {
  e.preventDefault();
  const response = authenticationService.login(username, password);

  setUser((await response).data);
  localStorage.setItem('user', (await response).data);
  console.log((await response).data);
}

  if (user) {
    return <Home/>;
  }

  return (
      <div>
        <HeaderBar />
        <br />
        <form onSubmit={handleSubmit} className="Login">
          <label htmlFor="username">Username</label>
          <input
            type="text"
            value={username}
            autoComplete="username"
            placeholder="Please enter your username"
            onChange={({ target }) => setUsername(target.value)}
          />
          <div>
            <label htmlFor="password">Password</label>
            <input 
              type="password"
              value={password}
              autoComplete="current-password"
              placeholder="Please enter your password"
              onChange={({ target }) => setPassword(target.value)}
            />
          </div>
          <button type="submit">Login</button>
        </form>
        <p className="registration-link">
          If you don't have an account yet, please click{' '}
          <a href="/Register">here</a> to register
        </p>
      </div>
    );   
  };

export default LoginForm; 