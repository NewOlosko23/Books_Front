import React, { useEffect, useRef, useState } from "react";
import {
  Menu,
  X,
  Home,
  BookOpen,
  Info,
  Phone,
  User,
  LogOut,
  LayoutDashboard,
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Header({ brand = "BooksArc" }) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const panelRef = useRef(null);
  const navigate = useNavigate();

  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  // scroll effect for shadow/bg
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // close menu on escape
  useEffect(() => {
    const onKey = (e) => e.key === "Escape" && setOpen(false);
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open]);

  // 🔹 Navigation links
  const nav = [
    user
      ? { to: "/dashboard", label: "Dashboard", icon: LayoutDashboard }
      : { to: "/", label: "Home", icon: Home },

    { to: "/browse", label: "Browse", icon: BookOpen },

    // Show How It Works only if user is NOT logged in
    !user && { to: "/how-it-works", label: "How It Works", icon: Info },

    // Recommend is always visible
    { to: "/recommend", label: "Recommend", icon: BookOpen },

    user
      ? { to: "/dashboard/profile", label: "Profile", icon: User }
      : { to: "/contact", label: "Contact", icon: Phone },
  ].filter(Boolean);

  const isActive = (to) =>
    typeof window !== "undefined" && window.location?.pathname === to;

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all ${
        scrolled ? "bg-white/95 shadow-sm" : "bg-white/80"
      }`}
      role="banner"
    >
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-2 bg-white text-gray-900 px-3 py-2 rounded-md shadow"
      >
        Skip to content
      </a>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="h-16 flex items-center justify-between">
          {/* Brand */}
          <a
            href={user ? "/dashboard" : "/"}
            className="flex items-center gap-2"
          >
            <span className="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-gray-100 border border-gray-200">
              <BookOpen className="h-5 w-5 text-gray-700" />
            </span>
            <span className="text-xl font-semibold tracking-tight text-gray-900">
              {brand}
            </span>
          </a>

          {/* Desktop nav */}
          <nav
            className="hidden md:flex items-center gap-1 lg:gap-2"
            aria-label="Primary"
          >
            {nav.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                className={`px-3 py-2 rounded-lg text-sm font-medium transition
                  ${
                    isActive(item.to)
                      ? "text-gray-900 bg-gray-100"
                      : "text-gray-700 hover:text-gray-900 hover:bg-gray-100"
                  }`}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* Right actions */}
          <div className="hidden md:flex items-center gap-2">
            {user ? (
              <>
                {/* + Add Book button */}
                <Link
                  to="/list-book"
                  className="inline-flex items-center gap-1 rounded-full bg-indigo-600 px-3 py-2 text-sm font-medium text-white hover:bg-indigo-700"
                >
                  + Add Book
                </Link>

                {/* Logout button */}
                <button
                  onClick={handleLogout}
                  className="inline-flex items-center cursor-pointer gap-2 rounded-full border border-gray-200 bg-white px-3 py-2 text-sm text-gray-700 hover:bg-gray-50"
                >
                  <LogOut className="h-4 w-4" />
                  <span className="hidden lg:inline">Logout</span>
                </button>
              </>
            ) : (
              <Link
                to="/signup"
                className="inline-flex items-center gap-2 rounded-full border border-gray-200 bg-white px-3 py-2 text-sm text-gray-700 hover:bg-gray-50"
              >
                <User className="h-4 w-4" />
                <span className="hidden lg:inline">Get Started</span>
              </Link>
            )}
          </div>

          {/* Mobile hamburger */}
          <button
            onClick={() => setOpen(true)}
            className="md:hidden inline-flex items-center justify-center rounded-lg p-2 text-gray-700 hover:bg-gray-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-300"
            aria-label="Open menu"
            aria-controls="mobile-menu"
            aria-expanded={open}
          >
            <Menu className="h-6 w-6" />
          </button>
        </div>
      </div>

      {/* Mobile drawer */}
      {open && (
        <div className="w-full">
          <div
            className="fixed inset-0 z-40 bg-black/70 w-full"
            onClick={() => setOpen(false)}
            aria-hidden="true"
          />
          <aside
            id="mobile-menu"
            ref={panelRef}
            role="dialog"
            aria-label="Navigation"
            className="fixed right-0 top-0 z-50 h-fit w-full max-w-2xl bg-white shadow-xl border-l border-gray-200"
          >
            <div className="flex items-center justify-between px-4 py-3 bg-gray-200">
              <Link to="/" className="text-lg font-semibold text-gray-900">
                {brand}
              </Link>
              <button
                onClick={() => setOpen(false)}
                className="rounded-lg p-2 text-gray-700 hover:bg-gray-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-300"
                aria-label="Close menu"
              >
                <X className="h-6 w-6" />
              </button>
            </div>

            <div className="px-4 py-4 bg-gray-200">
              <nav className="mt-4 space-y-1" aria-label="Mobile Primary">
                {nav.map((item) => {
                  const Icon = item.icon;
                  return (
                    <Link
                      key={item.to}
                      to={item.to}
                      onClick={() => setOpen(false)}
                      className="flex items-center gap-3 rounded-xl px-3 py-3 text-[15px] text-gray-800 hover:bg-gray-50 border border-transparent hover:border-gray-200"
                    >
                      <Icon className="h-5 w-5 text-gray-600" />
                      {item.label}
                    </Link>
                  );
                })}
              </nav>

              <div className="mt-6">
                {user ? (
                  <button
                    onClick={() => {
                      handleLogout();
                      setOpen(false);
                    }}
                    className="inline-flex w-full items-center justify-center gap-2 rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm text-gray-800 hover:bg-gray-50"
                  >
                    <LogOut className="h-4 w-4" />
                    Logout
                  </button>
                ) : (
                  <Link
                    to="/signup"
                    onClick={() => setOpen(false)}
                    className="inline-flex w-full items-center justify-center gap-2 rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm text-gray-800 hover:bg-gray-50"
                  >
                    <User className="h-4 w-4" />
                    Get Started
                  </Link>
                )}
              </div>
            </div>
          </aside>
        </div>
      )}
    </header>
  );
}
