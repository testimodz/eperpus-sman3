'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

export default function DashboardAdmin() {
  const router = useRouter();
  const [admin, setAdmin] = useState<any>(null);

  useEffect(() => {
    const dataUser = localStorage.getItem('user');
    if (!dataUser) {
      router.push('/');
    } else {
      const parsedUser = JSON.parse(dataUser);
      if (parsedUser.role !== 'admin') {
        router.push('/dashboard/siswa');
      } else {
        setAdmin(parsedUser);
      }
    }
  }, [router]);

  const handleKeluar = () => {
    localStorage.removeItem('user');
    router.push('/');
  };

  if (!admin) return <div className="min-h-screen bg-white text-black flex items-center justify-center">Memuat otorisasi...</div>;

  return (
    <div className="min-h-screen bg-[#f4f7f9] text-gray-800 flex font-sans">
      
      {/* Sidebar Kiri (Dark Blue Theme) */}
      <aside className="w-64 bg-[#0a192f] text-gray-300 flex flex-col justify-between hidden md:flex min-h-screen shadow-xl">
        <div>
          {/* Logo & Brand */}
          <div className="p-6 flex flex-col items-center gap-3 border-b border-gray-700/50">
            <div className="w-12 h-14 relative">
              <Image src="/logo.png" alt="Logo SMAN 3 CIAMIS" fill className="object-contain" />
            </div>
            <div className="text-center">
              <h2 className="font-bold text-white tracking-wide">E-Perpus</h2>
              <p className="text-[10px] text-gray-400 tracking-widest">SMAN 3 CIAMIS</p>
            </div>
          </div>
          
          {/* Menu Navigasi */}
          <nav className="flex flex-col py-4 text-sm">
            <button className="px-6 py-3 text-left hover:bg-white/10 transition-colors flex items-center gap-3">
              <span>🏠</span> Dashboard
            </button>

            <p className="px-6 py-2 mt-2 text-[10px] font-bold text-gray-500 uppercase tracking-widest">Master Data</p>
            <button className="px-6 py-3 text-left hover:bg-white/10 transition-colors flex items-center gap-3">
              <span>👥</span> Data Siswa
            </button>
            <button className="px-6 py-3 text-left hover:bg-white/10 transition-colors flex items-center gap-3">
              <span>📚</span> Data Buku Umum
            </button>
            <button className="px-6 py-3 text-left hover:bg-white/10 transition-colors flex items-center justify-between">
              <div className="flex items-center gap-3"><span>📘</span> Data Buku Paket</div>
              <span className="bg-[#00d2ff] text-[#0a192f] text-[9px] font-bold px-2 py-0.5 rounded-full">MAPEL</span>
            </button>

            <p className="px-6 py-2 mt-2 text-[10px] font-bold text-gray-500 uppercase tracking-widest">Transaksi</p>
            <button className="px-6 py-3 text-left hover:bg-white/10 transition-colors flex items-center gap-3">
              <span>🛒</span> Peminjaman Satuan
            </button>
            <button className="px-6 py-3 text-left hover:bg-white/10 transition-colors flex items-center gap-3">
              <span>🔄</span> Pengembalian
            </button>
            {/* Menu Aktif */}
            <button className="px-6 py-3 text-left bg-[#3b82f6] text-white font-semibold flex items-center justify-between border-l-4 border-[#00d2ff]">
              <div className="flex items-center gap-3"><span>📦</span> Peminjaman Paket</div>
              <span className="bg-red-500 text-white text-[9px] font-bold px-2 py-0.5 rounded-full">KELAS</span>
            </button>

            <p className="px-6 py-2 mt-2 text-[10px] font-bold text-gray-500 uppercase tracking-widest">Laporan & Statistik</p>
            <button className="px-6 py-3 text-left hover:bg-white/10 transition-colors flex items-center gap-3">
              <span>📊</span> Mode Kunjungan
            </button>
            <button className="px-6 py-3 text-left hover:bg-white/10 transition-colors flex items-center gap-3">
              <span>📑</span> Laporan Kunjungan
            </button>
          </nav>
        </div>

        <div className="p-4">
          <button 
            onClick={handleKeluar}
            className="w-full bg-transparent hover:bg-white/10 border border-gray-600 text-gray-300 py-2 rounded-lg text-sm transition-all flex items-center justify-center gap-2"
          >
            <span>🚪</span> Keluar Sistem
          </button>
        </div>
      </aside>

      {/* Konten Utama */}
      <main className="flex-1 p-6 md:p-10 overflow-y-auto">
        
        {/* Header Konten */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
          <h1 className="text-2xl font-bold text-[#1e40af]">Peminjaman Buku Paket</h1>
          <div className="flex gap-3 mt-4 md:mt-0">
            <button className="bg-white border border-blue-500 text-blue-600 px-4 py-2 rounded shadow-sm text-sm font-semibold flex items-center gap-2 hover:bg-blue-50">
              <span>📄</span> Laporan
            </button>
            <button className="bg-blue-600 text-white px-4 py-2 rounded shadow-sm text-sm font-semibold flex items-center gap-2 hover:bg-blue-700">
              <span>➕</span> Pinjamkan
            </button>
          </div>
        </div>

        {/* Tabel Data (Sesuai Referensi Gambar) */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-sm">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-200 text-gray-600">
                  <th className="py-4 px-4 font-semibold text-center w-12">No</th>
                  <th className="py-4 px-4 font-semibold">Kelas & Mapel</th>
                  <th className="py-4 px-4 font-semibold">Buku Paket</th>
                  <th className="py-4 px-4 font-semibold text-center">Jumlah</th>
                  <th className="py-4 px-4 font-semibold">Status / Ket</th>
                  <th className="py-4 px-4 font-semibold text-center">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {/* Baris 1 */}
                <tr className="hover:bg-gray-50">
                  <td className="py-3 px-4 text-center text-gray-500">1</td>
                  <td className="py-3 px-4">
                    <div className="font-bold">X IPA 1</div>
                    <div className="text-blue-500 text-xs mt-1 uppercase">IPA</div>
                  </td>
                  <td className="py-3 px-4">
                    <div className="font-bold">IPA</div>
                    <div className="text-gray-500 text-xs mt-1">paiz & sulis</div>
                  </td>
                  <td className="py-3 px-4 text-center">
                    <span className="bg-cyan-100 text-cyan-700 px-3 py-1 rounded text-xs font-bold">23 Eks</span>
                  </td>
                  <td className="py-3 px-4">
                    <span className="bg-green-600 text-white px-2 py-0.5 rounded text-xs font-bold">Kembali</span>
                    <div className="text-gray-500 text-[10px] mt-1 uppercase">RUSAK 3, DAN HILANG 1</div>
                  </td>
                  <td className="py-3 px-4 text-center text-green-600 font-bold">✔✔</td>
                </tr>

                {/* Baris 2 */}
                <tr className="hover:bg-gray-50">
                  <td className="py-3 px-4 text-center text-gray-500">2</td>
                  <td className="py-3 px-4">
                    <div className="font-bold">X IPA 1</div>
                    <div className="text-blue-500 text-xs mt-1 uppercase">IPA</div>
                  </td>
                  <td className="py-3 px-4">
                    <div className="font-bold">IPA</div>
                    <div className="text-gray-500 text-xs mt-1">paiz & sulis</div>
                  </td>
                  <td className="py-3 px-4 text-center">
                    <span className="bg-cyan-100 text-cyan-700 px-3 py-1 rounded text-xs font-bold">23 Eks</span>
                  </td>
                  <td className="py-3 px-4">
                    <span className="bg-green-600 text-white px-2 py-0.5 rounded text-xs font-bold">Kembali</span>
                    <div className="text-gray-500 text-[10px] mt-1 uppercase">rusak 1</div>
                  </td>
                  <td className="py-3 px-4 text-center text-green-600 font-bold">✔✔</td>
                </tr>

                {/* Baris 3 */}
                <tr className="hover:bg-gray-50">
                  <td className="py-3 px-4 text-center text-gray-500">3</td>
                  <td className="py-3 px-4">
                    <div className="font-bold">X IPA 1</div>
                    <div className="text-blue-500 text-xs mt-1 uppercase">MATEMATIKA</div>
                  </td>
                  <td className="py-3 px-4">
                    <div className="font-bold">IPA</div>
                    <div className="text-gray-500 text-xs mt-1">paiz & sulis</div>
                  </td>
                  <td className="py-3 px-4 text-center">
                    <span className="bg-cyan-100 text-cyan-700 px-3 py-1 rounded text-xs font-bold">13 Eks</span>
                  </td>
                  <td className="py-3 px-4">
                    <span className="bg-green-600 text-white px-2 py-0.5 rounded text-xs font-bold">Kembali</span>
                    <div className="text-gray-500 text-[10px] mt-1 uppercase">hilang 2</div>
                  </td>
                  <td className="py-3 px-4 text-center text-green-600 font-bold">✔✔</td>
                </tr>

                {/* Baris 4 */}
                <tr className="hover:bg-gray-50">
                  <td className="py-3 px-4 text-center text-gray-500">4</td>
                  <td className="py-3 px-4">
                    <div className="font-bold">XI IPA</div>
                    <div className="text-blue-500 text-xs mt-1 uppercase">MATEMATIKA</div>
                  </td>
                  <td className="py-3 px-4">
                    <div className="font-bold">IPA</div>
                    <div className="text-gray-500 text-xs mt-1">izlis</div>
                  </td>
                  <td className="py-3 px-4 text-center">
                    <span className="bg-cyan-100 text-cyan-700 px-3 py-1 rounded text-xs font-bold">7 Eks</span>
                  </td>
                  <td className="py-3 px-4">
                    <span className="bg-green-600 text-white px-2 py-0.5 rounded text-xs font-bold">Kembali</span>
                    <div className="text-gray-500 text-[10px] mt-1 uppercase">RUSAK 1</div>
                  </td>
                  <td className="py-3 px-4 text-center text-green-600 font-bold">✔✔</td>
                </tr>

                {/* Baris 5 */}
                <tr className="hover:bg-gray-50">
                  <td className="py-3 px-4 text-center text-gray-500">5</td>
                  <td className="py-3 px-4">
                    <div className="font-bold">X IPS 1</div>
                    <div className="text-blue-500 text-xs mt-1 uppercase">IPA</div>
                  </td>
                  <td className="py-3 px-4">
                    <div className="font-bold">IPA</div>
                    <div className="text-gray-500 text-xs mt-1">paiz & sulis</div>
                  </td>
                  <td className="py-3 px-4 text-center">
                    <span className="bg-cyan-100 text-cyan-700 px-3 py-1 rounded text-xs font-bold">23 Eks</span>
                  </td>
                  <td className="py-3 px-4">
                    <span className="bg-green-600 text-white px-2 py-0.5 rounded text-xs font-bold">Kembali</span>
                    <div className="text-gray-500 text-[10px] mt-1 uppercase">lengkap</div>
                  </td>
                  <td className="py-3 px-4 text-center text-green-600 font-bold">✔✔</td>
                </tr>

                 {/* Baris 6 */}
                 <tr className="hover:bg-gray-50">
                  <td className="py-3 px-4 text-center text-gray-500">6</td>
                  <td className="py-3 px-4">
                    <div className="font-bold">X IPA 1</div>
                  </td>
                  <td className="py-3 px-4">
                    <div className="font-bold">IPA</div>
                    <div className="text-gray-500 text-xs mt-1">paiz & sulis</div>
                  </td>
                  <td className="py-3 px-4 text-center">
                    <span className="bg-cyan-100 text-cyan-700 px-3 py-1 rounded text-xs font-bold">23 Eks</span>
                  </td>
                  <td className="py-3 px-4">
                    <span className="bg-green-600 text-white px-2 py-0.5 rounded text-xs font-bold">Kembali</span>
                    <div className="text-gray-500 text-[10px] mt-1 uppercase">-</div>
                  </td>
                  <td className="py-3 px-4 text-center text-green-600 font-bold">✔✔</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
}