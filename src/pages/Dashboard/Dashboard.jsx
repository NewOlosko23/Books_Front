import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { BookOpen, CheckCircle, Clock, PlusCircle } from "lucide-react";
import axios from "axios";

const Dashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [userDetails, setUserDetails] = useState(null);
  const [subscriptionStatus, setSubscriptionStatus] =
    useState("Pending Payment");
  const [myBooks, setMyBooks] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch user details from localStorage or backend
  useEffect(() => {
    const fetchUserDetails = async () => {
      const cachedDetails = localStorage.getItem("userDetails");
      if (cachedDetails) {
        const details = JSON.parse(cachedDetails);
        setUserDetails(details);
        setSubscriptionStatus(
          details.subscription?.status || "Pending Payment"
        );
        setLoading(false);
      } else if (user) {
        try {
          // Replace URL with your backend endpoint to fetch user details
          const res = await axios.get(`/api/users/${user.id || user._id}`);
          const details = res.data;
          setUserDetails(details);
          setSubscriptionStatus(
            details.subscription?.status || "Pending Payment"
          );
          localStorage.setItem("userDetails", JSON.stringify(details));
        } catch (error) {
          console.error("Failed to fetch user details", error);
        } finally {
          setLoading(false);
        }
      } else {
        setLoading(false);
      }
    };

    fetchUserDetails();
  }, [user]);

  // Fetch user's books from backend or localStorage
  useEffect(() => {
    const fetchBooks = async () => {
      if (!user) return;

      const cachedBooks = localStorage.getItem("myBooks");
      if (cachedBooks) {
        try {
          const parsedBooks = JSON.parse(cachedBooks);
          setMyBooks(Array.isArray(parsedBooks) ? parsedBooks : []);
        } catch {
          setMyBooks([]);
        }
      } else {
        try {
          // Replace URL with your backend endpoint to fetch user's books
          const res = await axios.get(
            `/api/books?ownerId=${user.id || user._id}`
          );
          setMyBooks(Array.isArray(res.data) ? res.data : []);
          localStorage.setItem("myBooks", JSON.stringify(res.data));
        } catch (error) {
          console.error("Failed to fetch books", error);
        }
      }
    };

    fetchBooks();
  }, [user]);

  if (loading) return <p>Loading dashboard...</p>;

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-5xl mx-auto">
        {/* Welcome */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-blue-600">
            📚 Welcome, {userDetails?.firstName || "User"}!
          </h1>
        </div>

        {/* Subscription Status */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <div className="bg-white p-4 rounded-xl shadow-md flex items-center justify-between">
            <div>
              <h2 className="text-lg font-semibold">Subscription</h2>
              <p className="text-gray-500 text-sm">
                Status: {subscriptionStatus}
              </p>
            </div>
            {subscriptionStatus === "Active" ? (
              <CheckCircle className="text-green-500" size={32} />
            ) : (
              <Clock className="text-yellow-500" size={32} />
            )}
          </div>

          <div className="bg-white p-4 rounded-xl shadow-md flex items-center justify-between">
            <div>
              <h2 className="text-lg font-semibold">Books Listed</h2>
              <p className="text-gray-500 text-sm">{myBooks.length} books</p>
            </div>
            <BookOpen className="text-blue-500" size={32} />
          </div>

          <div className="bg-white p-4 rounded-xl shadow-md flex items-center justify-between">
            <div>
              <h2 className="text-lg font-semibold">Books Borrowed</h2>
              <p className="text-gray-500 text-sm">
                {Array.isArray(myBooks)
                  ? myBooks.filter((b) => b.status === "hired").length
                  : 0}{" "}
                active
              </p>
            </div>
            <BookOpen className="text-purple-500" size={32} />
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white p-6 rounded-xl shadow-md mb-6">
          <h2 className="text-xl font-bold mb-4">Quick Actions</h2>
          <div className="flex gap-4">
            <button
              className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg shadow transition"
              onClick={() => navigate("/list-book")}
            >
              <PlusCircle size={18} />
              List a Book
            </button>
            <button
              className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg shadow transition"
              onClick={() => navigate("/browse")}
            >
              <BookOpen size={18} />
              Browse Books
            </button>
          </div>
        </div>

        {/* My Books Section */}
        <div className="bg-white p-6 rounded-xl shadow-md mb-6">
          <h2 className="text-xl font-bold mb-4">My Books</h2>
          {myBooks.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {myBooks.map((book) => (
                <div
                  key={book.id}
                  className="border rounded-lg p-4 shadow hover:shadow-md transition"
                >
                  <img
                    src={book.coverUrl}
                    alt={book.title}
                    className="w-full h-40 object-cover rounded mb-3"
                  />
                  <h3 className="text-lg font-semibold">{book.title}</h3>
                  <p className="text-gray-600 text-sm">{book.author}</p>
                  <p className="text-sm text-gray-500">{book.description}</p>
                  <div className="mt-2 text-sm">
                    <span
                      className={`px-2 py-1 rounded ${
                        book.status === "available"
                          ? "bg-green-100 text-green-700"
                          : "bg-yellow-100 text-yellow-700"
                      }`}
                    >
                      {book.status}
                    </span>
                    {book.status === "hired" && book.dueDate && (
                      <p className="text-xs text-gray-500">
                        Due: {new Date(book.dueDate).toLocaleDateString()}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500">You have not listed any books yet.</p>
          )}
        </div>

        {/* User Info Section */}
        <div className="bg-white p-6 rounded-xl shadow-md">
          <h2 className="text-xl font-bold mb-4">Your Profile</h2>
          {userDetails ? (
            <ul className="space-y-2 text-gray-700">
              <li>
                <strong>Username:</strong> {userDetails.username}
              </li>
              <li>
                <strong>Name:</strong> {userDetails.firstName}{" "}
                {userDetails.lastName}
              </li>
              <li>
                <strong>ID Number:</strong> {userDetails.idNumber}
              </li>
              <li>
                <strong>Location:</strong> {userDetails.location}
              </li>
              <li>
                <strong>Email:</strong> {user?.email}
              </li>
            </ul>
          ) : (
            <p className="text-gray-500">Loading user details...</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
