const db = require('../config/database');

// Fungsi untuk mencatat log
exports.catatLog = async (id_users, nama_user, aktivitas) => {
    try {
        await db.query(
            'INSERT INTO log_aktivitas (id_users, nama_user, aktivitas) VALUES (?, ?, ?)',
            [id_users, nama_user, aktivitas]
        );
    } catch (error) {
        console.error("Gagal mencatat log:", error.message);
    }
};