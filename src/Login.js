import React, { useState } from 'react';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [userInfo, setUserInfo] = useState(null);
  const [error, setError] = useState('');
    const [token, setToken] = useState('');
  const handleLogin = async () => {
    try {
      const response = await axios.post('http://localhost:5264/api/User/SignIn', {
        email,
        password,
      });

       alert('Login successful!');

       alert(response.data);

      alert(typeof response.data);

      const { token } = response.data;

      setToken(token);
      //alert(token);

      // Decode the JWT
      const decoded = jwtDecode(response.data);

      // Extract the claims

      alert(decoded);

      const { role, FirstName, DateofBirth } = decoded;

      // Save user info
      setUserInfo({ role, FirstName, DateofBirth });

      // Store the token (optional, for future API requests)
      localStorage.setItem('jwtToken', response.data);
    } catch (error) {
      setError('Login failed. Please check your credentials.' + error.message);
    }
  };

  return (
    <div>
      <h1>Login</h1>
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleLogin}>Sign In</button>

      {userInfo && (
        <div>
          <h2>Welcome, {userInfo.role}</h2>
          <p>User ID: {userInfo.FirstName}</p>
          <p>Date of Birth: {userInfo.DateofBirth}</p>
        </div>
      )}

      {error && <p style={{ color: 'red' }}>{error}</p>}
      <div>
      <input
        type="text"
        placeholder="token"
        value={token}
      
      />
      </div>
    </div>
 
  );
}

export default Login;
