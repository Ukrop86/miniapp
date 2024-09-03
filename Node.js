// server.js

const express = require('express');
const bodyParser = require('body-parser');
const fetch = require('node-fetch'); // Не забудьте встановити пакет

const app = express();
const port = 3000;
const botToken = 'YOUR_TELEGRAM_BOT_TOKEN'; // Замініть на ваш токен

app.use(bodyParser.json());

app.get('/getUpdates', async (req, res) => {
    try {
        const response = await fetch(`https://api.telegram.org/bot${botToken}/getUpdates`);
        const data = await response.json();
        res.json(data);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch updates' });
    }
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
