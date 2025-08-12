import React, { useState } from "react";
import { Link } from "react-router-dom";

const Subscription = () => {
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [paymentMethod, setPaymentMethod] = useState("card");
  const [paymentStatus, setPaymentStatus] = useState("");
  const [loading, setLoading] = useState(false);

  const plans = [
    {
      id: "basic",
      name: "Basic Plan",
      price: 300,
      description: "Access up to 1 book per week",
    },
    {
      id: "standard",
      name: "Standard Plan",
      price: 500,
      description: "8 books per month",
    },
    {
      id: "premium",
      name: "Premium Plan",
      price: 700,
      description: "Unlimited books + priority support",
    },
  ];

  const handlePlanSelect = (planId) => {
    setSelectedPlan(planId);
    setPaymentStatus("");
  };

  const handlePaymentSubmit = (e) => {
    e.preventDefault();
    if (!selectedPlan) {
      setPaymentStatus("Please select a subscription plan.");
      return;
    }
    setLoading(true);
    setPaymentStatus("");

    // Simulate payment delay
    setTimeout(() => {
      setLoading(false);
      setPaymentStatus(
        `Payment successful! You have subscribed to the ${
          plans.find((p) => p.id === selectedPlan).name
        }.`
      );
      // TODO: Integrate real payment & backend update here
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-6">
      <div className="max-w-4xl bg-white rounded-xl shadow-md p-8 w-full">
        <p className="text-center py-3">
          <Link to="/dashboard" className="text-blue-600 hover:underline">
            &larr; Back to Dashboard
          </Link>
        </p>
        <h1 className="text-3xl font-bold text-blue-600 mb-6 text-center">
          Activate Your Subscription
        </h1>

        <p className="text-gray-700 mb-6 text-center max-w-lg mx-auto">
          To borrow books, you need an active subscription. Choose a plan below
          and complete payment.
        </p>

        {/* Subscription Plans */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          {plans.map((plan) => (
            <div
              key={plan.id}
              onClick={() => handlePlanSelect(plan.id)}
              className={`cursor-pointer border rounded-lg p-6 shadow-md transition
                ${
                  selectedPlan === plan.id
                    ? "border-blue-600 bg-blue-50"
                    : "border-gray-300 hover:border-blue-400"
                }`}
            >
              <h2 className="text-xl font-semibold mb-2">{plan.name}</h2>
              <p className="text-gray-600 mb-4">{plan.description}</p>
              <p className="text-2xl font-bold text-blue-700">
                KES {plan.price}
              </p>
            </div>
          ))}
        </div>

        {/* Payment Method Tabs */}
        <div className="flex justify-center mb-6 space-x-6">
          <button
            onClick={() => setPaymentMethod("card")}
            className={`px-6 py-2 rounded-full font-semibold transition ${
              paymentMethod === "card"
                ? "bg-blue-600 text-white shadow-md"
                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
            }`}
          >
            Credit/Debit Card
          </button>
          <button
            onClick={() => setPaymentMethod("mpesa")}
            className={`px-6 py-2 rounded-full font-semibold transition ${
              paymentMethod === "mpesa"
                ? "bg-green-600 text-white shadow-md"
                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
            }`}
          >
            M-Pesa
          </button>
        </div>

        {/* Payment Form */}
        <form onSubmit={handlePaymentSubmit} className="max-w-md mx-auto">
          {paymentMethod === "card" && (
            <>
              <div className="mb-4">
                <label
                  className="block font-semibold mb-1"
                  htmlFor="cardNumber"
                >
                  Card Number
                </label>
                <input
                  type="text"
                  id="cardNumber"
                  placeholder="1234 5678 9012 3456"
                  required
                  className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  maxLength={19}
                  disabled={loading}
                />
              </div>

              <div className="flex gap-4 mb-4">
                <div className="flex-1">
                  <label className="block font-semibold mb-1" htmlFor="expiry">
                    Expiry Date
                  </label>
                  <input
                    type="text"
                    id="expiry"
                    placeholder="MM/YY"
                    required
                    className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    maxLength={5}
                    disabled={loading}
                  />
                </div>
                <div className="flex-1">
                  <label className="block font-semibold mb-1" htmlFor="cvv">
                    CVV
                  </label>
                  <input
                    type="password"
                    id="cvv"
                    placeholder="123"
                    required
                    className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    maxLength={4}
                    disabled={loading}
                  />
                </div>
              </div>
            </>
          )}

          {paymentMethod === "mpesa" && (
            <>
              <p className="mb-4 text-gray-700 text-center">
                Please enter your M-Pesa phone number below to receive a payment
                prompt.
              </p>
              <div className="mb-6">
                <label
                  className="block font-semibold mb-1"
                  htmlFor="mpesaNumber"
                >
                  M-Pesa Phone Number
                </label>
                <input
                  type="tel"
                  id="mpesaNumber"
                  placeholder="+2547XXXXXXXX"
                  required
                  pattern="^\+2547\d{8}$"
                  className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
                  disabled={loading}
                />
              </div>
            </>
          )}

          {paymentStatus && (
            <p
              className={`mb-4 text-center ${
                paymentStatus.startsWith("Payment successful")
                  ? "text-green-600"
                  : "text-red-600"
              }`}
            >
              {paymentStatus}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            className={`w-full font-bold py-3 rounded-xl transition shadow ${
              paymentMethod === "card"
                ? "bg-blue-600 hover:bg-blue-700 text-white"
                : "bg-green-600 hover:bg-green-700 text-white"
            }`}
          >
            {loading ? "Processing Payment..." : "Pay Now"}
          </button>
        </form>

        <p className="mt-6 text-center text-gray-500 text-sm">
          Need help? Contact our{" "}
          <a
            href="mailto:support@booksarc.com"
            className="text-blue-600 underline"
          >
            support team
          </a>
          .
        </p>
      </div>
    </div>
  );
};

export default Subscription;
