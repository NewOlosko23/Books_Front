import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { BookOpen, CheckCircle, Clock, PlusCircle } from "lucide-react";
import { db } from "../../firebase";
import {
  collection,
  query,
  where,
  getDocs,
  doc,
  getDoc,
} from "firebase/firestore";

const Dashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [userDetails, setUserDetails] = useState(null);
  const [subscriptionStatus, setSubscriptionStatus] =
    useState("Pending Payment");
  const [myBooks, setMyBooks] = useState([]);

  // Fetch user details from Firestore if not in localStorage
  useEffect(() => {
    const fetchUserDetails = async () => {
      const cachedDetails = localStorage.getItem("userDetails");
      if (cachedDetails) {
        setUserDetails(JSON.parse(cachedDetails));
      } else if (user) {
        const userRef = doc(db, "users", user.uid);
        const userSnap = await getDoc(userRef);
        if (userSnap.exists()) {
          setUserDetails(userSnap.data());
          localStorage.setItem("userDetails", JSON.stringify(userSnap.data()));
        }
      }
    };
    fetchUserDetails();
  }, [user]);

  // Fetch user's books from Firestore
  useEffect(() => {
    if (!user) return;
    const fetchBooks = async () => {
      const q = query(collection(db, "books"), where("userId", "==", user.uid));
      const querySnapshot = await getDocs(q);
      const books = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setMyBooks(books);
    };
    fetchBooks();
  }, [user]);

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
                {myBooks.filter((b) => b.status === "hired").length} active
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
                        Due:{" "}
                        {new Date(
                          book.dueDate.seconds * 1000
                        ).toLocaleDateString()}
                      </p>
                    )}
                  </div>
                  <p className="mt-1 font-semibold text-blue-600">
                    KES {book.price || 0}
                  </p>
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
