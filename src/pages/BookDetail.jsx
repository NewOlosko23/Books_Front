import React, { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";
import axios from "axios";

const BookDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const storedUser = JSON.parse(localStorage.getItem("user"));
  const userData = storedUser?.data;

  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    const fetchBook = async () => {
      try {
        const res = await axios.get(
          `https://books-server-5p0q.onrender.com/api/books/${id}`
        );
        setBook(res.data);
      } catch (err) {
        setError("Book not found.");
      } finally {
        setLoading(false);
      }
    };

    fetchBook();
  }, [id]);

  if (loading) {
    return (
      <div className="px-4 py-16 bg-gradient-to-br from-white to-blue-50 min-h-screen">
        <div className="max-w-4xl mx-auto mb-4">
          {/* Breadcrumb Skeleton */}
          <div className="h-4 w-48 bg-gray-300 rounded animate-pulse"></div>
          <div className="border-b border-gray-300 mt-2 mb-4"></div>

          {/* Back Button Skeleton */}
          <div className="h-4 w-20 bg-gray-300 rounded animate-pulse"></div>
        </div>

        {/* Skeleton Card */}
        <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg p-6 flex flex-col md:flex-row gap-8 animate-pulse">
          {/* Image placeholder */}
          <div className="w-full md:w-1/3 h-80 bg-gray-300 rounded-xl"></div>

          {/* Text placeholders */}
          <div className="flex-1 space-y-4">
            <div className="h-6 w-3/4 bg-gray-300 rounded"></div>
            <div className="h-4 w-1/2 bg-gray-300 rounded"></div>
            <div className="h-3 w-1/3 bg-gray-300 rounded"></div>
            <div className="h-3 w-1/4 bg-gray-300 rounded"></div>
            <div className="h-5 w-32 bg-gray-300 rounded-full"></div>
            <div className="h-5 w-40 bg-gray-300 rounded-full"></div>
            <div className="h-10 w-40 bg-gray-300 rounded-xl mt-6"></div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !book) {
    return (
      <div className="px-4 py-16 min-h-screen text-center">
        <h2 className="text-2xl font-semibold text-red-600">
          {error || "Book not found."}
        </h2>
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
          src={book.coverImage}
          alt={book.title}
          className="w-full md:w-1/3 h-80 object-cover rounded-xl"
        />

        <div className="flex-1 space-x-2">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            {book.title}
          </h1>
          <p className="text-lg text-gray-600 mb-2">By {book.author}</p>
          {book.owner && (
            <p className="text-sm text-gray-500 mb-4">
              Shared by: {book.owner.name || "Unknown"}
            </p>
          )}
          <p className="text-sm text-gray-500 mb-4">
            Location: {book.location}
          </p>
          <p className="text-sm text-gray-500 mb-4">
            Posted on: {new Date(book.createdAt).toLocaleDateString()}
          </p>
          {book.category && (
            <p className="text-sm bg-blue-100 text-blue-700 inline-block px-3 py-1 rounded-full mb-2">
              Category: {book.category}
            </p>
          )}
          <p
            className={`text-sm inline-block px-3 py-1 rounded-full mb-6 ml-2 ${
              book.available
                ? "bg-green-100 text-green-700"
                : "bg-red-100 text-red-700"
            }`}
          >
            {book.available ? "Available for Hire" : "Currently Unavailable"}
          </p>

          <button
            disabled={!book.available}
            onClick={() => {
              const storedUser = JSON.parse(localStorage.getItem("user"));
              const userData = storedUser?.data;

              if (!userData) {
                setMessage(
                  <>
                    You must be logged in to hire a book.{" "}
                    <Link
                      to="/login"
                      style={{ color: "blue", textDecoration: "underline" }}
                    >
                      Login now
                    </Link>
                  </>
                );
                return;
              }

              if (
                !userData.subscription ||
                userData.subscription.status !== "active"
              ) {
                setMessage(
                  <>
                    You need an active subscription to hire books.{" "}
                    <Link
                      to="/subscription"
                      style={{ color: "blue", textDecoration: "underline" }}
                    >
                      Subscribe now
                    </Link>
                  </>
                );
                return;
              }

              navigate(`/hire-book/${book._id}`);
            }}
            className={`px-6 py-2 rounded-xl text-white font-semibold transition-all duration-300 ${
              book.available
                ? "bg-blue-600 hover:bg-blue-700"
                : "bg-gray-400 cursor-not-allowed"
            }`}
          >
            {book.available ? "Hire this Book" : "Unavailable"}
          </button>
          <div>
            {message && <p className="mt-4 text-sm text-red-500">{message}</p>}
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default BookDetail;
