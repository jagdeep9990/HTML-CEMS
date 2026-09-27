const express = require('express');
const db = require('../config/db');
const router = express.Router();

// GET /api/events: send upcoming event data to the frontend.
router.get('/', async (req, res) => {
  try {
    const [events] = await db.execute(
      'SELECT event_id AS id, title, category, event_date AS date, venue, description FROM events ORDER BY event_date IS NULL, event_date, event_id'
    );
    res.json(events);
  } catch (error) {
    console.error('Could not load events:', error.message);
    res.status(500).json({ message: 'Could not load events.' });
  }
});

module.exports = router;
