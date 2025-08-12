import React from "react";
import { motion } from "framer-motion";
import {
  BookOpen,
  UserPlus,
  CreditCard,
  Repeat,
  Star,
  Share2,
} from "lucide-react";
import { Link } from "react-router-dom";

const steps = [
  {
    icon: <UserPlus className="w-8 h-8 text-blue-600" />,
    title: "Create an Account",
    description:
      "Sign up for free and become part of a growing community of book lovers. Your profile lets you lend or borrow books in just a few clicks.",
    bg: "from-blue-100 to-blue-50",
  },
  {
    icon: <BookOpen className="w-8 h-8 text-green-600" />,
    title: "List or Browse Books",
    description:
      "Add your books with details and images — or explore the library of available books from other users based on category and location.",
    bg: "from-green-100 to-green-50",
  },
  {
    icon: <CreditCard className="w-8 h-8 text-purple-600" />,
    title: "Subscribe to Access",
    description:
      "Choose a simple subscription to unlock the power of borrowing and lending. This helps keep transactions secure and reliable.",
    bg: "from-purple-100 to-purple-50",
  },
  {
    icon: <Share2 className="w-8 h-8 text-yellow-600" />,
    title: "Request or Approve Lending",
    description:
      "Found a book? Request it. Got a request? Approve it. The process is seamless — messages are sent directly between borrowers and lenders.",
    bg: "from-yellow-100 to-yellow-50",
  },
  {
    icon: <Repeat className="w-8 h-8 text-pink-600" />,
    title: "Exchange & Return",
    description:
      "Agree on pickup or delivery. Return the book on time to build trust and unlock more lending opportunities with others.",
    bg: "from-pink-100 to-pink-50",
  },
  {
    icon: <Star className="w-8 h-8 text-indigo-600" />,
    title: "Rate & Grow Your Reputation",
    description:
      "Leave feedback and rate your experience. The better your reputation, the more trust you earn within the community.",
    bg: "from-indigo-100 to-indigo-50",
  },
];

const HowItWorks = () => {
  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <div className="px-6 py-16 bg-gradient-to-b from-white to-gray-50 min-h-screen">
      <motion.h1
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-5xl font-extrabold text-center text-blue-700 mb-4"
      >
        How It Works
      </motion.h1>

      <p className="text-center text-gray-600 max-w-xl mx-auto text-lg mb-12">
        Discover how our peer-to-peer book sharing system empowers readers and
        connects communities through trust, transparency, and knowledge.
      </p>

      <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3 max-w-6xl mx-auto">
        {steps.map((step, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1, duration: 0.5 }}
            viewport={{ once: true }}
            className={`bg-gradient-to-br ${step.bg} rounded-3xl shadow-xl p-6 flex flex-col items-start space-y-4 hover:scale-[1.02] transition-transform duration-300`}
          >
            <div className="bg-white p-3 rounded-full shadow-md">
              {step.icon}
            </div>
            <h3 className="text-xl font-semibold text-gray-800">
              {step.title}
            </h3>
            <p className="text-gray-600">{step.description}</p>
          </motion.div>
        ))}
      </div>

      {!user && (
        <div className="mt-20 text-center">
          <Link to="/signup" className="inline-block mb-4">
            <motion.button
              whileHover={{ scale: 1.05 }}
              className="bg-blue-600 text-white px-8 py-3 text-lg rounded-full shadow-lg hover:bg-blue-700 transition"
            >
              Join Now & Start Lending
            </motion.button>
          </Link>
        </div>
      )}
    </div>
  );
};

export default HowItWorks;
