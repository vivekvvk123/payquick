"use client";
import { useState } from "react"
import { Card } from "@repo/ui/card";
import { TextInput } from "@repo/ui/TextInput";
import { Button } from "@repo/ui/button";
import p2pTransfer from "../app/lib/action/p2pTransfer";


export function SendCard() {
    const [amount, setAmount] = useState("");
    const [number, setNumber] = useState("");
    return(
        <div>
            <Card title={"Send"}>
                <div className="min-w-72 pt-2">
                    <TextInput placeholder="9876543210" label="Mobile Number" onChange={(value)=>{
                        setNumber(value)
                    }} />
                    <TextInput placeholder="10" label="Amount" onChange={(value)=>{
                        setAmount(value)
                    }} />
                </div>
                <div className="pt-4 flex justify-center">
                    <Button onClick={async()=>{ await p2pTransfer(number, Number(amount) * 100)}}>
                        Send
                    </Button>
                </div>
            </Card>
        </div>
    )
}