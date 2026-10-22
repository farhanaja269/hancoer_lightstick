require('dotenv').config();

const express = require('express');
const cors = require('cors');
const db = require('./config/database');

// Import Controllers
const authController = require('./controllers/authController');
const masterController = require('./controllers/masterController');
const kategoriController = require('./controllers/kategoriController');
const peminjamanController = require('./controllers/peminjamanController');
const pengembalianController = require('./controllers/pengembalianController');
const pelangganController = require('./controllers/pelangganController');
const petugasController = require('./controllers/petugasController');
const adminController = require('./controllers/adminController');
const logController = require('./controllers/logController');
const authRoutes = require('./routes/authRoutes');
const pengaturanController = require('./controllers/pengaturanController');
// HAPUS import transaksiController karena udah diganti sama yang spesifik

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ==========================================
// ROUTES
// ==========================================

// 1. Root & Health Check
app.get('/', (req, res) => {
    res.json({ success: true, message: 'API Hancoer Lightstick aktif' });
});

app.get('/api/health', async (req, res) => {
    try {
        const [rows] = await db.query('SELECT DATABASE() AS database_name');
        res.json({ success: true, message: 'Koneksi database berhasil', database: rows[0].database_name });
    } catch (error) {
        console.error('Database error:', error.message);
        res.status(500).json({ success: false, message: 'Koneksi database gagal' });
    }
});

// 2. Auth Routes
app.post('/api/auth/register', authController.register);
app.post('/api/auth/login', authController.login);

// 3. Master Routes (Kategori & Lightstick)
app.get('/api/kategori', kategoriController.getKategori);
app.post('/api/kategori', kategoriController.createKategori);
app.put('/api/kategori/:id', kategoriController.updateKategori);
app.delete('/api/kategori/:id', kategoriController.deleteKategori);

app.get('/api/roles', masterController.getRoles);

app.get('/api/lightstick', masterController.getLightstick);
app.post('/api/lightstick', masterController.createLightstick);
app.put('/api/lightstick/:id', masterController.updateLightstick);
app.delete('/api/lightstick/:id', masterController.deleteLightstick);

// 4. Transaksi Routes (Peminjaman & Pengembalian)
app.post('/api/peminjaman', peminjamanController.createPeminjaman);
app.get('/api/peminjaman', peminjamanController.getPeminjaman);
app.put('/api/peminjaman/:id/bayar', peminjamanController.uploadBuktiPembayaran);
app.put('/api/peminjaman/:id/verifikasi', peminjamanController.verifikasiPeminjaman);

app.post('/api/pengembalian', pengembalianController.createPengembalian);
app.get('/api/pengembalian', pengembalianController.getPengembalian);
// Pastikan route update dan delete pengembalian juga ada
app.put('/api/pengembalian/:id', pengembalianController.updatePengembalian);
app.delete('/api/pengembalian/:id', pengembalianController.deletePengembalian);


// 5. Data Pengguna (Pelanggan, Petugas, Admin, Log)
app.get('/api/pelanggan', pelangganController.getPelanggan);
app.post('/api/pelanggan', pelangganController.createPelanggan);
app.put('/api/pelanggan/:id', pelangganController.updatePelanggan);
app.delete('/api/pelanggan/:id', pelangganController.deletePelanggan);

app.get('/api/petugas', petugasController.getPetugas);
app.post('/api/petugas', petugasController.createPetugas);
app.put('/api/petugas/:id', petugasController.updatePetugas);
app.delete('/api/petugas/:id', petugasController.deletePetugas);

app.get('/api/admin', adminController.getAdmin);
app.post('/api/admin', adminController.createAdmin);
app.put('/api/admin/:id', adminController.updateAdmin);
app.delete('/api/admin/:id', adminController.deleteAdmin);
// Di dalam server.js
app.get('/api/dashboard-stats', peminjamanController.getDashboardStats);
app.get('/api/log', logController.getLog);
app.get('/api/pengaturan-pembayaran', pengaturanController.getPengaturan);
app.put('/api/pengaturan-pembayaran', pengaturanController.updatePengaturan);
app.use('/api', authRoutes);

// ==========================================
// START SERVER
// ==========================================
const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
    console.log(`Server berjalan di http://localhost:${PORT}`);
});