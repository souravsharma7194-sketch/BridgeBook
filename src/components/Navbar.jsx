import React from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'


const Navbar = ({onOpenLogin,onOpenSignup}) => {

 /* const {user,logout} = useAuth();


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
  </nav> */

const { user, logout } = useAuth();

  const scrollTo = (id) => {
    document.querySelector(`#${id}`)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <nav className="flex justify-between items-center px-6 py-3 bg-gray-900 text-white fixed w-full top-0 z-50 shadow">
      <button onClick={() => scrollTo("home")} className="text-xl font-bold">
        📚 BookBridge
      </button>

      <div className="space-x-4 flex items-center">
        <button onClick={() => scrollTo("donate")}>Donate</button>
        <button onClick={() => scrollTo("request")}>Request</button>

        {user ? (
          <>
            <span className="font-semibold">Hi, {user.name}</span>
            <button
              onClick={logout}
              className="bg-red-500 hover:bg-red-600 px-3 py-1 rounded"
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <button onClick={onOpenLogin}>Login</button>
            <button onClick={onOpenSignup}>Signup</button>
          </>
        )}
      </div>
    </nav>








  


  )
}

export default Navbar