import React from "react";

const Footer = () => {
  return (
    <div>
      {/* Bottom bar */}
      <div className="bg-gray-900 text-center text-gray-500 text-sm py-2">
        © {new Date().getFullYear()} Book Club. All rights reserved. | Built
        with ❤️ for book lovers.
      </div>{" "}
    </div>
  );
};

export default Footer;
