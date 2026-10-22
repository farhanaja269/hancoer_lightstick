import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [message, setMessage] = useState('');
  
  // ================= STATE CAPTCHA =================
  const [captcha, setCaptcha] = useState({ num1: 0, num2: 0, operator: '+' });
  const [captchaInput, setCaptchaInput] = useState('');
  // =================================================

  const navigate = useNavigate();

  // Fungsi buat generate soal matematika acak
  const generateCaptcha = () => {
    const num1 = Math.floor(Math.random() * 10) + 1; // Angka 1-10
    const num2 = Math.floor(Math.random() * 10) + 1; // Angka 1-10
    const operators = ['+', '-'];
    const operator = operators[Math.floor(Math.random() * operators.length)];
    
    setCaptcha({ num1, num2, operator });
    setCaptchaInput(''); // Reset inputan user
  };

  // Panggil generateCaptcha saat halaman pertama kali dibuka
  useEffect(() => {
    generateCaptcha();
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    setMessage('');

    // Validasi Captcha
    const jawabanBenar = captcha.operator === '+' 
      ? captcha.num1 + captcha.num2 
      : captcha.num1 - captcha.num2;

    if (parseInt(captchaInput) !== jawabanBenar) {
      setMessage('Jawaban keamanan (Captcha) salah! Silakan coba lagi.');
      generateCaptcha(); // Ganti soal baru kalau salah
      return;
    }

    try {
      const response = await axios.post('http://localhost:3001/api/auth/login', { email, password });
      
      if (response.data.success) {
        const userData = response.data.user;
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('user', JSON.stringify(userData));

        // LOGIKA PENGECEKAN ROLE
        if (userData.role === 1) {
          navigate('/admin'); // Admin
        } else if (userData.role === 2) {
          navigate('/petugas'); // Petugas
        } else {
          navigate('/peminjam'); // Peminjam (Role 3)
        }
      }
    } catch (error) {
      setMessage(error.response?.data?.message || 'Email atau Password salah');
      generateCaptcha(); // Ganti captcha kalau gagal login
    }
  };

  return (
    <div className="min-h-screen flex font-sans bg-emerald-50 relative overflow-hidden">
      {/* Efek Background */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute -top-20 -left-20 w-72 h-72 bg-amber-200 rounded-full mix-blend-multiply filter blur-2xl opacity-70 animate-blob"></div>
        <div className="absolute top-0 -right-20 w-72 h-72 bg-rose-200 rounded-full mix-blend-multiply filter blur-2xl opacity-70 animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-8 left-20 w-72 h-72 bg-emerald-200 rounded-full mix-blend-multiply filter blur-2xl opacity-70 animate-blob animation-delay-4000"></div>
      </div>

      <div className="w-full flex items-center justify-center p-4 relative z-10">
        <div className="bg-white/90 backdrop-blur-xl p-8 sm:p-12 rounded-[2.5rem] shadow-2xl shadow-emerald-200/50 border-4 border-white w-full max-w-md">
          
          {/* Header Logo & Judul */}
          <div className="text-center mb-10">
            <div className="w-20 h-20 bg-gradient-to-br from-emerald-300 via-emerald-400 to-teal-400 rounded-[2rem] flex items-center justify-center mx-auto mb-6 shadow-xl shadow-emerald-400/40 rotate-12 hover:rotate-0 transition-transform duration-300">
              <svg viewBox="0 0 24 24" fill="none" className="w-12 h-12 drop-shadow-md">
                <path d="M5 4v16M19 4v16M5 12h14" stroke="white" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <h2 className="text-3xl font-black text-emerald-950 tracking-tight mb-2">Hai, Sobat Konser!</h2>
            <p className="text-emerald-600 font-medium">Yuk masuk dulu buat sewa lightstick.</p>
          </div>
          
          {/* Alert Error */}
          {message && (
            <div className="mb-8 text-sm font-bold p-4 rounded-2xl bg-rose-100 text-rose-600 border-2 border-rose-200 flex items-center justify-center gap-2">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
              {message}
            </div>
          )}

          {/* Form Login */}
          <form onSubmit={handleLogin} className="space-y-5">
            <div>
              <label className="block text-sm font-black text-emerald-800 mb-2 ml-2">Alamat Email</label>
              <input 
                type="email" 
                value={email} 
                onChange={(e) => setEmail(e.target.value)} 
                className="w-full px-6 py-4 bg-emerald-50 border-2 border-emerald-100 rounded-2xl focus:outline-none focus:border-emerald-400 focus:bg-white transition-all text-emerald-900 placeholder-emerald-300 font-bold" 
                placeholder="nama@email.com" 
                required 
              />
            </div>
            
            <div>
              <label className="block text-sm font-black text-emerald-800 mb-2 ml-2">Kata Sandi</label>
              <div className="relative">
                <input 
                  type={showPassword ? "text" : "password"} 
                  value={password} 
                  onChange={(e) => setPassword(e.target.value)} 
                  className="w-full px-6 py-4 bg-emerald-50 border-2 border-emerald-100 rounded-2xl focus:outline-none focus:border-emerald-400 focus:bg-white transition-all text-emerald-900 placeholder-emerald-300 font-bold pr-14" 
                  placeholder="••••••••" 
                  required 
                />
                <button 
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-4 flex items-center text-emerald-500 hover:text-emerald-700 transition-colors"
                >
                  {showPassword ? (
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88" />
                    </svg>
                  )}
                </button>
              </div>
            </div>

            {/* ================= BAGIAN CAPTCHA ================= */}
            <div className="bg-emerald-50/50 p-4 rounded-2xl border-2 border-emerald-100">
              <label className="block text-xs font-black text-emerald-800 mb-3 flex items-center gap-2">
                <svg className="w-4 h-4 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>
                Verifikasi Keamanan
              </label>
              <div className="flex items-center gap-3">
                {/* Kotak Soal Matematika */}
                <div className="bg-white px-5 py-3 rounded-xl border-2 border-emerald-100 font-black text-lg text-emerald-900 shadow-inner select-none">
                  {captcha.num1} {captcha.operator} {captcha.num2} = ?
                </div>
                
                <span className="font-black text-emerald-300">➜</span>
                
                {/* Input Jawaban */}
                <input 
                  type="number" 
                  value={captchaInput}
                  onChange={(e) => setCaptchaInput(e.target.value)}
                  className="w-full py-3 px-4 bg-white border-2 border-emerald-100 rounded-xl focus:outline-none focus:border-emerald-400 text-center font-black text-emerald-900 text-lg"
                  placeholder="Jawab"
                  required
                />

                {/* Tombol Refresh Soal */}
                <button 
                  type="button" 
                  onClick={generateCaptcha}
                  className="p-3 bg-emerald-100 text-emerald-600 rounded-xl hover:bg-emerald-200 hover:text-emerald-800 transition-colors shrink-0"
                  title="Ganti Soal"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" /></svg>
                </button>
              </div>
            </div>
            {/* =================================================== */}
            
            <button 
              type="submit" 
              className="w-full py-4 px-4 rounded-2xl text-white font-black text-lg bg-emerald-500 hover:bg-emerald-600 focus:ring-4 focus:ring-emerald-500/30 transition-all duration-200 shadow-xl shadow-emerald-500/40 active:scale-[0.98] mt-6"
            >
              Gas Masuk!
            </button>
          </form>

          {/* ================= BAGIAN BAWAH: BELUM PUNYA AKUN ================= */}
          <div className="mt-8 pt-6 border-t-2 border-emerald-50 text-center">
            <p className="text-emerald-600 font-medium mb-3">
              Belum punya akun?
            </p>
            <Link 
              to="/register" 
              className="inline-block w-full py-3.5 rounded-2xl border-2 border-emerald-200 bg-emerald-50 text-emerald-700 font-black text-sm hover:bg-emerald-100 hover:border-emerald-300 transition-all active:scale-95"
            >
              Daftar Akun Baru
            </Link>
          </div>

        </div>
      </div>
    </div>
  );
}