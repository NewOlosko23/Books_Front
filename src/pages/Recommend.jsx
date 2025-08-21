import React, { useState } from "react";
import axios from "axios";

const Recommend = () => {
  const [formData, setFormData] = useState({
    title: "",
    author: "",
    description: "",
    coverImage: null,
  });
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "coverImage") {
      setFormData((prev) => ({ ...prev, coverImage: files[0] }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setMessage("");

    if (
      !formData.title.trim() ||
      !formData.author.trim() ||
      !formData.description.trim()
    ) {
      setError(
        "Please fill in all required fields: Title, Author, and Description."
      );
      return;
    }

    setSubmitting(true);

    try {
      const data = new FormData();
      data.append("title", formData.title.trim());
      data.append("author", formData.author.trim());
      data.append("description", formData.description.trim());
      if (formData.coverImage) data.append("coverImage", formData.coverImage);

      await axios.post(
        "https://books-server-5p0q.onrender.com/api/recommendations",
        data,
        { headers: { "Content-Type": "multipart/form-data" } }
      );

      setMessage("Your book recommendation has been submitted successfully!");
      setFormData({ title: "", author: "", description: "", coverImage: null });
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "Failed to submit recommendation. Please try again."
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6 mt-16">
      <div className="max-w-xl w-full bg-white rounded-2xl shadow-lg p-8 animate-fadeIn">
        <h1 className="text-3xl font-bold mb-4 text-center text-blue-700">
          Recommend a Book
        </h1>
        <p className="mb-6 text-gray-700 text-center">
          Can't find the book you're looking for? Let others know what you want!
        </p>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Title */}
          <div>
            <label htmlFor="title" className="block font-semibold mb-1">
              Book Title <span className="text-red-500">*</span>
            </label>
            <input
              id="title"
              type="text"
              name="title"
              placeholder="Enter the title of the book"
              value={formData.title}
              onChange={handleChange}
              disabled={submitting}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
              required
            />
          </div>

          {/* Author */}
          <div>
            <label htmlFor="author" className="block font-semibold mb-1">
              Author <span className="text-red-500">*</span>
            </label>
            <input
              id="author"
              type="text"
              name="author"
              placeholder="Enter the author of the book"
              value={formData.author}
              onChange={handleChange}
              disabled={submitting}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
              required
            />
          </div>

          {/* Description */}
          <div>
            <label htmlFor="description" className="block font-semibold mb-1">
              Description <span className="text-red-500">*</span>
            </label>
            <textarea
              id="description"
              name="description"
              rows={4}
              placeholder="Add any additional details"
              value={formData.description}
              onChange={handleChange}
              disabled={submitting}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
              required
            />
          </div>

          {/* Cover Image */}
          <div>
            <label htmlFor="coverImage" className="block font-semibold mb-1">
              Cover Image (Optional)
            </label>
            <input
              id="coverImage"
              type="file"
              name="coverImage"
              accept="image/*"
              onChange={handleChange}
              disabled={submitting}
              className="w-full"
            />
          </div>

          {error && (
            <p className="text-red-600 font-medium text-center">{error}</p>
          )}
          {message && (
            <p className="text-green-600 font-medium text-center">{message}</p>
          )}

          <button
            type="submit"
            disabled={submitting}
            className={`w-full py-3 rounded-xl text-white font-semibold cursor-pointer transition-colors ${
              submitting
                ? "bg-blue-400 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700"
            }`}
          >
            {submitting ? "Submitting..." : "Submit Recommendation"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Recommend;
