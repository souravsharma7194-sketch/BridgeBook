import React, { useState } from 'react'
import { dummyBooks } from '../data/dummyBooks';
import BookCard from '../components/BookCard';


const RequestBook = () => {

const [search,setSearch] = useState("");
 

const realBooks = JSON.parse(localStorage.getItem("bookbridge-books")) || [];
const allBooks = [...dummyBooks,...realBooks]

const filteredBooks = allBooks.filter((book) => 

    book.title.toLowerCase().startsWith(search.toLowerCase())

);


  

return (

<div className="p-4">

<input type="text"
placeholder="Search Books..."
value={search}
onChange={(e)=> setSearch(e.target.value)}
className="w-full p-4 mb-6 border border-gray-300 rounded-lg"

/>


    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
{
filteredBooks.map(book => (

<BookCard key={book.id} book={book}/>

))}
    </div>
    </div>
  )
}

export default RequestBook;