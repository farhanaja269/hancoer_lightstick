import { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

export default function PetugasDashboard() {
  const [stats, setStats] = useState({ pinjamAktif: 0, kembali: 0, total: 0 });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get('http://localhost:3001/api/peminjaman');
        const data = res.data.data;
        setStats({
          total: data.length,
          pinjamAktif: data.filter(p => p.status === 'disetujui' || p.status === 'dipinjam').length,
          kembali: data.filter(p => p.status === 'dikembalikan').length
        });
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-black text-blue-900 tracking-tight">Dashboard Petugas 📊</h1>
        <p className="text-blue-500 font-medium mt-1">Ringkasan aktivitas peminjaman hari ini.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white p-6 rounded-[2rem] border-4 border-blue-50 shadow-sm flex items-center gap-4">
          <div className="w-14 h-14 bg-sky-100 text-sky-500 rounded-2xl flex items-center justify-center">
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" /></svg>
          </div>
          <div><p className="text-xs font-black text-slate-400 uppercase tracking-wider">Total Transaksi</p><p className="text-3xl font-black text-blue-900">{stats.total}</p></div>
        </div>
        <div className="bg-white p-6 rounded-[2rem] border-4 border-blue-50 shadow-sm flex items-center gap-4">
          <div className="w-14 h-14 bg-blue-100 text-blue-500 rounded-2xl flex items-center justify-center">
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
          </div>
          <div><p className="text-xs font-black text-slate-400 uppercase tracking-wider">Sedang Dipinjam</p><p className="text-3xl font-black text-blue-900">{stats.pinjamAktif}</p></div>
        </div>
        <div className="bg-white p-6 rounded-[2rem] border-4 border-blue-50 shadow-sm flex items-center gap-4">
          <div className="w-14 h-14 bg-emerald-100 text-emerald-500 rounded-2xl flex items-center justify-center">
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
          </div>
          <div><p className="text-xs font-black text-slate-400 uppercase tracking-wider">Selesai Kembali</p><p className="text-3xl font-black text-blue-900">{stats.kembali}</p></div>
        </div>
      </div>

      <div className="bg-gradient-to-r from-blue-500 to-sky-400 p-8 rounded-[2rem] shadow-xl text-white flex flex-col md:flex-row justify-between items-center gap-4">
        <div>
          <h2 className="text-2xl font-black mb-2">Siap cetak laporan?</h2>
          <p className="text-blue-50 font-medium">Lihat dan cetak data peminjaman yang sudah selesai.</p>
        </div>
        <Link to="/petugas/laporan" className="bg-white text-blue-600 px-8 py-3 rounded-2xl font-black hover:bg-blue-50 transition-colors shadow-lg">
          Ke Halaman Laporan
        </Link>
      </div>
    </div>
  );
}