import { useState, useEffect } from 'react';
import axios from 'axios';

export default function AdminPeminjaman() {
  const [peminjamans, setPeminjamans] = useState([]);
  
  // State Modal Detail
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  const fetchPeminjaman = async () => {
    try {
      const response = await axios.get('http://localhost:3001/api/peminjaman');
      // Filter: sembunyikan yang udah dikembalikan
      const dataAktif = response.data.data.filter(item => item.status !== 'dikembalikan');
      setPeminjamans(dataAktif);
    } catch (error) {
      console.error("Gagal ambil data", error);
    }
  };

  useEffect(() => {
    fetchPeminjaman();
  }, []);

  const handleVerifikasi = async (id, status, statusBayar) => {
    if (window.confirm(`Ubah status menjadi ${status}?`)) {
      try {
        await axios.put(`http://localhost:3001/api/peminjaman/${id}/verifikasi`, { 
          status: status, 
          status_pembayaran: statusBayar 
        });
        fetchPeminjaman();
      } catch (error) {
        alert("Gagal update data");
      }
    }
  };

  const handleOpenDetail = (item) => {
    setSelectedItem(item);
    setIsDetailOpen(true);
  };

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-black text-pink-600 tracking-tight">Data Peminjaman 📦</h1>
        <p className="text-slate-500 font-medium mt-1">Kelola pesanan sewa lightstick pelanggan.</p>
      </div>

      <div className="bg-white rounded-[2rem] border-4 border-pink-50 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-pink-50/50 border-b-2 border-pink-100 text-sm font-black text-pink-700">
                <th className="p-4">Peminjam</th>
                <th className="p-4">Barang</th>
                <th className="p-4">Tanggal</th>
                <th className="p-4">Jaminan</th>
                <th className="p-4">Pembayaran</th>
                <th className="p-4">Status Order</th>
                <th className="p-4 text-center">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-pink-50 text-sm">
              {peminjamans.map((item) => (
                <tr key={item.id_peminjaman} className="hover:bg-pink-50/30 transition-colors">
                  <td className="p-4">
                    <p className="font-bold text-slate-800">{item.nama_user}</p>
                    <p className="text-xs text-slate-500">{item.no_hp}</p>
                  </td>
                  <td className="p-4">
                    <p className="font-bold text-slate-800">{item.nama_lightstick}</p>
                    <p className="text-xs text-pink-500 font-bold">Rp {Number(item.harga_sewa || 0).toLocaleString('id-ID')}</p>
                  </td>
                  <td className="p-4">
                    <p className="text-xs text-slate-500">Pinjam: <span className="font-bold text-slate-700">{new Date(item.tanggal_peminjaman).toLocaleDateString('id-ID')}</span></p>
                    <p className="text-xs text-slate-500">Kembali: <span className="font-bold text-slate-700">{new Date(item.tanggal_kembali).toLocaleDateString('id-ID')}</span></p>
                  </td>
                  <td className="p-4">
                    <span className="bg-amber-100 text-amber-700 px-3 py-1 rounded-lg text-xs font-bold">
                      {item.jaminan || '-'}
                    </span>
                  </td>
                  <td className="p-4">
                    <p className={`mt-1 text-[10px] font-black uppercase px-2 py-0.5 rounded-full inline-block ${
                      item.status_pembayaran === 'lunas' ? 'bg-emerald-100 text-emerald-600' : 
                      item.status_pembayaran === 'menunggu_verifikasi' ? 'bg-blue-100 text-blue-600' : 'bg-rose-100 text-rose-600'
                    }`}>{item.status_pembayaran.replace('_', ' ')}</p>
                  </td>
                  <td className="p-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase ${
                      item.status === 'menunggu' ? 'bg-slate-100 text-slate-600' :
                      item.status === 'disetujui' ? 'bg-emerald-100 text-emerald-700' :
                      item.status === 'ditolak' ? 'bg-rose-100 text-rose-700' : 'bg-blue-100 text-blue-700'
                    }`}>
                      {item.status}
                    </span>
                  </td>
                  <td className="p-4 text-center space-y-2 flex flex-col items-center">
                    <button onClick={() => handleOpenDetail(item)} className="bg-slate-500 text-white px-3 py-1.5 rounded-lg text-xs font-bold hover:bg-slate-600 w-full">Lihat Detail</button>
                    
                    {item.status === 'menunggu' && (
                      <div className="flex gap-1 w-full">
                        <button onClick={() => handleVerifikasi(item.id_peminjaman, 'disetujui', 'lunas')} className="flex-1 bg-emerald-500 text-white px-2 py-1.5 rounded-lg text-xs font-bold hover:bg-emerald-600">Setujui</button>
                        <button onClick={() => handleVerifikasi(item.id_peminjaman, 'ditolak', 'belum_bayar')} className="flex-1 bg-rose-500 text-white px-2 py-1.5 rounded-lg text-xs font-bold hover:bg-rose-600">Tolak</button>
                      </div>
                    )}
                    {item.status === 'disetujui' && (
                      <button onClick={() => handleVerifikasi(item.id_peminjaman, 'dipinjam', 'lunas')} className="bg-blue-500 text-white px-3 py-1.5 rounded-lg text-xs font-bold hover:bg-blue-600 w-full">Barang Diambil</button>
                    )}
                  </td>
                </tr>
              ))}
              {peminjamans.length === 0 && (
                <tr><td colSpan="7" className="p-12 text-center text-pink-400 font-medium">Belum ada data peminjaman aktif.</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* ==================== MODAL DETAIL PEMINJAMAN ==================== */}
      {isDetailOpen && selectedItem && (
        <div className="fixed inset-0 bg-pink-900/40 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-[2rem] p-8 w-full max-w-2xl shadow-2xl border-4 border-pink-100 max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-6 border-b-2 border-pink-50 pb-4">
              <h2 className="text-2xl font-black text-pink-600">Detail Peminjaman</h2>
              <button onClick={() => setIsDetailOpen(false)} className="text-slate-400 hover:text-rose-500 font-black text-2xl">&times;</button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Info Peminjam & Barang */}
              <div className="space-y-4">
                <div>
                  <p className="text-xs font-black text-slate-400 uppercase mb-1">Peminjam</p>
                  <p className="font-bold text-slate-800 text-lg">{selectedItem.nama_user}</p>
                  <p className="text-sm text-slate-500">{selectedItem.no_hp}</p>
                </div>
                <div>
                  <p className="text-xs font-black text-slate-400 uppercase mb-1">Barang Disewa</p>
                  <p className="font-bold text-slate-800 text-lg">{selectedItem.nama_lightstick}</p>
                  <p className="text-sm text-pink-500 font-bold">Rp {Number(selectedItem.harga_sewa || 0).toLocaleString('id-ID')} / hari</p>
                </div>
                <div className="bg-slate-50 p-4 rounded-xl">
                  <p className="text-xs font-black text-slate-400 uppercase mb-1">Total Harga</p>
                  <p className="font-black text-emerald-600 text-xl">Rp {Number(selectedItem.harga_sewa * 3 || 0).toLocaleString('id-ID')}</p>
                </div>
              </div>

              {/* Foto Jaminan & Bukti Transfer */}
              <div className="space-y-4">
                <div>
                  <p className="text-xs font-black text-slate-400 uppercase mb-2">Dokumen Jaminan ({selectedItem.jaminan})</p>
                  {selectedItem.jaminan_url ? (
                    <a href={selectedItem.jaminan_url} target="_blank" rel="noopener noreferrer" className="block w-full h-40 bg-slate-100 rounded-xl overflow-hidden border-2 border-pink-100 relative group">
                      <img src={selectedItem.jaminan_url} alt="Jaminan" className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
                      <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                        <p className="text-white font-bold text-sm">Klik untuk memperbesar</p>
                      </div>
                    </a>
                  ) : (
                    <div className="w-full h-40 bg-slate-50 rounded-xl flex items-center justify-center text-slate-400 font-bold border-2 border-dashed border-slate-200">Tidak Ada Foto</div>
                  )}
                </div>

                <div>
                  <p className="text-xs font-black text-slate-400 uppercase mb-2">Bukti Transfer</p>
                  {selectedItem.bukti_pembayaran ? (
                    <a href={selectedItem.bukti_pembayaran} target="_blank" rel="noopener noreferrer" className="block w-full h-40 bg-slate-100 rounded-xl overflow-hidden border-2 border-pink-100 relative group">
                      <img src={selectedItem.bukti_pembayaran} alt="Bukti TF" className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
                      <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                        <p className="text-white font-bold text-sm">Klik untuk memperbesar</p>
                      </div>
                    </a>
                  ) : (
                    <div className="w-full h-40 bg-slate-50 rounded-xl flex items-center justify-center text-slate-400 font-bold border-2 border-dashed border-slate-200">Belum Upload</div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}