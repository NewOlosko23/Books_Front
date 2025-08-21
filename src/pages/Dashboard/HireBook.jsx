import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
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

  const handleChange = (e) =>
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSubmitting(true);

    try {
      if (!userData) throw new Error("You must be logged in to hire a book.");
      const token = localStorage.getItem("userToken");
      if (!token) throw new Error("Authentication token missing.");

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
        notes: form.notes,
      };

      await axios.post(
        `https://books-server-5p0q.onrender.com/api/hire/${bookId}`,
        hirePayload,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      alert(`Your request to hire "${book.title}" has been submitted.`);
      navigate(`/book/${bookId}`);
    } catch (err) {
      setError(
        err.response?.data?.message ||
          err.message ||
          "Failed to submit hire request"
      );
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="px-4 py-16 bg-gradient-to-br from-white to-blue-50 min-h-screen flex justify-center items-center">
        <div className="h-24 w-24 border-4 border-blue-300 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (error || !book) {
    return (
      <div className="px-4 py-16 min-h-screen flex justify-center items-center">
        <p className="text-red-600 font-semibold text-lg">
          {error || "Book not found."}
        </p>
      </div>
    );
  }

  return (
    <div className="px-4 py-16 bg-gradient-to-br from-white to-blue-50 min-h-screen mt-8">
      <div className="max-w-3xl mx-auto mb-6">
        <p className="text-sm text-gray-600 mb-2">
          <span className="text-blue-600 cursor-pointer">Browse</span> /{" "}
          <span className="text-blue-600 cursor-pointer">Books</span> /{" "}
          <span className="font-medium text-gray-800">{book.title}</span> / Hire
        </p>
        <div className="border-b border-gray-300"></div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-3xl mx-auto bg-white rounded-2xl shadow-lg p-8"
      >
        <h1 className="text-3xl font-bold text-gray-800 mb-2">
          Hire: {book.title}
        </h1>
        <p className="text-gray-600 mb-6">
          Fill out the form below to request this book.
        </p>

        {error && (
          <p className="text-red-600 font-medium mb-4 text-center">{error}</p>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Full Name & Email */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block font-semibold text-gray-700 mb-1">
                Full Name
              </label>
              <input
                type="text"
                name="fullName"
                value={form.fullName}
                onChange={handleChange}
                placeholder="Full Name"
                className="w-full border rounded-lg p-3 focus:ring focus:ring-blue-200"
                required
              />
            </div>
            <div>
              <label className="block font-semibold text-gray-700 mb-1">
                Email
              </label>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="Email"
                className="w-full border rounded-lg p-3 focus:ring focus:ring-blue-200"
                required
              />
            </div>
          </div>

          {/* Phone & ID */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block font-semibold text-gray-700 mb-1">
                Phone
              </label>
              <input
                type="tel"
                name="phone"
                value={form.phone}
                onChange={handleChange}
                placeholder="Phone Number"
                className="w-full border rounded-lg p-3 focus:ring focus:ring-blue-200"
              />
            </div>
            <div>
              <label className="block font-semibold text-gray-700 mb-1">
                ID Number
              </label>
              <input
                type="text"
                name="idNumber"
                value={form.idNumber}
                onChange={handleChange}
                placeholder="ID Number"
                className="w-full border rounded-lg p-3 focus:ring focus:ring-blue-200"
                minLength={8}
                required
              />
            </div>
          </div>

          {/* Location & Pickup Date */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block font-semibold text-gray-700 mb-1">
                Location
              </label>
              <input
                type="text"
                name="location"
                value={form.location}
                onChange={handleChange}
                placeholder="Your Location"
                className="w-full border rounded-lg p-3 focus:ring focus:ring-blue-200"
                required
              />
            </div>
            <div>
              <label className="block font-semibold text-gray-700 mb-1">
                Pickup Date
              </label>
              <input
                type="date"
                name="pickupDate"
                value={form.pickupDate}
                onChange={handleChange}
                className="w-full border rounded-lg p-3 focus:ring focus:ring-blue-200"
                required
              />
            </div>
          </div>

          {/* Notes */}
          <div>
            <label className="block font-semibold text-gray-700 mb-1">
              Additional Notes
            </label>
            <textarea
              name="notes"
              value={form.notes}
              onChange={handleChange}
              placeholder="Any other info (optional)"
              rows={4}
              className="w-full border rounded-lg p-3 focus:ring focus:ring-blue-200"
            />
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={submitting}
            className={`w-full py-3 rounded-lg font-semibold text-white cursor-pointer transition-colors ${
              submitting
                ? "bg-blue-400 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700"
            }`}
          >
            {submitting ? "Submitting..." : "Submit Request"}
          </button>

          {message && (
            <p className="text-green-600 font-semibold text-center">
              {message}
            </p>
          )}
        </form>
      </motion.div>
    </div>
  );
};

export default HireBook;
