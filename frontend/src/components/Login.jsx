import React, { useState } from 'react';
import axios from 'axios';

const Login = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      // Points to your Render Backend
      const res = await axios.post(`https://al-code-review-assistance.onrender.com/auth/login`, { email, password });
      localStorage.setItem('token', res.data.token);
      onLogin(res.data.token);
    } catch (err) {
      alert("Login failed. Check your credentials.");
    }
  };

  return (
    <div className="p-8 bg-gray-800 rounded-lg shadow-xl text-white">
      <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
      <form onSubmit={handleLogin} className="flex flex-col gap-4">
        <input type="email" placeholder="Email" className="p-3 bg-gray-700 rounded border border-gray-600 focus:outline-none focus:border-blue-500" onChange={(e) => setEmail(e.target.value)} required />
        <input type="password" placeholder="Password" className="p-3 bg-gray-700 rounded border border-gray-600 focus:outline-none focus:border-blue-500" onChange={(e) => setPassword(e.target.value)} required />
        <button type="submit" className="bg-blue-600 hover:bg-blue-700 p-3 rounded font-semibold transition">Sign In</button>
      </form>
    </div>
  );
};

export default Login;