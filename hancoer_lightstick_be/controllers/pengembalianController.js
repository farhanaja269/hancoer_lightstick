const db = require('../config/database');

exports.createPengembalian = async (req, res) => {
    try {
        const { id_peminjaman, kondisi_lightstick, denda, keterangan } = req.body;
        
        const [peminjaman] = await db.query('SELECT * FROM peminjaman WHERE id_peminjaman = ?', [id_peminjaman]);
        if (peminjaman.length === 0) return res.status(404).json({ success: false, message: 'Data peminjaman tidak ditemukan' });
        if (peminjaman[0].status === 'dikembalikan') return res.status(400).json({ success: false, message: 'Barang sudah dikembalikan' });

        await db.query(
            'INSERT INTO pengembalian (id_peminjaman, kondisi_lightstick, denda, keterangan) VALUES (?, ?, ?, ?)',
            [id_peminjaman, kondisi_lightstick, denda || 0, keterangan || null]
        );

        await db.query("UPDATE peminjaman SET status = 'dikembalikan' WHERE id_peminjaman = ?", [id_peminjaman]);

        // 3. Kembalikan stok lightstick (+1)
        await db.query('UPDATE lightstick SET stok = stok + 1 WHERE id_lightstick = ?', [peminjaman[0].id_lightstick]);

        // 4. OTOMATIS: Ubah status jadi 'tersedia' karena barang sudah kembali
        await db.query("UPDATE lightstick SET status = 'tersedia' WHERE id_lightstick = ?", [peminjaman[0].id_lightstick]);

        res.status(201).json({ success: true, message: 'Pengembalian berhasil dicatat, stok telah dikembalikan.' });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

exports.getPengembalian = async (req, res) => {
    try {
        // Tangkap id_users dari URL (?id_users=2)
        const { id_users } = req.query;

        let query = `
            SELECT 
                pg.*, 
                p.tanggal_peminjaman, 
                u.nama as nama_user, 
                u.no_hp, 
                l.nama_lightstick 
            FROM pengembalian pg
            JOIN peminjaman p ON pg.id_peminjaman = p.id_peminjaman
            JOIN users u ON p.id_users = u.id_users
            JOIN lightstick l ON p.id_lightstick = l.id_lightstick
        `;

        let params = [];

        // Kalau frontend ngirim ID user, saring datanya!
        if (id_users) {
            query += ` WHERE p.id_users = ?`;
            params.push(id_users);
        }

        query += ` ORDER BY pg.id_pengembalian DESC`;

        const [rows] = await db.query(query, params);
        res.json({ success: true, data: rows });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

exports.updatePengembalian = async (req, res) => {
    try {
        const { id } = req.params;
        const { kondisi_lightstick, denda, keterangan } = req.body;
        
        await db.query(
            'UPDATE pengembalian SET kondisi_lightstick = ?, denda = ?, keterangan = ? WHERE id_pengembalian = ?',
            [kondisi_lightstick, denda, keterangan, id]
        );
        
        res.json({ success: true, message: 'Data berhasil diupdate' });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

exports.deletePengembalian = async (req, res) => {
    try {
        const { id } = req.params;
        
        const [pg] = await db.query('SELECT id_peminjaman FROM pengembalian WHERE id_pengembalian = ?', [id]);
        if (pg.length > 0) {
            // Balikin status peminjaman jadi dipinjam
            await db.query("UPDATE peminjaman SET status = 'dipinjam' WHERE id_peminjaman = ?", [pg[0].id_peminjaman]);
        }

        await db.query('DELETE FROM pengembalian WHERE id_pengembalian = ?', [id]);
        res.json({ success: true, message: 'Data pengembalian dihapus' });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};