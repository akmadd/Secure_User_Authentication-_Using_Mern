import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [user, setUsers] = useState(null); // State to store the logged-in user's information
  const [username, setUsername] = useState(''); 
  const [password, setPassword] = useState(''); 
  const navigate = useNavigate(); 

  // Function to handle user login
  const handleLogin = async (event) => {
    event.preventDefault(); 
    try {
      
      const response = await axios.post('http://localhost:9001/login', { username, password });
      
      // Extract token and user data from the server's response
      const token = response.data.token;
      const userData = response.data.user;

      // Store the token in localStorage for authentication
      localStorage.setItem('token', token);

      // Update the user state with the logged-in user information
      setUsers(userData);

      
      alert('Login Successful');

      navigate('/account');

    } catch (error) {
      console.log('Unable to login user:', error);
      
      alert('Login failed. Please try again.');
    }
  };

  return (
    <div className='w-full h-screen flex'>
    
      <div className='w-[50%] h-[100%] bg-zinc-950 text-white flex justify-center items-center'>
        <form className='text-center border rounded-lg w-[600px] h-[400px] p-9' onSubmit={handleLogin}>

          {/* Username input */}
          <label>Username</label>
          <br />
          <input
            className='w-[400px] h-[40px] rounded-xl bg-zinc-700 p-2'
            type='text'
            placeholder='Enter your username'
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <br />
          <br />
          {/* Password input */}
          <label>Password</label>
          <br />
          <input
            className='w-[400px] h-[40px] rounded-xl bg-zinc-700 p-2'
            type='password'
            placeholder='Enter your password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <br />
          <br />
          {/* Login button */}
          <button className='w-[200px] h-[50px] border hover:bg-teal-900' type='submit'>
            Log In
          </button>
        </form>
      </div>

      
      <div className='w-[50%] h-[100%] flex justify-center items-center bg-teal-800'>
        <h2 className='text-3xl text-white'>LOGIN</h2>
      </div>

      
      {user && (
        <div className='w-full text-center mt-4'>
          <h3>Welcome, {user.username}!</h3>
          <p>Email: {user.email}</p>
        </div>
      )}
    </div>
  );
};

export default Login;
