import "dotenv/config";
declare const prismaClientSingleton: () => import("../app/generated/prisma/internal/class").PrismaClient<never, import("../app/generated/prisma/internal/prismaNamespace").GlobalOmitConfig | undefined, import("@prisma/client/runtime/client").DefaultArgs>;
declare global {
    var prismaGlobal: undefined | ReturnType<typeof prismaClientSingleton>;
}
declare const prisma: ReturnType<typeof prismaClientSingleton>;
export default prisma;
//# sourceMappingURL=index.d.ts.map