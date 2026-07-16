"use client";

import { ReactNode } from "react";

interface ButtonProps {
  children: ReactNode;
  className?: string;
  appName: string;
}

export const Button = ({ children, appName, onClick }: ButtonProps) => {
  return (
    <button
      className="bg-blue-600 p-4 text-xl"
      onClick={onClick}
    >
      {children}
    </button>
  );
};
