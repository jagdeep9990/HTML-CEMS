const express = require('express');
const db = require('../config/db');
const router = express.Router();

// POST /api/registrations: save one student's registration for an event.
router.post('/', async (req, res) => {
  const { eventId, studentName, email, phone, collegeName } = req.body;

  if (!eventId || !studentName || !email || !phone || !collegeName) {
    return res.status(400).json({ message: 'Please fill in every registration field.' });
  }
  if (!/^\S+@\S+\.\S+$/.test(email)) {
    return res.status(400).json({ message: 'Please enter a valid email address.' });
  }

  try {
    const [eventRows] = await db.execute(
      'SELECT event_id FROM events WHERE event_id = ?', [eventId]
    );
    if (eventRows.length === 0) {
      return res.status(404).json({ message: 'That event was not found.' });
    }

    const [result] = await db.execute(
      'INSERT INTO registrations (event_id, student_name, email, phone, college_name) VALUES (?, ?, ?, ?, ?)',
      [eventId, studentName.trim(), email.trim().toLowerCase(), phone.trim(), collegeName.trim()]
    );
    res.status(201).json({
      message: 'Registration successful!',
      registrationId: result.insertId
    });
  } catch (error) {
    if (error.code === 'ER_DUP_ENTRY') {
      return res.status(409).json({ message: 'This email is already registered for that event.' });
    }
    console.error('Could not save registration:', error.message);
    res.status(500).json({ message: 'Could not save your registration.' });
  }
});

module.exports = router;
