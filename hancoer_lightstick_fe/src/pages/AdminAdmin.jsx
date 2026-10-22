import { useState, useEffect } from 'react';
import axios from 'axios';

export default function AdminAdmin() {
  const [admins, setAdmins] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [message, setMessage] = useState('');
  const [showPassword, setShowPassword] = useState(false); // State lihat password
  
  const [formData, setFormData] = useState({
    nama: '', email: '', password: '', no_hp: '', alamat: ''
  });

  const fetchAdmin = async () => {
    try {
      const response = await axios.get('http://localhost:3001/api/admin');
      setAdmins(response.data.data);
    } catch (error) {
      console.error("Gagal ambil data", error);
    }
  };

  useEffect(() => {
    fetchAdmin();
  }, []);

  const handleOpenModal = (item = null) => {
    setShowPassword(false); // Reset hide password pas buka modal
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
    setIsModalOpen(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingId) {
        await axios.put(`http://localhost:3001/api/admin/${editingId}`, formData);
        setMessage('Data admin berhasil diupdate!');
      } else {
        await axios.post('http://localhost:3001/api/admin', formData);
        setMessage('Admin baru berhasil ditambahkan!');
      }
      
      setTimeout(() => {
        setIsModalOpen(false);
        fetchAdmin();
      }, 1000);
      
    } catch (error) {
      setMessage(error.response?.data?.message || 'Gagal menyimpan data.');
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Yakin ingin menghapus admin ini?")) {
      try {
        await axios.delete(`http://localhost:3001/api/admin/${id}`);
        fetchAdmin();
      } catch (error) {
        alert("Gagal menghapus data.");
      }
    }
  };

  return (
    <div>
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-black text-pink-600 tracking-tight">Data Admin 👑</h1>
          <p className="text-slate-500 font-medium mt-1">Kelola akun dengan akses penuh ke sistem.</p>
        </div>
        <button 
          onClick={() => handleOpenModal()}
          className="bg-gradient-to-r from-pink-400 to-rose-400 text-white px-6 py-3 rounded-2xl font-black hover:from-pink-500 hover:to-rose-500 transition-all shadow-lg shadow-pink-300/50 flex items-center gap-2"
        >
          <span>+</span> Tambah Admin
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
              {admins.map((item, index) => (
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
              {admins.length === 0 && (
                <tr><td colSpan="5" className="p-12 text-center text-pink-400 font-medium">Belum ada data admin.</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-pink-900/30 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-[2.5rem] p-8 w-full max-w-lg shadow-2xl border-4 border-pink-100 max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-black text-pink-600">{editingId ? 'Edit Admin ✨' : 'Tambah Admin ✨'}</h2>
              <button onClick={() => setIsModalOpen(false)} className="text-slate-400 hover:text-rose-500 font-black text-2xl">&times;</button>
            </div>
            
            {message && (
              <div className={`mb-6 text-sm font-bold p-4 rounded-2xl flex items-center justify-center gap-2 border-2 ${
                message.includes('berhasil') ? 'bg-emerald-50 text-emerald-600 border-emerald-100' : 'bg-rose-50 text-rose-600 border-rose-100'
              }`}>
                {message.includes('berhasil') ? '✅' : '⚠️'} {message}
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

              {/* PASSWORD DENGAN TOGGLE MATA */}
              <div>
                <label className="block text-sm font-black text-slate-700 mb-2">
                  Password {editingId && <span className="text-xs text-slate-400 font-normal">(Biarkan kosong jika tidak ingin diubah)</span>}
                </label>
                <div className="relative">
                  <input 
                    type={showPassword ? "text" : "password"} 
                    value={formData.password} 
                    onChange={e => setFormData({...formData, password: e.target.value})} 
                    className="w-full p-3.5 bg-slate-50 border-2 border-slate-200 rounded-2xl focus:border-pink-400 focus:bg-white outline-none transition-all pr-12" 
                    placeholder={editingId ? "••••••••" : "Minimal 6 karakter"} 
                    required={!editingId} 
                  />
                  <button 
                    type="button" 
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-pink-400 hover:text-pink-600 transition-colors"
                  >
                    {showPassword ? (
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>
                    ) : (
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" /></svg>
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