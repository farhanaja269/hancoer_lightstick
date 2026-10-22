const db = require('../config/database');
const bcrypt = require('bcryptjs');

// 1. AMBIL SEMUA PETUGAS (Role 2)
exports.getPetugas = async (req, res) => {
    try {
        const [rows] = await db.query('SELECT id_users, nama, email, no_hp, alamat FROM users WHERE id_role = 2');
        res.json({ success: true, data: rows });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// 2. TAMBAH PETUGAS BARU
exports.createPetugas = async (req, res) => {
    try {
        const { nama, email, password, no_hp, alamat } = req.body;
        
        const [existing] = await db.query('SELECT * FROM users WHERE email = ?', [email]);
        if (existing.length > 0) return res.status(400).json({ success: false, message: 'Email sudah terdaftar' });

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Insert dengan role 2 (Petugas)
        await db.query(
            'INSERT INTO users (id_role, nama, email, password, no_hp, alamat) VALUES (2, ?, ?, ?, ?, ?)',
            [nama, email, hashedPassword, no_hp, alamat]
        );
        res.status(201).json({ success: true, message: 'Petugas berhasil ditambahkan' });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// 3. EDIT DATA PETUGAS
exports.updatePetugas = async (req, res) => {
    try {
        const { id } = req.params;
        const { nama, email, password, no_hp, alamat } = req.body;

        if (password && password.trim() !== '') {
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(password, salt);
            await db.query(
                'UPDATE users SET nama=?, email=?, password=?, no_hp=?, alamat=? WHERE id_users=? AND id_role=2',
                [nama, email, hashedPassword, no_hp, alamat, id]
            );
        } else {
            await db.query(
                'UPDATE users SET nama=?, email=?, no_hp=?, alamat=? WHERE id_users=? AND id_role=2',
                [nama, email, no_hp, alamat, id]
            );
        }
        res.json({ success: true, message: 'Data petugas berhasil diupdate' });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// 4. HAPUS PETUGAS
exports.deletePetugas = async (req, res) => {
    try {
        const { id } = req.params;
        await db.query('DELETE FROM users WHERE id_users = ? AND id_role = 2', [id]);
        res.json({ success: true, message: 'Petugas berhasil dihapus' });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};