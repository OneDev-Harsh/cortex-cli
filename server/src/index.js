import express from 'express';
import dotenv from 'dotenv';
dotenv.config();
import { fromNodeHeaders, toNodeHandler } from "better-auth/node";
import cors from 'cors';
import { auth } from './lib/auth.js';

const app = express();

app.use(
    cors({
        origin: 'http://localhost:3000',
        methods: ['GET', 'POST', 'PUT', 'DELETE'],
        credentials: true,
    })
)

app.all('/api/auth/{*any}', toNodeHandler(auth));

app.use(express.json());

app.get('/api/me', async (req, res) => {
    const session = await auth.api.getSession({
        headers: fromNodeHeaders(req.headers)
    });
    return res.json(session);
})

app.get('/test', (req, res) => {
    res.send('OK');
})

app.listen(process.env.PORT, () => {
    console.log(`Server started at http://localhost:${process.env.PORT}`);
});