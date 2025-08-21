import React, { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";
import axios from "axios";
import { MapPin, BookOpen, User, Calendar, Bookmark } from "lucide-react";
import { Helmet } from "react-helmet-async";

const BookDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const storedUser = JSON.parse(localStorage.getItem("user"));
  const userData = storedUser?.data;

  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);

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
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mt-16 py-5 animate-pulse">
        {/* Image Carousel Skeleton */}
        <div className="relative w-full h-[420px] md:h-[500px] rounded-2xl overflow-hidden shadow-xl bg-gray-300 mb-10"></div>

        {/* Details Section Skeleton */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Header Skeleton */}
            <div className="space-y-2">
              <div className="h-8 w-3/4 bg-gray-300 rounded"></div>
              <div className="h-4 w-1/2 bg-gray-300 rounded"></div>
              <div className="h-3 w-1/3 bg-gray-300 rounded mt-2"></div>
            </div>

            {/* Quick Specs Skeleton */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 bg-gray-100 p-5 rounded-xl">
              {Array(4)
                .fill(0)
                .map((_, i) => (
                  <div key={i} className="flex flex-col items-center space-y-2">
                    <div className="h-6 w-6 bg-gray-300 rounded-full"></div>
                    <div className="h-4 w-16 bg-gray-300 rounded"></div>
                    <div className="h-3 w-20 bg-gray-300 rounded"></div>
                  </div>
                ))}
            </div>

            {/* Description Skeleton */}
            <div className="space-y-2 mt-4">
              <div className="h-6 w-1/3 bg-gray-300 rounded"></div>
              <div className="space-y-2">
                <div className="h-3 w-full bg-gray-300 rounded"></div>
                <div className="h-3 w-full bg-gray-300 rounded"></div>
                <div className="h-3 w-5/6 bg-gray-300 rounded"></div>
                <div className="h-3 w-2/3 bg-gray-300 rounded"></div>
              </div>
            </div>
          </div>

          {/* Sidebar Skeleton */}
          <aside className="space-y-6">
            <div className="bg-gray-100 rounded-xl p-6 border border-gray-200 space-y-4">
              <div className="h-6 w-1/2 bg-gray-300 rounded"></div>
              <div className="h-10 w-full bg-gray-300 rounded"></div>
              <div className="h-4 w-3/4 bg-gray-300 rounded mt-2"></div>
            </div>

            <div className="bg-gray-100 rounded-xl p-6 space-y-2">
              <div className="h-4 w-1/2 bg-gray-300 rounded"></div>
              <div className="h-3 w-1/3 bg-gray-300 rounded"></div>
            </div>
          </aside>
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

  const images =
    book.images && book.images.length > 0 ? book.images : [book.coverImage];

  const nextImage = () => setCurrentIndex((prev) => (prev + 1) % images.length);
  const prevImage = () =>
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));

  return (
    <>
      <>
        <Helmet>
          <title>
            {book.title} by {book.author} - BooksArc Kisumu
          </title>
          <meta
            name="description"
            content={`Hire '${book.title}' by ${book.author} in Kisumu. Check availability, location, and details on BooksArc.`}
          />
          <meta name="robots" content="index, follow" />
        </Helmet>
      </>
      <>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mt-16 py-5">
          {/* Image Carousel */}
          <div className="relative w-full h-[420px] md:h-[500px] rounded-2xl overflow-hidden shadow-xl bg-black">
            <img
              src={images[currentIndex]}
              alt={`${book.title} ${currentIndex + 1}`}
              className="w-full h-full object-contain transition-transform duration-500"
            />

            {images.length > 1 && (
              <>
                <button
                  onClick={prevImage}
                  className="absolute left-4 top-1/2 -translate-y-1/2 bg-gray-900/70 hover:bg-gray-900/90 text-white w-10 h-10 md:w-12 md:h-12 flex items-center justify-center rounded-full shadow-lg transition transform hover:scale-110"
                >
                  ‹
                </button>

                <button
                  onClick={nextImage}
                  className="absolute right-4 top-1/2 -translate-y-1/2 bg-gray-900/70 hover:bg-gray-900/90 text-white w-10 h-10 md:w-12 md:h-12 flex items-center justify-center rounded-full shadow-lg transition transform hover:scale-110"
                >
                  ›
                </button>

                <div className="absolute bottom-4 right-4 bg-gray-900/75 text-white text-sm px-3 py-1 rounded-full shadow">
                  {currentIndex + 1} / {images.length}
                </div>
              </>
            )}
          </div>

          {/* Details Section */}
          <div className="mt-10 grid grid-cols-1 lg:grid-cols-3 gap-10">
            {/* Main Content */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="lg:col-span-2 space-y-8"
            >
              {/* Header */}
              <div>
                <h1 className="text-3xl font-bold text-gray-900 mb-2">
                  {book.title}
                </h1>
                <p className="flex items-center gap-2 text-md text-gray-600">
                  <User className="w-5 h-5 text-indigo-600" /> By {book.author}
                </p>
                <p className="flex items-center gap-2 text-sm text-gray-500 mt-2">
                  <Calendar className="w-4 h-4 text-indigo-600" />
                  Posted on {new Date(book.createdAt).toLocaleDateString()}
                </p>
              </div>

              {/* Quick Specs */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 bg-gray-50 p-5 rounded-xl shadow-sm">
                <div className="flex flex-col items-center text-center">
                  <BookOpen className="w-6 h-6 text-gray-700" />
                  <span className="font-semibold text-gray-900">
                    {book.category}
                  </span>
                  <span className="text-sm text-gray-500">Category</span>
                </div>
                <div className="flex flex-col items-center text-center">
                  <Bookmark className="w-6 h-6 text-gray-700" />
                  <span
                    className={`font-semibold ${
                      book.available ? "text-green-600" : "text-red-600"
                    }`}
                  >
                    {book.available ? "Available" : "Unavailable"}
                  </span>
                  <span className="text-sm text-gray-500">Status</span>
                </div>
                <div className="flex flex-col items-center text-center">
                  <User className="w-6 h-6 text-gray-700" />
                  <span className="font-semibold text-gray-900">
                    {book.owner?.username || "Unknown"}
                  </span>
                  <span className="text-sm text-gray-500">Shared By</span>
                </div>
                <div className="flex flex-col items-center text-center">
                  <MapPin className="w-6 h-6 text-gray-700" />
                  <span className="font-semibold text-gray-900">
                    {book.location}
                  </span>
                  <span className="text-sm text-gray-500">Location</span>
                </div>
              </div>

              {/* Description */}
              {book.description && (
                <div>
                  <h2 className="text-xl font-semibold text-gray-900 mb-3">
                    Description
                  </h2>
                  <p className="text-gray-700 leading-relaxed text-[15px]">
                    {book.description}
                  </p>
                </div>
              )}
            </motion.div>

            {/* Sidebar */}
            {/* Sidebar */}
            <aside className="space-y-6">
              {userData?._id !== book.owner?._id ? (
                // Hire Section for other users
                <div className="bg-white rounded-xl shadow p-6 border border-gray-100">
                  <h2 className="text-xl font-semibold text-gray-900 mb-4">
                    Hire this Book
                  </h2>
                  <button
                    disabled={!book.available}
                    onClick={() => {
                      if (!userData) {
                        setMessage(
                          <>
                            You must be logged in to hire a book.{" "}
                            <Link
                              to="/login"
                              className="text-blue-600 underline"
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
                              className="text-blue-600 underline"
                            >
                              Subscribe now
                            </Link>
                          </>
                        );
                        return;
                      }

                      navigate(`/hire-book/${book._id}`);
                    }}
                    className={`w-full py-3 rounded-lg text-white font-semibold transition-all duration-300 ${
                      book.available
                        ? "bg-indigo-600 hover:bg-indigo-700"
                        : "bg-gray-400 cursor-not-allowed"
                    }`}
                  >
                    {book.available ? "Hire this Book" : "Unavailable"}
                  </button>
                  {message && (
                    <p className="mt-4 text-sm text-red-500">{message}</p>
                  )}
                </div>
              ) : (
                // Update Section for the owner
                <div className="bg-white rounded-xl shadow p-6 border border-gray-100">
                  <h2 className="text-xl font-semibold text-gray-900 mb-4">
                    Update this Book
                  </h2>
                  <button
                    onClick={() => navigate(`/update-book/${book._id}`)}
                    className="w-full py-3 rounded-lg text-white font-semibold bg-green-600 hover:bg-green-700 transition-all duration-300"
                  >
                    Update Book Details
                  </button>
                  <p className="mt-4 text-sm text-gray-500">
                    Add or edit details of your book posting.
                  </p>
                </div>
              )}

              <div className="bg-gray-50 rounded-xl p-6 shadow-sm text-sm text-gray-600">
                <p className="mb-2">
                  ←{" "}
                  <Link to="/dashboard" className="text-indigo-600 underline">
                    Back to Dashboard
                  </Link>
                </p>
              </div>
            </aside>
          </div>
        </div>
      </>
    </>
  );
};

export default BookDetail;
