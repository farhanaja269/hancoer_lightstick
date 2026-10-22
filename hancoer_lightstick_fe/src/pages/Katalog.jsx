import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function Katalog() {
  const [lightsticks, setLightsticks] = useState([]);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  // ==================== GUARD & FETCH ====================
  useEffect(() => {
    const token = localStorage.getItem('token');
    const savedUser = localStorage.getItem('user');

    if (!token || !savedUser) {
      navigate('/login');
      return;
    }

    const parsedUser = JSON.parse(savedUser);

    if (parsedUser.role === 1) {
      navigate('/admin');
      return;
    }
    if (parsedUser.role === 2) {
      navigate('/petugas');
      return;
    }

    setUser(parsedUser);
    fetchLightsticks();
  }, [navigate]);

  const fetchLightsticks = async () => {
    setLoading(true);
    try {
      const response = await axios.get('http://localhost:3001/api/lightstick');
      setLightsticks(response.data.data);
    } catch (error) {
      console.error('Gagal ambil data', error);
      setLightsticks([]);
    } finally {
      setLoading(false);
    }
  };

  // ==================== RENDER ====================
  return (
    <div className="min-h-screen bg-emerald-50 font-sans">
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="mb-10 text-center md:text-left">
          <span className="inline-flex items-center gap-2 bg-emerald-200 text-emerald-900 text-xs font-black px-4 py-2 rounded-full mb-4">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
            </svg>
            Halaman Sewa
          </span>
          <h1 className="text-4xl font-black text-emerald-900 mb-3 tracking-tight flex items-center gap-3 justify-center md:justify-start">
            Katalog Lightstick
            <svg className="w-8 h-8 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
          </h1>
          <p className="text-emerald-600 text-lg">
            Halo{' '}
            <span className="font-black text-emerald-900">{user?.nama || 'User'}</span>, temukan
            dan sewa lightstick favoritmu untuk konser selanjutnya!
          </p>
        </div>

        {/* Konten */}
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {[...Array(8)].map((_, i) => (
              <div
                key={i}
                className="bg-white/60 rounded-[2rem] h-96 animate-pulse border-4 border-white"
              ></div>
            ))}
          </div>
        ) : lightsticks.length === 0 ? (
          <div className="bg-white border-2 border-dashed border-emerald-200 p-16 rounded-3xl shadow-sm text-center">
            <div className="flex justify-center mb-4">
              <svg className="w-20 h-20 text-emerald-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
              </svg>
            </div>
            <p className="text-emerald-500 text-lg font-medium">
              Belum ada data lightstick yang tersedia.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {lightsticks.map((item, index) => {
              const colors = ['bg-amber-100', 'bg-rose-100', 'bg-sky-100', 'bg-purple-100'];
              const bgColor = colors[index % colors.length];
              const isAvailable = item.stok > 0;

              return (
                <div
                  key={item.id_lightstick}
                  className={`${bgColor} rounded-[2rem] border-4 border-white shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-300 flex flex-col overflow-hidden`}
                >
                  {/* Foto */}
                  <div className="h-48 relative flex items-center justify-center overflow-hidden m-4 rounded-2xl bg-white/50">
                    {item.foto && item.foto !== 'https://via.placeholder.com/150' ? (
                      <img
                        src={item.foto}
                        alt={item.nama_lightstick}
                        className="w-full h-full object-cover rounded-2xl"
                      />
                    ) : (
                      <svg className="w-16 h-16 text-emerald-600/30" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                    )}
                    <div className="absolute top-2 right-2 bg-white px-3 py-1 rounded-full text-xs font-black text-emerald-900 shadow-sm">
                      {item.nama_kategori || 'Umum'}
                    </div>
                  </div>

                  {/* Info */}
                  <div className="px-6 pb-6 flex flex-col flex-grow">
                    <h2 className="text-xl font-black text-emerald-950 leading-tight mb-2 line-clamp-2">
                      {item.nama_lightstick}
                    </h2>

                    <div className="flex items-center gap-2 mb-4 text-sm font-bold text-emerald-700/70">
                      <span className="flex items-center gap-1">
                        {/* Icon Palet Warna */}
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
                        </svg>
                        {item.warna || '-'}
                      </span>
                      <span className="w-1.5 h-1.5 bg-emerald-300 rounded-full"></span>
                      <span className="flex items-center gap-1">
                        {/* Icon Centang Official */}
                        <svg className="w-4 h-4 text-emerald-500" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                        Official
                      </span>
                    </div>

                    <div className="mt-auto bg-white/60 p-4 rounded-2xl flex items-end justify-between">
                      <div>
                        <p className="text-[10px] font-black text-emerald-500 mb-1 uppercase tracking-wider">
                          Sewa / hari
                        </p>
                        <p className="text-xl font-black text-emerald-900">
                          Rp {Number(item.harga_sewa).toLocaleString('id-ID')}
                        </p>
                      </div>

                      <div className="text-right">
                        <p className="text-[10px] font-black text-emerald-500 mb-1 uppercase tracking-wider">
                          Stok
                        </p>
                        <p
                          className={`text-sm font-black px-2 py-1 rounded-lg ${
                            isAvailable
                              ? 'bg-emerald-200 text-emerald-800'
                              : 'bg-rose-200 text-rose-800'
                          }`}
                        >
                          {item.stok || 0}
                        </p>
                      </div>
                    </div>

                    <button
                      onClick={() => navigate(`/peminjam/sewa/${item.id_lightstick}`)}
                      disabled={!isAvailable}
                      className={`mt-4 w-full py-3 rounded-2xl font-black text-sm transition-all duration-200 flex items-center justify-center gap-2 ${
                        isAvailable
                          ? 'bg-emerald-500 text-white hover:bg-emerald-600 shadow-lg shadow-emerald-500/30 active:scale-95'
                          : 'bg-slate-200 text-slate-400 cursor-not-allowed'
                      }`}
                    >
                      {isAvailable ? (
                        <>
                          Sewa Sekarang
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                          </svg>
                        </>
                      ) : (
                        'Stok Habis'
                      )}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </main>
    </div>
  );
}