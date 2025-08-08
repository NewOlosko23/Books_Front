import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import allBooks from "../data/books";

const BookDetail = () => {
  const { slug } = useParams();
  const navigate = useNavigate();

  // Match directly using the slug field in your dataset
  const book = allBooks.find((b) => b.slug === slug);

  if (!book) {
    return (
      <div className="px-4 py-16 min-h-screen text-center">
        <h2 className="text-2xl font-semibold text-red-600">Book not found.</h2>
      </div>
    );
  }

  return (
    <div className="px-4 py-16 bg-gradient-to-br from-white to-blue-50 min-h-screen">
      {/* Breadcrumb Path */}
      <div className="max-w-4xl mx-auto mb-4">
        <p className="text-sm text-gray-600">
          <span className="text-blue-600">Browse</span> /{" "}
          <span className="text-blue-600">Books</span> /{" "}
          <span className="font-medium text-gray-800">{book.title}</span>
        </p>
        <div className="border-b border-gray-300 mt-2 mb-4"></div>

        {/* Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="mb-6 inline-flex items-center text-sm text-blue-600 hover:underline"
        >
          ← Back
        </button>
      </div>

      {/* Book Card */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg p-6 flex flex-col md:flex-row gap-8"
      >
        <img
          src={book.image}
          alt={book.title}
          className="w-full md:w-1/3 h-80 object-cover rounded-xl"
        />

        <div className="flex-1 space-x-2">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            {book.title}
          </h1>
          <p className="text-lg text-gray-600 mb-2">By {book.author}</p>
          <p className="text-sm text-gray-500 mb-4">Shared by: {book.from}</p>
          <p className="text-sm text-gray-500 mb-4">
            Location: {book.location}
          </p>
          <p className="text-sm text-gray-500 mb-4">
            Posted on: {book.datePosted}
          </p>
          <p className="text-sm bg-blue-100 text-blue-700 inline-block px-3 py-1 rounded-full mb-2">
            Category: {book.category}
          </p>
          <p
            className={`text-sm inline-block px-3 py-1 rounded-full mb-6 ml-2 ${
              book.availability
                ? "bg-green-100 text-green-700"
                : "bg-red-100 text-red-700"
            }`}
          >
            {book.availability ? "Available for Hire" : "Currently Unavailable"}
          </p>

          <button
            disabled={!book.availability}
            onClick={() => navigate(`/hire-book/${book.slug}`)}
            className={`px-6 py-2 rounded-xl text-white font-semibold transition-all duration-300 ${
              book.availability
                ? "bg-blue-600 hover:bg-blue-700"
                : "bg-gray-400 cursor-not-allowed"
            }`}
          >
            {book.availability ? "Hire this Book" : "Unavailable"}
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default BookDetail;
