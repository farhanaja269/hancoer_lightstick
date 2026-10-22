import { useState, useEffect } from 'react';
import axios from 'axios';

export default function AdminPelanggan() {
  const [pelanggans, setPelanggans] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [message, setMessage] = useState('');
  
  // State Lihat Password
  const [showPassword, setShowPassword] = useState(false);

  const [formData, setFormData] = useState({
    nama: '', email: '', password: '', no_hp: '', alamat: ''
  });

  const fetchPelanggan = async () => {
    try {
      const response = await axios.get('http://localhost:3001/api/pelanggan');
      setPelanggans(response.data.data);
    } catch (error) {
      console.error("Gagal ambil data", error);
    }
  };

  useEffect(() => {
    fetchPelanggan();
  }, []);

  const handleOpenModal = (item = null) => {
    if (item) {
      setEditingId(item.id_users);
      setFormData({
        nama: item.nama,
        email: item.email,
        password: '',
        no_hp: item.no_hp || '',
        alamat: item.alamat || ''
      });
    } else {
      setEditingId(null);
      setFormData({ nama: '', email: '', password: '', no_hp: '', alamat: '' });
    }
    setMessage('');
    setShowPassword(false); // Reset mata saat buka modal
    setIsModalOpen(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingId) {
        await axios.put(`http://localhost:3001/api/pelanggan/${editingId}`, formData);
        setMessage('Data pelanggan berhasil diupdate!');
      } else {
        await axios.post('http://localhost:3001/api/pelanggan', formData);
        setMessage('Pelanggan baru berhasil ditambahkan!');
      }
      
      setTimeout(() => {
        setIsModalOpen(false);
        fetchPelanggan();
      }, 1000);
      
    } catch (error) {
      setMessage(error.response?.data?.message || 'Gagal menyimpan data.');
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Yakin ingin menghapus pelanggan ini?")) {
      try {
        await axios.delete(`http://localhost:3001/api/pelanggan/${id}`);
        fetchPelanggan();
      } catch (error) {
        alert("Gagal menghapus data. Pastikan pelanggan ini tidak memiliki riwayat peminjaman.");
      }
    }
  };

  return (
    <div>
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-black text-pink-600 tracking-tight">Data Pelanggan 👥</h1>
          <p className="text-slate-500 font-medium mt-1">Kelola akun pelanggan (Peminjam) dengan manis.</p>
        </div>
        <button 
          onClick={() => handleOpenModal()}
          className="bg-gradient-to-r from-pink-400 to-rose-400 text-white px-6 py-3 rounded-2xl font-black hover:from-pink-500 hover:to-rose-500 transition-all shadow-lg shadow-pink-300/50 flex items-center gap-2"
        >
          <span>+</span> Tambah Pelanggan
        </button>
      </div>

      <div className="bg-white rounded-[2rem] border-4 border-pink-50 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-pink-50/50 border-b-2 border-pink-100 text-sm font-black text-pink-700">
                <th className="p-4 w-12 text-center">No</th>
                <th className="p-4">Nama</th>
                <th className="p-4">Kontak</th>
                <th className="p-4">Alamat</th>
                <th className="p-4 text-center">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-pink-50 text-sm">
              {pelanggans.map((item, index) => (
                <tr key={item.id_users} className="hover:bg-pink-50/30 transition-colors group">
                  <td className="p-4 text-center font-bold text-slate-400">{index + 1}</td>
                  <td className="p-4">
                    <p className="font-bold text-slate-800">{item.nama}</p>
                    <p className="text-xs text-slate-500">{item.email}</p>
                  </td>
                  <td className="p-4 font-bold text-slate-600">{item.no_hp || '-'}</td>
                  <td className="p-4 text-slate-500 max-w-xs truncate">{item.alamat || '-'}</td>
                  <td className="p-4 text-center space-x-2">
                    <button onClick={() => handleOpenModal(item)} className="p-2 bg-blue-50 text-blue-500 rounded-xl hover:bg-blue-100 transition-colors" title="Edit">
                      <svg className="w-5 h-5 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path></svg>
                    </button>
                    <button onClick={() => handleDelete(item.id_users)} className="p-2 bg-rose-50 text-rose-500 rounded-xl hover:bg-rose-100 transition-colors" title="Hapus">
                      <svg className="w-5 h-5 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>
                    </button>
                  </td>
                </tr>
              ))}
              {pelanggans.length === 0 && (
                <tr><td colSpan="5" className="p-12 text-center text-pink-400 font-medium">Belum ada data pelanggan.</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-pink-900/30 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-[2.5rem] p-8 w-full max-w-lg shadow-2xl border-4 border-pink-100 max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-black text-pink-600">{editingId ? 'Edit Pelanggan ✨' : 'Tambah Pelanggan ✨'}</h2>
              <button onClick={() => setIsModalOpen(false)} className="text-slate-400 hover:text-rose-500 font-black text-2xl">&times;</button>
            </div>
            
            {message && (
              <div className={`mb-6 text-sm font-bold p-4 rounded-2xl flex items-center justify-center gap-2 border-2 ${
                message.includes('berhasil') ? 'bg-emerald-50 text-emerald-600 border-emerald-100' : 'bg-rose-50 text-rose-600 border-rose-100'
              }`}>
                {message}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-black text-slate-700 mb-2">Nama Lengkap</label>
                <input type="text" value={formData.nama} onChange={e => setFormData({...formData, nama: e.target.value})} className="w-full p-3.5 bg-slate-50 border-2 border-slate-200 rounded-2xl focus:border-pink-400 focus:bg-white outline-none transition-all" required />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-black text-slate-700 mb-2">Email</label>
                  <input type="email" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} className="w-full p-3.5 bg-slate-50 border-2 border-slate-200 rounded-2xl focus:border-pink-400 focus:bg-white outline-none transition-all" required />
                </div>
                <div>
                  <label className="block text-sm font-black text-slate-700 mb-2">No. HP</label>
                  <input type="text" value={formData.no_hp} onChange={e => setFormData({...formData, no_hp: e.target.value})} className="w-full p-3.5 bg-slate-50 border-2 border-slate-200 rounded-2xl focus:border-pink-400 focus:bg-white outline-none transition-all" />
                </div>
              </div>

              {/* INPUT PASSWORD DENGAN MATA */}
              <div>
                <label className="block text-sm font-black text-slate-700 mb-2">
                  Password {editingId && <span className="text-xs text-slate-400 font-normal">(Biarkan kosong jika tidak diubah)</span>}
                </label>
                <div className="relative">
                  <input 
                    type={showPassword ? "text" : "password"} 
                    value={formData.password} 
                    onChange={e => setFormData({...formData, password: e.target.value})} 
                    className="w-full p-3.5 pr-12 bg-slate-50 border-2 border-slate-200 rounded-2xl focus:border-pink-400 focus:bg-white outline-none transition-all" 
                    placeholder={editingId ? "••••••••" : "Minimal 6 karakter"} 
                    required={!editingId} 
                  />
                  <button 
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-4 flex items-center text-pink-400 hover:text-pink-600 transition-colors"
                  >
                    {showPassword ? (
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" /><path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                    ) : (
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88" /></svg>
                    )}
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-sm font-black text-slate-700 mb-2">Alamat Lengkap</label>
                <textarea value={formData.alamat} onChange={e => setFormData({...formData, alamat: e.target.value})} className="w-full p-3.5 bg-slate-50 border-2 border-slate-200 rounded-2xl focus:border-pink-400 focus:bg-white outline-none resize-none" rows="2" placeholder="Jalan, RT/RW, Kota..."></textarea>
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t-2 border-pink-50 mt-6">
                <button type="button" onClick={() => setIsModalOpen(false)} className="px-6 py-3 rounded-2xl font-black text-slate-500 hover:bg-slate-100 transition-colors">Batal</button>
                <button type="submit" className="px-8 py-3 rounded-2xl font-black text-white bg-gradient-to-r from-pink-400 to-rose-400 hover:from-pink-500 hover:to-rose-500 shadow-lg shadow-pink-300/50 transition-all">
                  Simpan Data ✨
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}