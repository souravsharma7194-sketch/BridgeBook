import React, { useState } from 'react'
import { useAuth } from '../context/AuthContext'
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
const Login = () => {

const {login} = useAuth(); 
const navigate = useNavigate();
const [email,setEmail] = useState("");
const [password,setPassword] = useState("");

const handleLogin = () => {

if(!email || !password){

alert("please enter both email and password");
return; 
}



    const savedUser = JSON.parse(localStorage.getItem("bookbridge-user"));
    
if(!savedUser){

alert("No user found! Please signup first.");
return;
}

if(savedUser.email !== email || savedUser.password !== password){
alert("Invalid email or password");
return;
}




login({name: savedUser.name, email: savedUser.email});
     navigate("/");




}

return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-2">
<div className="w-full max-w-md bg-white shadow-md rounded-lg p-8">
<h2 className="font-semibold text-3xl mb-6 text-center ">Login</h2>

<input
 type="email"
 placeholder="Email"
 className="py-2 px-3 border-1 mb-4 rounded w-full border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 "
onChange={(e)=> setEmail(e.target.value)}

/>
<br/>

<input
 type="password"
 placeholder="Password"
 className="py-2 px-3 w-64 mb-2 border-1 rounded w-full border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 "
 onChange={(e)=> setPassword(e.target.value)}
 />
<br/>

<button
className="bg-blue-600 py-2 px-6 text-white rounded hover:bg-blue-800 w-full " 
onClick={handleLogin}
>
    Login
</button>



<p
 className="text-center text-sm mt-4">
 Don’t have an account?
        
<Link to="/signup" 
className="text-blue-600 hover:underline">
Signup</Link>
      
  </p>



</div>





</div>
  )
}

export default Login