import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { supabase } from '../supabaseClient';

export default function PeminjamFormSewa() {
  const { id_lightstick } = useParams();
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user'));

  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(true);
  
  // State Form
  const [form, setForm] = useState({
    tanggal_peminjaman: '',
    tanggal_kembali: '',
    jaminan: 'KTP',
    metode_pembayaran: 'transfer',
  });

  const [uploadBukti, setUploadBukti] = useState(false);
  const [uploadJaminan, setUploadJaminan] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  // State Pengaturan Pembayaran
  const [paySettings, setPaySettings] = useState({
    namaBank: '...',
    noRekening: '...',
    pemilikRekening: '...',
    qrisUrl: ''
  });

  useEffect(() => {
    // 1. Ambil data lightstick
    const fetchItem = async () => {
      try {
        const res = await axios.get(`http://localhost:3001/api/lightstick`);
        const found = res.data.data.find(l => l.id_lightstick === Number(id_lightstick));
        setItem(found);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    // 2. Ambil settingan pembayaran dari Admin (DARI DATABASE)
    const fetchPaySettings = async () => {
      try {
        const res = await axios.get('http://localhost:3001/api/pengaturan-pembayaran');
        if (res.data.data) {
          setPaySettings({
            namaBank: res.data.data.nama_bank,
            noRekening: res.data.data.no_rekening,
            pemilikRekening: res.data.data.pemilik_rekening,
            qrisUrl: res.data.data.qris_url
          });
        }
      } catch (error) {
        console.error("Gagal ambil setting pembayaran", error);
      }
    };

    fetchItem();
    fetchPaySettings(); // <-- Ini yang tadi ilang
  }, [id_lightstick]);

  const hitungDurasi = () => {
    if (!form.tanggal_peminjaman || !form.tanggal_kembali) return 0;
    const tgl1 = new Date(form.tanggal_peminjaman);
    const tgl2 = new Date(form.tanggal_kembali);
    const diffTime = Math.abs(tgl2 - tgl1);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays > 0 ? diffDays : 1;
  };
  const durasi = hitungDurasi();
  const totalSewa = durasi * (item?.harga_sewa || 0);

  const handleUploadFile = async (e, type) => {
    try {
      const file = e.target.files[0];
      if (!file) return;

      if (type === 'bukti') setUploadBukti(true);
      else setUploadJaminan(true);

      const fileExt = file.name.split('.').pop();
      const fileName = `${user.id_users}_${type}_${Date.now()}.${fileExt}`;
      const filePath = `${fileName}`;

      const { error } = await supabase.storage.from('hancoer').upload(filePath, file);
      if (error) throw error;

      const { data } = supabase.storage.from('hancoer').getPublicUrl(filePath);
      setForm({ ...form, [type === 'bukti' ? 'bukti_pembayaran' : 'jaminan_url']: data.publicUrl });

    } catch (error) {
      alert('Gagal upload: ' + error.message);
    } finally {
      if (type === 'bukti') setUploadBukti(false);
      else setUploadJaminan(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (form.metode_pembayaran !== 'cash' && !form.bukti_pembayaran) {
      return alert('Mohon upload Bukti Pembayaran terlebih dahulu!');
    }
    if (!form.jaminan_url) {
      return alert('Mohon upload Dokumen Jaminan terlebih dahulu!');
    }

    setSubmitting(true);
    try {
      await axios.post('http://localhost:3001/api/peminjaman', {
        id_users: user.id_users || user.id,
        id_lightstick: item.id_lightstick,
        tanggal_peminjaman: form.tanggal_peminjaman,
        tanggal_kembali: form.tanggal_kembali,
        jaminan: form.jaminan,
        metode_pembayaran: form.metode_pembayaran,
        bukti_pembayaran: form.bukti_pembayaran || null,
        jaminan_url: form.jaminan_url
      });

      alert('Peminjaman berhasil diajukan!');
      navigate('/peminjam/peminjaman');
    } catch (error) {
      alert(error.response?.data?.message || 'Gagal memproses peminjaman');
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) return <div className="text-center p-10 font-bold text-emerald-500">Memuat data...</div>;
  if (!item) return <div className="text-center p-10 font-bold text-rose-500">Lightstick tidak ditemukan.</div>;

  return (
    <div className="max-w-4xl mx-auto">
      <Link to="/katalog" className="inline-flex items-center gap-2 text-emerald-600 font-bold mb-6 hover:text-emerald-800 transition-colors">
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
        Kembali ke Katalog
      </Link>

      <div className="bg-white rounded-[2rem] border-4 border-emerald-100 shadow-sm overflow-hidden flex flex-col md:flex-row">
        
        {/* KIRI: Info Barang */}
        <div className="md:w-5/12 bg-emerald-50 p-8 flex flex-col items-center text-center">
          <div className="w-48 h-48 bg-white rounded-3xl shadow-sm overflow-hidden mb-6 border-4 border-white">
            {item.foto ? <img src={item.foto} alt={item.nama_lightstick} className="w-full h-full object-cover" /> : <div className="w-full h-full flex items-center justify-center text-emerald-300">No Img</div>}
          </div>
          <h2 className="text-2xl font-black text-emerald-900 leading-tight mb-2">{item.nama_lightstick}</h2>
          <p className="text-sm font-bold text-emerald-600 mb-4">{item.nama_kategori}</p>
          
          <div className="w-full bg-white rounded-2xl p-4 space-y-3 text-sm">
            <div className="flex justify-between">
              <span className="text-slate-500 font-medium">Harga per hari</span>
              <span className="font-black text-emerald-600">Rp {Number(item.harga_sewa).toLocaleString('id-ID')}</span>
            </div>
            <div className="flex justify-between border-t-2 border-emerald-50 pt-3">
              <span className="text-slate-500 font-medium">Stok Tersedia</span>
              <span className="font-black text-emerald-900">{item.stok}</span>
            </div>
          </div>
        </div>

        {/* KANAN: Form Peminjaman */}
        <div className="md:w-7/12 p-8">
          <h3 className="text-2xl font-black text-emerald-900 mb-6">Form Peminjaman 📝</h3>
          
          <form onSubmit={handleSubmit} className="space-y-5">
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-black text-slate-500 uppercase mb-2">Tgl Pinjam</label>
                <input type="date" required value={form.tanggal_peminjaman} onChange={e => setForm({...form, tanggal_peminjaman: e.target.value})} className="w-full p-3 rounded-xl border-2 border-emerald-100 focus:border-emerald-400 outline-none text-sm font-bold text-slate-700" />
              </div>
              <div>
                <label className="block text-xs font-black text-slate-500 uppercase mb-2">Tgl Kembali</label>
                <input type="date" required value={form.tanggal_kembali} onChange={e => setForm({...form, tanggal_kembali: e.target.value})} className="w-full p-3 rounded-xl border-2 border-emerald-100 focus:border-emerald-400 outline-none text-sm font-bold text-slate-700" />
              </div>
            </div>

            {/* Rincian Harga */}
            <div className="bg-emerald-50 p-4 rounded-xl border border-emerald-100 text-sm">
              <div className="flex justify-between mb-1">
                <span className="text-emerald-600 font-medium">Durasi</span>
                <span className="font-black text-emerald-900">{durasi} Hari</span>
              </div>
              <div className="flex justify-between border-t border-emerald-200 pt-2 mt-2">
                <span className="text-emerald-600 font-medium">Total Sewa</span>
                <span className="font-black text-emerald-600 text-lg">Rp {totalSewa.toLocaleString('id-ID')}</span>
              </div>
            </div>

            {/* METODE PEMBAYARAN */}
            <div>
              <label className="block text-xs font-black text-slate-500 uppercase mb-2">Pilih Metode Pembayaran</label>
              <select value={form.metode_pembayaran} onChange={e => setForm({...form, metode_pembayaran: e.target.value})} className="w-full p-3 rounded-xl border-2 border-emerald-100 focus:border-emerald-400 outline-none text-sm font-bold text-slate-700 bg-white">
                <option value="transfer">Transfer Bank</option>
                <option value="qris">QRIS</option>
                <option value="cash">Cash (Bayar di Tempat)</option>
              </select>
            </div>

            {/* INFO TAMBAHAN BERDASARKAN METODE */}
            {form.metode_pembayaran === 'transfer' && (
              <div className="bg-blue-50 p-4 rounded-xl border-2 border-blue-100 flex items-start gap-3">
                <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center shrink-0">
                  <svg className="w-6 h-6 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" /></svg>
                </div>
                <div>
                  <p className="text-xs font-black text-blue-400 uppercase tracking-wider mb-1">Transfer ke Rekening</p>
                  <p className="font-black text-slate-800 text-lg">{paySettings.namaBank}: {paySettings.noRekening}</p>
                  <p className="text-sm text-slate-500 font-medium">a.n. {paySettings.pemilikRekening}</p>
                </div>
              </div>
            )}

            {form.metode_pembayaran === 'qris' && (
              <div className="bg-amber-50 p-4 rounded-xl border-2 border-amber-100 text-center">
                <p className="text-xs font-black text-amber-500 uppercase tracking-wider mb-3">Scan QRIS Berikut</p>
                <img src={paySettings.qrisUrl} alt="QRIS" className="mx-auto rounded-xl shadow-sm border-4 border-white w-40 h-40 object-contain" />
                <p className="text-xs text-slate-500 mt-3 font-medium">Bisa pakai GoPay, OVO, Dana, dll.</p>
              </div>
            )}

            {form.metode_pembayaran === 'cash' && (
              <div className="bg-emerald-50 p-4 rounded-xl border-2 border-emerald-100 flex items-start gap-3">
                <div className="w-10 h-10 bg-emerald-100 rounded-xl flex items-center justify-center shrink-0">
                  <svg className="w-6 h-6 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" /></svg>
                </div>
                <div>
                  <p className="text-xs font-black text-emerald-400 uppercase tracking-wider mb-1">Pembayaran Cash</p>
                  <p className="text-sm text-slate-600 font-medium">Silakan bayar langsung di toko Hancoer.</p>
                </div>
              </div>
            )}

            {/* Upload Bukti Pembayaran (Disembunyikan jika Cash) */}
            {form.metode_pembayaran !== 'cash' && (
              <div>
                <label className="block text-xs font-black text-slate-500 uppercase mb-2">Upload Bukti Pembayaran</label>
                <input type="file" accept="image/*" onChange={(e) => handleUploadFile(e, 'bukti')} className="w-full p-2 text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-sm file:font-bold file:bg-emerald-100 file:text-emerald-700 hover:file:bg-emerald-200" />
                {uploadBukti && <p className="text-xs text-amber-500 font-bold mt-1 animate-pulse">Mengupload...</p>}
                {form.bukti_pembayaran && !uploadBukti && <p className="text-xs text-emerald-500 font-bold mt-1">✅ Berhasil diupload</p>}
              </div>
            )}

            {/* Upload Dokumen Jaminan */}
            <div>
              <label className="block text-xs font-black text-slate-500 uppercase mb-2">Jenis Jaminan</label>
              <select value={form.jaminan} onChange={e => setForm({...form, jaminan: e.target.value})} className="w-full p-3 rounded-xl border-2 border-emerald-100 focus:border-emerald-400 outline-none text-sm font-bold text-slate-700 mb-3 bg-white">
                <option value="KTP">KTP</option>
                <option value="SIM">SIM</option>
                <option value="Kartu Mahasiswa">Kartu Mahasiswa</option>
                <option value="KK">KK</option>
              </select>
              
              <label className="block text-xs font-black text-slate-500 uppercase mb-2">Upload Dokumen Jaminan</label>
              <input type="file" accept="image/*" required onChange={(e) => handleUploadFile(e, 'jaminan')} className="w-full p-2 text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-sm file:font-bold file:bg-emerald-100 file:text-emerald-700 hover:file:bg-emerald-200" />
              {uploadJaminan && <p className="text-xs text-amber-500 font-bold mt-1 animate-pulse">Mengupload...</p>}
              {form.jaminan_url && !uploadJaminan && <p className="text-xs text-emerald-500 font-bold mt-1">✅ Berhasil diupload</p>}
            </div>

            <button type="submit" disabled={submitting || uploadBukti || uploadJaminan} className="w-full py-4 bg-emerald-500 text-white rounded-2xl font-black text-lg hover:bg-emerald-600 shadow-lg shadow-emerald-500/30 transition-all active:scale-95 disabled:opacity-50 mt-4">
              {submitting ? 'Memproses...' : 'Ajukan Peminjaman'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}