"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("../app/generated/prisma/client");
const adapter_pg_1 = require("@prisma/adapter-pg");
require("dotenv/config");
const connectionString = `${process.env.DATABASE_URL}`;
const adapter = new adapter_pg_1.PrismaPg({ connectionString });
const prismaClientSingleton = () => {
    return new client_1.PrismaClient({ adapter });
};
const prisma = globalThis.prismaGlobal ?? prismaClientSingleton();
exports.default = prisma;
if (process.env.NODE_ENV !== 'production')
    globalThis.prismaGlobal = prisma;
