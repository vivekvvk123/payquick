import { Card } from "@repo/ui/card";

export function OnRampTransactions({transactions}:{
    transactions: {
        time: Date,
        amount: number,
        status: string,
        provider: string
    }[]
}){
    return <Card title={"Recent Transactions"}>
        <div className="pt-2">
            {transactions.map(txn => <div key={txn.time.toISOString()} className="flex justify-between">
                <div>
                    <div className="text-sm">
                        Received INR
                    </div>
                    <div className="text-slate-400 text-xs mt-1">
                        {txn.time.toDateString()}
                    </div>
                </div>
                <div className="flex flex-col justify-center">
                    + Rs {txn.amount / 100}
                </div>

            </div>)}
        </div>
    </Card>
}