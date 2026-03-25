import {createAuthClient} from 'better-auth/react';
import 'dotenv/config';

export const authClient = createAuthClient({
    baseURL: 'http://localhost:3005',
})