import { redirect } from "next/navigation";
import { authOptions } from "./lib/auth";
import { getServerSession } from "next-auth/next";

export default async function Home() {
  const session = await getServerSession(authOptions);
  console.log("session--->", session);
  if (session?.user) {
    redirect('/dashboard');
  }
  else {
    redirect('/api/auth/signin');
  }

}


// export default async function createUser() {
//   console.log("DATABASE_URL =", process.env.DATABASE_URL);
//   console.log("NODE_ENV =", process.env.NODE_ENV);
//   console.log("PWD =", process.cwd());
//   return <div>Test Page after createUser</div>
// }