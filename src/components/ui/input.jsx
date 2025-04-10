import React from "react";
import { cn } from "../../lib/utils";

export function Input({ className, ...props }) {
  return (
    <input
      className={cn("border rounded-md p-2 w-full", className)}
      {...props}
    />
  );
}
