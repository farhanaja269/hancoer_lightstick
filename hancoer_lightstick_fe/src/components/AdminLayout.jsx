import { Link, Outlet, useNavigate, useLocation } from 'react-router-dom';
import { useEffect } from 'react';

export default function AdminLayout() {
  const navigate = useNavigate();
  const location = useLocation();
  
  // Ambil user dengan aman
  let user = null;
  try {
    const saved = localStorage.getItem('user');
    if (saved) user = JSON.parse(saved);
  } catch (e) {
    console.error("Gagal parse user", e);
  }

  // PROTEKSI ROLE
  useEffect(() => {
    if (!user || user.role !== 1) {
      localStorage.clear();
      alert("Akses Ditolak! Anda bukan Admin.");
      navigate('/');
    }
  }, [user, navigate]);

  // Jika user belum ada (sedang loading/redirect), jangan render apa-apa dulu
  if (!user) return null;

  const handleLogout = () => {
    localStorage.clear();
    navigate('/');
  };

  const menuItems = [
    { path: '/admin', name: 'Dashboard', color: 'bg-pink-100 text-pink-600', icon: <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path d="M2 10a8 8 0 018-8v8h8a8 8 0 11-16 0z"/><path d="M12 2.252A8.014 8.014 0 0117.748 8H12V2.252z"/></svg> },
    { path: '/admin/lightstick', name: 'Data Lightstick', color: 'bg-amber-100 text-amber-600', icon: <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" clipRule="evenodd"/></svg> },
    { path: '/admin/kategori', name: 'Kategori', color: 'bg-emerald-100 text-emerald-600', icon: <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M17.707 9.293a1 1 0 010 1.414l-7 7a1 1 0 01-1.414 0l-7-7A.997.997 0 012 10V5a3 3 0 013-3h5c.256 0 .512.098.707.293l7 7zM5 6a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd"/></svg> },
    { path: '/admin/peminjaman', name: 'Peminjaman', color: 'bg-blue-100 text-blue-600', icon: <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 2a4 4 0 00-4 4v1H5a1 1 0 00-.994.89l-1 9A1 1 0 004 18h12a1 1 0 00.994-1.11l-1-9A1 1 0 0015 7h-1V6a4 4 0 00-4-4zm2 5V6a2 2 0 10-4 0v1h4zm-6 3a1 1 0 112 0 1 1 0 01-2 0zm7-1a1 1 0 100 2 1 1 0 000-2z" clipRule="evenodd"/></svg> },
    { path: '/admin/pengembalian', name: 'Pengembalian', color: 'bg-purple-100 text-purple-600', icon: <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z" clipRule="evenodd"/></svg> },
    { path: '/admin/pelanggan', name: 'Data Pelanggan', color: 'bg-rose-100 text-rose-600', icon: <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z"/></svg> },
    { path: '/admin/petugas', name: 'Data Petugas', color: 'bg-cyan-100 text-cyan-600', icon: <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-6-3a2 2 0 11-4 0 2 2 0 014 0zm-2 4a5 5 0 00-4.546 2.916A5.986 5.986 0 0010 16a5.986 5.986 0 004.546-2.084A5 5 0 0010 11z" clipRule="evenodd"/></svg> },
    { path: '/admin/admin', name: 'Data Admin', color: 'bg-indigo-100 text-indigo-600', icon: <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd"/></svg> },
    { path: '/admin/pembayaran', name: 'Metode Pembayaran', color: 'bg-teal-100 text-teal-600', icon: <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path d="M4 4a2 2 0 00-2 2v1h16V6a2 2 0 00-2-2H4z" /><path fillRule="evenodd" d="M18 9H2v5a2 2 0 002 2h12a2 2 0 002-2V9zM4 13a1 1 0 011-1h1a1 1 0 110 2H5a1 1 0 01-1-1zm5-1a1 1 0 100 2h1a1 1 0 100-2H9z" clipRule="evenodd" /></svg> },
    { path: '/admin/log', name: 'Log Aktivitas', color: 'bg-slate-100 text-slate-600', icon: <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z" clipRule="evenodd"/></svg> },
  ];

  return (
    <div className="min-h-screen bg-[#FDFBF7] flex font-sans relative overflow-hidden">
      
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
        <div className="absolute -top-20 -left-20 w-96 h-96 bg-pink-100 rounded-full mix-blend-multiply filter blur-3xl opacity-60"></div>
        <div className="absolute top-1/2 -right-20 w-80 h-80 bg-amber-100 rounded-full mix-blend-multiply filter blur-3xl opacity-60"></div>
        <div className="absolute -bottom-20 left-1/3 w-96 h-96 bg-blue-100 rounded-full mix-blend-multiply filter blur-3xl opacity-60"></div>
      </div>

      <aside className="w-72 bg-white/90 backdrop-blur-xl border-r-4 border-pink-100 flex flex-col fixed h-full z-20 shadow-[4px_0_24px_rgba(0,0,0,0.03)]">
        <div className="h-24 flex items-center px-8 border-b-4 border-pink-50">
          <div className="w-12 h-12 bg-gradient-to-br from-pink-400 to-rose-300 rounded-[1.5rem] flex items-center justify-center mr-3 shadow-lg shadow-pink-300/50 -rotate-6">
            <span className="text-white font-black text-2xl">H</span>
          </div>
          <div>
            <span className="text-2xl font-black text-slate-800 tracking-tighter block leading-none">Hancoer<span className="text-pink-500">.</span></span>
            <span className="text-[10px] font-black text-pink-400 tracking-widest uppercase mt-1 block">Admin Panel</span>
          </div>
        </div>

        <nav className="flex-1 overflow-y-auto py-6 px-4 space-y-2">
          <p className="px-4 text-xs font-black text-slate-400 uppercase tracking-wider mb-3">Menu Utama</p>
          {menuItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <Link 
                key={item.path} 
                to={item.path}
                className={`flex items-center gap-4 px-4 py-3 rounded-2xl transition-all duration-300 font-bold text-sm ${
                  isActive 
                    ? 'bg-pink-100 text-pink-700 shadow-sm translate-x-1' 
                    : 'text-slate-500 hover:bg-slate-50'
                }`}
              >
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${item.color} shadow-sm`}>
                  {item.icon}
                </div>
                {item.name}
              </Link>
            );
          })}
        </nav>

        <div className="p-6 border-t-2 border-slate-50 space-y-3">
          {/* Tombol Ke Beranda */}
          <Link 
            to="/"
            className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-blue-50 text-blue-500 rounded-2xl hover:bg-blue-500 hover:text-white transition-all font-black text-sm"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"></path>
            </svg>
            Ke Beranda
          </Link>

          {/* Tombol Logout */}
          <button 
            onClick={handleLogout}
            className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-rose-50 text-rose-500 rounded-2xl hover:bg-rose-500 hover:text-white transition-all font-black text-sm"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"></path></svg>
            Keluar Sistem
          </button>
        </div>
      </aside>

      <main className="ml-72 flex-1 flex flex-col min-h-screen relative z-10">
        <header className="h-24 bg-white/80 backdrop-blur-md border-b-4 border-pink-50 flex items-center justify-between px-10 sticky top-0 z-10">
          <div>
            <h2 className="text-2xl font-black text-slate-800 tracking-tight">Halo, {user?.nama?.split(' ')[0] || 'Admin'}! 👋</h2>
            <p className="text-sm font-medium text-pink-500 mt-1">Semoga harimu manis dan menyenangkan.</p>
          </div>
          <div className="flex items-center gap-4">
            
            {/* Tombol Ke Beranda (Versi Header Kanan) */}
            <Link 
              to="/"
              className="hidden md:flex items-center gap-2 text-sm font-bold text-blue-500 bg-blue-50 px-4 py-2 rounded-xl hover:bg-blue-100 transition-colors"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"></path>
              </svg>
              Beranda
            </Link>

            <div className="text-right hidden lg:block border-l-2 border-slate-100 pl-4">
              <p className="text-sm font-black text-slate-900">{user?.nama || 'Admin'}</p>
              <p className="text-[10px] font-black text-white bg-pink-400 px-3 py-1 rounded-full inline-block mt-1">Super Admin</p>
            </div>
            <div className="w-12 h-12 bg-gradient-to-br from-pink-400 to-rose-300 rounded-[1rem] flex items-center justify-center text-white font-black text-xl shadow-lg shadow-pink-300/50 rotate-3">
              {user?.nama?.charAt(0).toUpperCase() || 'A'}
            </div>
          </div>
        </header>

        <div className="p-10 flex-1 max-w-7xl mx-auto w-full">
          <Outlet />
        </div>
      </main>
    </div>
  );
}