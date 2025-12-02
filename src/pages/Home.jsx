import React from 'react'
import { Link } from 'react-router-dom';
const Home = () => {
  return (
 <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 px-4">

      <h1 className="text-5xl font-extrabold text-gray-800">
        Welcome to <span className="text-blue-600">BookBridge</span> 📚
      </h1>

      <p className="mt-4 text-lg text-gray-600">
        Donate your unused books & help someone learn.
      </p>

      <div className="mt-8 flex gap-5">
        <Link
          to="/donate"
          className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
        >
          Donate Book
        </Link>

        <Link
          to="/request"
          className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
        >
          Request Book
        </Link>
      </div>

    </div>
  );
};

export default Home;