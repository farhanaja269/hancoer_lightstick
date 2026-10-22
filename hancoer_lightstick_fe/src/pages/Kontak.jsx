export default function Kontak() {
  return (
    <div className="min-h-screen bg-[#FDFBF7] font-sans relative overflow-hidden">
      
      {/* Dekorasi Background */}
      <div className="absolute top-20 -left-20 w-72 h-72 bg-emerald-100 rounded-full mix-blend-multiply filter blur-3xl opacity-60"></div>
      <div className="absolute bottom-20 -right-20 w-80 h-80 bg-pink-100 rounded-full mix-blend-multiply filter blur-3xl opacity-60"></div>

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 relative z-10">
        
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-block bg-emerald-100 text-emerald-700 font-black px-6 py-2 rounded-full text-sm tracking-wider uppercase rotate-[-2deg] border-2 border-emerald-200 shadow-sm mb-4">
            Hubungi Kami
          </div>
          <h1 className="text-5xl md:text-6xl font-black text-emerald-950 mb-4 tracking-tight">
            Ada <span className="text-emerald-500 relative inline-block">
              Pertanyaan?
              <svg className="absolute -bottom-2 left-0 w-full" viewBox="0 0 200 12" fill="none">
                <path d="M2 9C50 3 150 3 198 9" stroke="#fbbf24" strokeWidth="6" strokeLinecap="round"/>
              </svg>
            </span>
          </h1>
          <p className="text-emerald-600 text-lg font-medium">Tim kami siap bantu kamu kapan aja!</p>
        </div>

        {/* Grid Kontak */}
        <div className="grid md:grid-cols-2 gap-6">
          
          {/* WhatsApp Card */}
          <a href="https://wa.me/6281234567890" target="_blank" rel="noopener noreferrer" className="bg-white rounded-[2rem] p-8 shadow-sm border-4 border-emerald-50 flex items-center gap-6 hover:border-emerald-200 hover:-translate-y-1 transition-all group">
            <div className="w-16 h-16 bg-emerald-100 rounded-2xl flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
              <svg className="w-8 h-8 text-emerald-600" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
            </div>
            <div>
              <p className="text-xs font-black text-emerald-500 uppercase tracking-wider mb-1">WhatsApp</p>
              <p className="text-xl font-black text-emerald-950">0812-3456-7890</p>
              <p className="text-sm text-emerald-600 font-medium mt-1">Balas cepat (09.00 - 21.00)</p>
            </div>
          </a>

          {/* Email Card */}
          <a href="mailto:hello@hancoer.com" className="bg-white rounded-[2rem] p-8 shadow-sm border-4 border-emerald-50 flex items-center gap-6 hover:border-emerald-200 hover:-translate-y-1 transition-all group">
            <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
              <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
            </div>
            <div>
              <p className="text-xs font-black text-blue-500 uppercase tracking-wider mb-1">Email</p>
              <p className="text-xl font-black text-emerald-950">hello@hancoer.com</p>
              <p className="text-sm text-emerald-600 font-medium mt-1">Untuk kerja sama & pertanyaan</p>
            </div>
          </a>

          {/* Instagram Card */}
          <a href="https://instagram.com/hancoer" target="_blank" rel="noopener noreferrer" className="bg-white rounded-[2rem] p-8 shadow-sm border-4 border-emerald-50 flex items-center gap-6 hover:border-emerald-200 hover:-translate-y-1 transition-all group">
            <div className="w-16 h-16 bg-pink-100 rounded-2xl flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
              <svg className="w-8 h-8 text-pink-600" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>
            </div>
            <div>
              <p className="text-xs font-black text-pink-500 uppercase tracking-wider mb-1">Instagram</p>
              <p className="text-xl font-black text-emerald-950">@hancoer.lightstick</p>
              <p className="text-sm text-emerald-600 font-medium mt-1">Update promo & info terbaru</p>
            </div>
          </a>

          {/* Alamat Card */}
          <div className="bg-white rounded-[2rem] p-8 shadow-sm border-4 border-emerald-50 flex items-center gap-6">
            <div className="w-16 h-16 bg-amber-100 rounded-2xl flex items-center justify-center shrink-0">
              <svg className="w-8 h-8 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
            </div>
            <div>
              <p className="text-xs font-black text-amber-500 uppercase tracking-wider mb-1">Alamat Toko</p>
              <p className="text-lg font-black text-emerald-950 leading-tight">Jl. Konser Meriah No. 123,<br/>Jakarta Selatan</p>
              <p className="text-sm text-emerald-600 font-medium mt-1">Buka: Senin - Sabtu (10.00 - 20.00)</p>
            </div>
          </div>

        </div>

        {/* Tambahan: Info Bawah */}
        <div className="mt-12 text-center">
          <p className="text-sm font-bold text-emerald-600">
            Punya pertanyaan lain? Jangan ragu hubungi kami ya!
          </p>
        </div>
      </main>
    </div>
  );
}