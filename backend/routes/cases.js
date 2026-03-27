const express = require('express');
const router = express.Router();

// Mock Cases Routes
router.get('/', (req, res) => {
    res.json([
        { id: '1', title: 'Case #1024 - Suspicious Activity', status: 'Open', priority: 'High', date: '2026-03-24' },
        { id: '2', title: 'Case #1025 - CDR Analysis', status: 'In Progress', priority: 'Medium', date: '2026-03-23' }
    ]);
});

module.exports = router;
