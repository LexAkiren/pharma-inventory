import React from 'react';

export default function Login({ login, setLogin, handleLogin }) {
  const handleChange = (e) => {
    setLogin({ ...login, [e.target.name]: e.target.value });
  };

  return (
    <div className="App">
      <h2>Login</h2>
      <input name="username" placeholder="Username" onChange={handleChange} />
      <input name="password" type="password" placeholder="Password" onChange={handleChange} />
      <button onClick={handleLogin}>Login</button>
    </div>
  );
}
