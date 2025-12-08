import React from "react";
import { Link } from "react-router-dom";
import { BookOpen, ArrowRight, HandHeart } from "lucide-react";

const Home = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-50 via-white to-purple-50 px-6 relative overflow-hidden">

      {/* Floating gradient blob */}
      <div className="absolute top-10 left-10 w-72 h-72 bg-blue-300 opacity-30 blur-3xl rounded-full animate-pulse"></div>
      <div className="absolute bottom-10 right-10 w-72 h-72 bg-purple-300 opacity-30 blur-3xl rounded-full animate-pulse"></div>

      {/* Main container */}
      <div className="relative text-center z-10">

        <h1 className="text-6xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600 drop-shadow-sm">
          BookBridge
        </h1>

        <p className="mt-4 text-xl text-gray-600 max-w-xl mx-auto">
          Give your unused books a new life & help someone learn.  
          A small donation can make a big difference.
        </p>

        <div className="mt-10 flex gap-6 justify-center">
          
          {/* Donate button */}
          <Link
            to="/donate"
            className="group px-7 py-4 bg-white backdrop-blur-xl border border-blue-300 shadow-xl rounded-2xl flex items-center gap-3 hover:-translate-y-1 hover:shadow-2xl transition-all"
          >
            <HandHeart className="text-blue-600" size={22} />
            <span className="text-blue-700 font-semibold text-lg">Donate Book</span>
            <ArrowRight
              size={20}
              className="opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition"
            />
          </Link>

          {/* Request button */}
          <Link
            to="/request"
            className="group px-7 py-4 bg-white backdrop-blur-xl border border-green-300 shadow-xl rounded-2xl flex items-center gap-3 hover:-translate-y-1 hover:shadow-2xl transition-all"
          >
            <BookOpen className="text-green-600" size={22} />
            <span className="text-green-700 font-semibold text-lg">Request Book</span>
            <ArrowRight
              size={20}
              className="opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition"
            />
          </Link>

        </div>
      </div>
    </div>
  );
};

export default Home;
