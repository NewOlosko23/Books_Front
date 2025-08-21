import React from "react";

const Button = ({
  children,
  variant = "primary",
  size = "md",
  className = "",
  ...props
}) => {
  const base =
    "inline-flex items-center gap-2 rounded-full font-medium transition focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-300";

  const sizes = {
    sm: "px-3 py-1 text-sm",
    md: "px-4 py-2 text-sm",
    lg: "px-5 py-3 text-base",
  };

  const variants = {
    primary:
      "bg-gray-900 text-white hover:bg-black shadow border border-transparent",
    secondary: "border border-gray-200 bg-white text-gray-700 hover:bg-gray-50",
    outline:
      "border border-gray-300 bg-transparent text-gray-700 hover:bg-gray-100",
    danger: "bg-red-500 text-white hover:bg-red-600 shadow",
  };

  return (
    <button
      className={`${base} ${sizes[size]} ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
