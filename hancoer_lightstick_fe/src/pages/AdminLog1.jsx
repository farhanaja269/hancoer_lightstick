import React, { useState, useEffect } from 'react';
import axios from 'axios';

function AdminLog() {
  const [logs, setLogs] = useState([]);

  const fetchLog = async () => {
    try {
      const response = await axios.get('http://localhost:3001/api/log');
      setLogs(response.data.data);
    } catch (error) {
      console.error("Gagal ambil data log:", error);
    }
  };

  useEffect(() => {
    fetchLog();
  }, []);

  const formatWaktu = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleString('id-ID', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div>
      {/* HEADER HALAMAN */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-black text-pink-600 tracking-tight">
            Log Aktivitas 📝
          </h1>
          <p className="text-slate-500 font-medium mt-1">
            Rekam jejak semua kegiatan yang terjadi di sistem.
          </p>
        </div>
        <button 
          onClick={fetchLog}
          className="bg-white text-pink-500 border-2 border-pink-100 px-6 py-3 rounded-2xl font-black hover:bg-pink-50 transition-all flex items-center gap-2"
        >
          Refresh Data
        </button>
      </div>

      {/* TIMELINE LOG */}
      <div className="bg-white rounded-[2rem] border-4 border-pink-50 shadow-sm p-6 sm:p-8">
        
        {logs.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-pink-400 text-lg font-bold">Belum ada aktivitas yang tercatat.</p>
            <p className="text-slate-400 text-sm mt-2">Coba lakukan login, tambah barang, atau peminjaman.</p>
          </div>
        ) : (
          <div className="relative border-l-4 border-pink-100 ml-4 space-y-8">
            {logs.map((log) => (
              <div key={log.id_log} className="relative pl-8">
                
                {/* Titik Timeline */}
                <div className="absolute -left-[11px] top-1 w-5 h-5 bg-gradient-to-br from-pink-400 to-rose-400 rounded-full border-4 border-white shadow-sm" />
                
                {/* Konten Log */}
                <div className="bg-pink-50/50 p-5 rounded-2xl border border-pink-100 hover:shadow-md transition-shadow">
                  <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-2 mb-2">
                    <div className="flex items-center gap-2">
                      <span className="bg-white text-pink-600 px-3 py-1 rounded-full text-xs font-black shadow-sm">
                        {log.nama_user || 'Sistem'}
                      </span>
                      <span className="text-xs text-slate-400 font-bold">
                        {formatWaktu(log.waktu)}
                      </span>
                    </div>
                  </div>
                  <p className="text-slate-700 font-medium">
                    {log.aktivitas}
                  </p>
                </div>
                
              </div>
            ))}
          </div>
        )}

      </div>
    </div>
  );
}

export default AdminLog;