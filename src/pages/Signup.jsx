import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Signup = () => {

const {login} = useAuth();
const navigate = useNavigate();

const [name,setName] = useState("");
const [email,setEmail] = useState("");
const [password,setPassword] = useState("");
const [confirmPassword,setConfirmPassword] = useState("");


const handleSignup = () => {

if(!name || !email || !password || !confirmPassword){

alert("please fill all the fields")
return;
}

if(password !== confirmPassword){
alert("Passwords do not match!")
return;

}

const newUser = {name,email};
login(newUser);
navigate("/");





}





  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-100 px-2">
<div className="w-full max-w-md shadow-md bg-white rounded-lg p-8  ">
<h2 className="font-semibold text-center text-3xl mb-6">Signup</h2>

<input type="text"
placeholder="Your Name"
className="py-2 px-3 w-full mb-4 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-500"
onChange={(e)=> setName(e.target.value)}
/>

<input type="email"
placeholder="Email"
className="py-2 px-3 w-full mb-4 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-500"
onChange={(e)=> setEmail(e.target.value)}
/>
<input type="password"
placeholder="Password"
className="py-2 px-3 w-full mb-4 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-500"
onChange={(e)=> setPassword(e.target.value)}
/>

<input type="password"
placeholder=" Confirm Password"
className="py-2 px-3 w-full mb-4 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-500"
onChange={(e)=> setConfirmPassword(e.target.value)}
/>

<button className="w-full text-white bg-green-600 py-2 px-6 hover:bg-green-700 transition rounded"
onClick= {handleSignup}
>

Signup
</button>

<p className="text-center text-sm mt-4">
 Already have an account?
 
 <Link to = "/login"
 className="text-blue-600 hover:underline">
 Login
 </Link>

</p>

</div>
</div>
  )
}

export default Signup;