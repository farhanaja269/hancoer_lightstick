const db = require('../config/database');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { catatLog } = require('../utils/logHelper');
// Register
exports.register = async (req, res) => {
    try {
        const { nama, email, password, no_hp, alamat, id_role } = req.body;
        
        // Cek email
        const [existing] = await db.query('SELECT * FROM users WHERE email = ?', [email]);
        if (existing.length > 0) return res.status(400).json({ success: false, message: 'Email sudah terdaftar' });

        // Hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Default role = 2 (misal: user biasa)
        const role = id_role || 2; 

        await db.query(
            'INSERT INTO users (id_role, nama, email, password, no_hp, alamat) VALUES (?, ?, ?, ?, ?, ?)',
            [role, nama, email, hashedPassword, no_hp, alamat]
        );

        res.status(201).json({ success: true, message: 'Registrasi berhasil' });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// Login
exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const [users] = await db.query('SELECT * FROM users WHERE email = ?', [email]);
        
        if (users.length === 0) return res.status(404).json({ success: false, message: 'User tidak ditemukan' });

        const user = users[0];
        const validPassword = await bcrypt.compare(password, user.password);
        
        if (!validPassword) return res.status(401).json({ success: false, message: 'Password salah' });

        // Buat Token
        const token = jwt.sign(
            { id: user.id_users, role: user.id_role }, 
            process.env.JWT_SECRET || 'rahasia_lightstick', 
            { expiresIn: '1d' }
        );
        await catatLog(user.id_users, user.nama, 'Berhasil Login ke sistem');

        res.json({ success: true, message: 'Login berhasil', token, user: { id: user.id_users, nama: user.nama, role: user.id_role } });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message }); 
    }
};