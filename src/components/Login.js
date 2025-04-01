import React from 'react';

export default function Login({ login, setLogin, handleLogin }) {
  return (
    <div className="login-box">
      <h2>Login</h2>
      <input
        type="text"
        placeholder="Username"
        value={login.username}
        onChange={(e) => setLogin({ ...login, username: e.target.value })}
      />
      <input
        type="password"
        placeholder="Password"
        value={login.password}
        onChange={(e) => setLogin({ ...login, password: e.target.value })}
      />
      <button onClick={handleLogin}>Login</button>
    </div>
  );
}
