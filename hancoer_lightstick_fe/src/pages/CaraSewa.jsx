import { Link } from 'react-router-dom';

export default function CaraSewa() {
  // Langkah-langkah diganti menggunakan SVG
  const steps = [
    {
      n: 1,
      title: 'Daftar Akun',
      desc: 'Buat akun gratis dengan email & password.',
      icon: (
        <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
        </svg>
      ),
    },
    {
      n: 2,
      title: 'Pilih Lightstick',
      desc: 'Telusuri katalog, pilih yang kamu suka.',
      icon: (
        <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
      ),
    },
    {
      n: 3,
      title: 'Ajukan Sewa',
      desc: 'Isi jaminan & tanggal sewa, lalu submit.',
      icon: (
        <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
        </svg>
      ),
    },
    {
      n: 4,
      title: 'Verifikasi Admin',
      desc: 'Tunggu admin verifikasi peminjamanmu.',
      icon: (
        <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
    },
    {
      n: 5,
      title: 'Ambil & Konser',
      desc: 'Ambil lightstick, nyalakan di konser!',
      icon: (
        <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
        </svg>
      ),
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-emerald-50 to-pink-50 font-sans">
      <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex justify-center mb-4">
            <svg className="w-16 h-16 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
            </svg>
          </div>
          <h1 className="text-5xl font-black text-emerald-900 mb-3 tracking-tight">
            Cara Sewa
          </h1>
          <p className="text-emerald-600 text-lg">Cuma 5 langkah, gampang banget!</p>
        </div>

        {/* Steps */}
        <div className="space-y-4 mb-12">
          {steps.map((s, i) => (
            <div
              key={s.n}
              className={`flex items-center gap-6 bg-white rounded-[2rem] p-6 shadow-sm border-4 border-emerald-100 hover:border-emerald-200 transition-colors ${
                i % 2 === 1 ? 'md:ml-16' : ''
              }`}
            >
              <div className="w-16 h-16 shrink-0 bg-gradient-to-br from-emerald-300 to-teal-400 rounded-2xl flex items-center justify-center shadow-lg rotate-[-4deg]">
                {s.icon}
              </div>
              <div>
                <p className="text-xs font-black text-emerald-500 uppercase tracking-wider mb-1">
                  Langkah {s.n}
                </p>
                <h3 className="text-xl font-black text-emerald-900">{s.title}</h3>
                <p className="text-emerald-600 text-sm">{s.desc}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Syarat & Ketentuan (Hanya KK/KTP) */}
        <div className="bg-yellow-100 rounded-[2rem] p-8 border-4 border-yellow-200 mb-10 shadow-sm">
          <div className="flex items-center gap-3 mb-4">
            <svg className="w-6 h-6 text-yellow-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <h3 className="text-xl font-black text-yellow-900">Syarat & Ketentuan</h3>
          </div>
          <ul className="text-yellow-800 space-y-2 text-sm font-bold ml-2">
            <li className="flex items-start gap-2">
              <span className="text-yellow-600">•</span> 
              Jaminan wajib berupa <strong>KTP / KK</strong> (asli).
            </li>
            <li className="flex items-start gap-2">
              <span className="text-yellow-600">•</span> 
              Durasi sewa default 3 hari (bisa diperpanjang).
            </li>
            <li className="flex items-start gap-2">
              <span className="text-yellow-600">•</span> 
              Denda keterlambatan Rp 10.000/hari.
            </li>
            <li className="flex items-start gap-2">
              <span className="text-yellow-600">•</span> 
              Wajib mengembalikan dalam kondisi baik.
            </li>
          </ul>
        </div>

        {/* CTA Button */}
        <div className="text-center">
          <Link
            to="/katalog"
            className="inline-flex items-center gap-2 bg-emerald-500 text-white font-black px-10 py-4 rounded-2xl shadow-xl shadow-emerald-500/40 hover:bg-emerald-600 hover:-translate-y-0.5 transition-all active:scale-95"
          >
            Mulai Sewa Sekarang
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
          </Link>
        </div>
      </main>
    </div>
  );
}