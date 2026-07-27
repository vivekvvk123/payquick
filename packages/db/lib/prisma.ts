import { PrismaClient } from "../prisma/generated/prisma/client";
import { PrismaNeon } from "@prisma/adapter-neon";
import { PrismaPg } from "@prisma/adapter-pg";
import { neonConfig } from "@neondatabase/serverless";
import ws from "ws";

// Use PrismaNeon for Neon databases, PrismaPg for everything else
const isNeon = process.env.DATABASE_URL?.includes("neon.tech");

let adapter;
if (isNeon) {
  neonConfig.webSocketConstructor = ws;
  adapter = new PrismaNeon({ connectionString: process.env.DATABASE_URL });
} else {
  adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL });
}

const globalForPrisma = global as unknown as {
  prisma: PrismaClient;
};

const prisma =
  globalForPrisma.prisma ||
  new PrismaClient({ adapter });

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;
export default prisma;