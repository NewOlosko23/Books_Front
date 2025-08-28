import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import LoginImage from "../assets/login.jpg";

const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await axios.post(
        "https://books-server-5p0q.onrender.com/api/auth/login",
        formData,
        { headers: { "Content-Type": "application/json" } }
      );

      const data = response.data;

      login({ data: data.user, token: data.token });
      navigate("/browse");
    } catch (err) {
      if (err.response?.data?.message) {
        setError(err.response.data.message);
      } else {
        setError("Invalid email or password. Please try again.");
      }
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-center bg-cover p-4 mt-14"
      style={{
        backgroundImage: `linear-gradient(to bottom right, rgba(255, 255, 255, 0.8), rgba(240, 240, 255, 0.9)), url(${LoginImage})`,
      }}
    >
      <motion.div
        initial={{ opacity: 0, y: 60 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="bg-white/70 backdrop-blur-md shadow-2xl rounded-3xl p-10 w-full max-w-lg"
      >
        <h2 className="text-3xl font-extrabold text-blue-700 text-center mb-8">
          Welcome Back
        </h2>

        {error && (
          <p className="text-red-600 text-center text-sm font-semibold mb-4">
            {error}
          </p>
        )}

        <form className="space-y-6" onSubmit={handleLogin}>
          {/* Email */}
          <div>
            <label className="block text-sm font-semibold text-gray-700">
              Email Address
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="mt-2 w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition"
              placeholder="you@example.com"
              required
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-semibold text-gray-700">
              Password
            </label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="mt-2 w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition"
              placeholder="••••••••"
              required
            />
          </div>

          {/* Forgot Password */}
          <div className="text-right text-sm">
            <Link
              to="/forgot-password"
              className="text-blue-600 hover:underline"
            >
              Forgot password?
            </Link>
          </div>

          {/* Login Button */}
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            type="submit"
            disabled={loading}
            className={`w-full py-3 rounded-xl text-white font-semibold shadow-md transition ${
              loading
                ? "bg-blue-400 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700 cursor-pointer"
            }`}
          >
            {loading ? "Logging in..." : "Login"}
          </motion.button>
        </form>

        {/* Signup Redirect */}
        <p className="text-center text-gray-600 text-sm mt-8">
          Don’t have an account?{" "}
          <Link
            to="/signup"
            className="text-blue-600 hover:underline font-medium"
          >
            Get Started
          </Link>
        </p>
      </motion.div>
    </div>
  );
};

export default Login;
