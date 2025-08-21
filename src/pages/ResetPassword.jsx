import { useState } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import ResetImage from "../assets/login.jpg"; // reuse your login background

const ResetPassword = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleResetRequest = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setMessage("");

    try {
      const res = await axios.post(
        "https://books-server-5p0q.onrender.com/api/password/forgot-password",
        { email }
      );
      setMessage(res.data.message || "Check your email for reset link.");
    } catch (err) {
      setError(
        err.response?.data?.message || "Could not send reset link. Try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-center bg-cover p-4"
      style={{
        backgroundImage: `linear-gradient(to bottom right, rgba(255, 255, 255, 0.8), rgba(240, 240, 255, 0.9)), url(${ResetImage})`,
      }}
    >
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="bg-white bg-opacity-90 shadow-2xl backdrop-blur-lg rounded-2xl p-8 w-full max-w-md"
      >
        <h2 className="text-2xl font-bold text-blue-600 text-center mb-6">
          Reset Password
        </h2>

        {error && <p className="text-red-500 text-sm text-center">{error}</p>}
        {message && (
          <p className="text-green-600 text-sm text-center">{message}</p>
        )}

        <form className="space-y-4 mt-4" onSubmit={handleResetRequest}>
          <div>
            <label className="block text-sm font-medium text-gray-600">
              Enter your email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition"
              placeholder="you@example.com"
              required
            />
          </div>

          <motion.button
            whileTap={{ scale: 0.95 }}
            whileHover={{ scale: 1.02 }}
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white py-2 rounded-xl mt-4 hover:bg-blue-700 transition shadow-md"
          >
            {loading ? "Sending..." : "Send Reset Link"}
          </motion.button>
        </form>
      </motion.div>
    </div>
  );
};

export default ResetPassword;
