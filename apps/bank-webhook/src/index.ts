import "dotenv/config"; // loads .env before Prisma initializes
import express from "express";
import prisma from "@repo/db/prisma";
const app = express();
app.use(express.json());

const PORT = 3003;

// HDFC bank will hit this endpoint when someone pays to HDFC bank
app.post("/hdfcWebhook", async (req, res) => {
    const paymentInformation: {
        token: string;
        userId: string;
        amount: string;
    } = {
        token: req.body.token,
        userId: req.body.user_identifier,
        amount: req.body.amount
    }

    try{

        await prisma.$transaction([

            prisma.balance.update({
                where: {
                    userId: Number(paymentInformation.userId)
                },
                data: {
                    amount: {
                        increment:Number(paymentInformation.amount) * 100
                    }
                }
            }),

            prisma.onRampTransaction.update({
                where:{
                    token: paymentInformation.token
                },
                data: {
                    status: "Success"
                }
            })

        ]);

        res.status(200).json({
            message: "Captured"
        })
    }

    catch(err){
        console.error(err);
        res.status(411).json({
            message: "Error while processing webhook"
        })
    }

})

app.listen(PORT, () => {
    console.log("Server is running at port "+ PORT);
})