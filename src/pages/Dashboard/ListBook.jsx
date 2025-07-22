import { useState } from "react";
import { storage, db } from "../../firebase";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { useAuth } from "../../context/AuthContext";

const ListBook = () => {
  const { user } = useAuth();
  const [book, setBook] = useState({
    title: "",
    author: "",
    description: "",
    price: "",
  });
  const [file, setFile] = useState(null);
  const [filePreview, setFilePreview] = useState(null);
  const [progress, setProgress] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setBook({ ...book, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
    setFilePreview(selectedFile ? URL.createObjectURL(selectedFile) : null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) {
      setError("Please select a cover image.");
      return;
    }

    try {
      setLoading(true);
      setError("");

      const storageRef = ref(storage, `books/${Date.now()}_${file.name}`);
      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progressPercent = Math.round(
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100
          );
          setProgress(progressPercent);
        },
        (err) => {
          console.error(err);
          setError("Upload failed. Please try again.");
          setLoading(false);
        },
        async () => {
          const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
          await addDoc(collection(db, "books"), {
            ...book,
            price: parseFloat(book.price) || 0,
            coverUrl: downloadURL,
            userId: user.uid,
            status: "available",
            dueDate: null,
            createdAt: serverTimestamp(),
          });

          alert("Book listed successfully!");
          setBook({ title: "", author: "", description: "", price: "" });
          setFile(null);
          setFilePreview(null);
          setProgress(0);
          setLoading(false);
        }
      );
    } catch (err) {
      console.error(err);
      setError("Something went wrong. Please try again.");
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
        {/* Title */}
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

        {/* Author */}
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

        {/* Description */}
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

        {/* Price */}
        <div>
          <label className="block text-sm font-semibold mb-1">
            Price (KES)
          </label>
          <input
            type="number"
            name="price"
            value={book.price}
            onChange={handleChange}
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          />
        </div>

        {/* File Upload */}
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

        {/* Progress */}
        {progress > 0 && (
          <p className="text-sm text-blue-600 font-semibold text-center">
            Uploading: {progress}%
          </p>
        )}

        {/* Submit Button */}
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
