const db = require('../config/database');
const bcrypt = require('bcrypt'); // atau bcryptjs

exports.register = async (req, res) => {
  try {
    // Kita tangkap no_telp dari frontend, tapi nanti kita simpan ke kolom no_hp
    const { nama, email, password, alamat, no_telp } = req.body;

    // 1. Cek email
    const [existingUser] = await db.query(
      'SELECT * FROM users WHERE email = ?', 
      [email]
    );

    if (existingUser.length > 0) {
      return res.status(400).json({ message: 'Email sudah digunakan!' });
    }

    // 2. Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // 3. Simpan ke DB (Sesuaikan nama kolom dengan database: id_role & no_hp)
    await db.query(
      'INSERT INTO users (nama, email, password, alamat, no_hp, id_role) VALUES (?, ?, ?, ?, ?, ?)',
      [nama, email, hashedPassword, alamat, no_telp, 3] // 3 adalah ID untuk role Peminjam
    );

    res.status(201).json({ message: 'Registrasi berhasil! Silakan login.' });
  } catch (error) {
    // Ini biar kalau error lagi, terminal backend nampilin detailnya
    console.error("ERROR DATABASE:", error.sqlMessage || error); 
    res.status(500).json({ message: 'Terjadi kesalahan pada server' });
  }
};

exports.updateProfile = async (req, res) => {
  try {
    const { id } = req.params; // ID User
    const { nama, no_hp, alamat, password } = req.body;

    // 1. Jika user mengisi password baru, hash dulu
    if (password && password.trim() !== '') {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);
      
      await db.query(
        'UPDATE users SET nama = ?, no_hp = ?, alamat = ?, password = ? WHERE id_users = ?',
        [nama, no_hp, alamat, hashedPassword, id]
      );
    } else {
      // 2. Jika password kosong, update selain password
      await db.query(
        'UPDATE users SET nama = ?, no_hp = ?, alamat = ? WHERE id_users = ?',
        [nama, no_hp, alamat, id]
      );
    }

    res.json({ success: true, message: 'Profil berhasil diupdate' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};