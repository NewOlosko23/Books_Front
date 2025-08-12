import React from "react";

const Terms = () => {
  return (
    <div className="bg-gray-50 min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-2xl p-8 border border-gray-200">
        {/* Header */}
        <div className="text-center border-b pb-6 mb-6">
          <h1 className="text-4xl font-extrabold text-indigo-700 mb-2">
            BooksArc – Terms & Conditions
          </h1>
          <p className="text-gray-600 text-lg">
            Please read these terms carefully before using BooksArc.
          </p>
        </div>

        {/* Intro */}
        <p className="mb-6 text-gray-700 leading-relaxed">
          Welcome to <strong>BooksArc</strong>. These Terms and Conditions
          outline the rules and regulations for using our platform. By creating
          an account or using our services, you agree to comply with these terms
          in full.
        </p>

        {/* Section Component */}
        {[
          {
            title: "1. Definitions",
            content: (
              <ul className="list-disc list-inside space-y-2 text-gray-700">
                <li>
                  <strong>"Platform"</strong> – the BooksArc website and related
                  services.
                </li>
                <li>
                  <strong>"User"</strong> – anyone using BooksArc, whether as a
                  lender or leaser.
                </li>
                <li>
                  <strong>"Book Hire"</strong> – the temporary leasing of a book
                  between a lender and a leaser.
                </li>
              </ul>
            ),
          },
          {
            title: "2. Eligibility to Use BooksArc",
            content: (
              <p className="text-gray-700">
                You must be at least 18 years old to use BooksArc. Users under
                18 must have consent from a parent or legal guardian.
              </p>
            ),
          },
          {
            title: "3. User Obligations",
            content: (
              <ul className="list-disc list-inside space-y-2 text-gray-700">
                <li>Provide accurate and up-to-date personal details.</li>
                <li>
                  Ensure all books listed are legal, in good condition, and free
                  from prohibited content.
                </li>
                <li>Return hired books in agreed condition and timeframe.</li>
                <li>
                  Avoid fraudulent activities, spam, or misuse of the platform.
                </li>
              </ul>
            ),
          },
          {
            title: "4. Subscription & Payment",
            content: (
              <p className="text-gray-700">
                Some features require an active subscription. Payments can be
                made via card or M-Pesa. All payments are non-refundable unless
                required by law.
              </p>
            ),
          },
          {
            title: "5. Hiring Process",
            content: (
              <ul className="list-disc list-inside space-y-2 text-gray-700">
                <li>
                  Hire requests must include accurate leaser contact details.
                </li>
                <li>
                  Lenders may accept or reject requests at their discretion.
                </li>
                <li>Late returns or damage may incur penalties.</li>
              </ul>
            ),
          },
          {
            title: "6. Cancellation & Refunds",
            content: (
              <p className="text-gray-700">
                Cancellations before acceptance are allowed. Once active,
                cancellations must be mutually agreed. Refunds follow our Refund
                Policy.
              </p>
            ),
          },
          {
            title: "7. Liability & Disclaimers",
            content: (
              <p className="text-gray-700">
                BooksArc is a facilitator and not responsible for the condition,
                authenticity, or timely delivery of books. Use is at your own
                risk.
              </p>
            ),
          },
          {
            title: "8. Privacy",
            content: (
              <p className="text-gray-700">
                We collect and process data according to our Privacy Policy. By
                using BooksArc, you consent to this policy.
              </p>
            ),
          },
          {
            title: "9. Termination of Accounts",
            content: (
              <p className="text-gray-700">
                BooksArc may suspend or terminate accounts that violate these
                terms without prior notice.
              </p>
            ),
          },
          {
            title: "10. Governing Law",
            content: (
              <p className="text-gray-700">
                These Terms are governed by the laws of Kenya. Disputes will be
                resolved in Kenyan courts.
              </p>
            ),
          },
          {
            title: "11. Updates to Terms",
            content: (
              <p className="text-gray-700">
                BooksArc may update these terms. Continued use after updates
                means acceptance of the new terms.
              </p>
            ),
          },
        ].map((section, idx) => (
          <div key={idx} className="mb-8">
            <h2 className="text-2xl font-semibold text-indigo-600 mb-3">
              {section.title}
            </h2>
            {section.content}
          </div>
        ))}

        {/* Footer */}
        <div className="border-t pt-4 mt-8 text-sm text-gray-500 text-center">
          Last updated: {new Date().toLocaleDateString()}
        </div>
      </div>
    </div>
  );
};

export default Terms;
