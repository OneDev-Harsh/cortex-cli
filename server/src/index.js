import express from 'express';
import dotenv from 'dotenv';

const app = express();
dotenv.config();

app.get('/test', (req, res) => {
    res.send('OK');
})

app.listen(process.env.PORT, () => {
    console.log(`Server started at http://localhost:${process.env.PORT}`);
});