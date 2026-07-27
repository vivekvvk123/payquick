"use server";

import prisma from "@repo/db/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth";

export default async function createOnRampTransaction(amount: number, provider: string) {
    const session = await getServerSession(authOptions);
    const userId = Number(session?.user?.id);
    const token = crypto.randomUUID(); // This token will ideally come from bank, eg, https://api.hdfcbank.com/getToken
    if (!userId) {
        return {
            message: "User not logged in"
        }
    }
    await prisma.onRampTransaction.create({
        data: {
            userId,
            amount: amount * 100,
            provider,
            status: "Pending",
            token: token
        }
    })
}