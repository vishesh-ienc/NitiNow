const express = require('express');
const cors = require('cors');
const app = express();

const userRoute = require('./users');
const schemesRoute = require('./schemes');

// Enable CORS for frontend dev server
app.use(cors());
app.use(express.json());

app.listen(3000, () => {
    console.log('Server running on port 3000');
});

app.get('/', (req, res) => {
    res.send('Welcome to NitiNow Backend');
});

app.use('/users', userRoute);
app.use('/api/schemes', schemesRoute);
