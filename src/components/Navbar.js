import React from 'react'
import { Link, useNavigate } from 'react-router-dom'


const Navbar = () => {
  const isUserSignedIn = !!localStorage.getItem('token')
  const navigate = useNavigate();

  const handleSignOut = () => {
    localStorage.removeItem('token')
    navigate('/login')
  }


  return (
    <nav className='flex justify-around p-3 border-b border-zinc-800 items-center bg-gray-800 text-zinc-100'>
        <Link to= '/' ><h1 className='text-3xl'>AuthDB</h1></Link>
        <ul className='flex gap-8'>
          {isUserSignedIn ? (
            <>
            <Link to="/account"><li className='hover:text-blue-600'>Account</li></Link>
            <li><button onClick={handleSignOut} className='hover:text-blue-600'>Sign Out</button></li>
            </>
          ): (

              <>
              <Link to="/login"><li className='hover:text-blue-600'>Login</li></Link>
              <Link to="/signup"><li className='hover:text-blue-600'>SignUP</li></Link>
              </>

            ) }
            
        </ul>
        
    </nav>

    

  )
}

export default Navbar
