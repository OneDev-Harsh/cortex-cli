import { betterAuth } from 'better-auth';
import { prismaAdapter } from 'better-auth/adapters/prisma';
import { getPrisma } from './db.js';
import 'dotenv/config';

const prisma = getPrisma();

export const auth = betterAuth({
    database: prisma
        ? prismaAdapter(prisma, { provider: "postgresql" })
        : undefined,

    trustedOrigins: ['http://localhost:3000'],
    basePath: '/api/auth',

    socialProviders: {
        /**google: {
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        },**/
        github: {
            clientId: process.env.GITHUB_CLIENT_ID,
            clientSecret: process.env.GITHUB_CLIENT_SECRET,
        },
    }
});