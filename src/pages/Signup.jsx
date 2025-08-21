import { useState } from "react";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Login from "../assets/login.jpg";

const Signup = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    phone: "",
    idNumber: "",
    location: "",
    agreeTerms: false,
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

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

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setMessage("");

    if (!formData.agreeTerms) {
      setError("You must agree to the terms and conditions.");
      return;
    }

    setLoading(true);

    try {
      const response = await axios.post(
        "https://books-server-5p0q.onrender.com/api/auth/register",
        formData,
        { headers: { "Content-Type": "application/json" } }
      );

      const data = response.data;

      if (data.error) {
        setError(data.error);
        setLoading(false);
        return;
      }

      setMessage("Registration successful!");
      setLoading(false);
      navigate("/dashboard");

      setFormData({
        username: "",
        email: "",
        password: "",
        phone: "",
        idNumber: "",
        location: "",
        agreeTerms: false,
      });
    } catch (err) {
      if (err.response?.data?.message) {
        setError(err.response.data.message);
      } else {
        setError("An unexpected error occurred. Please try again.");
      }
      setLoading(false);
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-center bg-cover p-4 mt-14"
      style={{
        backgroundImage: `linear-gradient(to bottom right, rgba(255, 255, 255, 0.8), rgba(240, 240, 255, 0.9)), url(${Login})`,
      }}
    >
      <motion.div
        initial={{ opacity: 0, y: 60 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="bg-white bg-opacity-80 backdrop-blur-md shadow-2xl rounded-3xl p-10 max-w-2xl w-full border border-white/40"
      >
        <h2 className="text-4xl font-extrabold text-blue-700 text-center mb-6">
          Create an Account
        </h2>
        <p className="text-center text-gray-600 mb-10">
          Join <span className="font-semibold text-blue-600">BooksArc</span> and
          unlock a world of reading.
        </p>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Username */}
          <div>
            <label
              htmlFor="username"
              className="block text-sm font-semibold text-gray-700"
            >
              Username
            </label>
            <input
              id="username"
              name="username"
              type="text"
              value={formData.username}
              onChange={handleChange}
              placeholder="e.g. booklover23"
              required
              className="mt-2 w-full px-4 py-3 border border-gray-200 rounded-xl bg-white/70 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
            />
            <p className="mt-1 text-xs text-gray-500">
              This will be your display name across BooksArc.
            </p>
          </div>

          {/* Email */}
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-semibold text-gray-700"
            >
              Email Address
            </label>
            <input
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="you@example.com"
              required
              className="mt-2 w-full px-4 py-3 border border-gray-200 rounded-xl bg-white/70 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
            />
            <p className="mt-1 text-xs text-gray-500">
              We’ll send verification and updates to this email.
            </p>
          </div>

          {/* Password */}
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-semibold text-gray-700"
            >
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="••••••••"
              required
              className="mt-2 w-full px-4 py-3 border border-gray-200 rounded-xl bg-white/70 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
            />
            <p className="mt-1 text-xs text-gray-500">
              Must be at least 8 characters with a mix of letters & numbers.
            </p>
          </div>

          {/* Phone */}
          <div>
            <label
              htmlFor="phone"
              className="block text-sm font-semibold text-gray-700"
            >
              Phone Number
            </label>
            <input
              id="phone"
              name="phone"
              type="tel"
              value={formData.phone}
              onChange={handleChange}
              placeholder="+254712345678"
              required
              className="mt-2 w-full px-4 py-3 border border-gray-200 rounded-xl bg-white/70 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
            />
            <p className="mt-1 text-xs text-gray-500">
              Enter a valid number for delivery updates and account recovery.
            </p>
          </div>

          {/* ID Number */}
          <div>
            <label
              htmlFor="idNumber"
              className="block text-sm font-semibold text-gray-700"
            >
              ID Number
            </label>
            <input
              id="idNumber"
              name="idNumber"
              type="text"
              value={formData.idNumber}
              onChange={handleChange}
              placeholder="Enter your ID number"
              required
              className="mt-2 w-full px-4 py-3 border border-gray-200 rounded-xl bg-white/70 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
            />
            <p className="mt-1 text-xs text-gray-500">
              Used for identity verification to ensure secure borrowing.
            </p>
          </div>

          {/* Location */}
          <div>
            <label
              htmlFor="location"
              className="block text-sm font-semibold text-gray-700"
            >
              Location
            </label>
            <select
              id="location"
              name="location"
              value={formData.location}
              onChange={handleChange}
              required
              className="mt-2 w-full px-4 py-3 border border-gray-200 rounded-xl bg-white/70 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
            >
              <option value="" disabled>
                Select your location
              </option>
              {locations.map((loc) => (
                <option key={loc} value={loc}>
                  {loc}
                </option>
              ))}
            </select>
            <p className="mt-1 text-xs text-gray-500">
              Choose the nearest area for convenient book delivery.
            </p>
          </div>

          {/* Terms */}
          <div className="flex items-start">
            <input
              id="agreeTerms"
              name="agreeTerms"
              type="checkbox"
              checked={formData.agreeTerms}
              onChange={handleChange}
              className="mt-1 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              required
            />
            <label htmlFor="agreeTerms" className="ml-2 text-sm text-gray-700">
              By signing up, you agree to the{" "}
              <Link
                to="/terms"
                target="_blank"
                className="text-blue-600 hover:underline"
              >
                Terms and Conditions
              </Link>{" "}
              of BooksArc.
            </label>
          </div>

          {/* Error */}
          {error && (
            <p className="text-center text-red-600 font-semibold text-sm">
              {error}
            </p>
          )}

          {/* Success */}
          {message && (
            <p className="text-center text-green-600 font-semibold text-sm">
              {message}
            </p>
          )}

          {/* Button */}
          <motion.button
            type="submit"
            disabled={loading}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className={`w-full py-3 rounded-2xl text-white font-semibold shadow-lg backdrop-blur-md transition ${
              loading
                ? "bg-blue-400 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700 cursor-pointer"
            }`}
          >
            {loading ? "Signing Up..." : "Sign Up"}
          </motion.button>
        </form>

        <p className="mt-8 text-center text-gray-600 text-sm">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-600 hover:underline">
            Log in here
          </Link>
          .
        </p>
      </motion.div>
    </div>
  );
};

export default Signup;
