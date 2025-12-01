import React from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'


const Navbar = () => {

const {user,logout} = useAuth();


  return (
   

  <nav className="flex justify-between items-center px-6 py-3 bg-gray-900 text-white">
    <Link to="/" className="text-xl font-bold">📚 BookBridge</Link>
    <div className="space-x-4">
      <Link to="/donate">Donate</Link>
      <Link to="/request">Request</Link>
      
{ user ? (

<>
<span className='font-semibold'> Hi, {user.name}</span>
<button onClick={logout} 
className="bg-red-500 hover:bg-red-600 px-3 py-1 rounded">
Logout
</button>
</>
) : (

<>

<Link to= "/login">Login</Link>
<Link to= "/signup">Signup</Link>

</>
)}

</div>
  </nav>



  )
}

export default Navbar