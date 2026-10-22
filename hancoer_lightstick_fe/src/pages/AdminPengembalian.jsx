import { useState, useEffect } from 'react';
import axios from 'axios';

export default function AdminPengembalian() {
  const [pengembalians, setPengembalians] = useState([]);
  
  // State untuk Modal Edit
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [formData, setFormData] = useState({
    kondisi_lightstick: 'baik',
    denda: 0,
    keterangan: ''
  });

  const fetchPengembalian = async () => {
    try {
      // Ambil data dari API pengembalian
      const response = await axios.get('http://localhost:3001/api/pengembalian');
      setPengembalians(response.data.data);
    } catch (error) {
      console.error("Gagal ambil data", error);
    }
  };

  useEffect(() => {
    fetchPengembalian();
  }, []);

  // Buka Modal Edit
  const handleOpenEdit = (item) => {
    setSelectedItem(item);
    setFormData({
      kondisi_lightstick: item.kondisi_lightstick,
      denda: item.denda,
      keterangan: item.keterangan || ''
    });
    setIsModalOpen(true);
  };

  // Simpan Perubahan
  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:3001/api/pengembalian/${selectedItem.id_pengembalian}`, formData);
      alert('Data berhasil diupdate!');
      setIsModalOpen(false);
      fetchPengembalian();
    } catch (error) {
      alert(error.response?.data?.message || "Gagal update data");
    }
  };

  // Hapus Data
  const handleDelete = async (id) => {
    if (window.confirm('Yakin ingin menghapus riwayat ini?')) {
      try {
        await axios.delete(`http://localhost:3001/api/pengembalian/${id}`);
        alert('Data berhasil dihapus!');
        fetchPengembalian();
      } catch (error) {
        alert(error.response?.data?.message || "Gagal menghapus data");
      }
    }
  };

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-black text-pink-600 tracking-tight">Riwayat Pengembalian ✅</h1>
        <p className="text-slate-500 font-medium mt-1">Daftar lightstick yang sudah selesai disewa beserta rincian denda.</p>
      </div>

      <div className="bg-white rounded-[2rem] border-4 border-pink-50 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-pink-50/50 border-b-2 border-pink-100 text-sm font-black text-pink-700">
                <th className="p-4">Peminjam</th>
                <th className="p-4">Barang</th>
                <th className="p-4">Tgl Pinjam</th>
                <th className="p-4">Kondisi</th>
                <th className="p-4">Denda</th>
                <th className="p-4">Keterangan</th>
                <th className="p-4 text-center">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-pink-50 text-sm">
              {pengembalians.map((item) => (
                <tr key={item.id_pengembalian} className="hover:bg-pink-50/30 transition-colors">
                  <td className="p-4">
                    <p className="font-bold text-slate-800">{item.nama_user}</p>
                    <p className="text-xs text-slate-500">{item.no_hp}</p>
                  </td>
                  <td className="p-4">
                    <p className="font-bold text-slate-800">{item.nama_lightstick}</p>
                    <span className="text-[10px] font-black uppercase text-purple-600 bg-purple-100 px-2 py-0.5 rounded-full mt-1 inline-block">
                      Selesai
                    </span>
                  </td>
                  <td className="p-4">
                    <p className="text-xs text-slate-600 font-medium">
                      {new Date(item.tanggal_peminjaman).toLocaleDateString('id-ID')}
                    </p>
                  </td>
                  <td className="p-4">
                    <span className={`px-2.5 py-1 rounded-lg text-xs font-bold uppercase ${
                      item.kondisi_lightstick === 'baik' ? 'bg-emerald-100 text-emerald-700' : 
                      item.kondisi_lightstick === 'rusak' ? 'bg-rose-100 text-rose-700' : 
                      'bg-slate-100 text-slate-700'
                    }`}>
                      {item.kondisi_lightstick}
                    </span>
                  </td>
                  <td className="p-4">
                    <p className={`font-black ${item.denda > 0 ? 'text-rose-500' : 'text-emerald-600'}`}>
                      Rp {Number(item.denda || 0).toLocaleString('id-ID')}
                    </p>
                  </td>
                  <td className="p-4">
                    <p className="text-xs text-slate-500 max-w-[150px] truncate" title={item.keterangan}>
                      {item.keterangan || '-'}
                    </p>
                  </td>
                  <td className="p-4 text-center space-x-2">
                    <button 
                      onClick={() => handleOpenEdit(item)} 
                      className="bg-blue-500 text-white px-3 py-1.5 rounded-lg text-xs font-bold hover:bg-blue-600 transition-colors"
                    >
                      Edit
                    </button>
                    <button 
                      onClick={() => handleDelete(item.id_pengembalian)} 
                      className="bg-rose-500 text-white px-3 py-1.5 rounded-lg text-xs font-bold hover:bg-rose-600 transition-colors"
                    >
                      Hapus
                    </button>
                  </td>
                </tr>
              ))}
              {pengembalians.length === 0 && (
                <tr><td colSpan="7" className="p-12 text-center text-pink-400 font-medium">Belum ada riwayat pengembalian.</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* MODAL EDIT */}
      {isModalOpen && selectedItem && (
        <div className="fixed inset-0 bg-pink-900/30 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-[2.5rem] p-8 w-full max-w-md shadow-2xl border-4 border-pink-100">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-black text-pink-600">Edit Data Pengembalian</h2>
              <button onClick={() => setIsModalOpen(false)} className="text-slate-400 hover:text-rose-500 font-black text-2xl">&times;</button>
            </div>
            
            <div className="bg-pink-50 p-4 rounded-2xl mb-6 border border-pink-100">
              <p className="text-sm text-slate-600">Barang: <span className="font-bold text-slate-900">{selectedItem.nama_lightstick}</span></p>
              <p className="text-sm text-slate-600">Peminjam: <span className="font-bold text-slate-900">{selectedItem.nama_user}</span></p>
            </div>

            <form onSubmit={handleUpdate} className="space-y-4">
              <div>
                <label className="block text-sm font-black text-slate-700 mb-2">Kondisi Lightstick</label>
                <select 
                  value={formData.kondisi_lightstick} 
                  onChange={e => setFormData({...formData, kondisi_lightstick: e.target.value})} 
                  className="w-full p-3.5 bg-slate-50 border-2 border-slate-200 rounded-2xl focus:border-pink-400 focus:bg-white outline-none"
                >
                  <option value="baik">Baik (Normal)</option>
                  <option value="rusak">Rusak (Ada kerusakan)</option>
                  <option value="hilang">Hilang</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-black text-slate-700 mb-2">Denda (Rp)</label>
                <input 
                  type="number" 
                  value={formData.denda} 
                  onChange={e => setFormData({...formData, denda: e.target.value})} 
                  className="w-full p-3.5 bg-slate-50 border-2 border-slate-200 rounded-2xl focus:border-pink-400 focus:bg-white outline-none" 
                />
              </div>

              <div>
                <label className="block text-sm font-black text-slate-700 mb-2">Keterangan</label>
                <textarea 
                  value={formData.keterangan} 
                  onChange={e => setFormData({...formData, keterangan: e.target.value})} 
                  className="w-full p-3.5 bg-slate-50 border-2 border-slate-200 rounded-2xl focus:border-pink-400 focus:bg-white outline-none resize-none" 
                  rows="2" 
                ></textarea>
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t-2 border-pink-50">
                <button type="button" onClick={() => setIsModalOpen(false)} className="px-6 py-3 rounded-2xl font-black text-slate-500 hover:bg-slate-100 transition-colors">Batal</button>
                <button type="submit" className="px-8 py-3 rounded-2xl font-black text-white bg-gradient-to-r from-pink-400 to-rose-400 hover:from-pink-500 hover:to-rose-500 shadow-lg shadow-pink-300/50 transition-all">
                  Simpan Perubahan
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}