import React, { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";
import axios from "axios";

const HireBook = () => {
  const { bookId } = useParams();
  const navigate = useNavigate();

  const storedUser = JSON.parse(localStorage.getItem("user"));
  const userData = storedUser?.data;

  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    phone: "",
    idNumber: "",
    location: "",
    pickupDate: "",
    notes: "",
  });
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    setForm((prev) => ({
      ...prev,
      fullName: userData?.username || "",
      email: userData?.email || "",
      phone: userData?.phone || "",
      pickupDate: new Date().toISOString().split("T")[0],
    }));
  }, [userData]);

  useEffect(() => {
    const fetchBook = async () => {
      try {
        const res = await axios.get(
          `https://books-server-5p0q.onrender.com/api/books/${bookId}`
        );
        setBook(res.data);
      } catch (err) {
        setError("Failed to load book details");
      } finally {
        setLoading(false);
      }
    };

    fetchBook();
  }, [bookId]);
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
        <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg p-6 animate-pulse space-y-6">
          <div className="h-8 bg-gray-300 rounded w-3/4"></div>
          <div className="h-4 bg-gray-300 rounded w-full max-w-md"></div>

          {[...Array(6)].map((_, i) => (
            <div key={i} className="h-10 bg-gray-300 rounded w-full"></div>
          ))}

          <div className="h-24 bg-gray-300 rounded w-full"></div>
          <div className="h-10 bg-blue-400 rounded w-full"></div>
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

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSubmitting(true);

    try {
      if (!userData) {
        setError("You must be logged in to hire a book.");
        setSubmitting(false);
        return;
      }

      const token = localStorage.getItem("userToken");
      if (!token) {
        setError("Authentication token missing.");
        setSubmitting(false);
        return;
      }

      // Construct payload based on hire schema
      const hirePayload = {
        book: book._id,
        lender: book.owner?._id,
        leaser: userData.id,
        startDate: form.pickupDate,
        leaserContact: {
          phone: form.phone,
          email: form.email,
          idNumber: form.idNumber,
          location: form.location,
        },
        notes: form.notes, // if backend supports notes; else omit
      };

      await axios.post(
        `https://books-server-5p0q.onrender.com/api/hire/${bookId}`,
        hirePayload,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      alert(`Your request to hire "${book.title}" has been submitted.`);
      navigate(`/book/${bookId}`);
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "Failed to submit hire request. Try again."
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="px-4 py-16 bg-gradient-to-br from-white to-blue-50 min-h-screen">
      {/* Breadcrumb Path */}
      <div className="max-w-4xl mx-auto mb-4">
        <p className="text-sm text-gray-600">
          <span className="text-blue-600">Browse</span> /{" "}
          <span className="text-blue-600">Books</span> /{" "}
          <span className="font-medium text-gray-800">{book.title}</span> /{" "}
          <span className="font-medium text-gray-800">Hire</span>
        </p>
        <div className="border-b border-gray-300 mt-2 mb-4"></div>
      </div>

      {/* Hire Form Card */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-2xl mx-auto bg-white rounded-xl shadow-lg p-6"
      >
        <h1 className="text-3xl font-bold text-gray-800 mb-4">
          Hire: {book.title}
        </h1>
        <p className="text-gray-600 mb-6">
          Please fill in the details below to request this book.
        </p>

        {error && (
          <p className="text-red-600 font-medium mb-4 text-center">{error}</p>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Full Name - just display or optional */}
          <div>
            <label className="block mb-1 font-semibold text-gray-700">
              Username
            </label>
            <input
              type="text"
              name="fullName"
              placeholder="Full Name"
              value={form.fullName}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-4 py-2"
              required
            />
            <p className="text-xs text-gray-400 mt-1">
              Enter your full name as it appears on your ID.
            </p>
          </div>

          {/* Email */}
          <div>
            <label className="block mb-1 font-semibold text-gray-700">
              Email
            </label>
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={form.email}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-4 py-2"
              required
            />
            <p className="text-xs text-gray-400 mt-1">
              We'll use this email to send your hire confirmation.
            </p>
          </div>

          {/* Phone */}
          <div>
            <label className="block mb-1 font-semibold text-gray-700">
              Phone Number
            </label>
            <input
              type="tel"
              name="phone"
              placeholder="Phone Number"
              value={form.phone}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-4 py-2"
            />
            <p className="text-xs text-gray-400 mt-1">
              Provide a phone number for quicker contact.
            </p>
          </div>

          {/* ID Number */}
          <div>
            <label className="block mb-1 font-semibold text-gray-700">
              ID Number
            </label>
            <input
              type="text"
              name="idNumber"
              placeholder="ID Number"
              value={form.idNumber}
              minLength={8}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-4 py-2"
              required
            />
            <p className="text-xs text-gray-400 mt-1">
              Your national ID or passport number.
            </p>
          </div>

          {/* Location */}
          <div>
            <label className="block mb-1 font-semibold text-gray-700">
              Location
            </label>
            <input
              type="text"
              name="location"
              placeholder="Your location"
              value={form.location}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-4 py-2"
              required
            />
            <p className="text-xs text-gray-400 mt-1">
              Your current residential location.
            </p>
          </div>

          {/* Pickup Date */}
          <div>
            <label className="block mb-1 font-semibold text-gray-700">
              Pickup Date
            </label>
            <input
              type="date"
              name="pickupDate"
              value={form.pickupDate}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-4 py-2"
              required
            />
            <p className="text-xs text-gray-400 mt-1">
              Choose the date you'd like to pick up the book.
            </p>
          </div>

          {/* Additional Notes */}
          <div>
            <label className="block mb-1 font-semibold text-gray-700">
              Additional Notes
            </label>
            <textarea
              name="notes"
              placeholder="Additional notes (optional)"
              value={form.notes}
              onChange={handleChange}
              rows={3}
              className="w-full border border-gray-300 rounded-lg px-4 py-2"
            />
            <p className="text-xs text-gray-400 mt-1">
              Any other information you'd like to share.
            </p>
          </div>

          <button
            type="submit"
            disabled={submitting}
            className={`w-full px-6 py-3 rounded-lg cursor-pointer font-semibold text-white transition-colors ${
              submitting
                ? "bg-blue-400 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700"
            }`}
          >
            {submitting ? "Submitting..." : "Submit Request"}
          </button>
        </form>

        {message && (
          <p className="mt-4 text-center text-green-600 font-semibold">
            {message}
          </p>
        )}
      </motion.div>
    </div>
  );
};

export default HireBook;
