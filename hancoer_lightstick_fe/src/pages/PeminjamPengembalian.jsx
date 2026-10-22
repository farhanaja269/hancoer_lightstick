import { useState, useEffect } from 'react';
import axios from 'axios';

export default function PeminjamPengembalian() {
  const [riwayat, setRiwayat] = useState([]);
  const user = JSON.parse(localStorage.getItem('user'));

  useEffect(() => {
    const fetchRiwayat = async () => {
      try {
        // Ambil ID user (jaga-jaga kalau namanya beda)
        const userId = user.id_users || user.id; 
        
        // Tembak API bawa ID user
        const res = await axios.get(`http://localhost:3001/api/pengembalian?id_users=${userId}`);
        
        // Langsung set data, TANPA FILTER MANUAL
        setRiwayat(res.data.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchRiwayat();
  }, [user.id_users, user.id]);

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-black text-emerald-900">Riwayat & Denda 📋</h1>
        <p className="text-emerald-600 font-medium mt-1">Catatan barang yang telah kamu kembalikan.</p>
      </div>

      <div className="grid gap-4">
        {riwayat.map((item) => (
          <div key={item.id_pengembalian} className="bg-white p-6 rounded-3xl border-4 border-emerald-50 shadow-sm">
            <div className="flex flex-col md:flex-row justify-between md:items-center gap-4 border-b-2 border-slate-50 pb-4 mb-4">
              <div>
                <p className="font-black text-lg text-emerald-900">{item.nama_lightstick}</p>
                <p className="text-sm font-medium text-slate-500">Dikembalikan pd: {new Date(item.tanggal_kembali).toLocaleDateString('id-ID')}</p>
              </div>
              <div>
                 <span className="bg-emerald-100 text-emerald-700 px-4 py-1.5 rounded-full text-xs font-black uppercase">
                   Selesai
                 </span>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-slate-50 p-3 rounded-xl">
                <p className="text-xs text-slate-400 font-bold mb-1">Kondisi Barang</p>
                <p className="font-black text-slate-700 capitalize">{item.kondisi_lightstick}</p>
              </div>
              
              {/* Kotak Denda */}
              <div className={`p-3 rounded-xl ${item.denda > 0 ? 'bg-rose-50 border border-rose-100' : 'bg-emerald-50 border border-emerald-100'}`}>
                <p className={`text-xs font-bold mb-1 ${item.denda > 0 ? 'text-rose-400' : 'text-emerald-500'}`}>Denda</p>
                <p className={`font-black text-lg ${item.denda > 0 ? 'text-rose-600' : 'text-emerald-600'}`}>
                  Rp {Number(item.denda || 0).toLocaleString('id-ID')}
                </p>
              </div>
            </div>
            {item.keterangan && (
              <p className="text-xs text-slate-500 mt-3"><span className="font-bold">Catatan Admin:</span> {item.keterangan}</p>
            )}
          </div>
        ))}
        {riwayat.length === 0 && <div className="text-center p-10 bg-white rounded-3xl border-4 border-emerald-50 text-emerald-500 font-bold">Belum ada riwayat pengembalian.</div>}
      </div>
    </div>
  );
}