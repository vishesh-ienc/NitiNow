require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();

const port = process.env.PORT || 3000;

const userRoute = require('./users');
const schemesRoute = require('./schemes');
const { router: newsRoute, syncNews } = require('./news');
const cron = require('node-cron');

// Enable CORS for frontend dev server
app.use(cors());
app.use(express.json());


app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});

app.get('/', (req, res) => {
    res.send('Welcome to NitiNow Backend');
});

app.use('/users', userRoute);
app.use('/api/schemes', schemesRoute);
app.use('/api/news', newsRoute);

// Schedule news sync every 24 hours at midnight
cron.schedule('0 0 * * *', async () => {
    console.log('Running daily news sync cron job...');
    await syncNews();
});
