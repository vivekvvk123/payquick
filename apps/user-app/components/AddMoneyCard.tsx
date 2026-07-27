"use client";

import { Button } from "@repo/ui/button";
import { Card } from "@repo/ui/card";
import {useState} from "react";
import { Select } from "@repo/ui/Select";
import { TextInput } from "@repo/ui/TextInput";
import createOnRampTransaction from "../app/lib/action/createOnRamptxn";

const SUPPORTED_BANKS = [
    {
        name: "SBI Bank",
        redirectUrl: "https://onlinesbi.sbi.bank.in/sbicollect/"
    },{
        name: "HDFC Bank",
        redirectUrl: "https://now.hdfc.bank.in/"
    },{
        name: "Axis Bank",
        redirectUrl: "https://www.axis.bank.in/"
    }
]

export function AddMoneyCard(){
    const [redirectUrl, setRedirectUrl] = useState(SUPPORTED_BANKS[0]?.redirectUrl);
    const [amount, setAmount] = useState(0);
    const [provider, setProvider] = useState(SUPPORTED_BANKS[0]?.name);
    return <Card title={"Add Money"}>
        <div>
            <TextInput label={"Amount"} placeholder={"Enter amount"} onChange={(value)=>{
                setAmount(Number(value));
            }} />
            <div >Bank</div>
            <Select onSelect={(value)=>{
                setRedirectUrl(SUPPORTED_BANKS.find(bank => bank.name === value)?.redirectUrl || "")
                setProvider(value)
            }}

                options={SUPPORTED_BANKS.map(bank => ({key:bank.name, value: bank.name}))}
                />
            <div className="flex justify-center pt-4">
                <Button onClick={async () => {
                    await createOnRampTransaction(amount, provider || "");
                    window.location.href = redirectUrl || ""}}>
                    Add Money
                </Button>
            </div>
        </div>

    </Card>
}