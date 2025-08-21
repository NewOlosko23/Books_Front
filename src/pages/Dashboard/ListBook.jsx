import { useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { UploadCloud } from "lucide-react";

const locations = [
  "Milimani",
  "Tom Mboya Estate",
  "MIG Estate",
  "Riat Hills",
  "Mountain View",
  "Mamboleo",
  "Nyamasaria",
  "Kiboswa",
  "Otonglo",
  "Kisian",
  "Rabuor",
  "Kibos",
  "Ojola",
  "Manyatta",
  "Nyalenda",
  "Obunga",
  "Kanyakwar",
];

const categories = [
  "Fiction",
  "Non-Fiction",
  "Science",
  "History",
  "Children",
  "Education",
  "Technology",
  "Biography",
  "Romance",
  "Mystery",
  "Fantasy",
];

const ListBook = () => {
  const [book, setBook] = useState({
    title: "",
    author: "",
    description: "",
    location: "",
  });
  const [filePreview, setFilePreview] = useState(null);
  const [base64Image, setBase64Image] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [progress, setProgress] = useState(0);
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setBook({ ...book, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setFilePreview(URL.createObjectURL(file));

    const reader = new FileReader();
    reader.onloadend = () => {
      const img = new Image();
      img.src = reader.result;

      img.onload = () => {
        const canvas = document.createElement("canvas");
        const maxWidth = 500;
        const maxHeight = 500;
        let width = img.width;
        let height = img.height;

        if (width > height && width > maxWidth) {
          height = (height * maxWidth) / width;
          width = maxWidth;
        } else if (height > maxHeight) {
          width = (width * maxHeight) / height;
          height = maxHeight;
        }

        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext("2d");
        ctx.drawImage(img, 0, 0, width, height);

        const resizedBase64 = canvas.toDataURL(file.type, 0.9);
        setBase64Image(resizedBase64);
      };
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!base64Image) return setError("Please select a cover image.");
    if (!book.location) return setError("Please select a location.");

    try {
      setLoading(true);
      setError("");
      setProgress(0);

      const user = localStorage.getItem("user");
      const token = user ? JSON.parse(user).token : null;

      if (!token) {
        setError("You must be logged in to list a book.");
        setLoading(false);
        return;
      }

      setProgress(25);

      const payload = {
        ...book,
        coverImage: base64Image,
      };

      setProgress(50);

      // Make the POST request and get the response
      const response = await axios.post(
        "https://books-server-5p0q.onrender.com/api/books",
        payload,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      //const createdBookId = response.data?.book?._id;

      //if (!createdBookId) {throw new Error("Book ID not returned from server.");}

      //const BookLink = `https://booksarc.co.ke/books/${createdBookId}`;

      setProgress(100);
      //setMessage(`Book listed successfully! View the book here: ${BookLink}`);
      setMessage(`Book listed successfully!`);

      // Reset form
      setBook({ title: "", author: "", description: "", location: "" });
      setFilePreview(null);
      setBase64Image("");
      setProgress(0);
    } catch (err) {
      setError(
        err.response?.data?.message || err.message || "Something went wrong."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-2xl mx-auto mt-24 p-8 bg-white rounded-2xl shadow-lg border border-gray-100"
    >
      <h2 className="text-3xl font-extrabold text-center bg-gradient-to-r from-indigo-500 to-indigo-600 bg-clip-text text-transparent mb-6">
        List a New Book
      </h2>

      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Title */}
        <div>
          <label className="block text-sm font-medium mb-1">Book Title</label>
          <input
            type="text"
            name="title"
            value={book.title}
            onChange={handleChange}
            className="w-full p-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-indigo-400 focus:outline-none"
            placeholder="e.g. The Great Gatsby"
            required
          />
          <p className="mt-1 text-xs text-gray-500">
            Enter the full title of the book exactly as it appears on the cover.
          </p>
        </div>

        {/* Author */}
        <div>
          <label className="block text-sm font-medium mb-1">Author</label>
          <input
            type="text"
            name="author"
            value={book.author}
            onChange={handleChange}
            className="w-full p-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-indigo-400 focus:outline-none"
            placeholder="e.g. F. Scott Fitzgerald"
            required
          />
          <p className="mt-1 text-xs text-gray-500">
            Provide the full name of the book’s author. If multiple authors,
            separate with commas.
          </p>
        </div>

        {/* Description */}
        <div>
          <label className="block text-sm font-medium mb-1">Description</label>
          <textarea
            name="description"
            value={book.description}
            onChange={handleChange}
            rows="4"
            className="w-full p-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-indigo-400 focus:outline-none"
            placeholder="Briefly describe the book..."
          />
          <p className="mt-1 text-xs text-gray-500">
            Write a short summary of the book. Mention key themes, topics, or
            what makes it interesting. Keep it under 200 words.
          </p>
        </div>

        {/* Location */}
        <div>
          <label className="block text-sm font-medium mb-1">Location</label>
          <select
            name="location"
            value={book.location}
            onChange={handleChange}
            className="w-full p-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-indigo-400 focus:outline-none"
            required
          >
            <option value="">Select a location</option>
            {locations.map((loc) => (
              <option key={loc} value={loc}>
                {loc}
              </option>
            ))}
          </select>
          <p className="mt-1 text-xs text-gray-500">
            Select the location where this book can be picked up or borrowed.
            Choose the nearest option to make it easy for others.
          </p>
        </div>

        {/* Category */}
        <div>
          <label className="block text-sm font-medium mb-1">Category</label>
          <select
            name="category"
            value={book.category}
            onChange={handleChange}
            className="w-full p-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-indigo-400 focus:outline-none"
            required
          >
            <option value="">Select a category</option>
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
          <p className="mt-1 text-xs text-gray-500">
            Choose the category that best matches the book. Examples: Fiction,
            Non-fiction, Biography, Science, etc.
          </p>
        </div>

        {/* Image Upload */}
        <div>
          <label className="block text-sm font-medium mb-2">Cover Image</label>
          <label className="flex flex-col items-center justify-center w-full h-40 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-indigo-400 transition">
            <UploadCloud className="w-10 h-10 text-gray-400" />
            <span className="text-gray-500">Click or drag to upload</span>
            <input
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleFileChange}
            />
          </label>
          <p className="mt-1 text-xs text-gray-500">
            Upload a clear image of the book’s cover. This helps other users
            recognize the book quickly.
          </p>

          {filePreview && (
            <div className="mt-3 border-2 border-black rounded-lg overflow-hidden flex items-center justify-center bg-gray-50">
              <img
                src={filePreview}
                alt="Preview"
                className="w-full h-40 object-contain"
              />
            </div>
          )}
        </div>

        {progress > 0 && (
          <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
            <div
              className="bg-indigo-600 h-2 rounded-full transition-all"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        )}

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-2 rounded-lg mb-4 text-center">
            {error}
          </div>
        )}
        {message && (
          <div className="bg-green-50 border border-green-200 text-green-600 px-4 py-2 rounded-lg mb-4 text-center">
            {message}
          </div>
        )}

        <motion.button
          type="submit"
          disabled={loading}
          whileHover={{ scale: !loading ? 1.02 : 1 }}
          whileTap={{ scale: 0.98 }}
          className={`w-full py-3 rounded-lg font-semibold text-white transition  cursor-pointer ${
            loading
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-indigo-600 hover:bg-indigo-700"
          }`}
        >
          {loading ? `Uploading... ${progress}%` : "List Book"}
        </motion.button>
      </form>
    </motion.div>
  );
};

export default ListBook;
