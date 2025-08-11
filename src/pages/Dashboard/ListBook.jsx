import { useState } from "react";
import axios from "axios";

const locations = [
  "Milimani",
  "Tom Mboya Estate",
  "MIG Estate",
  "Riat Hills",
  "Mountain View",
  "Mamboleo",
  "Kibos",
  "Ojola",
  "Manyatta",
  "Nyalenda",
  "Obunga",
  "Kanyakwar",
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

        if (width > height) {
          if (width > maxWidth) {
            height = (height * maxWidth) / width;
            width = maxWidth;
          }
        } else {
          if (height > maxHeight) {
            width = (width * maxHeight) / height;
            height = maxHeight;
          }
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

    if (!base64Image) {
      setError("Please select a cover image.");
      return;
    }

    if (!book.location) {
      setError("Please select a location.");
      return;
    }

    try {
      setLoading(true);
      setError("");
      setProgress(0);

      const token = localStorage.getItem("userToken");
      if (!token) {
        setError("You must be logged in to list a book.");
        setLoading(false);
        return;
      }

      const payload = {
        title: book.title,
        author: book.author,
        description: book.description,
        location: book.location,
        coverImage: base64Image,
      };

      setProgress(50);

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

      setProgress(100);

      alert("Book listed successfully!");
      setBook({ title: "", author: "", description: "", location: "" });
      setFilePreview(null);
      setBase64Image("");
      setProgress(0);
    } catch (err) {
      console.error(err);
      setError(
        err.response?.data?.message || "Something went wrong. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-xl shadow-md mt-8">
      <h2 className="text-2xl font-bold text-blue-600 mb-6 text-center">
        List a Book
      </h2>

      {error && <p className="text-red-500 text-center mb-4">{error}</p>}

      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label className="block text-sm font-semibold mb-1">Book Title</label>
          <input
            type="text"
            name="title"
            value={book.title}
            onChange={handleChange}
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-semibold mb-1">Author</label>
          <input
            type="text"
            name="author"
            value={book.author}
            onChange={handleChange}
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-semibold mb-1">
            Book Description
          </label>
          <textarea
            name="description"
            value={book.description}
            onChange={handleChange}
            rows="4"
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold mb-1">Location</label>
          <select
            name="location"
            value={book.location}
            onChange={handleChange}
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          >
            <option value="" disabled>
              Select location
            </option>
            {locations.map((loc) => (
              <option key={loc} value={loc}>
                {loc}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-semibold mb-1">
            Cover Image
          </label>
          <input
            type="file"
            onChange={handleFileChange}
            className="w-full"
            accept="image/*"
            required
          />
          {filePreview && (
            <img
              src={filePreview}
              alt="Preview"
              className="w-full h-40 object-cover rounded-lg mt-3 border"
            />
          )}
        </div>

        {progress > 0 && (
          <p className="text-sm text-blue-600 font-semibold text-center">
            Uploading: {progress}%
          </p>
        )}

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition"
        >
          {loading ? `Uploading... ${progress}%` : "List Book"}
        </button>
      </form>
    </div>
  );
};

export default ListBook;
