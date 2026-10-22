import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Logo from '../components/Logo';

export default function Register() {
  const [form, setForm] = useState({
    nama: '',
    email: '',
    password: '',
    konfirmasi: '',
    alamat: '',
    no_telp: '',
  });
  const [loading, setLoading] = useState(false);
  
  // State untuk show/hide password
  const [showPassword, setShowPassword] = useState(false);
  const [showKonfirmasi, setShowKonfirmasi] = useState(false);

  const navigate = useNavigate();

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (form.password !== form.konfirmasi) {
      return alert('Password dan konfirmasi tidak cocok!');
    }
    if (form.password.length < 6) {
      return alert('Password minimal 6 karakter');
    }

    setLoading(true);
    try {
      await axios.post('http://localhost:3001/api/register', {
        nama: form.nama,
        email: form.email,
        password: form.password,
        alamat: form.alamat,
        no_telp: form.no_telp,
        role: 3, // default peminjam
      });
      alert('Registrasi berhasil! Silakan login.');
      navigate('/login');
    } catch (error) {
      alert(error.response?.data?.message || 'Gagal registrasi');
    } finally {
      setLoading(false);
    }
  };

  return (
    // Container Full Screen
    <div className="min-h-screen flex bg-[#f8fafc] font-sans">
      
      {/* ================= KIRI: PANEL SOFT GRADIENT ================= */}
      {/* Disembunyikan di HP (hidden), muncul di layar besar (lg:flex) */}
      <div className="hidden lg:flex lg:w-5/12 bg-gradient-to-br from-[#e0f2fe] via-[#dcfce7] to-[#fce7f3] relative overflow-hidden flex-col justify-between p-12 lg:p-16">
        
        {/* Dekorasi bulat soft */}
        <div className="absolute top-[-10%] left-[-10%] w-96 h-96 bg-white/40 rounded-full blur-3xl"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-80 h-80 bg-teal-200/40 rounded-full blur-3xl"></div>

        {/* Logo */}
        <div className="relative z-10">
          <Link to="/">
            <div className="inline-block bg-white/60 p-4 rounded-[2rem] shadow-sm backdrop-blur-md border border-white/50">
              <Logo size="md" />
            </div>
          </Link>
        </div>

        {/* Quote Utama */}
        <div className="relative z-10 my-auto">
          <h2 className="text-4xl lg:text-5xl font-black text-emerald-950 leading-[1.15] mb-6">
            Terangi <br />
            <span className="text-emerald-500">Konsermu</span> <br />
            Bersama Hancoer!
          </h2>
          <p className="text-emerald-800/70 text-base lg:text-lg font-medium leading-relaxed max-w-sm">
            Bergabunglah dengan ribuan penggemar lainnya. Dapatkan akses mudah untuk menyewa lightstick resmi tanpa harus menguras kantong.
          </p>
        </div>

        {/* Testimoni Kecil */}
        <div className="relative z-10 bg-white/50 backdrop-blur-md p-5 rounded-3xl border border-white/60 shadow-sm flex items-start gap-4 max-w-sm">
          <div className="w-10 h-10 bg-yellow-100 rounded-full flex items-center justify-center shrink-0">
            <svg className="w-5 h-5 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
          </div>
          <div>
            <p className="text-emerald-900 text-sm font-bold leading-snug">
              "Prosesnya cepat banget, lightsticknya juga mulus. Recommended!"
            </p>
            <p className="text-emerald-700/60 text-xs font-bold mt-1">— Budi, Penyewa</p>
          </div>
        </div>
      </div>

      {/* ================= KANAN: FORM REGISTER ================= */}
      <div className="w-full lg:w-7/12 flex items-center justify-center p-6 sm:p-12 relative">
        
        {/* Logo versi Mobile (hanya muncul kalau layar kecil) */}
        <div className="absolute top-8 left-6 lg:hidden">
          <Link to="/"><Logo size="sm" /></Link>
        </div>

        <div className="w-full max-w-md">
          
          <div className="text-center md:text-left mb-8 mt-12 lg:mt-0">
            <h1 className="text-3xl font-black text-emerald-950 mb-2">Daftar Akun</h1>
            <p className="text-emerald-600/80 font-medium text-sm">Lengkapi datamu untuk mulai menyewa.</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            
            {/* Nama Lengkap */}
            <div>
              <label className="block text-xs font-black text-emerald-800 uppercase tracking-wider mb-2 ml-1">Nama Lengkap</label>
              <Input name="nama" placeholder="Masukkan nama" value={form.nama} onChange={handleChange} />
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Email */}
              <div>
                <label className="block text-xs font-black text-emerald-800 uppercase tracking-wider mb-2 ml-1">Email</label>
                <Input type="email" name="email" placeholder="email@contoh.com" value={form.email} onChange={handleChange} />
              </div>
              {/* No Telp */}
              <div>
                <label className="block text-xs font-black text-emerald-800 uppercase tracking-wider mb-2 ml-1">No. WhatsApp</label>
                <Input name="no_telp" placeholder="0812..." value={form.no_telp} onChange={handleChange} />
              </div>
            </div>

            {/* Alamat */}
            <div>
              <label className="block text-xs font-black text-emerald-800 uppercase tracking-wider mb-2 ml-1">Alamat Lengkap</label>
              <Input name="alamat" placeholder="Jalan, RT/RW, Kota" value={form.alamat} onChange={handleChange} />
            </div>

            {/* Password dengan Toggle Mata */}
            <div>
              <label className="block text-xs font-black text-emerald-800 uppercase tracking-wider mb-2 ml-1">Password</label>
              <div className="relative">
                <Input 
                  type={showPassword ? 'text' : 'password'} 
                  name="password" 
                  placeholder="Minimal 6 karakter" 
                  value={form.password} 
                  onChange={handleChange} 
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-emerald-400 hover:text-emerald-600 transition-colors"
                >
                  {showPassword ? <EyeIcon /> : <EyeOffIcon />}
                </button>
              </div>
            </div>

            {/* Konfirmasi Password dengan Toggle Mata */}
            <div>
              <label className="block text-xs font-black text-emerald-800 uppercase tracking-wider mb-2 ml-1">Konfirmasi Password</label>
              <div className="relative">
                <Input 
                  type={showKonfirmasi ? 'text' : 'password'} 
                  name="konfirmasi" 
                  placeholder="Ulangi password" 
                  value={form.konfirmasi} 
                  onChange={handleChange} 
                />
                <button
                  type="button"
                  onClick={() => setShowKonfirmasi(!showKonfirmasi)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-emerald-400 hover:text-emerald-600 transition-colors"
                >
                  {showKonfirmasi ? <EyeIcon /> : <EyeOffIcon />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-4 rounded-2xl font-black text-sm bg-emerald-500 text-white hover:bg-emerald-600 shadow-xl shadow-emerald-500/30 transition-all active:scale-95 disabled:opacity-50 mt-6 flex justify-center items-center gap-2"
            >
              {loading ? 'Memproses...' : (
                <>
                  Daftar Sekarang
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </>
              )}
            </button>
          </form>

          <p className="text-center text-sm text-emerald-700/80 font-medium mt-8">
            Sudah punya akun?{' '}
            <Link to="/login" className="font-black text-emerald-600 hover:text-emerald-800 transition-colors">
              Login di sini
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

// ================= KOMPONEN INPUT SOFT =================
function Input({ type = 'text', ...props }) {
  return (
    <input
      type={type}
      {...props}
      className="w-full px-5 py-3.5 rounded-2xl border-2 border-emerald-100 focus:border-emerald-400 focus:ring-4 focus:ring-emerald-100 focus:outline-none bg-white text-emerald-950 font-bold placeholder:text-emerald-300 placeholder:font-medium transition-all"
    />
  );
}

// ================= IKON SVG =================
function EyeIcon() {
  return (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
    </svg>
  );
}

function EyeOffIcon() {
  return (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
    </svg>
  );
}