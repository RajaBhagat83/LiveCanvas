import { PrismaClient } from "./generated/prisma/client.js";
import "dotenv/config"
import { PrismaPg } from "@prisma/adapter-pg";

const connectingString = `${process.env.DATABASE_URL}`

const adapter = new PrismaPg({connectingString})
export const prisma = new PrismaClient({adapter});