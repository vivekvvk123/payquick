import { type JSX } from "react";

export function Card({
  title,
  children,
}: {
  title: string;
  children?: React.ReactNode;
}): JSX.Element {
  return (
    <div className="border border-gray-700 p-6 bg-zinc-900 rounded-xl text-white">
      <h1 className="text-xl border-b border-gray-600 pb-2">{title}</h1>
      <div>{children}</div>
    </div>
  );
}
