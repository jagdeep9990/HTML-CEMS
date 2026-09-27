require('dotenv').config();
const express = require('express');
const cors = require('cors');
const eventsRouter = require('./routes/events');
const registrationsRouter = require('./routes/registrations');

const app = express();
app.use(cors()); // Lets a separately opened frontend call this API during development.
app.use(express.json()); // Reads JSON request bodies sent by the frontend.

app.get('/api/health', (req, res) => res.json({ status: 'CEMS API is running' }));
app.use('/api/events', eventsRouter);
app.use('/api/registrations', registrationsRouter);

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`CEMS API running at http://localhost:${port}`));
