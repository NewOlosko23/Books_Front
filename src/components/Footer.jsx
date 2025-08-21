import React from "react";
import { Link } from "react-router-dom";
import { BookOpen, Facebook, Twitter, Instagram } from "lucide-react";

const Footer = ({ brand = "BooksArc" }) => {
  return (
    <footer className="bg-white/90 border-t border-gray-200" role="contentinfo">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10">
        {/* Top section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand + short text */}
          <div>
            <Link to="/" className="flex items-center gap-2">
              <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-gray-100 border border-gray-200">
                <BookOpen className="h-5 w-5 text-gray-700" />
              </span>
              <span className="text-lg font-semibold text-gray-900">
                {brand}
              </span>
            </Link>
            <p className="mt-3 text-sm text-gray-600 leading-relaxed">
              Your gateway to discovering, sharing, and enjoying books. Built
              with ❤️ for book lovers everywhere.
            </p>
          </div>

          {/* Navigation */}
          <div className="flex flex-col gap-2">
            <h3 className="text-sm font-semibold text-gray-900">Quick Links</h3>
            <Link
              to="/browse"
              className="text-sm text-gray-700 hover:text-gray-900 hover:bg-gray-100 rounded-md px-2 py-1 transition"
            >
              Browse
            </Link>
            <Link
              to="/how-it-works"
              className="text-sm text-gray-700 hover:text-gray-900 hover:bg-gray-100 rounded-md px-2 py-1 transition"
            >
              How It Works
            </Link>
            <Link
              to="/contact"
              className="text-sm text-gray-700 hover:text-gray-900 hover:bg-gray-100 rounded-md px-2 py-1 transition"
            >
              Contact
            </Link>
          </div>

          {/* Newsletter / Social */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900 mb-3">
              Stay Updated
            </h3>
            <form className="flex items-center gap-2">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 rounded-lg border border-gray-300 px-3 py-2 text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-300"
              />
              <button
                type="submit"
                className="rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-300"
              >
                Subscribe
              </button>
            </form>

            <div className="flex gap-3 mt-4 text-gray-500">
              <a href="#" className="hover:text-gray-900">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="hover:text-gray-900">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="hover:text-gray-900">
                <Instagram className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-gray-200 bg-white/80 text-center text-gray-500 text-sm py-3 px-4">
        © {new Date().getFullYear()} {brand}. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
