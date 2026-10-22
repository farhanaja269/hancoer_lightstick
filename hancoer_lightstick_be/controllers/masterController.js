const db = require('../config/database');

// --- KATEGORI ---
exports.getKategori = async (req, res) => {
    try {
        const [rows] = await db.query('SELECT * FROM kategori');
        res.json({ success: true, data: rows });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

exports.createKategori = async (req, res) => {
    try {
        const { nama_kategori } = req.body;
        await db.query('INSERT INTO kategori (nama_kategori) VALUES (?)', [nama_kategori]);
        res.status(201).json({ success: true, message: 'Kategori ditambahkan' });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// --- ROLES ---
exports.getRoles = async (req, res) => {
    try {
        const [rows] = await db.query('SELECT * FROM roles');
        res.json({ success: true, data: rows });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// --- LIGHTSTICK ---
exports.getLightstick = async (req, res) => {
    try {
        const [rows] = await db.query(`
            SELECT l.*, k.nama_kategori 
            FROM lightstick l
            LEFT JOIN kategori k ON l.id_kategori = k.id_kategori
        `);
        res.json({ success: true, data: rows });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// FUNGSI TAMBAH DATA (Disesuaikan dengan Database baru)
exports.createLightstick = async (req, res) => {
    try {
        const { id_kategori, nama_lightstick, featured, warna, foto, stok, harga_sewa, deskripsi, status } = req.body;
        
        await db.query(
            'INSERT INTO lightstick (id_kategori, nama_lightstick, featured, warna, foto, stok, harga_sewa, deskripsi, status) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)',
            [id_kategori, nama_lightstick, featured || 0, warna || null, foto || null, stok || 0, harga_sewa, deskripsi || null, status || 'tersedia']
        );
        res.status(201).json({ success: true, message: 'Lightstick ditambahkan' });
    } catch (error) {
        console.error("Error Create:", error);
        res.status(500).json({ success: false, message: error.message });
    }
};

// FUNGSI EDIT DATA (Ditambahkan field foto, deskripsi, featured)
exports.updateLightstick = async (req, res) => {
    try {
        const { id } = req.params;
        const { nama_lightstick, id_kategori, featured, warna, foto, stok, harga_sewa, deskripsi, status } = req.body;
        
        await db.query(
            'UPDATE lightstick SET nama_lightstick=?, id_kategori=?, featured=?, warna=?, foto=?, stok=?, harga_sewa=?, deskripsi=?, status=? WHERE id_lightstick=?',
            [nama_lightstick, id_kategori, featured || 0, warna, foto, stok, harga_sewa, deskripsi, status, id]
        );
        res.json({ success: true, message: 'Data berhasil diupdate' });
    } catch (error) {
        console.error("Error Update:", error);
        res.status(500).json({ success: false, message: error.message });
    }
};

// FUNGSI HAPUS DATA
exports.deleteLightstick = async (req, res) => {
    try {
        const { id } = req.params;
        await db.query('DELETE FROM lightstick WHERE id_lightstick = ?', [id]);
        res.json({ success: true, message: 'Data berhasil dihapus' });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};