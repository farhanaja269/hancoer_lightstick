import { Link } from 'react-router-dom';

export default function Landing() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-pink-50 font-sans overflow-hidden relative">
      {/* Dekorasi blob latar */}
      <div className="absolute top-20 -left-20 w-72 h-72 bg-emerald-200/50 rounded-full blur-3xl"></div>
      <div className="absolute bottom-10 -right-20 w-96 h-96 bg-pink-200/40 rounded-full blur-3xl"></div>

      <main className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          
          {/* ================= KIRI: TEKS ================= */}
          <div className="text-center md:text-left z-10">
            <span className="inline-block bg-yellow-200 text-emerald-900 text-xs font-black px-4 py-2 rounded-full mb-6 rotate-[-2deg] border-2 border-yellow-300">
              ⚡ Sewa Lightstick Anti Ribet
            </span>

            <h1 className="text-5xl md:text-6xl font-black text-emerald-900 leading-tight tracking-tight mb-8">
              Terangi <span className="text-emerald-500">Konsermu</span> dengan{' '}
              <span className="relative inline-block">
                Hancoer
                <svg
                  className="absolute -bottom-2 left-0 w-full h-3 text-yellow-400"
                  viewBox="0 0 100 10"
                  preserveAspectRatio="none"
                >
                  <path
                    d="M0,5 Q50,10 100,5"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="4"
                    strokeLinecap="round"
                  />
                </svg>
              </span>
              <span className="text-pink-400">!</span>
            </h1>

            <p className="text-emerald-700 text-lg mb-8 leading-relaxed max-w-lg mx-auto md:mx-0">
              Sewa lightstick keren untuk konser favoritmu. Proses cepat, jaminan
              mudah, dan harga bersahabat untuk para penggemar sejati.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
              <Link
                to="/katalog"
                className="bg-emerald-500 text-white font-black px-8 py-4 rounded-2xl shadow-xl shadow-emerald-500/40 hover:bg-emerald-600 hover:-translate-y-0.5 transition-all active:scale-95 flex items-center justify-center gap-2"
              >
                Lihat Katalog
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </Link>
              
              <Link
                to="/cara-sewa"
                className="bg-white text-emerald-700 font-black px-8 py-4 rounded-2xl border-4 border-emerald-100 hover:border-emerald-200 transition-all active:scale-95 flex items-center justify-center"
              >
                Cara Sewa
              </Link>
            </div>

            {/* Stats */}
            <div className="flex gap-8 mt-12 justify-center md:justify-start border-t-2 border-emerald-100 pt-6">
              {[
                { num: '50+', label: 'Lightstick' },
                { num: '1K+', label: 'Penyewa' },
                { num: '4.9', label: 'Rating' },
              ].map((s) => (
                <div key={s.label}>
                  <p className="text-3xl font-black text-emerald-900 flex items-center gap-1">
                    {s.num}
                    {s.label === 'Rating' && (
                      <svg className="w-5 h-5 text-yellow-400 fill-current" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    )}
                  </p>
                  <p className="text-xs font-bold text-emerald-500 uppercase tracking-wider mt-1">{s.label}</p>
                </div>
              ))}
            </div>
          </div>

          {/* ================= KANAN: ILUSTRASI LOGO HANCOER (BISA GERAK) ================= */}
          <div className="relative flex justify-center mt-10 md:mt-0">
            <div className="relative w-80 h-80 md:w-96 md:h-96 bg-gradient-to-br from-emerald-300 via-emerald-400 to-teal-400 rounded-[3rem] rotate-6 shadow-2xl shadow-emerald-400/50 flex items-center justify-center p-8">
              
              <div className="rotate-[-6deg] text-center w-full h-full flex flex-col items-center justify-center">
                
                {/* Logonya dibungkus tombol/div interaktif supaya bisa digerakkan */}
                <button 
                  className="w-40 h-40 bg-white/90 rounded-[2.5rem] flex items-center justify-center mb-6 shadow-xl border-4 border-white
                             transition-all duration-300 ease-out cursor-pointer group
                             hover:rotate-[15deg] hover:scale-110 hover:shadow-emerald-200/50 
                             active:scale-90 active:rotate-[-15deg]"
                >
                  {/* SVG Huruf H Persis Seperti Header */}
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    className="w-24 h-24 drop-shadow-md group-hover:scale-105 transition-transform"
                  >
                    <defs>
                      <linearGradient id="gradientH" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#6ee7b7" /> {/* emerald-300 */}
                        <stop offset="50%" stopColor="#34d399" /> {/* emerald-400 */}
                        <stop offset="100%" stopColor="#2dd4bf" /> {/* teal-400 */}
                      </linearGradient>
                    </defs>
                    <path
                      d="M5 4v16M19 4v16M5 12h14"
                      stroke="url(#gradientH)"
                      strokeWidth="4.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>

                  {/* Bintang kecil muncul saat di-hover */}
                  <svg className="absolute -top-2 -right-2 w-8 h-8 text-yellow-400 opacity-0 group-hover:opacity-100 group-hover:animate-bounce transition-opacity" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                </button>

                <p className="text-white font-black text-3xl drop-shadow-lg">Hancoer</p>
                <p className="text-emerald-50 font-bold text-sm tracking-widest mt-1">Terangi Konsermu!</p>
              </div>

              {/* Bintang Dekorasi (SVG) */}
              <svg className="absolute -top-6 -right-6 w-12 h-12 text-yellow-300 animate-bounce" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
              
              {/* Hati Dekorasi (SVG) */}
              <svg className="absolute -bottom-6 -left-6 w-10 h-10 text-pink-500 animate-pulse" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
              </svg>

            </div>
          </div>

        </div>
      </main>
    </div>
  );
}