const db = require('../config/database');

// 1. Ambil Pengaturan (Untuk Peminjam & Admin)
exports.getPengaturan = async (req, res) => {
    try {
        const [rows] = await db.query('SELECT * FROM pengaturan_pembayaran LIMIT 1');
        if (rows.length === 0) return res.json({ success: true, data: null });
        res.json({ success: true, data: rows[0] });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// 2. Update Pengaturan (Khusus Admin)
exports.updatePengaturan = async (req, res) => {
    try {
        const { nama_bank, no_rekening, pemilik_rekening, qris_url } = req.body;
        
        // Cek apakah data udah ada
        const [rows] = await db.query('SELECT id FROM pengaturan_pembayaran LIMIT 1');
        
        if (rows.length === 0) {
            // Kalau belum ada, Insert
            await db.query(
                'INSERT INTO pengaturan_pembayaran (nama_bank, no_rekening, pemilik_rekening, qris_url) VALUES (?, ?, ?, ?)',
                [nama_bank, no_rekening, pemilik_rekening, qris_url]
            );
        } else {
            // Kalau udah ada, Update berdasarkan ID pertama
            await db.query(
                'UPDATE pengaturan_pembayaran SET nama_bank = ?, no_rekening = ?, pemilik_rekening = ?, qris_url = ? WHERE id = ?',
                [nama_bank, no_rekening, pemilik_rekening, qris_url, rows[0].id]
            );
        }

        res.json({ success: true, message: 'Pengaturan berhasil diupdate' });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};