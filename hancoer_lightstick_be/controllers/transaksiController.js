const db = require('../config/database');

// --- PEMINJAMAN ---
exports.createPeminjaman = async (req, res) => {
    try {
        const { id_users, id_lightstick, tanggal_peminjaman, tanggal_kembali } = req.body;
        
        // Cek stok dulu
        const [ls] = await db.query('SELECT stok FROM lightstick WHERE id_lightstick = ?', [id_lightstick]);
        if (ls[0].stok <= 0) return res.status(400).json({ success: false, message: 'Stok habis' });

        // Insert peminjaman
        await db.query(
            'INSERT INTO peminjaman (id_users, id_lightstick, tanggal_peminjaman, tanggal_kembali, status) VALUES (?, ?, ?, ?, "menunggu")',
            [id_users, id_lightstick, tanggal_peminjaman, tanggal_kembali]
        );

        // Kurangi stok (bisa juga dilakukan saat status disetujui)
        await db.query('UPDATE lightstick SET stok = stok - 1 WHERE id_lightstick = ?', [id_lightstick]);

        res.status(201).json({ success: true, message: 'Peminjaman diajukan' });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

exports.getPeminjaman = async (req, res) => {
    const [rows] = await db.query(`
        SELECT p.*, u.nama as nama_user, l.nama_lightstick 
        FROM peminjaman p
        JOIN users u ON p.id_users = u.id_users
        JOIN lightstick l ON p.id_lightstick = l.id_lightstick
    `);
    res.json({ success: true, data: rows });
};

// --- PENGEMBALIAN ---
exports.createPengembalian = async (req, res) => {
    try {
        const { id_peminjaman, kondisi_lightstick, denda, keterangan } = req.body;
        
        await db.query(
            'INSERT INTO pengembalian (id_peminjaman, kondisi_lightstick, denda, keterangan) VALUES (?, ?, ?, ?)',
            [id_peminjaman, kondisi_lightstick, denda || 0, keterangan]
        );

        // Update status peminjaman jadi selesai
        await db.query('UPDATE peminjaman SET status = "dikembalikan" WHERE id_peminjaman = ?', [id_peminjaman]);

        res.status(201).json({ success: true, message: 'Pengembalian berhasil dicatat' });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

exports.getPengembalian = async (req, res) => {
    const [rows] = await db.query(`
        SELECT pg.*, p.id_users, l.nama_lightstick 
        FROM pengembalian pg
        JOIN peminjaman p ON pg.id_peminjaman = p.id_peminjaman
        JOIN lightstick l ON p.id_lightstick = l.id_lightstick
    `);
    res.json({ success: true, data: rows });
};