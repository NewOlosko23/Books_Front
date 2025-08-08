import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import allBooks from "../../data/books";
import { useAuth } from "../../context/AuthContext";

const HireBook = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();

  const book = allBooks.find((b) => b.slug === slug);

  const [form, setForm] = useState({
    fullName: "",
    email: "",
    phone: "",
    pickupDate: "",
    notes: "",
  });

  useEffect(() => {
    setForm((prev) => ({
      ...prev,
      fullName: user?.displayName || "",
      email: user?.email || "",
      phone: user?.phoneNumber || "",
      pickupDate: new Date().toISOString().split("T")[0],
    }));
  }, [user]);

  if (!book) {
    return (
      <div className="px-4 py-16 text-center min-h-screen">
        <h2 className="text-2xl text-red-600 font-semibold">Book not found.</h2>
      </div>
    );
  }

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(
      `Your request to hire "${book.title}" has been submitted. Please wait for approval.`
    );
    navigate(`/book/${slug}`);
  };

  return (
    <div className="px-4 py-16 bg-gradient-to-br from-white to-blue-50 min-h-screen">
      {/* Breadcrumb */}
      <div className="max-w-3xl mx-auto mb-6">
        <p className="text-sm text-gray-600">
          <span className="text-blue-600">Browse</span> /{" "}
          <span className="text-blue-600">Books</span> /{" "}
          <span className="text-blue-600">{book.title}</span> /{" "}
          <span className="font-medium text-gray-800">Hire</span>
        </p>
      </div>

      {/* Hire Form */}
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
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-semibold"
          >
            Submit Request
          </button>
        </form>
      </motion.div>
    </div>
  );
};

export default HireBook;
