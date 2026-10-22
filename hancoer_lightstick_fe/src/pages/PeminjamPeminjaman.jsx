import { useState, useEffect } from 'react';
import axios from 'axios';

export default function PeminjamPeminjaman() {
  const [peminjamans, setPeminjamans] = useState([]);
  const user = JSON.parse(localStorage.getItem('user'));

  const fetchData = async () => {
    try {
      const userId = user.id_users || user.id;
      const res = await axios.get(`http://localhost:3001/api/peminjaman?id_users=${userId}`);
      setPeminjamans(res.data.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => { fetchData(); }, []);

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-black text-emerald-900">Peminjaman Saya 🛒</h1>
        <p className="text-emerald-600 font-medium mt-1">Status pesanan dan pembayaran lightstick kamu.</p>
      </div>

      <div className="grid gap-4">
        {peminjamans.map((item) => (
          <div key={item.id_peminjaman} className="bg-white p-6 rounded-3xl border-4 border-emerald-50 shadow-sm flex flex-col md:flex-row justify-between md:items-center gap-4">
            <div>
              <p className="font-black text-lg text-emerald-900">{item.nama_lightstick}</p>
              <p className="text-sm font-medium text-slate-500">Tgl Pinjam: {new Date(item.tanggal_peminjaman).toLocaleDateString('id-ID')}</p>
              <p className="text-sm font-medium text-slate-500">Jaminan: {item.jaminan}</p>
            </div>
            
            <div className="flex items-center gap-4">
              <div className="text-right">
                <p className="text-xs font-black text-slate-400 uppercase">Status Order</p>
                <span className={`inline-block px-3 py-1 mt-1 rounded-full text-xs font-black uppercase ${
                  item.status === 'menunggu' ? 'bg-slate-100 text-slate-600' :
                  item.status === 'disetujui' ? 'bg-blue-100 text-blue-700' :
                  item.status === 'dipinjam' ? 'bg-amber-100 text-amber-700' :
                  item.status === 'dikembalikan' ? 'bg-emerald-100 text-emerald-700' : 'bg-rose-100 text-rose-700'
                }`}>{item.status}</span>
              </div>

              <div className="text-right border-l-2 border-slate-100 pl-4">
                <p className="text-xs font-black text-slate-400 uppercase mb-1">Pembayaran</p>
                
                {/* TAMPILAN STATUS PEMBAYARAN (TANPA MODAL UPLOAD LAGI) */}
                {item.status_pembayaran === 'belum_bayar' && (
                  <span className="inline-block bg-rose-100 text-rose-700 px-3 py-1 rounded-full text-xs font-bold">Belum Bayar</span>
                )}
                {item.status_pembayaran === 'menunggu_verifikasi' && (
                  <div className="flex flex-col items-end">
                    <span className="inline-block bg-amber-100 text-amber-700 px-3 py-1 rounded-full text-xs font-bold mb-1">Dicek Admin</span>
                    {item.bukti_pembayaran && (
                      <a href={item.bukti_pembayaran} target="_blank" rel="noopener noreferrer" className="text-[10px] text-blue-500 hover:underline font-bold">
                        Lihat Bukti
                      </a>
                    )}
                  </div>
                )}
                {item.status_pembayaran === 'lunas' && (
                  <div className="flex flex-col items-end">
                    <span className="inline-block bg-emerald-100 text-emerald-700 px-3 py-1 rounded-full text-xs font-bold mb-1">Lunas</span>
                    {item.bukti_pembayaran && (
                      <a href={item.bukti_pembayaran} target="_blank" rel="noopener noreferrer" className="text-[10px] text-blue-500 hover:underline font-bold">
                        Lihat Bukti
                      </a>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
        {peminjamans.length === 0 && <div className="text-center p-10 bg-white rounded-3xl border-4 border-emerald-50 text-emerald-500 font-bold">Belum ada peminjaman aktif.</div>}
      </div>
    </div>
  );
}