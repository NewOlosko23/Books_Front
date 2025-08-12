import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import axios from "axios";

const HireBook = () => {
  const { bookId } = useParams();
  const navigate = useNavigate();

  const [book, setBook] = useState(null);
  const [loadingBook, setLoadingBook] = useState(true);
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    phone: "",
    pickupDate: "",
    notes: "",
  });
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    const userData = storedUser?.data;

    setForm((prev) => ({
      ...prev,
      fullName: userData.username || "",
      email: userData.email || "",
      phone: userData.phone || "",
      pickupDate: new Date().toISOString().split("T")[0],
    }));
  }, []);

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
        setLoadingBook(false);
      }
    };

    fetchBook();
  }, [bookId]);

  if (loadingBook) return <p>Loading book info...</p>;
  if (!book) return <p>Book not found.</p>;

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSubmitting(true);

    try {
      const storedUser = JSON.parse(localStorage.getItem("user"));
      const token = localStorage.getItem("userToken");

      if (!storedUser?.data || !token) {
        setError("You must be logged in to hire a book.");
        setSubmitting(false);
        return;
      }

      const hireData = {
        userId: storedUser.data.id,
        ...form,
      };

      await axios.post(
        `https://books-server-5p0q.onrender.com/api/hire/${bookId}`,
        hireData,
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
      <div className="max-w-3xl mx-auto mb-6">
        <p className="text-sm text-gray-600">
          <span className="text-blue-600">Browse</span> /{" "}
          <span className="text-blue-600">Books</span> /{" "}
          <span className="text-blue-600">{book.title}</span> /{" "}
          <span className="font-medium text-gray-800">Hire</span>
        </p>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-3xl mx-auto bg-white rounded-xl shadow-lg p-6"
      >
        <h1 className="text-2xl font-bold text-gray-800 mb-4">
          Hire: {book.title}
        </h1>
        <p className="text-gray-600 mb-6">
          Please fill in the details below to request this book.
        </p>

        {error && <p className="text-red-500 mb-4">{error}</p>}

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="fullName"
            placeholder="Full Name"
            value={form.fullName}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-lg px-4 py-2"
            required
          />

          <input
            type="email"
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-lg px-4 py-2"
            required
          />

          <input
            type="tel"
            name="phone"
            placeholder="Phone Number"
            value={form.phone}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-lg px-4 py-2"
          />

          <input
            type="date"
            name="pickupDate"
            value={form.pickupDate}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-lg px-4 py-2"
            required
          />

          <textarea
            name="notes"
            placeholder="Additional notes (optional)"
            value={form.notes}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-lg px-4 py-2"
            rows="3"
          />

          <button
            type="submit"
            disabled={submitting}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-semibold"
          >
            {submitting ? "Submitting..." : "Submit Request"}
          </button>
          <div></div>
        </form>
      </motion.div>
    </div>
  );
};

export default HireBook;
