import { PrismaClient } from "@prisma/client";
const globalAny: any = global;

let prisma: PrismaClient;

if (process.env.NODE_ENV === "production") {
  prisma = new PrismaClient();
} else {
  if (!globalAny.prisma) {
    globalAny.prisma = new PrismaClient({
      log: ["query", "info", `warn`, `error`],
    });
    globalAny.prisma.$on("query", (e: any) => {
      console.log(`${e.query} ${e.params}`);
    });
  }
  prisma = globalAny.prisma;
}

export default prisma;
