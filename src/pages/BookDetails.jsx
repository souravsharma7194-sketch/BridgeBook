import React from "react";

const BookDetails = ({ book, onOpen }) => {
  return (
    <div
      className="bg-white shadow-md rounded-lg p-4 flex flex-col hover:shadow-lg transition cursor-pointer"
      onClick={() => onOpen(book)}
    >
      <img
        className="w-full h-48 object-cover rounded-md mb-3"
        src={book.imageUrl}
        alt={book.title}
      />

      <h3 className="text-lg font-semibold mb-1">{book.title}</h3>
      <p className="text-sm text-gray-600 mb-2">{book.author}</p>

      <p className="text-sm text-gray-700 mb-3 line-clamp-3">
        {book.description}
      </p>

      {book.donatedBy && (
        <p className="text-xs text-blue-600 mb-2 italic">
          Donated by: {book.donatedBy}
        </p>
      )}

      <button className="mt-auto bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition">
        View Details
      </button>
    </div>

    /* -------------------------------------------------------------
       YOUR ORIGINAL BOOKDETAILS ROUTE PAGE (UN-TOUCHED VERSION)
       -------------------------------------------------------------
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

    const handleRequest = () => {

    const requests = JSON.parse(localStorage.getItem("requested-books")) || [];


    if(requests.some((req)=> req.id === book.id)){

    alert("you already added this book!");
    return;

    }
    requests.push(book);
    localStorage.setItem("requested-books", JSON.stringify(requests));
    alert("book requested successfully");

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
      <button
      onClick={handleRequest}
      className="bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700 transition">Request This Book</button>

      </div>

      </div>

      </div>
        </div>
      )
    }

    export default BookDetails
    ------------------------------------------------------------- */
  );
};

export default BookDetails;
