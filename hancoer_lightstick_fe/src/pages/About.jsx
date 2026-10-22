export default function About() {
    return (
      <div className="min-h-screen bg-[#FDFBF7] font-sans relative overflow-hidden">
        
        {/* Dekorasi Background Bintang & Hati */}
        <div className="absolute top-20 left-10 text-pink-200 animate-pulse">
          <svg className="w-16 h-16" fill="currentColor" viewBox="0 0 24 24"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" /></svg>
        </div>
        <div className="absolute bottom-20 right-10 text-emerald-200 animate-bounce">
          <svg className="w-24 h-24" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" /></svg>
        </div>
  
        <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16 relative z-10">
          
          {/* Judul Lucu */}
          <div className="text-center mb-16">
            <div className="inline-block bg-yellow-100 text-yellow-700 font-black px-6 py-2 rounded-full text-sm tracking-wider uppercase rotate-[-3deg] border-2 border-yellow-200 shadow-sm mb-4">
              ✨ Kenalan Yuk ✨
            </div>
            <h1 className="text-5xl md:text-6xl font-black text-emerald-950 mb-4 tracking-tight">
              Terangi <span className="text-emerald-500 relative inline-block">
                Konsermu
                <svg className="absolute -bottom-2 left-0 w-full" viewBox="0 0 200 12" fill="none">
                  <path d="M2 9C50 3 150 3 198 9" stroke="#fbbf24" strokeWidth="6" strokeLinecap="round"/>
                </svg>
              </span> dengan Hancoer!
            </h1>
            <p className="text-emerald-600 text-lg font-medium">Penyedia lightstick tercute sedunia!</p>
          </div>
  
          <div className="grid md:grid-cols-12 gap-8 items-center">
            
            {/* KIRI: Kartu Profil (Warna Putih Bersih) */}
            <div className="md:col-span-5 relative">
              <div className="bg-white rounded-[3rem] p-10 text-center shadow-xl shadow-emerald-100 rotate-[-2deg] hover:rotate-0 transition-all duration-300 border-4 border-emerald-50">
                
                {/* Logo Hancoer */}
                <div className="w-32 h-32 mx-auto bg-white rounded-[2.5rem] flex items-center justify-center mb-6 shadow-lg shadow-emerald-200/50 relative rotate-6 border-2 border-emerald-50">
                  <div className="w-full h-full bg-gradient-to-br from-emerald-300 via-emerald-400 to-teal-400 rounded-[2.2rem] flex items-center justify-center">
                    <svg viewBox="0 0 24 24" fill="none" className="w-16 h-16 drop-shadow-md">
                      <path 
                        d="M5 4v16M19 4v16M5 12h14" 
                        stroke="white" 
                        strokeWidth="4" 
                        strokeLinecap="round" 
                        strokeLinejoin="round" 
                      />
                    </svg>
                  </div>
                  {/* Hiasan Bintang Kuning di pojok logo */}
                  <div className="absolute -top-3 -right-3 bg-yellow-400 text-white p-1 rounded-full rotate-12 shadow-sm">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" /></svg>
                  </div>
                </div>
  
                <h2 className="text-3xl font-black text-emerald-950 mb-2">Hancoer Team</h2>
                <p className="text-emerald-600 font-bold text-sm">"Sinar kita, Senyum kita"</p>
              </div>
            </div>
  
            {/* KANAN: Cerita & Fitur */}
            <div className="md:col-span-7 space-y-6">
              
              {/* Kotak Cerita */}
              <div className="bg-white rounded-[2.5rem] p-8 shadow-sm border-4 border-emerald-50 relative">
                <div className="absolute -top-4 -left-4 text-emerald-300">
                   <svg className="w-10 h-10" fill="currentColor" viewBox="0 0 24 24"><path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z"/></svg>
                </div>
                <h3 className="text-2xl font-black text-emerald-900 mb-4 ml-6">Cerita Kami</h3>
                <p className="text-emerald-700 leading-relaxed mb-4 font-medium">
                  <strong>Hancoer Lightstick</strong> lahir dari kecintaan kami pada dunia konser dan
                  komunitas penggemar. Kami tahu, tidak semua orang bisa membeli lightstick resmi
                  dengan harga tinggi — jadi kami hadir dengan solusi <em>sewa</em> yang murah,
                  mudah, dan menyenangkan!
                </p>
                <p className="text-emerald-700 leading-relaxed font-medium">
                  Visi kami sederhana: <span className="font-black text-emerald-900 bg-emerald-100 px-2 py-1 rounded-lg">semua orang bisa
                  bersinar di konser impiannya</span>, tanpa harus menguras kantong.
                </p>
              </div>
  
              {/* Grid Fitur Lucu */}
              <div className="grid grid-cols-2 gap-4">
                {[
                  { 
                    icon: (
                      <svg className="w-8 h-8 text-emerald-500" fill="currentColor" viewBox="0 0 24 24"><path d="M11.8 10.9c-2.27-.59-3-1.2-3-2.15 0-1.09 1.01-1.85 2.7-1.85 1.78 0 2.44.85 2.5 2.1h2.21c-.07-1.72-1.12-3.3-3.21-3.81V3h-3v2.16c-1.94.42-3.5 1.68-3.5 3.61 0 2.31 1.91 3.46 4.7 4.13 2.5.6 3 1.48 3 2.41 0 .69-.49 1.79-2.7 1.79-2.06 0-2.87-.92-2.98-2.1h-2.2c.12 2.19 1.76 3.42 3.68 3.83V21h3v-2.15c1.95-.37 3.5-1.5 3.5-3.55 0-2.84-2.43-3.81-4.7-4.4z" /></svg>
                    ), 
                    t: 'Harga Ramah', d: 'Mulai 25rb aja loh!', bg: 'bg-amber-50', border: 'border-amber-100'
                  },
                  { 
                    icon: (
                      <svg className="w-8 h-8 text-amber-500" fill="currentColor" viewBox="0 0 24 24"><path d="M13 2.05v9.95h8.95c-.5-4.75-4.2-8.46-8.95-8.95zm-2 19.9c4.75-.5 8.45-4.21 8.95-8.95H11v8.95zm-2-8.95V4.05c-4.75.5-8.45 4.2-8.95 8.95H9zm0 2H2.05c.5 4.75 4.2 8.45 8.95 8.95v-8.95z" /></svg>
                    ), 
                    t: 'Proses Cepat', d: 'Verifikasi 24 jam', bg: 'bg-sky-50', border: 'border-sky-100'
                  },
                  { 
                    icon: (
                      <svg className="w-8 h-8 text-blue-500" fill="currentColor" viewBox="0 0 24 24"><path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm0 10.99h7c-.53 4.12-3.28 7.79-7 8.94V12H5V6.3l7-3.11v8.8z"/></svg>
                    ), 
                    t: 'Super Aman', d: 'Jaminan fleksibel', bg: 'bg-indigo-50', border: 'border-indigo-100'
                  },
                  { 
                    icon: (
                      <svg className="w-8 h-8 text-pink-500" fill="currentColor" viewBox="0 0 24 24"><path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm3.5-9c.83 0 1.5-.67 1.5-1.5S16.33 8 15.5 8 14 8.67 14 9.5s.67 1.5 1.5 1.5zm-7 0c.83 0 1.5-.67 1.5-1.5S9.33 8 8.5 8 7 8.67 7 9.5 7.67 11 8.5 11zm3.5 6.5c2.33 0 4.31-1.46 5.11-3.5H6.89c.8 2.04 2.78 3.5 5.11 3.5z"/></svg>
                    ), 
                    t: 'Tim Ramah', d: 'Siap bantu kamu', bg: 'bg-rose-50', border: 'border-rose-100'
                  },
                ].map((f, i) => (
                  <div key={i} className={`${f.bg} border-2 ${f.border} p-5 rounded-3xl hover:scale-105 transition-transform`}>
                    <div className="mb-3">{f.icon}</div>
                    <p className="font-black text-emerald-950 text-base">{f.t}</p>
                    <p className="text-xs text-emerald-600 font-bold mt-1">{f.d}</p>
                  </div>
                ))}
              </div>
  
            </div>
          </div>
        </main>
      </div>
    );
  }