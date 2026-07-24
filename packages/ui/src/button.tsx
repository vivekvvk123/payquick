"use client";

import { ReactNode } from "react";

interface ButtonProps {
  children?: ReactNode;
  className?: string;
  appName?: string;
  onClick: () => void;
}

export const Button = ({ children, className, onClick }: ButtonProps) => {
  return (
    <button
      className={`cursor-pointer border border-gray-700 rounded-lg hover:bg-zinc-800 p-2 ${className || ""}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
};
