import { PrismaClient } from "@prisma/client";
import { logger } from './logger';
const globalAny: any = global;

let prisma: PrismaClient;

if (process.env.NODE_ENV === "production") {
  prisma = new PrismaClient();
} else {
  if (!globalAny.prisma) {
    globalAny.prisma = new PrismaClient({ });
    globalAny.prisma.$on("query", (e: any) => {
      logger.info(`Prisma Query: ${e.query} ${e.params}`);
    });
  }
  prisma = globalAny.prisma;
}

export default prisma;
