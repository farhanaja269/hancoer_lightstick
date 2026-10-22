const db = require('../config/database');

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

exports.updateKategori = async (req, res) => {
    try {
        const { id } = req.params;
        const { nama_kategori } = req.body;
        await db.query('UPDATE kategori SET nama_kategori = ? WHERE id_kategori = ?', [nama_kategori, id]);
        res.json({ success: true, message: 'Kategori berhasil diupdate' });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

exports.deleteKategori = async (req, res) => {
    try {
        const { id } = req.params;
        await db.query('DELETE FROM kategori WHERE id_kategori = ?', [id]);
        res.json({ success: true, message: 'Kategori berhasil dihapus' });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};