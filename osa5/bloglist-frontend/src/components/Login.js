import React from 'react'

const Login = ({username, password, setUsername, setPassword, handleLogin}) => (
  <div>
    <h1>log in to application</h1>
    <form onSubmit={handleLogin}>
      <div>
        username
        <input
        type="text"
        value={username}
        name="Username"
        onChange={ ({ target }) => setUsername(target.value) }
        />
      </div>
      <div>
        password
        <input
        type="text"
        value={password}
        name="Password"
        onChange={ ({ target }) => setPassword(target.value) }
        />
      </div>
      <button type="submit">Login</button>
    </form>
  </div>
)

export default Login
