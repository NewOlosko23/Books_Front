import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  BookOpen,
  UserPlus,
  CreditCard,
  Repeat,
  Star,
  Share2,
} from "lucide-react";
import Hero from "../assets/hero.jpg";
import New from "../assets/new2.jpg";

import LoadServer from "../components/LoadServer";

const Home = () => {
  return (
    <div className="text-gray-800 w-full overflow-x-hidden">
      <div className="-mt-16">
        <LoadServer />
      </div>
      {/* Hero */}
      <div
        className="relative min-h-screen bg-center bg-cover flex items-center justify-center text-white"
        style={{
          backgroundImage: `linear-gradient(to bottom, rgba(0,0,0,0.6), rgba(0,0,0,0.9)), url(${Hero})`,
        }}
      >
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="relative z-10 text-center px-4"
        >
          <h1 className="text-4xl md:text-6xl font-extrabold mb-4">
            Your Next Book Awaits
          </h1>
          <p className="text-lg md:text-xl mb-6">
            Hire or lease books from your comfort zone
          </p>
          <Link
            to="/signup"
            className="bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded-xl text-white font-medium shadow-md"
          >
            Get Started
          </Link>
        </motion.div>
      </div>
      {/* About */}
      <section className="py-16 bg-white px-4 md:px-16">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl font-bold text-center mb-6">
            About BooksArc
          </h2>
          <p className="max-w-4xl mx-auto text-center text-gray-700 text-lg leading-relaxed">
            <strong>BooksArc</strong> is a peer-to-peer book lending platform
            that redefines how people access books. Whether you're looking to
            borrow a bestseller or rent out your personal collection, our
            community-driven system connects readers across Kenya.
            <br />
            <br />
            We believe in the power of stories to connect people — and now, you
            can lease or lend books without the traditional hassle. With easy
            subscriptions, location-based exchanges, and a growing library,
            reading has never been this flexible or affordable.
          </p>
        </motion.div>
      </section>
      {/* How It Works */}
      <section className="py-16 bg-blue-50 px-4 md:px-16">
        <motion.div
          initial={{ y: 40, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-6 text-blue-700">
            How It Works
          </h2>
          <p className="text-center text-gray-600 max-w-3xl mx-auto mb-12 text-lg">
            A seamless, community-powered system to borrow or lend books
            securely and effortlessly.
          </p>

          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 max-w-6xl mx-auto">
            {[
              {
                icon: <UserPlus className="w-8 h-8 text-blue-600" />,
                title: "Create an Account",
                description:
                  "Sign up and set up your profile — it’s free. Whether you're a borrower or lender, everything starts here.",
                bg: "from-blue-100 to-blue-50",
              },
              {
                icon: <BookOpen className="w-8 h-8 text-green-600" />,
                title: "List or Browse Books",
                description:
                  "Add books with details, or explore thousands of listings by fellow readers near you.",
                bg: "from-green-100 to-green-50",
              },
              {
                icon: <CreditCard className="w-8 h-8 text-purple-600" />,
                title: "Subscribe to Access",
                description:
                  "Activate your subscription to start borrowing and ensure verified, secure transactions.",
                bg: "from-purple-100 to-purple-50",
              },
              {
                icon: <Share2 className="w-8 h-8 text-yellow-600" />,
                title: "Request or Approve Lending",
                description:
                  "Borrowers request books. Lenders approve or decline. Communication is built-in and fast.",
                bg: "from-yellow-100 to-yellow-50",
              },
              {
                icon: <Repeat className="w-8 h-8 text-pink-600" />,
                title: "Exchange & Return",
                description:
                  "Agree on delivery or pickup. Return on time to keep your trust score high.",
                bg: "from-pink-100 to-pink-50",
              },
              {
                icon: <Star className="w-8 h-8 text-indigo-600" />,
                title: "Rate & Grow Reputation",
                description:
                  "After each transaction, rate the experience. This builds credibility and improves future connections.",
                bg: "from-indigo-100 to-indigo-50",
              },
            ].map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
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

          <div className="mt-16 text-center">
            <Link to="/signup" className="inline-block mb-4">
              <motion.button
                whileHover={{ scale: 1.05 }}
                className="bg-blue-600 cursor-pointer text-white px-8 py-3 text-lg rounded-full shadow-lg hover:bg-blue-700 transition"
              >
                Join Now & Start Lending
              </motion.button>
            </Link>
          </div>
        </motion.div>
      </section>
      {/* Pricing */}
      <div
        className="bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${New})` }}
      >
        {" "}
        {/* Pricing */}
        <section className="py-20 bg-white/60 px-4 md:px-16">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl font-bold text-center text-blue-700 mb-6">
              Flexible Plans for Every Reader
            </h2>
            <p className="text-center text-gray-600 max-w-2xl mx-auto mb-12 text-lg">
              Whether you're a casual reader or a bookworm, choose a plan that
              fits your lifestyle.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-10 max-w-6xl mx-auto">
              {[
                {
                  title: "Basic",
                  price: "KES 300",
                  features: [
                    "1 book/week",
                    "Access to common titles",
                    "Pickup point only",
                  ],
                  color: "from-blue-100 to-white",
                },
                {
                  title: "Standard",
                  price: "KES 500",
                  features: [
                    "8 books/month",
                    "Mid-tier catalog access",
                    "Pickup or delivery",
                  ],
                  color: "from-green-100 to-white",
                },
                {
                  title: "Premium",
                  price: "KES 700",
                  features: [
                    "Unlimited books",
                    "Full catalog access",
                    "Priority delivery",
                  ],
                  color: "from-purple-100 to-white",
                },
              ].map((plan, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.15, duration: 0.5 }}
                  viewport={{ once: true }}
                  className={`bg-gradient-to-br ${plan.color} rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-shadow duration-300`}
                >
                  <h3 className="text-2xl font-bold text-gray-800 mb-2">
                    {plan.title}
                  </h3>
                  <p className="text-blue-600 text-3xl font-extrabold mb-4">
                    {plan.price}
                  </p>
                  <ul className="space-y-3 text-gray-700 mb-6">
                    {plan.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center gap-2">
                        <span className="text-green-500">✔</span>
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <Link
                    to="/signup"
                    className="inline-block bg-blue-600 text-white px-6 py-2 rounded-full text-sm font-medium hover:bg-blue-700 transition"
                  >
                    Choose Plan
                  </Link>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </section>
        {/* Benefits */}
        <section className="py-20 bg-gradient-to-br from-blue-50 to-blue-100 px-4 md:px-16">
          <motion.div
            initial={{ x: -50, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl font-extrabold text-center text-blue-800 mb-6">
              Why Book Lovers Trust Us
            </h2>
            <p className="text-center max-w-3xl mx-auto text-gray-600 text-lg mb-12">
              We're more than just a platform. We’re a community of readers who
              believe that books should be within reach — always. Here's what
              makes us special:
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {[
                {
                  title: "Budget-Friendly Access",
                  desc: "Enjoy a wide selection of books without the heavy price tag. Plans start as low as KES 100.",
                  icon: "💸",
                },
                {
                  title: "Diverse Book Catalog",
                  desc: "From fiction to academic gems, discover stories that resonate with every interest and age group.",
                  icon: "📚",
                },
                {
                  title: "Fast Delivery & Returns",
                  desc: "Receive books at your doorstep or choose a nearby pickup point — at your convenience.",
                  icon: "🚚",
                },
                {
                  title: "Eco-Friendly & Sustainable",
                  desc: "We reduce waste by promoting shared reading and responsible recycling of worn-out books.",
                  icon: "🌍",
                },
                {
                  title: "Reader-Centric Experience",
                  desc: "Rate, review, and follow fellow book lovers. Reading isn’t just personal — it’s social.",
                  icon: "🤝",
                },
                {
                  title: "No Overdue Pressure",
                  desc: "Life happens — we get it. Flexible return policies and optional extensions help you read stress-free.",
                  icon: "🕰️",
                },
              ].map((feature, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  className="bg-white p-6 rounded-2xl shadow-md hover:shadow-xl transition-all duration-300"
                >
                  <div className="text-4xl mb-4">{feature.icon}</div>
                  <h4 className="text-xl font-semibold text-blue-700 mb-2">
                    {feature.title}
                  </h4>
                  <p className="text-gray-600">{feature.desc}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </section>
        {/* Locations */}
        <section className="py-20 bg-white/60 px-4 md:px-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl font-extrabold text-center text-blue-800 mb-6">
              Where You Can Find Us
            </h2>
            <p className="text-center text-gray-600 max-w-2xl mx-auto text-lg mb-10">
              We’re making it easier than ever to access books in your
              neighborhood. Starting with Kisumu — and expanding fast!
            </p>

            {/* Kisumu Highlight */}
            <div className="bg-blue-100/80 rounded-2xl p-6 mb-10 shadow-lg max-w-4xl mx-auto">
              <h3 className="text-2xl font-bold text-blue-900 text-center mb-4">
                📍 Kisumu
              </h3>
              <p className="text-center text-gray-700 mb-6">
                You can conveniently hire or lease books from these areas:
              </p>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 text-center">
                {[
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
                ].map((area, i) => (
                  <div
                    key={i}
                    className="bg-white hover:bg-blue-200 cursor-pointer text-blue-800 font-medium py-3 rounded-xl shadow transition duration-300"
                  >
                    {area}
                  </div>
                ))}
              </div>
            </div>

            {/* Coming Soon */}
            <div className="text-center max-w-2xl mx-auto">
              <p className="text-gray-700 text-lg mb-6">
                🌍 More towns and locations coming soon:
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                {["Nairobi", "Mombasa", "Homa Bay", "Eldoret", "Nakuru"].map(
                  (city, i) => (
                    <div
                      key={i}
                      className="bg-blue-50 hover:bg-blue-200 text-blue-700 font-medium py-2 px-4 rounded-full shadow transition duration-300"
                    >
                      {city}
                    </div>
                  )
                )}
              </div>
            </div>
          </motion.div>
        </section>
      </div>
      {/* Footer */}
      <footer className="bg-gray-900 text-white px-4 md:px-16 pt-16 pb-8">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12">
          {/* Brand Info */}
          <div>
            <h3 className="text-2xl font-bold mb-2">📚 Book Club</h3>
            <p className="text-gray-400 mb-4">
              Powering your reading journey. Discover, borrow, and explore the
              world of books — one page at a time.
            </p>
            <div className="flex space-x-4 mt-4">
              <a href="#" className="text-gray-400 hover:text-white transition">
                <i className="fab fa-facebook-f"></i>
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition">
                <i className="fab fa-twitter"></i>
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition">
                <i className="fab fa-instagram"></i>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-gray-400">
              <li>
                <Link to="/" className="hover:text-white">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/catalog" className="hover:text-white">
                  Browse Books
                </Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-white">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-white">
                  Contact
                </Link>
              </li>
              <li>
                <Link to="/faqs" className="hover:text-white">
                  FAQs
                </Link>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Services</h4>
            <ul className="space-y-2 text-gray-400">
              <li>
                <Link to="/subscription" className="hover:text-white">
                  Membership Plans
                </Link>
              </li>
              <li>
                <Link to="/recommend" className="hover:text-white">
                  Suggest a Book
                </Link>
              </li>
              <li>
                <Link to="/blogs" className="hover:text-white">
                  Blog
                </Link>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Join Our Newsletter</h4>
            <p className="text-gray-400 mb-4 text-sm">
              Be the first to know about new arrivals, reading tips, and
              exclusive offers.
            </p>
            <form className="flex flex-col sm:flex-row items-center">
              <input
                type="email"
                placeholder="Your email address"
                className="w-full sm:w-auto flex-1 px-4 py-2 rounded-l-md text-gray-100"
              />
              <button
                type="submit"
                className="mt-3 sm:mt-0 sm:ml-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;
