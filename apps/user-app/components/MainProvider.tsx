"use client";

import { StoreProvider } from "@repo/store";
import { SessionProvider } from "next-auth/react";

// Combined provider for Redux store and NextAuth session
export function MainProvider( {children}: {children: React.ReactNode}){
    return (
        <StoreProvider>
            <SessionProvider>
                {children}
            </SessionProvider>
        </StoreProvider>
    )
}