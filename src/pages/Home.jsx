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
          backgroundImage: `linear-gradient(to bottom, rgba(0,0,0,0.6), rgba(0,0,0,0.85)), url(${Hero})`,
        }}
      >
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="relative z-10 text-center px-6"
        >
          <h1 className="text-4xl md:text-6xl font-extrabold mb-4 drop-shadow-lg">
            Your Next Book Awaits
          </h1>
          <p className="text-lg md:text-xl mb-6 text-gray-200 drop-shadow">
            Hire or lease books from your comfort zone
          </p>
          <Link
            to="/signup"
            className="inline-flex items-center gap-2 cursor-pointer rounded-full border border-gray-200 bg-white/90 px-6 py-3 text-base font-medium text-gray-800 hover:bg-gray-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-300 shadow-md backdrop-blur-sm transition"
          >
            Get Started
          </Link>
        </motion.div>
      </div>

      {/* About */}
      <section className="relative py-20 bg-gray-50 px-4 md:px-16">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.6 }}
          className="max-w-5xl mx-auto text-center"
        >
          <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-6">
            About <span className="text-gray-700">BooksArc</span>
          </h2>

          <div className="backdrop-blur-sm shadow-sm rounded-2xl px-6 md:px-12 py-10">
            <p className="text-lg text-gray-700 leading-relaxed">
              <span className="font-semibold text-gray-900">BooksArc</span> is a
              peer-to-peer book lending platform that redefines how people
              access books. Whether you're looking to borrow a bestseller or
              rent out your personal collection, our community-driven system
              connects readers across Kenya.
            </p>

            <p className="mt-6 text-lg text-gray-700 leading-relaxed">
              We believe in the power of stories to connect people — and now,
              you can lease or lend books without the traditional hassle. With
              easy subscriptions, location-based exchanges, and a growing
              library, reading has never been this flexible or affordable.
            </p>
          </div>
        </motion.div>
      </section>

      {/* How It Works */}
      <section className="py-20 bg-gray-50 px-4 md:px-16">
        <motion.div
          initial={{ y: 40, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.6 }}
          className="max-w-6xl mx-auto"
        >
          {/* Heading */}
          <h2 className="text-3xl md:text-4xl font-extrabold text-center mb-6 text-gray-900">
            How It Works
          </h2>
          <p className="text-center text-gray-600 max-w-3xl mx-auto mb-12 text-lg">
            A seamless, community-powered system to borrow or lend books
            securely and effortlessly.
          </p>

          {/* Steps grid */}
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {[
              {
                icon: <UserPlus className="w-7 h-7 text-gray-700" />,
                title: "Create an Account",
                description:
                  "Sign up and set up your profile — it’s free. Whether you're a borrower or lender, everything starts here.",
              },
              {
                icon: <BookOpen className="w-7 h-7 text-gray-700" />,
                title: "List or Browse Books",
                description:
                  "Add books with details, or explore thousands of listings by fellow readers near you.",
              },
              {
                icon: <CreditCard className="w-7 h-7 text-gray-700" />,
                title: "Subscribe to Access",
                description:
                  "Activate your subscription to start borrowing and ensure verified, secure transactions.",
              },
              {
                icon: <Share2 className="w-7 h-7 text-gray-700" />,
                title: "Request or Approve Lending",
                description:
                  "Borrowers request books. Lenders approve or decline. Communication is built-in and fast.",
              },
              {
                icon: <Repeat className="w-7 h-7 text-gray-700" />,
                title: "Exchange & Return",
                description:
                  "Agree on delivery or pickup. Return on time to keep your trust score high.",
              },
              {
                icon: <Star className="w-7 h-7 text-gray-700" />,
                title: "Rate & Grow Reputation",
                description:
                  "After each transaction, rate the experience. This builds credibility and improves future connections.",
              },
            ].map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                className="bg-white/90 backdrop-blur-sm border border-gray-200 rounded-2xl shadow-sm p-6 flex flex-col items-start space-y-4 hover:scale-[1.02] transition-transform duration-300"
              >
                <div className="bg-gray-100 p-3 rounded-full border border-gray-200">
                  {step.icon}
                </div>
                <h3 className="text-lg font-semibold text-gray-900">
                  {step.title}
                </h3>
                <p className="text-gray-600">{step.description}</p>
              </motion.div>
            ))}
          </div>

          {/* CTA */}
          <div className="mt-16 text-center">
            <Link to="/signup" className="inline-block">
              <motion.button
                whileHover={{ scale: 1.05 }}
                className="inline-flex items-center gap-2 cursor-pointer rounded-full border border-gray-200 bg-white px-6 py-3 text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-300 shadow-md backdrop-blur-sm transition"
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
        <section className="py-20 bg-white/70 backdrop-blur-sm px-4 md:px-16">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl font-extrabold text-center text-gray-900 mb-6">
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
                  accent: "blue",
                },
                {
                  title: "Standard",
                  price: "KES 500",
                  features: [
                    "8 books/month",
                    "Mid-tier catalog access",
                    "Pickup or delivery",
                  ],
                  accent: "green",
                },
                {
                  title: "Premium",
                  price: "KES 700",
                  features: [
                    "Unlimited books",
                    "Full catalog access",
                    "Priority delivery",
                  ],
                  accent: "indigo",
                },
              ].map((plan, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.15, duration: 0.5 }}
                  viewport={{ once: true }}
                  className={`bg-white/70 backdrop-blur-md border border-gray-200 rounded-3xl p-8 shadow-md hover:shadow-xl hover:border-${plan.accent}-400 transition-all duration-300`}
                >
                  <h3 className="text-2xl font-bold text-gray-800 mb-2">
                    {plan.title}
                  </h3>
                  <p
                    className={`text-${plan.accent}-600 text-3xl font-extrabold mb-4`}
                  >
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
                    className={`inline-block bg-${plan.accent}-600 text-white px-6 py-2 rounded-full text-sm font-medium hover:bg-${plan.accent}-700 transition`}
                  >
                    Choose Plan
                  </Link>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </section>

        {/* Benefits */}
        <section className="py-20 bg-white/100 backdrop-blur-sm px-4 md:px-16">
          <motion.div
            initial={{ x: -50, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl font-extrabold text-center text-gray-900 mb-6">
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
                  className="bg-white/70 backdrop-blur-md border border-gray-200 p-8 rounded-2xl shadow-md hover:shadow-xl hover:border-blue-400 transition-all duration-300"
                >
                  <div className="text-4xl mb-4">{feature.icon}</div>
                  <h4 className="text-xl font-semibold text-gray-800 mb-2">
                    {feature.title}
                  </h4>
                  <p className="text-gray-600">{feature.desc}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </section>

        {/* Locations */}
        <section className="py-20 bg-white/70 backdrop-blur-sm px-4 md:px-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl font-extrabold text-center text-gray-900 mb-6">
              Where You Can Find Us
            </h2>
            <p className="text-center text-gray-600 max-w-2xl mx-auto text-lg mb-10">
              We’re making it easier than ever to access books in your
              neighborhood. Starting with Kisumu — and expanding fast!
            </p>

            {/* Kisumu Highlight */}
            <div className="bg-white/80 backdrop-blur-md border border-gray-200 rounded-3xl p-8 mb-12 shadow-md max-w-4xl mx-auto">
              <h3 className="text-2xl font-bold text-gray-800 text-center mb-4">
                📍 Kisumu
              </h3>
              <p className="text-center text-gray-600 mb-6">
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
                    className="bg-white/70 backdrop-blur-sm border border-gray-200 hover:border-blue-400 hover:bg-blue-50 cursor-pointer text-gray-700 font-medium py-3 rounded-xl shadow-sm hover:shadow-md transition duration-300"
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
                      className="bg-white/70 backdrop-blur-sm border border-gray-200 hover:border-blue-400 hover:bg-blue-50 text-gray-700 font-medium py-2 px-5 rounded-full shadow-sm hover:shadow-md transition duration-300"
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
    </div>
  );
};

export default Home;
