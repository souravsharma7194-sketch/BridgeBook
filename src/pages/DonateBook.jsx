import React, { useState } from 'react'
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const DonateBook = () => {


const {user} = useAuth();
const navigate = useNavigate();

const [title,setTitle] = useState("");
const [author,setAuthor] = useState("");
const [imageUrl,setImageUrl] = useState("");
const [shortDescription,setShortDescription] = useState("");


const handleSubmit = () => {


    if (!user) {
      alert("You must be logged in to donate a book!");
      navigate("/login");
      return;
    }



if(!title || !author || !imageUrl || !shortDescription){

alert("Fill out all the fields")
return;
}


const newBook = {

id: Date.now(),
title: title.trim(),
author: author.trim(),
description: shortDescription.trim(),
  imageUrl,
donatedBy: user?.name,
donorEmail: user?.email?.toLowerCase()


};

const existing = JSON.parse(localStorage.getItem("bookbridge-books")) || [];
existing.push(newBook);

localStorage.setItem("bookbridge-books", JSON.stringify(existing));
alert("Book donated successfully");

navigate("/");

}

return (
    
    
    
    <div className="min-h-screen flex justify-center items-center bg-gray-100 px-4 ">
        <div className="w-full max-w-lg bg-white shadow-md rounded-lg p-8 ">

<h2 className="mb-6 font-semibold text-3xl text-center">Donate a Book</h2>

<input type="text"
placeholder="   Book Title"
onChange={(e)=> setTitle(e.target.value)}
className="w-full mb-4 p-2 border rounded "

/>
<input type="text"
placeholder="Author"
onChange={(e)=> setAuthor(e.target.value)}
className="w-full mb-4 p-2 border rounded"
/>

<input type="text"
placeholder="Image URL"
onChange={(e)=> setImageUrl(e.target.value)}
className="w-full mb-4 p-2 border rounded"
/>

<textarea
 placeholder="Short Description"
 rows="4"
 onChange={(e)=> setShortDescription(e.target.value)}
className="w-full mb-4 p-2 border rounded"
></textarea>

<button
className="w-full mb-4 p-2 border rounded bg-blue-700 text-white rounded-full hover:bg-blue-800 transition duration-400 py-2"
 onClick={handleSubmit}>
    Donate Book
</button>




        </div>
    </div>
  )
}

export default DonateBook