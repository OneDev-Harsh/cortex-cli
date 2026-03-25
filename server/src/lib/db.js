import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';

let prisma;

export function getPrisma() {
  if (!prisma) {
    if (!process.env.DATABASE_URL) {
      return null; // prevent CLI crash
    }

    const adapter = new PrismaPg({
      connectionString: process.env.DATABASE_URL,
    });

    prisma = new PrismaClient({ adapter });
  }

  return prisma;
}