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
      className={`cursor-pointer border border-gray-700 rounded-3xl hover:bg-zinc-700 ${className || ""}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
};
