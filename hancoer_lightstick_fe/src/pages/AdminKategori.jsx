import { useState, useEffect } from 'react';
import axios from 'axios';

export default function AdminKategori() {
  const [kategoris, setKategoris] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [namaKategori, setNamaKategori] = useState('');
  const [message, setMessage] = useState('');

  const fetchKategori = async () => {
    try {
      const response = await axios.get('http://localhost:3001/api/kategori');
      setKategoris(response.data.data);
    } catch (error) {
      console.error("Gagal ambil data", error);
    }
  };

  useEffect(() => {
    fetchKategori();
  }, []);

  const handleOpenModal = (item = null) => {
    if (item) {
      setEditingId(item.id_kategori);
      setNamaKategori(item.nama_kategori);
    } else {
      setEditingId(null);
      setNamaKategori('');
    }
    setMessage('');
    setIsModalOpen(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingId) {
        await axios.put(`http://localhost:3001/api/kategori/${editingId}`, { nama_kategori: namaKategori });
        setMessage('Kategori berhasil diupdate!');
      } else {
        await axios.post('http://localhost:3001/api/kategori', { nama_kategori: namaKategori });
        setMessage('Kategori berhasil ditambahkan!');
      }
      
      // Delay sedikit agar user bisa lihat pesan sukses
      setTimeout(() => {
        setIsModalOpen(false);
        fetchKategori();
      }, 1000);
      
    } catch (error) {
      setMessage('Gagal menyimpan data. Coba lagi.');
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Yakin ingin menghapus kategori ini?")) {
      try {
        await axios.delete(`http://localhost:3001/api/kategori/${id}`);
        fetchKategori();
      } catch (error) {
        alert("Gagal menghapus data. Pastikan kategori ini tidak sedang dipakai oleh lightstick.");
      }
    }
  };

  return (
    <div>
      {/* HEADER HALAMAN */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-black text-pink-600 tracking-tight">Kategori 🏷️</h1>
          <p className="text-slate-500 font-medium mt-1">Kelola jenis-jenis lightstick dengan manis.</p>
        </div>
        <button 
          onClick={() => handleOpenModal()}
          className="bg-gradient-to-r from-pink-400 to-rose-400 text-white px-6 py-3 rounded-2xl font-black hover:from-pink-500 hover:to-rose-500 transition-all shadow-lg shadow-pink-300/50 flex items-center gap-2"
        >
          <span>+</span> Tambah Kategori
        </button>
      </div>

      {/* TABEL KATEGORI */}
      <div className="bg-white rounded-[2rem] border-4 border-pink-50 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-pink-50/50 border-b-2 border-pink-100 text-sm font-black text-pink-700">
                <th className="p-5 w-16 text-center">No</th>
                <th className="p-5">Nama Kategori</th>
                <th className="p-5 text-center">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-pink-50">
              {kategoris.map((item, index) => (
                <tr key={item.id_kategori} className="hover:bg-pink-50/30 transition-colors group">
                  <td className="p-5 text-center font-bold text-slate-400">{index + 1}</td>
                  <td className="p-5">
                    <span className="bg-purple-100 text-purple-700 px-4 py-2 rounded-xl font-bold text-sm shadow-sm inline-block">
                      {item.nama_kategori}
                    </span>
                  </td>
                  <td className="p-5 text-center space-x-2">
                    <button 
                      onClick={() => handleOpenModal(item)} 
                      className="p-2 bg-blue-50 text-blue-500 rounded-xl hover:bg-blue-100 transition-colors"
                      title="Edit"
                    >
                      <svg className="w-5 h-5 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path></svg>
                    </button>
                    <button 
                      onClick={() => handleDelete(item.id_kategori)} 
                      className="p-2 bg-rose-50 text-rose-500 rounded-xl hover:bg-rose-100 transition-colors"
                      title="Hapus"
                    >
                      <svg className="w-5 h-5 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>
                    </button>
                  </td>
                </tr>
              ))}
              {kategoris.length === 0 && (
                <tr><td colSpan="3" className="p-12 text-center text-pink-400 font-medium">Belum ada data kategori.</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* MODAL FORM CUTE */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-pink-900/30 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-[2.5rem] p-8 w-full max-w-md shadow-2xl border-4 border-pink-100">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-black text-pink-600">{editingId ? 'Edit Kategori ✨' : 'Tambah Kategori ✨'}</h2>
              <button onClick={() => setIsModalOpen(false)} className="text-slate-400 hover:text-rose-500 font-black text-2xl">&times;</button>
            </div>
            
            {message && (
              <div className={`mb-6 text-sm font-bold p-4 rounded-2xl flex items-center justify-center gap-2 border-2 ${
                message.includes('berhasil') ? 'bg-emerald-50 text-emerald-600 border-emerald-100' : 'bg-rose-50 text-rose-600 border-rose-100'
              }`}>
                {message.includes('berhasil') ? '✅' : '⚠️'} {message}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-black text-slate-700 mb-2">Nama Kategori</label>
                <input 
                  type="text" 
                  value={namaKategori} 
                  onChange={e => setNamaKategori(e.target.value)} 
                  className="w-full p-4 bg-slate-50 border-2 border-slate-200 rounded-2xl focus:border-pink-400 focus:bg-white outline-none transition-all text-lg font-bold" 
                  placeholder="Contoh: Official, Fanmade..."
                  required 
                  autoFocus
                />
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t-2 border-pink-50">
                <button type="button" onClick={() => setIsModalOpen(false)} className="px-6 py-3 rounded-2xl font-black text-slate-500 hover:bg-slate-100 transition-colors">Batal</button>
                <button type="submit" className="px-8 py-3 rounded-2xl font-black text-white bg-gradient-to-r from-pink-400 to-rose-400 hover:from-pink-500 hover:to-rose-500 shadow-lg shadow-pink-300/50 transition-all">
                  Simpan ✨
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}