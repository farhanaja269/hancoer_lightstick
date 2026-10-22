import { useState, useEffect } from 'react';
import axios from 'axios';

export default function PetugasLaporan() {
  const [riwayat, setRiwayat] = useState([]);

  useEffect(() => {
    const fetchRiwayat = async () => {
      try {
        const res = await axios.get('http://localhost:3001/api/pengembalian');
        setRiwayat(res.data.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchRiwayat();
  }, []);

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="print:p-0">
      <div className="mb-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 print:hidden">
        <div>
          <h1 className="text-3xl font-black text-blue-900 tracking-tight">Cetak Laporan 🖨️</h1>
          <p className="text-blue-500 font-medium mt-1">Riwayat transaksi yang sudah selesai.</p>
        </div>
        <button onClick={handlePrint} className="bg-blue-500 text-white px-6 py-3 rounded-2xl font-black hover:bg-blue-600 transition-all shadow-lg shadow-blue-300/50 flex items-center gap-2">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" /></svg>
          Cetak Laporan
        </button>
      </div>

      <div className="bg-white rounded-[2rem] border-4 border-blue-50 shadow-sm overflow-hidden print:border-0 print:shadow-none">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-blue-50/50 border-b-2 border-blue-100 text-sm font-black text-blue-700 print:bg-gray-100 print:text-black">
                <th className="p-4">No</th>
                <th className="p-4">Peminjam</th>
                <th className="p-4">Barang</th>
                <th className="p-4">Tgl Kembali</th>
                <th className="p-4">Kondisi</th>
                <th className="p-4">Denda</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-blue-50 text-sm print:divide-gray-200">
              {riwayat.map((item, index) => (
                <tr key={item.id_pengembalian} className="hover:bg-blue-50/30 print:hover:bg-transparent">
                  <td className="p-4 font-bold text-slate-400 print:text-black">{index + 1}</td>
                  <td className="p-4">
                    <p className="font-bold text-slate-800 print:text-black">{item.nama_user}</p>
                    <p className="text-xs text-slate-500 print:text-gray-600">{item.no_hp}</p>
                  </td>
                  <td className="p-4 font-bold text-slate-800 print:text-black">{item.nama_lightstick}</td>
                  <td className="p-4 text-slate-600 print:text-black">{new Date(item.tanggal_kembali).toLocaleDateString('id-ID')}</td>
                  <td className="p-4">
                    <span className={`px-2 py-1 rounded text-xs font-bold uppercase ${item.kondisi_lightstick === 'baik' ? 'bg-emerald-100 text-emerald-700' : 'bg-rose-100 text-rose-700'} print:bg-transparent print:text-black print:border`}>{item.kondisi_lightstick}</span>
                  </td>
                  <td className="p-4 font-black text-rose-500 print:text-black">Rp {Number(item.denda || 0).toLocaleString('id-ID')}</td>
                </tr>
              ))}
              {riwayat.length === 0 && (
                <tr><td colSpan="6" className="p-12 text-center text-blue-400 font-medium">Belum ada data riwayat pengembalian.</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
      
      {/* Tanda Tangan (Hanya Muncul Saat Print) */}
      <div className="hidden print:flex justify-end mt-16 mr-10">
        <div className="text-center">
          <p className="text-sm text-black mb-16">Petugas Hancoer</p>
          <p className="font-bold text-black border-t border-black pt-1">( .................... )</p>
        </div>
      </div>
    </div>
  );
}