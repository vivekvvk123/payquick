import CredentialsProvider from "next-auth/providers/credentials"
import bcrypt from "bcrypt"
import prisma from "@repo/db/prisma"

export const authOptions = {
  providers: [
        CredentialsProvider({
        name: "Credentials",
        credentials: {
        phone: { label: "Phone Number", type: "text", placeholder: "9876543210" },
        password: { label: "Password", type: "password", required: true, placeholder: "••••••••" }
        },
        async authorize(credentials, req) {
            const hashedPassword = await bcrypt.hash(credentials?.password || "", 10);

            const existingUser = await prisma.user.findFirst({
                where: {
                    number: credentials?.phone
                }
            })

            if(existingUser){
                const isPasswordValid = await bcrypt.compare(credentials?.password || "", existingUser.password);
                if(isPasswordValid){
                    return {
                        id: existingUser.id.toString(),
                        name: existingUser.name,
                        email: existingUser.email
                    }
                }
                else{
                    return null;
                }
            }
            try{
                const newUser = await prisma.user.create({
                    data: {
                        number: credentials?.phone || "",
                        password: hashedPassword
                    }
                })
                return {
                    id: newUser.id.toString(),
                    name: newUser.name,
                    email: newUser.email
                }
            }
            catch(err){
                console.error(err);
                return null;
            }

        }
    })
  ],

  secret: process.env.JWT_SECRET
}