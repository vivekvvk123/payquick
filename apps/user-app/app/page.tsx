"use client";

import { signIn, signOut, useSession } from "next-auth/react";
import { Appbar} from "@repo/ui/Appbar";
import { SessionProvider } from "next-auth/react";



export default function Home() {
  return <SessionProvider>
    <RealHome />

  </SessionProvider>

}

function RealHome(){
  const session = useSession();
  return (
    <div>
      {/* <div className="">hello user-app</div> */}
      <Appbar onSignin={signIn} onSignout={signOut}  user={session.data?.user}/>
  
    </div>
  
  );
}


// export default async function createUser() {
//   console.log("DATABASE_URL =", process.env.DATABASE_URL);
//   console.log("NODE_ENV =", process.env.NODE_ENV);
//   console.log("PWD =", process.cwd());
//   return <div>Test Page after createUser</div>
// }