"use server";
import prisma from "@repo/db/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth";

export default async function p2pTransfer(to: string, amount: number) {
    const session = await getServerSession(authOptions);
    const from = Number(session?.user?.id);
    
    if(!from){
        return {
            message: "User not logged in"
        }
    }

    const toUser = await prisma.user.findFirst({
        where: {
            number: to
        }
    })

    if(!toUser){
        return {
            message: "Recipient not found"
        }
    }

    await prisma.$transaction( async (tx) => {
        await tx.$queryRaw`SELECT * FROM "Balance" WHERE "userId" = ${from} FOR UPDATE`; // This locks the SQL row, preventing only one concurrent read/write

        const fromBalance = await tx.balance.findFirst({
            where: {
                userId: from
            }
        })

        // console.log("above sleep");
        // await new Promise(resolve => setTimeout(resolve, 5000));
        // console.log("after sleep");
        
        if(!fromBalance || fromBalance.amount < amount){
            throw new Error("Insufficient balance");
        }

        await tx.balance.update({
            where: { userId: from },
            data: { amount: {decrement: amount}}
        })

        await tx.balance.update({
            where: {userId: toUser.id},
            data: { amount: {increment: amount}}
        });

        await tx.p2pTransfer.create({
            data: {
                fromUserId: from,
                toUserId: toUser.id,
                amount: amount,
                timestamp: new Date()
            }
        })
    }) 
}