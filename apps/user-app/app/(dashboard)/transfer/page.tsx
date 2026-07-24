import prisma from "@repo/db/prisma"
import { BalanceCard } from "../../../components/BalanceCard";
import { getServerSession } from "next-auth";
import { authOptions } from "../../lib/auth";
import { AddMoneyCard } from "../../../components/AddMoneyCard";
import { OnRampTransactions } from "../../../components/OnRampTransactions"

async function getBalance() {
    const session = await getServerSession(authOptions);
    const balance = await prisma.balance.findFirst({
        where: {
            userId: Number(session?.user?.id)
        }
    });
    return {
        amount: balance?.amount || 0,
        locked: balance?.locked || 0
    }
}

async function getOnRampTransactions() {
    const session = await getServerSession(authOptions);
    const transactions = await prisma.onRampTransaction.findMany({
        where:{
            userId: Number(session?.user?.id)
        }
    })
    return (
        transactions.map((txn) => ({
            time: txn.startTime,
            amount: txn.amount,
            status: txn.status,
            provider: txn.provider,
        }))
    )

}

export default async function Transfer() {

    const balance = await getBalance();
    const transactions = await getOnRampTransactions();

    return (
        <div className="w-screen">
            <div className="text-4xl text-[#b5a3df] pt-8 mb-8 font-bold">
                Transfer
            </div>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 p-4">
                <div>
                    <AddMoneyCard />
                </div>
                <div>
                    <div>
                        <BalanceCard amount={balance.amount} locked={balance.locked}/>
                    </div>
                    <div className="mt-4">
                        <OnRampTransactions transactions={transactions} />
                    </div>

                </div>
            </div>
        </div>
    )
}