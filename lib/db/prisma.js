import { PrismaClient } from "@prisma/client";

const globalForPrisma = global;

export const prisma = globalForPrisma.prisma ?? new PrismaClient(); // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Nullish_coalescing

if (process.env.NODE_ENV !== "production") {
	globalForPrisma.prisma = prisma;
}
