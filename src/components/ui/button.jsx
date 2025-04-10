import React from "react";
import { cn } from "../../lib/utils";

export function Button({ children, variant = "default", ...props }) {
  const baseStyles = "px-4 py-2 rounded-md transition";
  const variants = {
    default: "bg-blue-500 text-white hover:bg-blue-600",
    outline: "border border-gray-300 text-gray-700 hover:bg-gray-100",
    destructive: "bg-red-500 text-white hover:bg-red-600",
  };

  return (
    <button className={cn(baseStyles, variants[variant])} {...props}>
      {children}
    </button>
  );
}
