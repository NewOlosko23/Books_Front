import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const NotFound = () => {
  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-white via-blue-50 to-blue-100 px-6 py-16">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
        className="text-center max-w-xl"
      >
        <h1 className="text-7xl font-extrabold text-blue-700 mb-4">404</h1>
        <p className="text-2xl font-semibold text-gray-800 mb-2">
          Oops! Page not found
        </p>
        <p className="text-gray-600 mb-6">
          The page you’re looking for doesn’t exist or has been moved.
        </p>
        {user ? (
          <Link
            to="/dashboard"
            className="inline-block px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-full font-medium transition"
          >
            Go Back Dashboard
          </Link>
        ) : (
          <Link
            to="/"
            className="inline-block px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-full font-medium transition"
          >
            Go Back Home
          </Link>
        )}
      </motion.div>
    </div>
  );
};

export default NotFound;
