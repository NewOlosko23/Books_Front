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
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await axios.post(
        "https://books-server-5p0q.onrender.com/api/auth/register",
        formData,
        { headers: { "Content-Type": "application/json" } }
      );

      const data = response.data;

      // Save token and user details in localStorage
      localStorage.setItem("userToken", data.token);
      localStorage.setItem(
        "userDetails",
        JSON.stringify({
          username: data.username,
          email: data.email,
          _id: data._id,
        })
      );

      alert("Registration successful!");
      navigate("/dashboard");

      setFormData({
        username: "",
        email: "",
        password: "",
        phone: "",
        idNumber: "",
        location: "",
      });
    } catch (err) {
      if (err.response && err.response.data && err.response.data.message) {
        setError(err.response.data.message);
      } else {
        setError("An unexpected error occurred. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

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

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-center bg-cover p-4"
      style={{
        backgroundImage: `linear-gradient(to bottom right, rgba(255,255,255,0.85), rgba(240,240,255,0.9)), url(${Login})`,
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

        {error && (
          <p className="text-red-500 text-sm text-center mb-4">{error}</p>
        )}

        <form
          className="grid grid-cols-1 md:grid-cols-2 gap-4"
          onSubmit={handleSubmit}
        >
          {[
            {
              name: "username",
              label: "Username",
              type: "text",
              placeholder: "e.g. booklover23",
            },
            { name: "email", label: "Email", type: "email", placeholder: "" },
            {
              name: "password",
              label: "Password",
              type: "password",
              placeholder: "••••••••",
            },
            {
              name: "phone",
              label: "Phone",
              type: "tel",
              placeholder: "+254712345678",
            },
            {
              name: "idNumber",
              label: "ID Number",
              type: "text",
              placeholder: "",
            },
          ].map(({ name, label, type, placeholder }) => (
            <div key={name}>
              <label className="block text-sm font-medium text-gray-700">
                {label}
              </label>
              <input
                type={type}
                name={name}
                value={formData[name]}
                onChange={handleChange}
                placeholder={placeholder}
                className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition"
                required
              />
            </div>
          ))}

          {/* Location select dropdown */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Location
            </label>
            <select
              name="location"
              value={formData.location}
              onChange={handleChange}
              className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition"
              required
            >
              <option value="" disabled>
                Select Location
              </option>
              {locations.map((loc) => (
                <option key={loc} value={loc}>
                  {loc}
                </option>
              ))}
            </select>
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
