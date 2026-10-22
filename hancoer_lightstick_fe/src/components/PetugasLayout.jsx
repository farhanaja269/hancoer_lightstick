import { useState, useEffect } from 'react';
import { Link, Outlet, useNavigate, useLocation } from 'react-router-dom';
import Logo from './Logo';

export default function PetugasLayout() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      const parsed = JSON.parse(savedUser);
      if (parsed.role !== 2) { // Proteksi Role Petugas
        localStorage.clear();
        navigate('/login');
      } else {
        setUser(parsed);
      }
    } else {
      navigate('/login');
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.clear();
    navigate('/');
  };

  const menuItems = [
    { path: '/petugas', label: 'Dashboard', icon: 'M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6' },
    { path: '/petugas/peminjaman', label: 'Data Peminjaman', icon: 'M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01' },
    { path: '/petugas/pengembalian', label: 'Pengembalian', icon: 'M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15' },
    { path: '/petugas/laporan', label: 'Cetak Laporan', icon: 'M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z' },
  ];

  if (!user) return null;

  return (
    <div className="min-h-screen flex bg-blue-50/50 font-sans">
      
      {/* SIDEBAR */}
      <aside className="w-72 bg-white border-r-4 border-blue-100 flex flex-col fixed h-full z-20 shadow-[4px_0_24px_rgba(59,130,246,0.05)]">
        <div className="h-24 flex items-center px-8 border-b-4 border-blue-50">
          <Link to="/"><Logo size="sm" /></Link>
          <span className="ml-2 text-[10px] font-black bg-blue-100 text-blue-700 px-2 py-1 rounded-md uppercase tracking-wider">Petugas</span>
        </div>

        <nav className="flex-1 overflow-y-auto py-6 px-4 space-y-2">
          <p className="px-4 text-xs font-black text-blue-300 uppercase tracking-wider mb-3">Menu Petugas</p>
          {menuItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center gap-3 px-4 py-3.5 rounded-2xl font-bold text-sm transition-all ${
                  isActive
                    ? 'bg-blue-500 text-white shadow-lg shadow-blue-500/30 scale-[1.02]'
                    : 'text-slate-500 hover:bg-blue-50 hover:text-blue-600'
                }`}
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={item.icon} />
                </svg>
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="p-6 border-t-2 border-blue-50 space-y-3">
          <Link
            to="/"
            className="flex items-center justify-center gap-2 w-full py-3 rounded-2xl font-black text-sm text-blue-500 bg-blue-50 hover:bg-blue-100 transition-colors"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /></svg>
            Ke Beranda
          </Link>
          <button
            onClick={handleLogout}
            className="flex items-center justify-center gap-2 w-full py-3 rounded-2xl font-black text-sm text-rose-500 bg-rose-50 hover:bg-rose-100 transition-colors"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" /></svg>
            Keluar
          </button>
        </div>
      </aside>

      {/* KONTEN UTAMA */}
      <main className="flex-1 ml-72 flex flex-col">
        <header className="h-24 bg-white/80 backdrop-blur-md border-b-4 border-blue-50 flex items-center justify-between px-10 sticky top-0 z-10">
          <div>
            <h2 className="text-2xl font-black text-blue-950 tracking-tight">Halo, {user?.nama || 'Petugas'}! 👋</h2>
            <p className="text-sm text-blue-500 font-medium mt-1">Siap melayani hari ini?</p>
          </div>
          <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-sky-400 rounded-[1rem] flex items-center justify-center text-white font-black text-xl shadow-lg shadow-blue-300/50 rotate-3">
            {user?.nama?.charAt(0).toUpperCase() || 'P'}
          </div>
        </header>

        <div className="p-10 flex-1 max-w-7xl mx-auto w-full">
          {/* INI YANG BIKIN HALAMAN DI DALAMNYA MUNCUL */}
          <Outlet /> 
        </div>
      </main>
    </div>
  );
}