import React, { useState } from 'react';
import axios from 'axios';

const Register = ({ onToggle }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`https://al-code-review-assistance.onrender.com/auth/register`, { email, password });
      alert("Account created successfully!");
      onToggle(); // Switch back to login
    } catch (err) {
      alert("Registration failed. Email might already exist.");
    }
  };

  return (
    <div className="p-8 bg-gray-800 rounded-lg shadow-xl text-white">
      <h2 className="text-2xl font-bold mb-6 text-center">Create Account</h2>
      <form onSubmit={handleRegister} className="flex flex-col gap-4">
        <input type="email" placeholder="Email" className="p-3 bg-gray-700 rounded border border-gray-600" onChange={(e) => setEmail(e.target.value)} required />
        <input type="password" placeholder="Password" className="p-3 bg-gray-700 rounded border border-gray-600" onChange={(e) => setPassword(e.target.value)} required />
        <button type="submit" className="bg-green-600 hover:bg-green-700 p-3 rounded font-semibold transition">Register</button>
      </form>
    </div>
  );
};

export default Register;