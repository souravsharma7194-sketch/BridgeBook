import React from 'react'
import { useParams } from 'react-router-dom'
import { dummyBooks } from '../data/dummyBooks';

const BookDetails = () => {

const {id} = useParams();


const realBooks = JSON.parse(localStorage.getItem("bookbridge-books")) || [];
const allBooks = [...realBooks, ...dummyBooks];

const book = allBooks.find((b) => b.id.toString() === id);


if(!book){

return(

<div className="p-4 text-center text-gray-500">

Book Not Found
</div>

);
}

  return (
    <div className="max-w-4xl mx-auto p-6">
<div className="bg-white shadow-lg rounded-lg p-6 flex flex-col md:flex-row gap-6">

<img 
src={book.imageUrl} 
alt={book.title}
className="w-full md:w-1/3 h-72 object-cover rounded-xl"
/>

<div className="flex flex-1 flex-col">

<h1 className="text-2xl font-bold mb-2">{book.title}</h1>
<p className="text-gray-600 mb-1 text-lg">{book.author}</p>
<p className="text-gray-700 mt-3 mb-4">{book.description}</p>

{book.donatedBy && (

<p className="text-sm text-blue-700 italic mb-3">Donated by: {book.donatedBy}

</p>

)}

<div className="mt-auto">
<button className="bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700 transition">Request This Book</button>


</div>



</div>

</div>
  </div>
  )
}

export default BookDetails