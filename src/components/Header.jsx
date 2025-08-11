import { useState } from "react";
import { Menu, X } from "lucide-react";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const toggleMenu = () => setMenuOpen(!menuOpen);
  const closeMenu = () => setMenuOpen(false);

  const handleLogout = () => {
    logout(); // clear user state in context
    navigate("/login"); // redirect to login page
    closeMenu(); // close mobile menu if open
  };

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16">
        {/* Logo */}
        <Link to={user ? "/dashboard" : "/"}>
          <motion.h1
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="text-2xl font-extrabold text-blue-600 tracking-wide"
          >
            📚 BooksArc
          </motion.h1>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex space-x-6 items-center">
          {user && (
            <Link
              to="/dashboard"
              className="text-gray-700 hover:text-blue-600 transition"
            >
              Dashboard
            </Link>
          )}

          <Link
            to="/browse"
            className="text-gray-700 hover:text-blue-600 transition"
          >
            Browse
          </Link>
          <Link
            to="/how-it-works"
            className="text-gray-700 hover:text-blue-600 transition"
          >
            How It Works
          </Link>
          <Link
            to="/contact"
            className="text-gray-700 hover:text-blue-600 transition"
          >
            Contact
          </Link>

          {user ? (
            <button
              onClick={handleLogout}
              className="ml-4 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-xl transition-all shadow-md"
            >
              Logout
            </button>
          ) : (
            <Link
              to="/signup"
              className="ml-4 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-xl transition-all shadow-md"
            >
              Get Started
            </Link>
          )}
        </nav>

        {/* Mobile Menu Button */}
        <button
          onClick={toggleMenu}
          className="md:hidden text-gray-700 hover:text-blue-600"
        >
          {menuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Navigation */}
      {menuOpen && (
        <motion.div
          initial={{ height: 0 }}
          animate={{ height: "auto" }}
          className="md:hidden bg-white px-4 pb-4 space-y-2 overflow-hidden border-t border-gray-200"
        >
          {user && (
            <Link
              to="/dashboard"
              onClick={closeMenu}
              className="block text-gray-700 hover:text-blue-600"
            >
              Dashboard
            </Link>
          )}
          <Link
            to="/browse"
            onClick={closeMenu}
            className="block text-gray-700 hover:text-blue-600"
          >
            Browse
          </Link>
          <Link
            to="/how-it-works"
            onClick={closeMenu}
            className="block text-gray-700 hover:text-blue-600"
          >
            How It Works
          </Link>
          <Link
            to="/contact"
            onClick={closeMenu}
            className="block text-gray-700 hover:text-blue-600"
          >
            Contact
          </Link>
          {user ? (
            <button
              onClick={() => {
                handleLogout();
              }}
              className="block w-full bg-red-600 hover:bg-red-700 text-white text-center px-4 py-2 rounded-xl transition-all shadow-md"
            >
              Logout
            </button>
          ) : (
            <Link
              to="/signup"
              onClick={closeMenu}
              className="block bg-blue-600 hover:bg-blue-700 text-white text-center px-4 py-2 rounded-xl transition-all shadow-md"
            >
              Get Started
            </Link>
          )}
        </motion.div>
      )}
    </header>
  );
};

export default Header;
