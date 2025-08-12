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

      if (formData.coverImage) {
        data.append("coverImage", formData.coverImage);
      }

      // Replace with your actual API endpoint
      await axios.post(
        "https://books-server-5p0q.onrender.com/api/recommendations",
        data,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
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
    <div className="max-w-xl mx-auto p-6 bg-white rounded-lg shadow-lg mt-12">
      <h1 className="text-3xl font-bold mb-6 text-center text-blue-700">
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
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            disabled={submitting}
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
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            disabled={submitting}
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
            rows={3}
            placeholder="Add any additional details"
            value={formData.description}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            disabled={submitting}
            required
          ></textarea>
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

        {error && <p className="text-red-600 font-medium">{error}</p>}
        {message && <p className="text-green-600 font-medium">{message}</p>}

        <button
          type="submit"
          disabled={submitting}
          className={`w-full py-3 rounded-md text-white font-semibold transition-colors ${
            submitting
              ? "bg-blue-400 cursor-not-allowed"
              : "bg-blue-600 hover:bg-blue-700"
          }`}
        >
          {submitting ? "Submitting..." : "Submit Recommendation"}
        </button>
      </form>
    </div>
  );
};

export default Recommend;
