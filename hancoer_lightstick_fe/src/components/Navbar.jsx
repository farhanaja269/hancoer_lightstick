import { useState, useEffect } from 'react';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import Logo from './Logo';

export default function Navbar() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    if (savedUser) setUser(JSON.parse(savedUser));
  }, [location]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
    navigate('/');
  };

  const isActive = (path) => location.pathname === path;

  const navLink = (to, label) => (
    <Link
      to={to}
      className={`text-sm font-bold transition-colors px-3 py-2 rounded-xl ${
        isActive(to)
          ? 'bg-emerald-100 text-emerald-900'
          : 'text-emerald-700 hover:text-emerald-900 hover:bg-emerald-50'
      }`}
    >
      {label}
    </Link>
  );

  // Fungsi untuk menentukan URL Dashboard berdasarkan Role
  const getDashboardPath = (role) => {
    if (role === 1) return '/admin';
    if (role === 2) return '/petugas';
    return '/peminjam';
  };

  // Warna tombol dashboard menyesuaikan role (Versi Soft Pastel)
  const getDashboardColor = (role) => {
    if (role === 1) return 'bg-pink-100 text-pink-700 hover:bg-pink-200 shadow-pink-200/50'; // Admin
    if (role === 2) return 'bg-blue-100 text-blue-700 hover:bg-blue-200 shadow-blue-200/50'; // Petugas
    return 'bg-emerald-100 text-emerald-700 hover:bg-emerald-200 shadow-emerald-200/50'; // Peminjam
  };

  const getRoleLabel = (role) => {
    if (role === 1) return 'Admin';
    if (role === 2) return 'Petugas';
    return 'Peminjam';
  };

  return (
    <nav className="bg-white/80 backdrop-blur-md border-b border-emerald-100 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20 items-center">
          
          {/* Logo */}
          <Link to="/"><Logo /></Link>

          {/* Menu Tengah */}
          <div className="hidden md:flex items-center gap-1">
            {navLink('/kontak', 'Kontak')}
            {navLink('/about', 'About Me')}
            {navLink('/cara-sewa', 'Cara Sewa')}
            {navLink('/katalog', 'Katalog')}
          </div>

          {/* Kanan: Auth & Aksi User */}
          <div className="flex items-center gap-3">
            {user ? (
              <>
                {/* ==================== TOMBOL AKSI KHUSUS SEMUA ROLE ==================== */}
                <div className="hidden md:flex items-center gap-2 mr-2 border-r-2 border-emerald-100 pr-3">
                  
                  {/* Tombol Ke Beranda (Warna dasar hijau pastel) */}
                  <Link
                    to="/"
                    className="text-xs font-black text-emerald-600 bg-emerald-50 hover:bg-emerald-100 px-3 py-2 rounded-xl transition-colors flex items-center gap-1.5"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                    </svg>
                    Beranda
                  </Link>

                  {/* Tombol Ke Dashboard (Warna beda tiap role) */}
                  <Link
                    to={getDashboardPath(user.role)}
                    className={`text-xs font-black px-3 py-2 rounded-xl transition-colors shadow-sm flex items-center gap-1.5 ${getDashboardColor(user.role)}`}
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                    </svg>
                    Dashboard
                  </Link>
                </div>

                {/* Profil User */}
                <span className="text-sm font-medium text-emerald-700 hidden lg:block bg-emerald-100 px-4 py-2 rounded-full">
                  Halo, <span className="text-emerald-900 font-bold">{user.nama}</span>
                </span>
                
                {/* Logout */}
                <button
                  onClick={handleLogout}
                  className="text-sm font-bold text-rose-500 hover:text-white hover:bg-rose-500 px-4 py-2 rounded-xl transition-colors"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="text-sm font-bold text-emerald-700 hover:bg-emerald-50 px-4 py-2 rounded-xl transition-colors"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="text-sm font-bold text-white bg-emerald-500 hover:bg-emerald-600 px-5 py-2.5 rounded-xl shadow-lg shadow-emerald-500/30 transition-all active:scale-95"
                >
                  Register
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}