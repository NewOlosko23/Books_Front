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
  },
  {
    icon: <BookOpen className="w-8 h-8 text-green-600" />,
    title: "List or Browse Books",
    description:
      "Add your books with details and images — or explore the library of available books from other users based on category and location.",
  },
  {
    icon: <CreditCard className="w-8 h-8 text-purple-600" />,
    title: "Subscribe to Access",
    description:
      "Choose a simple subscription to unlock the power of borrowing and lending. This helps keep transactions secure and reliable.",
  },
  {
    icon: <Share2 className="w-8 h-8 text-yellow-600" />,
    title: "Request or Approve Lending",
    description:
      "Found a book? Request it. Got a request? Approve it. The process is seamless — messages are sent directly between borrowers and lenders.",
  },
  {
    icon: <Repeat className="w-8 h-8 text-pink-600" />,
    title: "Exchange & Return",
    description:
      "Agree on pickup or delivery. Return the book on time to build trust and unlock more lending opportunities with others.",
  },
  {
    icon: <Star className="w-8 h-8 text-indigo-600" />,
    title: "Rate & Grow Your Reputation",
    description:
      "Leave feedback and rate your experience. The better your reputation, the more trust you earn within the community.",
  },
];

const HowItWorks = () => {
  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <section className="px-6 py-20 bg-white/70 backdrop-blur-sm mt-14">
      <motion.h1
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-5xl font-extrabold text-center text-blue-700 mb-6"
      >
        How It Works
      </motion.h1>

      <p className="text-center text-gray-600 max-w-2xl mx-auto text-lg mb-16">
        Discover how our peer-to-peer book sharing system empowers readers and
        connects communities through trust, transparency, and knowledge.
      </p>

      {/* Steps Grid */}
      <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3 max-w-6xl mx-auto">
        {steps.map((step, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1, duration: 0.5 }}
            viewport={{ once: true }}
            className="bg-white/70 backdrop-blur-md border border-gray-200 rounded-3xl shadow-md hover:shadow-xl p-6 flex flex-col items-start space-y-4 hover:-translate-y-1 transition-all duration-300"
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

      {/* Call-to-action */}
      {!user && (
        <div className="mt-20 text-center">
          <Link to="/signup" className="inline-block">
            <motion.button
              whileHover={{ scale: 1.05 }}
              className="bg-blue-600/90 backdrop-blur-md text-white px-8 py-3 text-lg rounded-full shadow-lg hover:bg-blue-700 transition"
            >
              Join Now & Start Lending
            </motion.button>
          </Link>
        </div>
      )}
    </section>
  );
};

export default HowItWorks;
