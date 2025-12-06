import React, { useEffect, useState } from 'react'

const RequestedBooks = () => {


const [requestedBooks,setRequestedBooks] = useState([]);



useEffect(() => {
  const saved = JSON.parse(localStorage.getItem("requested-books")) || [];
  setRequestedBooks(saved); 

}, []);


const removeRequest = (id) => {

const updated = requestedBooks.filter((book) => book.id !== id);
setRequestedBooks(updated);
localStorage.setItem("requested-books", JSON.stringify(updated));

};


    return (


    <div className='p-6'>

<h1 className='text-3xl font-bold mb-6'>Requested Books</h1>




    </div>
  )
}

export default RequestedBooks;
