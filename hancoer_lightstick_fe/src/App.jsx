import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';

// ==================== LANDING / PUBLIC ====================
import Navbar from './components/Navbar';
import Landing from './pages/Landing';
import Kontak from './pages/Kontak';
import About from './pages/About';
import CaraSewa from './pages/CaraSewa';
import Login from './pages/Login';
import Register from './pages/Register';

// ==================== USER / PEMINJAM (Role 3) ====================
import Katalog from './pages/Katalog';
import PeminjamLayout from './components/PeminjamLayout';
import PeminjamDashboard from './pages/PeminjamDashboard';
import PeminjamPeminjaman from './pages/PeminjamPeminjaman';
import PeminjamPengembalian from './pages/PeminjamPengembalian';
import PeminjamPengaturan from './pages/PeminjamPengaturan';
import PeminjamFormSewa from './pages/PeminjamFormSewa';

// ==================== PETUGAS (Role 2) ====================
import PetugasLayout from './components/PetugasLayout'; // <--- IMPORT LAYOUT
import PetugasDashboard from './pages/PetugasDashboard';
import PetugasPeminjaman from './pages/PetugasPeminjaman'; // <--- IMPORT HALAMAN
import PetugasPengembalian from './pages/PetugasPengembalian'; // <--- IMPORT HALAMAN
import PetugasLaporan from './pages/PetugasLaporan'; // <--- IMPORT HALAMAN

// ==================== ADMIN (Role 1) ====================
import AdminLayout from './components/AdminLayout';
import AdminDashboard from './pages/AdminDashboard';
import AdminLightstick from './pages/AdminLightstick';
import AdminKategori from './pages/AdminKategori';
import AdminPeminjaman from './pages/AdminPeminjaman';
import AdminPengembalian from './pages/AdminPengembalian';
import AdminPelanggan from './pages/AdminPelanggan';
import AdminPetugas from './pages/AdminPetugas';
import AdminAdmin from './pages/AdminAdmin';
import AdminLog from './pages/AdminLog1';
import AdminPengaturanPembayaran from './pages/AdminPengaturanPembayaran';
// ==================== ROUTE PROTECTOR ====================

function RequireAuth({ children, allowedRoles }) {
  const location = useLocation();
  const token = localStorage.getItem('token');
  const userRaw = localStorage.getItem('user');

  if (!token || !userRaw) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  let user;
  try {
    user = JSON.parse(userRaw);
  } catch {
    return <Navigate to="/login" replace />;
  }

  if (allowedRoles && !allowedRoles.includes(user.role)) {
    if (user.role === 1) return <Navigate to="/admin" replace />;
    if (user.role === 2) return <Navigate to="/petugas" replace />;
    if (user.role === 3) return <Navigate to="/peminjam" replace />;
    return <Navigate to="/" replace />;
  }

  return children;
}

function PublicLayout({ children }) {
  return (
    <>
      <Navbar />
      {children}
    </>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* ==================== PUBLIC ==================== */}
        <Route path="/" element={<PublicLayout><Landing /></PublicLayout>} />
        <Route path="/kontak" element={<PublicLayout><Kontak /></PublicLayout>} />
        <Route path="/about" element={<PublicLayout><About /></PublicLayout>} />
        <Route path="/cara-sewa" element={<PublicLayout><CaraSewa /></PublicLayout>} />

        {/* ==================== AUTH ==================== */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* ==================== KATALOG ==================== */}
        <Route
          path="/katalog"
          element={
            <RequireAuth allowedRoles={[3]}>
              <PublicLayout>
                <Katalog />
              </PublicLayout>
            </RequireAuth>
          }
        />

        {/* ==================== DASHBOARD PEMINJAM (Role 3) ==================== */}
        <Route
          path="/peminjam"
          element={
            <RequireAuth allowedRoles={[3]}>
              <PeminjamLayout />
            </RequireAuth>
          }
        >
          <Route index element={<PeminjamDashboard />} />
          <Route path="peminjaman" element={<PeminjamPeminjaman />} />
          <Route path="pengembalian" element={<PeminjamPengembalian />} />
          <Route path="pengaturan" element={<PeminjamPengaturan />} />
          <Route path="sewa/:id_lightstick" element={<PeminjamFormSewa />} />
        </Route>

        {/* ==================== DASHBOARD PETUGAS (Role 2) ==================== */}
        {/* DIUBAH: Pakai PetugasLayout dan nested routes */}
        <Route
          path="/petugas"
          element={
            <RequireAuth allowedRoles={[2]}>
              <PetugasLayout />
            </RequireAuth>
          }
        >
          <Route index element={<PetugasDashboard />} />
          <Route path="peminjaman" element={<PetugasPeminjaman />} />
          <Route path="pengembalian" element={<PetugasPengembalian />} />
          <Route path="laporan" element={<PetugasLaporan />} />
        </Route>

        {/* ==================== ADMIN (Role 1) ==================== */}
        <Route
          path="/admin"
          element={
            <RequireAuth allowedRoles={[1]}>
              <AdminLayout />
            </RequireAuth>
          }
        >
          <Route index element={<AdminDashboard />} />
          <Route path="lightstick" element={<AdminLightstick />} />
          <Route path="kategori" element={<AdminKategori />} />
          <Route path="peminjaman" element={<AdminPeminjaman />} />
          <Route path="pengembalian" element={<AdminPengembalian />} />
          <Route path="pelanggan" element={<AdminPelanggan />} />
          <Route path="petugas" element={<AdminPetugas />} />
          <Route path="admin" element={<AdminAdmin />} />
          <Route path="log" element={<AdminLog />} />
          <Route path="pembayaran" element={<AdminPengaturanPembayaran />} />
        </Route>

        {/* ==================== 404 ==================== */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;