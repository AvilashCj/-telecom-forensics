const express = require('express');
const router = express.Router();
const multer = require('multer');
const csv = require('csv-parser');
const fs = require('fs');
const path = require('path');

const upload = multer({ dest: path.join(__dirname, '../uploads/') });

// Mock AI Analysis Logic
const analyzeCDR = (records) => {
    let alerts = [];
    const suspects = {};

    records.forEach(record => {
        const { caller, receiver, duration, time } = record;
        const dur = parseInt(duration);
        const hour = parseInt(time?.split(':')[0]);

        // Suspicious patterns
        if (dur < 30) {
            alerts.push({ type: 'Short Duration', detail: `Burst from ${caller}`, priority: 'Medium' });
        }
        if (hour >= 0 && hour <= 4) {
            alerts.push({ type: 'Midnight Activity', detail: `Call at ${time} from ${caller}`, priority: 'High' });
        }

        // Suspect scoring
        suspects[caller] = (suspects[caller] || 0) + (dur < 30 ? 5 : 1) + (hour <= 4 ? 10 : 0);
    });

    return { alerts, suspects };
};

router.post('/upload', upload.single('file'), (req, res) => {
    if (!req.file) return res.status(400).json({ message: 'No file uploaded' });

    const results = [];
    fs.createReadStream(req.file.path)
        .pipe(csv())
        .on('data', (data) => results.push(data))
        .on('end', () => {
            const analysis = analyzeCDR(results);
            res.json({
                message: 'File processed successfully',
                count: results.length,
                analysis
            });
            // Cleanup
            fs.unlinkSync(req.file.path);
        });
});

module.exports = router;
