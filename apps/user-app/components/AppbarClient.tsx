"use client";
import { signIn, signOut, useSession } from "next-auth/react";
import { Appbar} from "@repo/ui/Appbar";
import { useRouter } from "next/navigation";

export function AppbarClient(){
    const session = useSession();
    // console.log("session=>", session);
    const router = useRouter();
    return (
      <Appbar onSignin={signIn} onSignout={() => signOut({ callbackUrl: "/" })} user={session.data?.user}/>
    )
}