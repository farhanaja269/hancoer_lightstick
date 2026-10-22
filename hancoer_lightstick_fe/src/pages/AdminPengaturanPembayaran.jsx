import { useState, useEffect } from 'react';
import axios from 'axios';
import { supabase } from '../supabaseClient'; // <-- Import Supabase

export default function AdminPengaturanPembayaran() {
  const [form, setForm] = useState({
    nama_bank: '',
    no_rekening: '',
    pemilik_rekening: '',
    qris_url: ''
  });
  const [saved, setSaved] = useState(false);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false); // State buat loading upload

  // 1. Ambil data dari Backend saat halaman dibuka
  useEffect(() => {
    const fetchPengaturan = async () => {
      try {
        const res = await axios.get('http://localhost:3001/api/pengaturan-pembayaran');
        if (res.data.data) {
          setForm({
            nama_bank: res.data.data.nama_bank,
            no_rekening: res.data.data.no_rekening,
            pemilik_rekening: res.data.data.pemilik_rekening,
            qris_url: res.data.data.qris_url
          });
        }
      } catch (error) {
        console.error(error);
        alert('Gagal mengambil data pengaturan');
      } finally {
        setLoading(false);
      }
    };
    fetchPengaturan();
  }, []);

  // 2. Fungsi Upload File Gambar QRIS ke Supabase
  const handleUploadQRIS = async (e) => {
    try {
      const file = e.target.files[0];
      if (!file) return;

      setUploading(true);

      // Bikin nama file unik (misal: qris_1690123.jpg)
      const fileExt = file.name.split('.').pop();
      const fileName = `qris_${Date.now()}.${fileExt}`;
      
      // Upload ke bucket 'hancoer'
      const { error: uploadError } = await supabase.storage
        .from('Qris')
        .upload(fileName, file);

      if (uploadError) throw uploadError;

      // Ambil URL Public
      const { data } = supabase.storage.from('Qris').getPublicUrl(fileName);
      
      // Simpan URL ke dalam state form
      setForm({ ...form, qris_url: data.publicUrl });
      
      alert('Gambar QRIS berhasil diupload!');
    } catch (error) {
      alert('Gagal upload gambar: ' + error.message);
    } finally {
      setUploading(false);
    }
  };

  // 3. Simpan data ke Backend
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.qris_url) {
      return alert('Mohon upload gambar QRIS terlebih dahulu!');
    }

    try {
      await axios.put('http://localhost:3001/api/pengaturan-pembayaran', form);
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    } catch (error) {
      alert(error.response?.data?.message || 'Gagal menyimpan pengaturan');
    }
  };

  if (loading) return <div className="text-center p-10 font-bold text-pink-500">Memuat data...</div>;

  return (
    <div className="max-w-3xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-black text-pink-600 tracking-tight">Pengaturan Pembayaran 💳</h1>
        <p className="text-slate-500 font-medium mt-1">Atur info rekening bank dan QRIS untuk pelanggan.</p>
      </div>

      {saved && (
        <div className="mb-6 bg-emerald-100 text-emerald-700 font-bold p-4 rounded-2xl border-2 border-emerald-200">
          ✅ Pengaturan berhasil disimpan permanen!
        </div>
      )}

      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-[2.5rem] border-4 border-pink-50 shadow-sm space-y-6">
        
        {/* Info Rekening Bank */}
        <div className="bg-pink-50/50 p-6 rounded-2xl border-2 border-pink-100">
          <h3 className="text-lg font-black text-pink-900 mb-4 flex items-center gap-2">
            <svg className="w-5 h-5 text-pink-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" /></svg>
            Info Transfer Bank
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-black text-slate-500 uppercase mb-2">Nama Bank</label>
              <input type="text" value={form.nama_bank} onChange={e => setForm({...form, nama_bank: e.target.value})} className="w-full p-3 rounded-xl border-2 border-pink-100 focus:border-pink-400 outline-none font-bold text-slate-700" required />
            </div>
            <div>
              <label className="block text-xs font-black text-slate-500 uppercase mb-2">Nomor Rekening</label>
              <input type="text" value={form.no_rekening} onChange={e => setForm({...form, no_rekening: e.target.value})} className="w-full p-3 rounded-xl border-2 border-pink-100 focus:border-pink-400 outline-none font-bold text-slate-700" required />
            </div>
            <div className="md:col-span-2">
              <label className="block text-xs font-black text-slate-500 uppercase mb-2">Atas Nama</label>
              <input type="text" value={form.pemilik_rekening} onChange={e => setForm({...form, pemilik_rekening: e.target.value})} className="w-full p-3 rounded-xl border-2 border-pink-100 focus:border-pink-400 outline-none font-bold text-slate-700" required />
            </div>
          </div>
        </div>

        {/* Info QRIS */}
        <div className="bg-amber-50/50 p-6 rounded-2xl border-2 border-amber-100">
          <h3 className="text-lg font-black text-amber-900 mb-4 flex items-center gap-2">
            <svg className="w-5 h-5 text-amber-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1zm14 0h2a1 1 0 001-1V5a1 1 0 00-1-1h-2a1 1 0 00-1 1v2a1 1 0 001 1zM5 20h2a1 1 0 001-1v-2a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1z" /></svg>
            Gambar QRIS
          </h3>
          <div>
            {/* INPUT FILE, BUKAN LINK LAGI */}
            <label className="block text-xs font-black text-slate-500 uppercase mb-2">Upload File Gambar QRIS</label>
            <input 
              type="file" 
              accept="image/*" 
              onChange={handleUploadQRIS} 
              disabled={uploading}
              className="w-full p-2 mb-3 text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-sm file:font-bold file:bg-amber-100 file:text-amber-700 hover:file:bg-amber-200" 
            />
            {uploading && <p className="text-xs text-amber-500 font-bold animate-pulse mb-3">Sedang mengupload ke Supabase...</p>}
            
            {/* Preview QRIS */}
            {form.qris_url && (
              <div className="bg-white p-4 rounded-xl border-2 border-amber-100 inline-block text-center">
                <p className="text-[10px] font-black text-slate-400 mb-2 uppercase">Preview Saat Ini</p>
                <img src={form.qris_url} alt="Preview QRIS" className="w-40 h-40 object-contain rounded-lg" />
              </div>
            )}
          </div>
        </div>

        <button type="submit" disabled={uploading} className="w-full py-4 bg-pink-500 text-white rounded-2xl font-black text-lg hover:bg-pink-600 shadow-lg shadow-pink-500/30 transition-all active:scale-95 disabled:opacity-50">
          {uploading ? 'Menunggu Upload...' : 'Simpan Pengaturan'}
        </button>
      </form>
    </div>
  );
}