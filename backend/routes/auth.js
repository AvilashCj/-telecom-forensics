const express = require('express');
const router = express.Router();

// Mock Auth Routes
router.post('/login', (req, res) => {
    const { email, password } = req.body;
    // Basic mock authentication
    if (email === 'admin@police.gov' && password === 'admin123') {
        return res.json({
            token: 'mock-jwt-token',
            user: { id: 'admin-1', name: 'Admin Officer', role: 'Admin' }
        });
    }
    res.status(401).json({ message: 'Invalid credentials' });
});

module.exports = router;
