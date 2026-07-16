import { Button } from "@repo/ui/button";

export default function Home() {
  return (
    <div className="text-center bg-red-500">
      <h1 className="text-3xl font-bold underline">Hello merchant-app</h1>
    </div>
  );
}

// export default async function createUser() {
//   console.log("DATABASE_URL =", process.env.DATABASE_URL);
//   console.log("NODE_ENV =", process.env.NODE_ENV);
//   console.log("PWD =", process.cwd());
//   return <div>Test Page after createUser</div>
// }