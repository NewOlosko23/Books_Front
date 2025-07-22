import { useState } from "react";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { auth, db } from "../firebase"; // Import Firestore
import { createUserWithEmailAndPassword } from "firebase/auth";
import { setDoc, doc } from "firebase/firestore"; // Firestore functions
import Login from "../assets/login.jpg";

const Signup = () => {
  const [formData, setFormData] = useState({
    username: "",
    firstName: "",
    lastName: "",
    idNumber: "",
    location: "",
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      // Create user in Firebase Auth (only email & password)
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        formData.email,
        formData.password
      );
      const user = userCredential.user;

      // Prepare user object (excluding password)
      const { username, firstName, lastName, idNumber, location, email } =
        formData;

      const userData = {
        username,
        firstName,
        lastName,
        idNumber,
        location,
        email,
      };

      // Store additional user details in Firestore
      await setDoc(doc(db, "users", user.uid), userData);

      // Cache user details in localStorage for persistence
      localStorage.setItem("userDetails", JSON.stringify(userData));

      alert("Registration successful!");
      navigate("/dashboard"); // Redirect to dashboard after successful signup

      // Reset form
      setFormData({
        username: "",
        firstName: "",
        lastName: "",
        idNumber: "",
        location: "",
        email: "",
        password: "",
      });
    } catch (err) {
      console.error(err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-center bg-cover p-4"
      style={{
        backgroundImage: `linear-gradient(to bottom right, rgba(255, 255, 255, 0.85), rgba(240, 240, 255, 0.9)), url(${Login})`,
      }}
    >
      <motion.div
        initial={{ opacity: 0, y: 60 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="bg-white bg-opacity-90 backdrop-blur-md shadow-2xl rounded-2xl p-8 w-full max-w-3xl"
      >
        <h2 className="text-2xl font-bold text-blue-600 text-center mb-6">
          Create an Account
        </h2>

        {error && <p className="text-red-500 text-sm text-center">{error}</p>}

        <form
          className="grid grid-cols-1 md:grid-cols-2 gap-4"
          onSubmit={handleSubmit}
        >
          {[
            "username",
            "firstName",
            "lastName",
            "idNumber",
            "location",
            "email",
          ].map((field, i) => (
            <div key={i}>
              <label className="block text-sm font-medium text-gray-700">
                {field === "idNumber"
                  ? "ID Number"
                  : field.charAt(0).toUpperCase() + field.slice(1)}
              </label>
              <input
                type={field === "email" ? "email" : "text"}
                name={field}
                value={formData[field]}
                onChange={handleChange}
                placeholder={
                  field === "username"
                    ? "e.g. booklover23"
                    : field === "location"
                    ? "Homa Bay, Kenya"
                    : ""
                }
                className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition"
                required
              />
            </div>
          ))}

          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="••••••••"
              className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition"
              required
            />
          </div>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.97 }}
            type="submit"
            disabled={loading}
            className="md:col-span-2 w-full bg-blue-600 text-white py-2 rounded-xl mt-4 hover:bg-blue-700 transition shadow-md"
          >
            {loading ? "Signing Up..." : "Sign Up"}
          </motion.button>
        </form>

        <p className="text-sm text-center text-gray-500 mt-6">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-600 hover:underline">
            Login
          </Link>
        </p>
      </motion.div>
    </div>
  );
};

export default Signup;
