import React from 'react'
import { Link } from 'react-router-dom'


const Navbar = () => {
  return (
   

  <nav className="flex justify-between items-center px-6 py-3 bg-gray-900 text-white">
    <Link to="/" className="text-xl font-bold">📚 BookBridge</Link>
    <div className="space-x-4">
      <Link to="/donate">Donate</Link>
      <Link to="/request">Request</Link>
      <Link to="/login">Login</Link>
    </div>
  </nav>



  )
}

export default Navbar