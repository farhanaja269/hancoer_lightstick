import { useState, useEffect } from 'react';
import axios from 'axios';
import { supabase } from '../supabaseClient';

export default function AdminLightstick() {
  const [lightsticks, setLightsticks] = useState([]);
  const [kategoris, setKategoris] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  
  const [formData, setFormData] = useState({
    nama_lightstick: '', id_kategori: '', warna: '', stok: 0, harga_sewa: 0, status: 'tersedia', deskripsi: '', featured: 0, foto: ''
  });

  const [uploading, setUploading] = useState(false);

  const fetchData = async () => {
    try {
      const [resLight, resKat] = await Promise.all([
        axios.get('http://localhost:3001/api/lightstick'),
        axios.get('http://localhost:3001/api/kategori')
      ]);
      setLightsticks(resLight.data.data);
      setKategoris(resKat.data.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => { fetchData(); }, []);

  const handleOpenModal = (item = null) => {
    if (item) {
      setEditingId(item.id_lightstick);
      setFormData({
        nama_lightstick: item.nama_lightstick,
        id_kategori: item.id_kategori,
        warna: item.warna || '',
        stok: item.stok,
        harga_sewa: item.harga_sewa,
        status: item.status,
        deskripsi: item.deskripsi || '',
        featured: item.featured || 0,
        foto: item.foto || ''
      });
    } else {
      setEditingId(null);
      setFormData({ nama_lightstick: '', id_kategori: '', warna: '', stok: 0, harga_sewa: 0, status: 'tersedia', deskripsi: '', featured: 0, foto: '' });
    }
    setIsModalOpen(true);
  };

  const handleUploadFoto = async (e) => {
    try {
      setUploading(true);
      const file = e.target.files[0];
      if (!file) return;

      const fileExt = file.name.split('.').pop();
      const fileName = `${Date.now()}.${fileExt}`;
      const filePath = `${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from('lightstick')
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      const { data } = supabase.storage
        .from('lightstick')
        .getPublicUrl(filePath);

      setFormData({ ...formData, foto: data.publicUrl });
      alert('Foto berhasil diupload!');
    } catch (error) {
      alert('Error uploading image: ' + error.message);
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingId) {
        await axios.put(`http://localhost:3001/api/lightstick/${editingId}`, formData);
      } else {
        await axios.post('http://localhost:3001/api/lightstick', formData);
      }
      setIsModalOpen(false);
      fetchData(); 
    } catch (error) {
      alert("Gagal menyimpan data: " + error.message);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Yakin ingin menghapus lightstick ini?")) {
      try {
        await axios.delete(`http://localhost:3001/api/lightstick/${id}`);
        fetchData();
      } catch (error) {
        alert("Gagal menghapus data");
      }
    }
  };

  return (
    <div>
      {/* HEADER HALAMAN */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-black text-pink-600 tracking-tight">Data Lightstick 💡</h1>
          <p className="text-slate-500 font-medium mt-1">Kelola inventaris lightstick toko dengan manis.</p>
        </div>
        <button 
          onClick={() => handleOpenModal()}
          className="bg-gradient-to-r from-pink-400 to-rose-400 text-white px-6 py-3 rounded-2xl font-black hover:from-pink-500 hover:to-rose-500 transition-all shadow-lg shadow-pink-300/50 flex items-center gap-2"
        >
          <span>+</span> Tambah Lightstick
        </button>
      </div>

      {/* TABEL */}
      <div className="bg-white rounded-[2rem] border-4 border-pink-50 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-pink-50/50 border-b-2 border-pink-100 text-sm font-black text-pink-700">
                <th className="p-4">Foto</th>
                <th className="p-4">Nama Lightstick</th>
                <th className="p-4">Kategori</th>
                <th className="p-4">Stok</th>
                <th className="p-4">Harga Sewa</th>
                <th className="p-4">Status</th>
                <th className="p-4 text-center">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-pink-50">
              {lightsticks.map((item) => (
                <tr key={item.id_lightstick} className="hover:bg-pink-50/30 transition-colors">
                  <td className="p-4">
                    <div className="w-16 h-16 rounded-2xl bg-slate-100 border-2 border-white shadow-sm overflow-hidden">
                      {item.foto ? (
                        <img src={item.foto} alt={item.nama_lightstick} className="w-full h-full object-cover" />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-slate-400 text-xs">No Img</div>
                      )}
                    </div>
                  </td>
                  <td className="p-4">
                    <p className="font-bold text-slate-800">{item.nama_lightstick}</p>
                    <p className="text-xs text-slate-500">{item.warna} • {item.ukuran}</p>
                  </td>
                  <td className="p-4">
                    <span className="bg-purple-100 text-purple-700 px-3 py-1 rounded-full text-xs font-bold">
                      {item.nama_kategori || '-'}
                    </span>
                  </td>
                  <td className="p-4 font-bold text-slate-600">{item.stok}</td>
                  <td className="p-4 font-bold text-pink-600">Rp {Number(item.harga_sewa).toLocaleString('id-ID')}</td>
                  
                  {/* LOGIKA BADGE STATUS BARU: Ngecek stok dulu */}
                  <td className="p-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                      item.stok > 0 ? 'bg-emerald-100 text-emerald-700' : 'bg-rose-100 text-rose-700'
                    }`}>
                      {item.stok > 0 ? 'Tersedia' : 'Habis'}
                    </span>
                  </td>

                  <td className="p-4 text-center space-x-2">
                    <button 
                      onClick={() => handleOpenModal(item)} 
                      className="p-2 bg-blue-50 text-blue-500 rounded-xl hover:bg-blue-100 transition-colors"
                      title="Edit"
                    >
                      <svg className="w-5 h-5 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path></svg>
                    </button>
                    <button 
                      onClick={() => handleDelete(item.id_lightstick)} 
                      className="p-2 bg-rose-50 text-rose-500 rounded-xl hover:bg-rose-100 transition-colors"
                      title="Hapus"
                    >
                      <svg className="w-5 h-5 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>
                    </button>
                  </td>
                </tr>
              ))}
              {lightsticks.length === 0 && (
                <tr><td colSpan="7" className="p-12 text-center text-pink-400 font-medium">Belum ada data lightstick.</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* MODAL FORM */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-pink-900/30 backdrop-blur-sm flex items-center justify-center z-50 p-4 sm:p-6">
          <div className="bg-white rounded-[2.5rem] w-full max-w-3xl shadow-2xl border-4 border-pink-100 flex flex-col max-h-[90vh]">
            
            <div className="flex justify-between items-center p-6 sm:px-8 border-b-2 border-pink-50 bg-pink-50/30 rounded-t-[2.2rem]">
              <h2 className="text-2xl font-black text-pink-600 flex items-center gap-2">
                {editingId ? 'Edit Lightstick' : 'Tambah Lightstick Baru'}
                <span className="text-xl">✨</span>
              </h2>
              <button 
                onClick={() => setIsModalOpen(false)} 
                className="w-10 h-10 flex items-center justify-center rounded-full bg-white text-pink-400 hover:text-white hover:bg-rose-400 shadow-sm transition-all text-2xl font-bold"
              >
                &times;
              </button>
            </div>
            
            <div className="p-6 sm:p-8 overflow-y-auto custom-scrollbar">
              <form id="lightstickForm" onSubmit={handleSubmit} className="space-y-6">
                
                <div className="bg-pink-50/50 p-6 rounded-3xl border-2 border-pink-100 flex flex-col sm:flex-row gap-6 items-center">
                  <div className="w-32 h-32 bg-white rounded-3xl border-2 border-pink-200 flex-shrink-0 overflow-hidden flex items-center justify-center shadow-sm relative group">
                    {formData.foto ? (
                      <img src={formData.foto} alt="Preview" className="w-full h-full object-cover" />
                    ) : (
                      <span className="text-pink-300 text-sm font-bold">Preview Foto</span>
                    )}
                  </div>
                  <div className="flex-1 w-full">
                    <label className="block text-sm font-black text-pink-700 mb-2">Upload Foto Lightstick</label>
                    <input 
                      type="file" 
                      accept="image/*"
                      onChange={handleUploadFoto}
                      disabled={uploading}
                      className="w-full p-2 bg-white border-2 border-pink-100 rounded-xl focus:border-pink-400 outline-none transition-all text-sm file:mr-4 file:py-2.5 file:px-5 file:rounded-full file:border-0 file:text-sm file:font-bold file:bg-pink-100 file:text-pink-700 hover:file:bg-pink-200" 
                    />
                    {uploading && <p className="text-xs text-pink-500 mt-2 font-bold animate-pulse">⏳ Sedang mengupload...</p>}
                    {formData.foto && !uploading && <p className="text-xs text-emerald-500 mt-2 font-bold">✅ Foto siap disimpan!</p>}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-black text-slate-700 mb-2">Nama Lightstick</label>
                    <input 
                      type="text" 
                      value={formData.nama_lightstick} 
                      onChange={e => setFormData({...formData, nama_lightstick: e.target.value})} 
                      className="w-full p-3.5 bg-slate-50 border-2 border-slate-200 rounded-2xl focus:border-pink-400 focus:bg-white outline-none transition-all" 
                      placeholder="Contoh: Lightstick Blackpink"
                      required 
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-black text-slate-700 mb-2">Kategori</label>
                    <select 
                      value={formData.id_kategori} 
                      onChange={e => setFormData({...formData, id_kategori: e.target.value})} 
                      className="w-full p-3.5 bg-slate-50 border-2 border-slate-200 rounded-2xl focus:border-pink-400 focus:bg-white outline-none transition-all" 
                      required
                    >
                      <option value="">Pilih Kategori</option>
                      {kategoris.map(k => <option key={k.id_kategori} value={k.id_kategori}>{k.nama_kategori}</option>)}
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-black text-slate-700 mb-2">Warna</label>
                    <input 
                      type="text" 
                      value={formData.warna} 
                      onChange={e => setFormData({...formData, warna: e.target.value})} 
                      className="w-full p-3.5 bg-slate-50 border-2 border-slate-200 rounded-2xl focus:border-pink-400 focus:bg-white outline-none" 
                      placeholder="Pink, Blue, dll" 
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-black text-slate-700 mb-2">Status (Manual)</label>
                    <select 
                      value={formData.status} 
                      onChange={e => setFormData({...formData, status: e.target.value})} 
                      className="w-full p-3.5 bg-slate-50 border-2 border-slate-200 rounded-2xl focus:border-pink-400 focus:bg-white outline-none"
                    >
                      <option value="tersedia">Tersedia</option>
                      <option value="tidak tersedia">Tidak Tersedia</option>
                      <option value="maintenance">Maintenance</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-black text-slate-700 mb-2">Stok Tersedia</label>
                    <input 
                      type="number" 
                      value={formData.stok} 
                      onChange={e => setFormData({...formData, stok: e.target.value})} 
                      className="w-full p-3.5 bg-slate-50 border-2 border-slate-200 rounded-2xl focus:border-pink-400 focus:bg-white outline-none" 
                      required 
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-black text-slate-700 mb-2">Harga Sewa (Rp)</label>
                    <input 
                      type="number" 
                      value={formData.harga_sewa} 
                      onChange={e => setFormData({...formData, harga_sewa: e.target.value})} 
                      className="w-full p-3.5 bg-slate-50 border-2 border-slate-200 rounded-2xl focus:border-pink-400 focus:bg-white outline-none" 
                      required 
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-black text-slate-700 mb-2">Deskripsi</label>
                  <textarea 
                    value={formData.deskripsi} 
                    onChange={e => setFormData({...formData, deskripsi: e.target.value})} 
                    className="w-full p-3.5 bg-slate-50 border-2 border-slate-200 rounded-2xl focus:border-pink-400 focus:bg-white outline-none resize-none" 
                    rows="3" 
                    placeholder="Tuliskan deskripsi singkat lightstick..."
                  ></textarea>
                </div>

              </form>
            </div>

            <div className="p-6 sm:px-8 border-t-2 border-pink-50 bg-slate-50/50 rounded-b-[2.2rem] flex justify-end gap-3">
              <button 
                type="button" 
                onClick={() => setIsModalOpen(false)} 
                className="px-6 py-3 rounded-2xl font-black text-slate-500 hover:bg-slate-200 transition-colors"
              >
                Batal
              </button>
              <button 
                type="submit" 
                form="lightstickForm"
                disabled={uploading} 
                className="px-8 py-3 rounded-2xl font-black text-white bg-gradient-to-r from-pink-400 to-rose-400 hover:from-pink-500 hover:to-rose-500 shadow-lg shadow-pink-300/50 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
              >
                {uploading ? 'Menyimpan...' : 'Simpan Data ✨'}
              </button>
            </div>

          </div>
        </div>
      )}
    </div>
  );
}