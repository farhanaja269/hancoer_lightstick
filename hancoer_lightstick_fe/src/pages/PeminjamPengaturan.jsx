import { useState } from 'react';
import axios from 'axios';

export default function PeminjamPengaturan() {
  const user = JSON.parse(localStorage.getItem('user'));
  const [form, setForm] = useState({
    nama: user.nama || '',
    email: user.email || '',
    no_hp: user.no_hp || '',
    alamat: user.alamat || '',
    password: '' // State baru untuk password
  });

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    try {
      // Mengirim data ke backend (pastikan endpoint ini ada di backend kamu)
      await axios.put(`http://localhost:3001/api/users/${user.id_users}`, form);
      
      // Update data di localStorage biar langsung berubah tanpa harus login ulang
      const updatedUser = { ...user, nama: form.nama, no_hp: form.no_hp, alamat: form.alamat };
      localStorage.setItem('user', JSON.stringify(updatedUser));

      setMessage('Profil berhasil diperbarui!');
      setTimeout(() => window.location.reload(), 1500); // Reload halaman setelah 1.5 detik
    } catch (error) {
      setMessage(error.response?.data?.message || 'Gagal memperbarui profil.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl">
      <div className="mb-8">
        <h1 className="text-3xl font-black text-emerald-900">Pengaturan Akun ⚙️</h1>
        <p className="text-emerald-600 font-medium mt-1">Ubah data profil dan kata sandi kamu di sini.</p>
      </div>

      {/* Tampilan Pesan Sukses / Error */}
      {message && (
        <div className={`mb-6 text-sm font-bold p-4 rounded-2xl flex items-center justify-center gap-2 border-2 ${
          message.includes('berhasil') ? 'bg-emerald-50 text-emerald-600 border-emerald-100' : 'bg-rose-50 text-rose-600 border-rose-100'
        }`}>
          {message}
        </div>
      )}

      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-[2rem] border-4 border-emerald-50 shadow-sm space-y-5">
        
        {/* Nama */}
        <div>
          <label className="block text-xs font-black text-slate-500 uppercase tracking-wider mb-2">Nama Lengkap</label>
          <input type="text" value={form.nama} onChange={e => setForm({...form, nama: e.target.value})} className="w-full p-4 rounded-2xl bg-slate-50 border-2 border-slate-100 focus:border-emerald-400 focus:bg-white outline-none font-bold text-slate-700" required />
        </div>

        {/* Email (Disabled) */}
        <div>
          <label className="block text-xs font-black text-slate-500 uppercase tracking-wider mb-2">Email (Tidak bisa diubah)</label>
          <input type="email" value={form.email} disabled className="w-full p-4 rounded-2xl bg-slate-100 border-2 border-slate-200 outline-none font-bold text-slate-400 cursor-not-allowed" />
        </div>

        {/* No HP */}
        <div>
          <label className="block text-xs font-black text-slate-500 uppercase tracking-wider mb-2">No. WhatsApp</label>
          <input type="text" value={form.no_hp} onChange={e => setForm({...form, no_hp: e.target.value})} className="w-full p-4 rounded-2xl bg-slate-50 border-2 border-slate-100 focus:border-emerald-400 focus:bg-white outline-none font-bold text-slate-700" />
        </div>

        {/* Alamat */}
        <div>
          <label className="block text-xs font-black text-slate-500 uppercase tracking-wider mb-2">Alamat</label>
          <textarea value={form.alamat} onChange={e => setForm({...form, alamat: e.target.value})} rows="3" className="w-full p-4 rounded-2xl bg-slate-50 border-2 border-slate-100 focus:border-emerald-400 focus:bg-white outline-none font-bold text-slate-700 resize-none"></textarea>
        </div>

        {/* PASSWORD DENGAN TOGGLE MATA */}
        <div>
          <label className="block text-xs font-black text-slate-500 uppercase tracking-wider mb-2">
            Password Baru <span className="text-emerald-500 font-medium normal-case tracking-normal">(Kosongkan jika tidak ingin diubah)</span>
          </label>
          <div className="relative">
            <input 
              type={showPassword ? "text" : "password"} 
              value={form.password} 
              onChange={e => setForm({...form, password: e.target.value})} 
              className="w-full p-4 rounded-2xl bg-slate-50 border-2 border-slate-100 focus:border-emerald-400 focus:bg-white outline-none font-bold text-slate-700 pr-14" 
              placeholder="••••••••" 
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

        <button type="submit" disabled={loading} className="w-full py-4 bg-emerald-500 text-white rounded-2xl font-black hover:bg-emerald-600 shadow-lg shadow-emerald-500/30 transition-all active:scale-95 disabled:opacity-50 mt-4">
          {loading ? 'Menyimpan...' : 'Simpan Perubahan'}
        </button>
      </form>
    </div>
  );
}