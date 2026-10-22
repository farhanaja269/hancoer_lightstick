const db = require('../config/database');
const { catatLog } = require('../utils/logHelper'); 

exports.createPeminjaman = async (req, res) => {
    try {
        const { 
            id_users, 
            id_lightstick, 
            tanggal_peminjaman, 
            tanggal_kembali, 
            jaminan, 
            metode_pembayaran,
            bukti_pembayaran, 
            jaminan_url
        } = req.body;
        
        const [ls] = await db.query('SELECT stok, harga_sewa FROM lightstick WHERE id_lightstick = ?', [id_lightstick]);
        
        if (ls.length === 0) return res.status(404).json({ success: false, message: 'Lightstick tidak ditemukan' });
        if (ls[0].stok <= 0) return res.status(400).json({ success: false, message: 'Stok habis' });

        const hargaSaatIni = ls[0].harga_sewa;
        const statusPembayaranAwal = bukti_pembayaran ? 'menunggu_verifikasi' : 'belum_bayar';

        await db.query(
            "INSERT INTO peminjaman (id_users, id_lightstick, tanggal_peminjaman, tanggal_kembali, jaminan, metode_pembayaran, harga_sewa, bukti_pembayaran, jaminan_url, status, status_pembayaran) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, 'menunggu', ?)",
            [id_users, id_lightstick, tanggal_peminjaman, tanggal_kembali, jaminan, metode_pembayaran || 'transfer', hargaSaatIni, bukti_pembayaran || null, jaminan_url || null, statusPembayaranAwal]
        );

        await db.query('UPDATE lightstick SET stok = stok - 1 WHERE id_lightstick = ?', [id_lightstick]);
        await db.query("UPDATE lightstick SET status = 'tidak tersedia' WHERE id_lightstick = ? AND stok <= 0", [id_lightstick]);
        
        await catatLog(id_users, 'Peminjam', `Mengajukan sewa lightstick ID ${id_lightstick}`);

        res.status(201).json({ success: true, message: 'Peminjaman berhasil diajukan' });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

exports.getPeminjaman = async (req, res) => {
    try {
        const { id_users } = req.query;

        let query = `
            SELECT 
                p.*, 
                u.nama as nama_user, 
                u.no_hp, 
                l.nama_lightstick,
                pg.denda,
                pg.kondisi_lightstick,
                pg.keterangan as keterangan_pengembalian
            FROM peminjaman p
            JOIN users u ON p.id_users = u.id_users
            JOIN lightstick l ON p.id_lightstick = l.id_lightstick
            LEFT JOIN pengembalian pg ON p.id_peminjaman = pg.id_peminjaman
        `;

        let params = [];
        if (id_users) {
            query += ` WHERE p.id_users = ?`;
            params.push(id_users);
        }
        query += ` ORDER BY p.id_peminjaman DESC`;

        const [rows] = await db.query(query, params);
        res.json({ success: true, data: rows });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

exports.uploadBuktiPembayaran = async (req, res) => {
    try {
        const { id } = req.params;
        const { bukti_pembayaran } = req.body; 
        
        await db.query(
            'UPDATE peminjaman SET bukti_pembayaran = ?, status_pembayaran = "menunggu_verifikasi" WHERE id_peminjaman = ?',
            [bukti_pembayaran, id]
        );
        res.json({ success: true, message: 'Bukti pembayaran berhasil diupload, menunggu verifikasi admin' });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

exports.verifikasiPeminjaman = async (req, res) => {
    try {
      const { id } = req.params;
      const { status, status_pembayaran } = req.body;
      
      await db.query(
        'UPDATE peminjaman SET status = ?, status_pembayaran = ? WHERE id_peminjaman = ?', 
        [status, status_pembayaran, id]
      );
  
      await catatLog(1, 'Admin', `Memverifikasi peminjaman ID ${id} menjadi ${status}`);
      
      res.json({ success: true, message: 'Verifikasi berhasil' });
    } catch (error) {
      res.status(500).json({ message: 'Gagal verifikasi' });
    }
};

exports.getDashboardStats = async (req, res) => {
    try {
        // 1. Ambil total pendapatan
        // Pakai IFNULL biar data yang NULL dianggap 0
        const [pendapatan] = await db.query(`
            SELECT SUM(IFNULL(harga_sewa, 0)) as total 
            FROM peminjaman 
            WHERE status_pembayaran IN ('menunggu_verifikasi', 'lunas')
        `);

        // 2. Ambil total transaksi (semua peminjaman)
        const [transaksi] = await db.query('SELECT COUNT(*) as total FROM peminjaman');

        // 3. Ambil total user (pelanggan)
        const [pelanggan] = await db.query('SELECT COUNT(*) as total FROM users WHERE id_role = 3');

        res.json({
            success: true,
            data: {
                pendapatan: Number(pendapatan[0].total) || 0,
                totalTransaksi: transaksi[0].total || 0,
                totalPelanggan: pelanggan[0].total || 0
            }
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: error.message });
    }
};