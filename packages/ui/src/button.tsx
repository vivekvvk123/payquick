"use client";

import { ReactNode } from "react";

interface ButtonProps {
  children?: ReactNode;
  className?: string;
  appName?: string;
  onClick: () => void;
}

export const Button = ({ children, appName, onClick }: ButtonProps) => {
  return (
    <button
      className="cursor-pointer border rounded-md p-1 px-2 hover:bg-zinc-700"
      onClick={onClick}
    >
      {children}
    </button>
  );
};
