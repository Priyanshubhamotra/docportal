import React from "react";
import { cn } from "../../lib/utils";

export function Card({ className, children }) {
  return <div className={cn("bg-white rounded-lg shadow p-4", className)}>{children}</div>;
}

export function CardContent({ className, children }) {
  return <div className={cn("p-2", className)}>{children}</div>;
}
