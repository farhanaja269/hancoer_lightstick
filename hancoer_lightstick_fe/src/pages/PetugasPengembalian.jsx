import { useState, useEffect } from 'react';
import axios from 'axios';

export default function PetugasPengembalian() {
  const [peminjamans, setPeminjamans] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPeminjaman, setSelectedPeminjaman] = useState(null);
  
  const [formData, setFormData] = useState({
    kondisi_lightstick: 'baik',
    denda: 0,
    keterangan: ''
  });

  const fetchPeminjaman = async () => {
    try {
      const response = await axios.get('http://localhost:3001/api/peminjaman');
      // HANYA tampilkan yang statusnya 'dipinjam'
      const dipinjam = response.data.data.filter(item => item.status === 'dipinjam');
      setPeminjamans(dipinjam);
    } catch (error) {
      console.error("Gagal ambil data", error);
    }
  };

  useEffect(() => { fetchPeminjaman(); }, []);

  const handleOpenModal = (item) => {
    setSelectedPeminjaman(item);
    setFormData({ kondisi_lightstick: 'baik', denda: 0, keterangan: '' });
    setIsModalOpen(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:3001/api/pengembalian', {
        id_peminjaman: selectedPeminjaman.id_peminjaman,
        ...formData
      });
      alert('Pengembalian berhasil diproses!');
      setIsModalOpen(false);
      fetchPeminjaman();
    } catch (error) {
      alert(error.response?.data?.message || "Gagal memproses pengembalian");
    }
  };

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-black text-blue-900 tracking-tight">Proses Pengembalian 🔄</h1>
        <p className="text-blue-500 font-medium mt-1">Kelola barang yang sedang dipinjam pelanggan.</p>
      </div>

      <div className="bg-white rounded-[2rem] border-4 border-blue-50 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-blue-50/50 border-b-2 border-blue-100 text-sm font-black text-blue-700">
                <th className="p-4">Peminjam</th>
                <th className="p-4">Barang</th>
                <th className="p-4">Batas Kembali</th>
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
                  </td>
                  <td className="p-4">
                    <p className="text-xs text-slate-500">Tenggat: <span className="font-bold text-rose-600">{new Date(item.tanggal_kembali).toLocaleDateString('id-ID')}</span></p>
                  </td>
                  <td className="p-4 text-center">
                    <button onClick={() => handleOpenModal(item)} className="bg-amber-500 text-white px-4 py-2 rounded-xl text-xs font-bold hover:bg-amber-600 transition-colors shadow-md">Proses Kembali</button>
                  </td>
                </tr>
              ))}
              {peminjamans.length === 0 && (
                <tr><td colSpan="4" className="p-12 text-center text-blue-400 font-medium">Tidak ada barang yang sedang dipinjam.</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* MODAL PENGEMBALIAN */}
      {isModalOpen && selectedPeminjaman && (
        <div className="fixed inset-0 bg-blue-900/30 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-[2.5rem] p-8 w-full max-w-md shadow-2xl border-4 border-blue-100">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-black text-blue-600">Proses Kembali</h2>
              <button onClick={() => setIsModalOpen(false)} className="text-slate-400 hover:text-rose-500 font-black text-2xl">&times;</button>
            </div>
            
            <div className="bg-blue-50 p-4 rounded-2xl mb-6 border border-blue-100">
              <p className="text-sm text-slate-600">Barang: <span className="font-bold text-slate-900">{selectedPeminjaman.nama_lightstick}</span></p>
              <p className="text-sm text-slate-600">Peminjam: <span className="font-bold text-slate-900">{selectedPeminjaman.nama_user}</span></p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-black text-slate-700 mb-2">Kondisi Lightstick</label>
                <select value={formData.kondisi_lightstick} onChange={e => setFormData({...formData, kondisi_lightstick: e.target.value})} className="w-full p-3.5 bg-slate-50 border-2 border-slate-200 rounded-2xl focus:border-blue-400 focus:bg-white outline-none">
                  <option value="baik">Baik (Normal)</option>
                  <option value="rusak">Rusak (Ada kerusakan)</option>
                  <option value="hilang">Hilang</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-black text-slate-700 mb-2">Denda (Rp)</label>
                <input type="number" value={formData.denda} onChange={e => setFormData({...formData, denda: e.target.value})} className="w-full p-3.5 bg-slate-50 border-2 border-slate-200 rounded-2xl focus:border-blue-400 focus:bg-white outline-none" placeholder="0 jika tidak ada denda" />
              </div>
              <div>
                <label className="block text-sm font-black text-slate-700 mb-2">Keterangan</label>
                <textarea value={formData.keterangan} onChange={e => setFormData({...formData, keterangan: e.target.value})} className="w-full p-3.5 bg-slate-50 border-2 border-slate-200 rounded-2xl focus:border-blue-400 focus:bg-white outline-none resize-none" rows="2" placeholder="Catatan tambahan (opsional)..."></textarea>
              </div>
              <div className="flex justify-end gap-3 pt-4 border-t-2 border-blue-50">
                <button type="button" onClick={() => setIsModalOpen(false)} className="px-6 py-3 rounded-2xl font-black text-slate-500 hover:bg-slate-100 transition-colors">Batal</button>
                <button type="submit" className="px-8 py-3 rounded-2xl font-black text-white bg-gradient-to-r from-blue-400 to-sky-400 hover:from-blue-500 hover:to-sky-500 shadow-lg shadow-blue-300/50 transition-all">Konfirmasi Kembali</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}