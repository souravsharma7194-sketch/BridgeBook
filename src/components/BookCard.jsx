import React from 'react'
import { Link } from 'react-router-dom'

const BookCard = ({book}) => {
  return (
<Link to={`/book/${book.id}`}>
    <div className="bg-white shadow-md rounded-lg p-4 flex flex-col hover:shadow-lg transition ">

<img
className="w-full h-48 object-cover rounded-md mb-3"
src={book.imageUrl} alt={book.title} />

<h3 className="text-lg font-semibold mb-1">{book.title}</h3>

<p className="text-sm text-gray-600 mb-2">{book.author}</p>
<p className="text-sm text-gray-700 mb-3 line-clamp-3">{book.description}</p>

{book.donatedBy && (

<p className="text-xs text-blue-600 mb-2 italic">Donated by :{book.donatedBy}</p>

)}

<button
className="mt-auto bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition "
>Request Book</button>



    </div>
    </Link>
  )
}

export default BookCard