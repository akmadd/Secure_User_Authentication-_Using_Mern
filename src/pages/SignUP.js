import React, {useState, useEffect} from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const SignUP = () => {
  const [user, setUsers] = useState([])
  const [email, setEmail] = useState('')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()

  useEffect(()=>{
    fetchUsers();
  }, [])

  const fetchUsers = () =>{
    axios
    .get('http://localhost:9001/register')
    .then((res) => {
      console.log(res.data);
      
    })
  }

  const handleRegister = (event) =>{
    event.preventDefault();
    axios
    .post('http://localhost:9001/register', {email, username, password})
    .then(()=>{
      alert('Registration Succesful')
      setEmail('')
      setUsername('')
      setPassword('')
      fetchUsers()
      navigate('/login')
    })
    try {
      
    } catch (error) {
      console.log('unable to register user');
      
    }
  }

  return (
    <div className='w-full h-screen flex'>
        <div className='w-[50%] h-[100%] bg-zinc-950 text-white flex justify-center items-center'>
          <form className='text-center border rounded-lg w-[600px] h-[400px] p-9'>
          {/* Email Input */}
          <label>Email</label>
          <br />
          <input className=' w-[400px] h-[40px] rounded-xl bg-zinc-700 p-2 ' type='text' placeholder='Enter your email '
          value={email}
          onChange={(e) => setEmail(e.target.value)} />
          <br />
          <br />
          {/* username */}
          <label>Username</label>
          <br />
          <input className=' w-[400px] h-[40px] rounded-xl bg-zinc-700 p-2 ' type='text' placeholder='Enter your username ' 
          value={username}
          onChange={(e) => setUsername(e.target.value)} />
          <br />
          <br />
          {/* Password */}
          <label>Password</label>
          <br />
          <input className=' w-[400px] h-[40px] rounded-xl bg-zinc-700 p-2 ' type='password' placeholder='Enter your password ' 
          value={password}
          onChange={(e) => setPassword(e.target.value)}/>
          <br />
          <br />
          {/* Btn */}
          <button className=' w-[200px] h-[50px] border hover:bg-teal-900 ' type='submit' onClick={handleRegister} >Sign Up</button>
          </form>
        </div>
        <div className=' w-[50%] h-[100%] flex justify-center items-center bg-teal-800 ' >
          <h2 className=' text-3xl text-white ' >SIGNUP</h2>
        </div>
    </div>
  )
}

export default SignUP
