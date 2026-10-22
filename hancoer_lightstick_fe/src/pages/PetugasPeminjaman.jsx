import { useState, useEffect } from 'react';
import axios from 'axios';

export default function PetugasPeminjaman() {
  const [peminjamans, setPeminjamans] = useState([]);
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  const fetchPeminjaman = async () => {
    try {
      const response = await axios.get('http://localhost:3001/api/peminjaman');
      // Hanya tampilkan yang belum dikembalikan
      const dataAktif = response.data.data.filter(item => item.status !== 'dikembalikan');
      setPeminjamans(dataAktif);
    } catch (error) {
      console.error("Gagal ambil data", error);
    }
  };

  useEffect(() => { fetchPeminjaman(); }, []);

  const handleVerifikasi = async (id, status, statusBayar) => {
    if (window.confirm(`Ubah status menjadi ${status}?`)) {
      try {
        await axios.put(`http://localhost:3001/api/peminjaman/${id}/verifikasi`, { status, status_pembayaran: statusBayar });
        fetchPeminjaman();
      } catch (error) { alert("Gagal update data"); }
    }
  };

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-black text-blue-900 tracking-tight">Data Peminjaman 📦</h1>
        <p className="text-blue-500 font-medium mt-1">Kelola pesanan sewa lightstick pelanggan.</p>
      </div>

      <div className="bg-white rounded-[2rem] border-4 border-blue-50 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-blue-50/50 border-b-2 border-blue-100 text-sm font-black text-blue-700">
                <th className="p-4">Peminjam</th>
                <th className="p-4">Barang</th>
                <th className="p-4">Tanggal</th>
                <th className="p-4">Status Order</th>
                <th className="p-4 text-center">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-blue-50 text-sm">
              {peminjamans.map((item) => (
                <tr key={item.id_peminjaman} className="hover:bg-blue-50/30 transition-colors">
                  <td className="p-4">
                    <p className="font-bold text-slate-800">{item.nama_user}</p>
                    <p className="text-xs text-slate-500">{item.no_hp}</p>
                  </td>
                  <td className="p-4">
                    <p className="font-bold text-slate-800">{item.nama_lightstick}</p>
                    <p className="text-xs text-blue-500 font-bold">Rp {Number(item.harga_sewa || 0).toLocaleString('id-ID')}</p>
                  </td>
                  <td className="p-4">
                    <p className="text-xs text-slate-500">Kembali: <span className="font-bold text-slate-700">{new Date(item.tanggal_kembali).toLocaleDateString('id-ID')}</span></p>
                  </td>
                  <td className="p-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase ${
                      item.status === 'menunggu' ? 'bg-slate-100 text-slate-600' :
                      item.status === 'disetujui' ? 'bg-emerald-100 text-emerald-700' :
                      item.status === 'ditolak' ? 'bg-rose-100 text-rose-700' : 'bg-blue-100 text-blue-700'
                    }`}>{item.status}</span>
                  </td>
                  <td className="p-4 text-center space-x-1">
                    {item.status === 'menunggu' && (
                      <>
                        <button onClick={() => handleVerifikasi(item.id_peminjaman, 'disetujui', 'lunas')} className="bg-emerald-500 text-white px-3 py-1.5 rounded-lg text-xs font-bold hover:bg-emerald-600">Setujui</button>
                        <button onClick={() => handleVerifikasi(item.id_peminjaman, 'ditolak', 'belum_bayar')} className="bg-rose-500 text-white px-3 py-1.5 rounded-lg text-xs font-bold hover:bg-rose-600">Tolak</button>
                      </>
                    )}
                    {item.status === 'disetujui' && (
                      <button onClick={() => handleVerifikasi(item.id_peminjaman, 'dipinjam', 'lunas')} className="bg-blue-500 text-white px-3 py-1.5 rounded-lg text-xs font-bold hover:bg-blue-600">Barang Diambil</button>
                    )}
                  </td>
                </tr>
              ))}
              {peminjamans.length === 0 && (
                <tr><td colSpan="5" className="p-12 text-center text-blue-400 font-medium">Belum ada data peminjaman aktif.</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}