const db = require('../config/database');

exports.getLog = async (req, res) => {
    try {
        const [rows] = await db.query('SELECT * FROM log_aktivitas ORDER BY waktu DESC LIMIT 100'); // Ambil 100 log terbaru
        res.json({ success: true, data: rows });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};