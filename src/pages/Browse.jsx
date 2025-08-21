import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import axios from "axios";
import { MapPin, Tags, CheckCircle, X, Search } from "lucide-react";
import Button from "../components/Button";
import { Helmet } from "react-helmet-async";

const Browse = () => {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const booksPerPage = 9;

  // inside Browse component state
  const [location, setLocation] = useState("");
  const [category, setCategory] = useState("");
  const [availability, setAvailability] = useState("");
  // keep your existing search state

  // Clear filters
  const clearFilters = () => {
    setLocation("");
    setCategory("");
    setAvailability("");
    setSearch("");
    setPage(1);
  };

  // Apply filters
  const handleSearch = () => {
    setPage(1);
  };
  // Updated getEstateFromCoordinates with multiple fallbacks
  const getEstateFromCoordinates = async (lat, lng) => {
    const url = `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lng}&format=json`;

    try {
      const res = await fetch(url, {
        headers: {
          "User-Agent": "booksarc-app",
          "Accept-Language": "en",
        },
      });
      const data = await res.json();

      // Try multiple fallbacks for more reliable location detection
      return (
        data.address.suburb ||
        data.address.neighbourhood ||
        data.address.village ||
        data.address.town ||
        data.address.city ||
        data.address.county ||
        ""
      );
    } catch (err) {
      console.error("Error fetching estate:", err);
      return "";
    }
  };

  // Around Me handler
  const handleAroundMe = async (e) => {
    e.preventDefault();

    if (!navigator.geolocation) {
      alert("Geolocation is not supported by your browser.");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;
        const estate = await getEstateFromCoordinates(latitude, longitude);

        if (estate) {
          setLocation(estate); // This will automatically update input value
          setPage(1); // Reset to first page
        } else {
          alert("Could not detect your location. Please enter manually.");
          setLocation(""); // Optional fallback
        }

        setLoading(false);
      },
      (err) => {
        console.error("Geolocation error:", err);
        alert("Failed to get your location. Please allow location access.");
      }
    );
  };

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const res = await axios.get(
          "https://books-server-5p0q.onrender.com/api/books"
        );
        setBooks(res.data.reverse());
      } catch (err) {
        setError("Failed to load books.");
      } finally {
        setLoading(false);
      }
    };

    fetchBooks();
  }, []);

  const filteredBooks = books.filter((book) => {
    const searchTerm = search.toLowerCase();
    const matchesSearch =
      (book.title || "").toLowerCase().includes(searchTerm) ||
      (book.author || "").toLowerCase().includes(searchTerm) ||
      (book.category || "").toLowerCase().includes(searchTerm) ||
      (book.owner?.name || "").toLowerCase().includes(searchTerm);

    const matchesLocation = location
      ? (book.location || "").toLowerCase().includes(location.toLowerCase())
      : true;

    const matchesCategory = category
      ? (book.category || "").toLowerCase() === category.toLowerCase()
      : true;

    const matchesAvailability =
      availability === ""
        ? true
        : availability === "true"
        ? book.available
        : !book.available;

    return (
      matchesSearch && matchesLocation && matchesCategory && matchesAvailability
    );
  });

  const pageCount = Math.ceil(filteredBooks.length / booksPerPage);
  const paginatedBooks = filteredBooks.slice(
    (page - 1) * booksPerPage,
    page * booksPerPage
  );

  const handlePageChange = (newPage) => {
    setPage(newPage);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (loading) {
    return (
      <div className="px-4 py-16 max-w-5xl mx-auto bg-gradient-to-br from-gray-50 to-white min-h-screen mt-12">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-4xl font-bold text-center text-blue-600 mb-6"
        ></motion.h1>
        <div className="p-4 bg-white rounded-lg shadow-sm">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Skeleton for Keyword */}
            <div className="flex flex-col gap-2">
              <div className="h-4 w-24 bg-gray-300 rounded animate-pulse"></div>
              <div className="h-10 w-full bg-gray-300 rounded animate-pulse"></div>
              <div className="h-3 w-40 bg-gray-200 rounded animate-pulse"></div>
            </div>

            {/* Skeleton for Location */}
            <div className="flex flex-col gap-2">
              <div className="h-4 w-24 bg-gray-300 rounded animate-pulse"></div>
              <div className="h-10 w-full bg-gray-300 rounded animate-pulse"></div>
              <div className="h-3 w-40 bg-gray-200 rounded animate-pulse"></div>
            </div>

            {/* Skeleton for Category */}
            <div className="flex flex-col gap-2">
              <div className="h-4 w-24 bg-gray-300 rounded animate-pulse"></div>
              <div className="h-10 w-full bg-gray-300 rounded animate-pulse"></div>
              <div className="h-3 w-40 bg-gray-200 rounded animate-pulse"></div>
            </div>
          </div>

          {/* Skeleton for Button */}
          <div className="mt-4 flex justify-end">
            <div className="h-10 w-32 bg-gray-300 rounded animate-pulse"></div>
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
          {Array.from({ length: 8 }).map((_, idx) => (
            <div
              key={idx}
              className="bg-white rounded-xl shadow-md overflow-hidden animate-pulse"
            >
              <div className="w-full h-64 bg-gray-300"></div>
              <div className="p-4 space-y-3">
                <div className="h-4 bg-gray-300 rounded w-3/4"></div>
                <div className="h-3 bg-gray-300 rounded w-1/2"></div>
                <div className="h-3 bg-gray-300 rounded w-1/3"></div>
                <div className="flex gap-2 mt-2">
                  <div className="h-5 w-16 bg-gray-300 rounded-full"></div>
                  <div className="h-5 w-20 bg-gray-300 rounded-full"></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return <p className="text-center text-red-500 py-10">{error}</p>;
  }

  return (
    <>
      <>
        <Helmet>
          <title>Browse Books - BooksArc Kisumu</title>
          <meta
            name="description"
            content="Browse available books for hire in Kisumu. Find the book you want and hire it instantly on BooksArc."
          />
          <meta name="robots" content="index, follow" />
        </Helmet>
      </>
      <>
        <div className="px-4 py-16 bg-gradient-to-br from-gray-50 to-white min-h-screen mt-4">
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-4xl font-bold text-center text-blue-600 mb-6"
          ></motion.h1>
          {/* Search Bar */}
          <div className="max-w-6xl mx-auto bg-white p-6 rounded-2xl shadow-lg mb-8">
            <h2 className="text-xl font-bold mb-6">Search Books</h2>

            {/* Filters Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
              {/* Keyword Search */}
              <div className="flex flex-col">
                <label className="flex items-center text-gray-700 font-medium mb-1 gap-1 text-sm">
                  <Search className="w-4 h-4 text-gray-500" />
                  Keyword
                </label>
                <input
                  type="text"
                  placeholder="Title or author"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
                <p className="text-xs text-gray-500 mt-1">
                  Search by book title or author name
                </p>
              </div>

              {/* Location Input */}
              <div className="flex flex-col">
                <label className="flex items-center text-gray-700 font-medium mb-1 gap-1 text-sm">
                  <MapPin className="w-4 h-4 text-gray-500" />
                  Location
                </label>
                <input
                  type="text"
                  placeholder="City or neighborhood"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                />
                <p className="text-xs text-gray-500 mt-1">
                  Filter books by location or nearby areas
                </p>
              </div>

              {/* Category */}
              <div className="flex flex-col">
                <label className="flex items-center text-gray-700 font-medium mb-1 gap-1 text-sm">
                  <Tags className="w-4 h-4 text-gray-500" />
                  Category
                </label>
                <select
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                >
                  <option value="">Any</option>
                  <option value="Fiction">Fiction</option>
                  <option value="Non-fiction">Non-fiction</option>
                  <option value="Romance">Romance</option>
                  <option value="Science">Science</option>
                  <option value="Mystery">Mystery</option>
                  {/* add more categories as needed */}
                </select>
                <p className="text-xs text-gray-500 mt-1">
                  Choose the category that best fits the book
                </p>
              </div>
            </div>

            {/* Actions Row */}
            <div className="flex flex-wrap justify-between items-center mt-6 gap-3 text-sm">
              <Button
                type="button"
                className="cursor-pointer"
                onClick={handleAroundMe}
              >
                <MapPin className="w-4 h-4" />
                Around Me
              </Button>

              <div className="flex flex-wrap justify-end gap-5">
                <Button
                  className="cursor-pointer"
                  onClick={clearFilters}
                  variant="danger"
                >
                  <X className="w-4 h-4" />
                  Clear
                </Button>

                <Button className="cursor-pointer" onClick={handleSearch}>
                  <Search className="w-4 h-4" />
                  Search
                </Button>
              </div>
            </div>
          </div>

          {/* Books Grid */}
          <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {paginatedBooks.length === 0 ? (
              <p className="text-gray-700 col-span-full text-center">
                No books found.
              </p>
            ) : (
              paginatedBooks.map((book, index) => (
                <motion.div
                  key={book._id}
                  whileHover={{ scale: 1.03 }}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05, duration: 0.4 }}
                  className="block"
                >
                  <Link to={`/book/${book._id}`} className="block">
                    <div className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-xl hover:bg-gray-50 transition relative">
                      {/* Cover Image */}
                      <div className="relative w-full h-52">
                        <img
                          src={book.coverImage}
                          alt={book.title}
                          className="w-full h-full object-cover"
                          loading="lazy"
                        />
                      </div>

                      {/* Book Info */}
                      <div className="p-4 space-y-2">
                        {/* Title */}
                        <h3 className="text-md font-semibold text-gray-800 line-clamp-2">
                          {book.title}
                        </h3>

                        {/* Author */}
                        <p className="text-gray-600 text-sm italic">
                          by {book.author}
                        </p>

                        {/* Posted Date */}
                        <p className="text-gray-500 text-xs">
                          📅 {new Date(book.createdAt).toLocaleDateString()}
                        </p>

                        {/* Location */}
                        <p className="text-gray-500 text-xs">
                          📍 {book.location}
                        </p>

                        {/* Tags Row */}
                        <div className="flex flex-wrap gap-2 mt-2">
                          {book.category && (
                            <span className="text-xs text-gray-700 border rounded-2xl px-2 py-1 bg-gray-50">
                              {book.category}
                            </span>
                          )}
                          <span
                            className={`text-xs border rounded-2xl px-2 py-1 ${
                              book.available
                                ? "bg-green-100 text-green-700 border-green-200"
                                : "bg-red-100 text-red-700 border-red-200"
                            }`}
                          >
                            {book.available ? "Available" : "Unavailable"}
                          </span>
                        </div>

                        {/* Optional Short Description */}
                        {book.description && (
                          <p className="text-xs text-gray-500 mt-2 line-clamp-2">
                            {book.description}
                          </p>
                        )}
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))
            )}
          </div>
          {/* Pagination */}
          {pageCount > 1 && (
            <div className="mt-12 flex justify-center items-center gap-2">
              {/* Prev */}
              <Button
                onClick={() => handlePageChange(page - 1)}
                disabled={page === 1}
                className={`px-3 py-2 rounded-lg text-sm transition ${
                  page === 1
                    ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                    : "bg-gray-100 hover:bg-gray-200 text-gray-700"
                }`}
              >
                Prev
              </Button>

              {/* Page Numbers with ellipsis */}
              {Array.from({ length: pageCount }, (_, i) => i + 1)
                .filter((num) => {
                  return (
                    num === 1 ||
                    num === pageCount ||
                    (num >= page - 1 && num <= page + 1)
                  );
                })
                .map((num, idx, arr) => {
                  const prev = arr[idx - 1];
                  const showEllipsis = prev && num - prev > 1;

                  return (
                    <div key={num}>
                      {showEllipsis && (
                        <span className="px-2 text-gray-500">…</span>
                      )}
                      <button
                        onClick={() => handlePageChange(num)}
                        className={`px-4 py-2 rounded-xl text-sm transition ${
                          page === num
                            ? "bg-blue-600 text-white"
                            : "bg-gray-100 hover:bg-gray-200 text-gray-800"
                        }`}
                      >
                        {num}
                      </button>
                    </div>
                  );
                })}

              {/* Next */}
              <Button
                onClick={() => handlePageChange(page + 1)}
                disabled={page === pageCount}
                className={`px-3 py-2 rounded-lg text-sm transition ${
                  page === pageCount
                    ? "bg-gray-500 text-gray-700 cursor-not-allowed"
                    : "bg-gray-500 hover:bg-gray-700 text-gray-900"
                }`}
              >
                Next
              </Button>
            </div>
          )}
        </div>
      </>
    </>
  );
};

export default Browse;
