import React from "react";
import { motion } from "framer-motion";
import { Mail, MapPin, Phone } from "lucide-react";

const ContactUs = () => {
  return (
    <div className="px-6 py-16 bg-gradient-to-b from-white to-gray-50 min-h-screen">
      <motion.h1
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-5xl font-extrabold text-center text-blue-700 mb-4"
      >
        Contact Us
      </motion.h1>

      <p className="text-center text-gray-600 max-w-xl mx-auto text-lg mb-12">
        Have questions, feedback, or need help? Reach out and we’ll get back to
        you as soon as possible.
      </p>

      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Contact Info Section */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-gradient-to-br from-blue-100 to-blue-50 rounded-3xl shadow-xl p-8 space-y-6"
        >
          <div className="flex items-center space-x-4">
            <div className="bg-white p-3 rounded-full shadow-md">
              <Mail className="text-blue-600 w-6 h-6" />
            </div>
            <div>
              <h4 className="font-semibold text-gray-800">Email</h4>
              <p className="text-gray-600">support@bookhub.co.ke</p>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <div className="bg-white p-3 rounded-full shadow-md">
              <Phone className="text-green-600 w-6 h-6" />
            </div>
            <div>
              <h4 className="font-semibold text-gray-800">Phone</h4>
              <p className="text-gray-600">+254 712 345 678</p>
            </div>
          </div>

          <div className="flex items-start space-x-4">
            <div className="bg-white p-3 rounded-full shadow-md">
              <MapPin className="text-purple-600 w-6 h-6" />
            </div>
            <div>
              <h4 className="font-semibold text-gray-800">Location</h4>
              <p className="text-gray-600">
                Nairobi, Kenya <br />
                Open: Mon – Sat (9AM – 5PM)
              </p>
            </div>
          </div>
        </motion.div>

        {/* Contact Form */}
        <motion.form
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-gradient-to-br from-gray-100 to-white rounded-3xl shadow-xl p-8 space-y-6"
        >
          <div>
            <label className="block font-medium text-gray-700 mb-1">
              Your Name
            </label>
            <input
              type="text"
              className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-400 focus:outline-none"
              placeholder="John Doe"
              required
            />
          </div>

          <div>
            <label className="block font-medium text-gray-700 mb-1">
              Your Email
            </label>
            <input
              type="email"
              className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-400 focus:outline-none"
              placeholder="johndoe@email.com"
              required
            />
          </div>

          <div>
            <label className="block font-medium text-gray-700 mb-1">
              Your Message
            </label>
            <textarea
              rows={5}
              className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-400 focus:outline-none"
              placeholder="Type your message here..."
              required
            ></textarea>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl text-lg font-semibold transition"
          >
            Send Message
          </button>
        </motion.form>
      </div>
    </div>
  );
};

export default ContactUs;
