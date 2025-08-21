import { useEffect, useState } from "react";
import { BookOpen, Clock, PlusCircle } from "lucide-react";
import { Link } from "react-router-dom";
import axios from "axios";

const Dashboard = () => {
  const storedUser = JSON.parse(localStorage.getItem("user"));
  const userData = storedUser?.data || {};

  const userId = userData._id || "unknown";
  const [books, setBooks] = useState([]);
  const [loadingBooks, setLoadingBooks] = useState(false);

  const formatCount = (n = 0) => {
    if (n === 0) return "No books";
    return `${n} book${n === 1 ? "" : "s"}`;
  };

  useEffect(() => {
    if (userId !== "unknown") {
      const fetchBooks = async () => {
        try {
          setLoadingBooks(true);
          const response = await axios.get(
            `https://books-server-5p0q.onrender.com/api/user/${userId}/books`,
            {
              headers: {
                Authorization: `Bearer ${storedUser.token}`,
              },
            }
          );
          setBooks(response.data || []);
        } catch (error) {
          console.error("Error fetching user books:", error);
        } finally {
          setLoadingBooks(false);
        }
      };

      fetchBooks();
    }
  }, [userId, storedUser?.token]);

  return (
    <div className="min-h-screen bg-gray-50 p-6 mt-14">
      <div className="max-w-6xl mx-auto">
        {/* Welcome */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-indigo-600">
            Welcome, {userData.username || "Guest"}!
          </h1>
        </div>

        {/* Overview Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white p-6 rounded-2xl shadow-lg flex items-center justify-between">
            <div>
              <h2 className="text-lg font-semibold">Subscription</h2>
              <p className="text-gray-500 text-sm">
                {userData.subscription
                  ? `${userData.subscription.tier} (${userData.subscription.status})`
                  : "No subscription"}
              </p>
            </div>
            <Clock className="text-yellow-500" size={36} />
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-lg flex items-center justify-between">
            <div>
              <h2 className="text-lg font-semibold">Books Listed</h2>
              <p className="text-gray-500 text-sm">
                {formatCount(books?.length)}
              </p>
            </div>
            <BookOpen className="text-indigo-600" size={36} />
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-lg flex items-center justify-between">
            <div>
              <h2 className="text-lg font-semibold">Books Borrowed</h2>
              <p className="text-gray-500 text-sm">0 active</p>
            </div>
            <BookOpen className="text-purple-500" size={36} />
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white p-6 rounded-2xl shadow-lg mb-8">
          <h2 className="text-xl font-bold mb-4">Quick Actions</h2>
          <div className="flex flex-wrap gap-4">
            <Link to="/list-book">
              <button className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-xl shadow transition cursor-pointer">
                <PlusCircle size={18} />
                List a Book
              </button>
            </Link>
            <Link to="/browse">
              <button className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-xl shadow transition cursor-pointer">
                <BookOpen size={18} />
                Browse Books
              </button>
            </Link>
          </div>
        </div>

        {/* My Books */}
        <div className="bg-white p-6 rounded-2xl shadow-lg mb-8">
          <h2 className="text-xl font-bold mb-4">My Books</h2>

          {loadingBooks ? (
            <p className="text-gray-500">Loading your books...</p>
          ) : books.length > 0 ? (
            <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {books.map((book) => (
                <li
                  key={book._id}
                  className="border rounded-2xl overflow-hidden shadow-sm bg-gray-50 hover:shadow-md transition-all duration-300"
                >
                  {/* Cover Image */}
                  <div className="w-full h-56 bg-black flex items-center justify-center overflow-hidden">
                    {book.coverImage ? (
                      <img
                        src={book.coverImage}
                        alt={book.title}
                        className="w-full h-full object-contain"
                      />
                    ) : (
                      <span className="text-gray-400 text-sm">No Image</span>
                    )}
                  </div>

                  <div className="p-4">
                    <h3 className="text-lg font-semibold mb-1 truncate">
                      {book.title}
                    </h3>
                    <p className="text-sm text-gray-600 mb-1 truncate">
                      By <span className="font-medium">{book.author}</span>
                    </p>

                    <p
                      className={`text-sm font-medium mb-1 ${
                        book.available ? "text-green-600" : "text-red-600"
                      }`}
                    >
                      {book.available ? "Available" : "Not Available"}
                    </p>

                    <p className="text-xs text-gray-500 mb-2 line-clamp-3">
                      {book.description || "No description provided."}
                    </p>

                    <p className="text-xs text-gray-400">
                      Posted on {new Date(book.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-500">You have not listed any books yet.</p>
          )}
        </div>

        {/* Profile */}
        <div className="bg-white p-6 rounded-2xl shadow-lg">
          <h2 className="text-xl font-bold mb-4">Your Profile</h2>
          <ul className="space-y-2 text-gray-700">
            <li>
              <strong>Username:</strong> {userData.username}
            </li>
            <li>
              <strong>Email:</strong> {userData.email}
            </li>
            <li>
              <strong>Phone:</strong> {userData.phone}
            </li>
            <li>
              <strong>ID Number:</strong> {userData.idNumber}
            </li>
            <li>
              <strong>Location:</strong> {userData.location}
            </li>
            {userData.subscription && (
              <li>
                <strong>Subscription:</strong> {userData.subscription.tier} (
                {userData.subscription.status})
              </li>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
