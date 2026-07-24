import "dotenv/config";
import prisma from "../lib/prisma";
import bcrypt from "bcrypt";

async function main(){
    const alice = await prisma.user.upsert({
        where : { number: '1111111111'},
        update: {}, // if user exists, do nothing
        create: {  // else create a new user
            number: '1111111111',
            name: 'Alice',
            password: await bcrypt.hash("alice", 10),
            Balance:{
                create:{
                    amount: 2000,
                    locked: 0
                }
            },
            OnRampTransaction: {
                create: {
                    status: "Success",
                    amount: 20000,
                    token: "token__1",
                    provider: "HDFC Bank"
    
                }
            }
        }
    })

    const bob = await prisma.user.upsert({
        where: {number: "2222222222"},
        update: {},
        create: {
            number: "2222222222",
            name: "Bob",
            password: await bcrypt.hash("bob", 10),
            Balance: {
                create: {
                    amount: 2000,
                    locked: 0
                }
            },
            OnRampTransaction: {
                create: {
                    status: "Failed",
                    amount: 2000,
                    token: "token__2",
                    provider: "HDFC Bank"
                }
            }
        }
    })

    console.log({alice, bob})
}

main()
.then(async()=>{
    await prisma.$disconnect()
})
.catch(async(e)=>{
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
})