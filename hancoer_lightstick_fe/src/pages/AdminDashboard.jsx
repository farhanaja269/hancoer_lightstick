import { useState, useEffect } from 'react';
import axios from 'axios';

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    totalBarang: 0,
    totalStok: 0,
    pendapatan: 0,
    totalTransaksi: 0,
    totalPelanggan: 0,
  });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        // 1. Ambil data barang & stok dari API lightstick
        const resLightstick = await axios.get('http://localhost:3001/api/lightstick');
        const dataBarang = resLightstick.data.data;
        const totalBarang = dataBarang.length;
        const totalStok = dataBarang.reduce((sum, item) => sum + item.stok, 0);

        // 2. Ambil data pendapatan & transaksi dari API dashboard-stats
        const resStats = await axios.get('http://localhost:3001/api/dashboard-stats');
        const dataStats = resStats.data.data;

        setStats({
          totalBarang,
          totalStok,
          pendapatan: dataStats.pendapatan,
          totalTransaksi: dataStats.totalTransaksi,
          totalPelanggan: dataStats.totalPelanggan,
        });
      } catch (error) {
        console.error(error);
      }
    };
    fetchStats();
  }, []);

  const StatCard = ({ title, value, icon, bgClass, colorClass }) => (
    <div className={`${bgClass} p-8 rounded-[2rem] border-4 border-white shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300`}>
      <div className="flex justify-between items-start mb-6">
        <div className={`w-14 h-14 ${colorClass} rounded-2xl flex items-center justify-center shadow-sm`}>
          {icon}
        </div>
      </div>
      <div>
        <p className="text-sm font-black text-slate-500/80 mb-1 uppercase tracking-wider">{title}</p>
        <p className="text-3xl font-black text-slate-800">{value}</p>
      </div>
    </div>
  );

  // Format angka jadi Rupiah (misal: 1250000 jadi Rp 1.250.000)
  const formatRupiah = (angka) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
    }).format(angka);
  };

  return (
    <div>
      <div className="mb-10">
        <h1 className="text-4xl font-black text-slate-800 mb-2 tracking-tight">Ringkasan Toko 📈</h1>
        <p className="text-slate-500 font-medium text-lg">Pantau performa Hancoer Lightstick hari ini.</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard 
          title="Total Barang" 
          value={stats.totalBarang} 
          icon={<svg className="w-8 h-8 text-blue-700" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" /></svg>} 
          bgClass="bg-blue-100" 
          colorClass="bg-blue-200 text-blue-700" 
        />
        <StatCard 
          title="Stok Tersedia" 
          value={stats.totalStok} 
          icon={<svg className="w-8 h-8 text-emerald-700" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>} 
          bgClass="bg-emerald-100" 
          colorClass="bg-emerald-200 text-emerald-700" 
        />
        <StatCard 
          title="Total Pendapatan" 
          value={formatRupiah(stats.pendapatan)} 
          icon={<svg className="w-8 h-8 text-amber-700" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>} 
          bgClass="bg-amber-100" 
          colorClass="bg-amber-200 text-amber-700" 
        />
        <StatCard 
          title="Total Transaksi" 
          value={stats.totalTransaksi} 
          icon={<svg className="w-8 h-8 text-purple-700" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" /></svg>} 
          bgClass="bg-purple-100" 
          colorClass="bg-purple-200 text-purple-700" 
        />
      </div>

      {/* Tambahan: Total Pelanggan */}
      <div className="mt-8 bg-white border-4 border-pink-50 rounded-[2rem] p-6 flex items-center justify-between shadow-sm">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-pink-100 rounded-xl flex items-center justify-center text-pink-600">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" /></svg>
          </div>
          <div>
            <p className="text-xs font-black text-slate-400 uppercase tracking-wider">Total Pelanggan</p>
            <p className="text-2xl font-black text-slate-800">{stats.totalPelanggan} Orang</p>
          </div>
        </div>
        <p className="text-sm font-bold text-emerald-500 bg-emerald-50 px-4 py-2 rounded-xl hidden md:block">Data Real-time</p>
      </div>
    </div>
  );
}