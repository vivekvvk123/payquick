"use client";

import { Button } from "@repo/ui/button";
import { SessionProvider, useSession, signIn, signOu } from "next-auth/react";


export default function Home() {
  return (
    <SessionProvider>
      <RealHome />
    </SessionProvider>
  );
}

function RealHome() {
  const session = useSession();
  return (
    
    <div className="text-center bg-red-500">
      <h1 className="text-3xl font-bold underline">Hello merchant-app</h1>
      <button onClick={()=>{session.status === "authenticated" ? signOut() : signIn()}}>
        {session.status === "authenticated" ? "Signout" : "Signin"}
      </button>
    </div>
  )
}


// export default async function createUser() {
//   console.log("DATABASE_URL =", process.env.DATABASE_URL);
//   console.log("NODE_ENV =", process.env.NODE_ENV);
//   console.log("PWD =", process.cwd());
//   return <div>Test Page after createUser</div>
// }