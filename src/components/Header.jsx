import { useState } from "react";
import { Menu, X } from "lucide-react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const toggleMenu = () => setMenuOpen(!menuOpen);

  const closeMenu = () => setMenuOpen(false);

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16">
        {/* Logo with subtle animation */}
        <Link to="/">
          <motion.h1
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="text-2xl font-extrabold text-blue-600 tracking-wide"
          >
            📚 Book Club
          </motion.h1>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex space-x-6 items-center">
          <Link to="/" className="text-gray-700 hover:text-blue-600 transition">
            Home
          </Link>
          <Link
            to="/browse"
            className="text-gray-700 hover:text-blue-600 transition"
          >
            Browse
          </Link>
          <Link
            to="how-it-works"
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

          {/* CTA Button */}
          <Link
            to="/signup"
            className="ml-4 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-xl transition-all shadow-md"
          >
            Get Started
          </Link>
        </nav>

        {/* Hamburger for Mobile */}
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
          <Link
            to="/"
            onClick={closeMenu}
            className="block text-gray-700 hover:text-blue-600"
          >
            Home
          </Link>
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
          <Link
            to="/signup"
            onClick={closeMenu}
            className="block bg-blue-600 hover:bg-blue-700 text-white text-center px-4 py-2 rounded-xl transition-all shadow-md"
          >
            Get Started
          </Link>
        </motion.div>
      )}
    </header>
  );
};

export default Header;
