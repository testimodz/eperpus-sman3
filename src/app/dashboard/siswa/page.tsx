'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

export default function DashboardSiswa() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);

  // Mengecek apakah user sudah login
  useEffect(() => {
    const dataUser = localStorage.getItem('user');
    if (!dataUser) {
      router.push('/'); // Kalau belum login, lempar ke halaman depan
    } else {
      setUser(JSON.parse(dataUser));
    }
  }, [router]);

  const handleKeluar = () => {
    localStorage.removeItem('user');
    router.push('/');
  };

  const catatKunjungan = (tujuan: string) => {
    // Nanti ini kita hubungkan ke Database (MongoDB)
    alert(`Berhasil mencatat kunjungan dengan tujuan: ${tujuan}`);
  };

  if (!user) return <div className="min-h-screen bg-[#0a192f] text-white flex items-center justify-center">Memuat data...</div>;

  return (
    <div className="min-h-screen bg-[#0f172a] text-white p-6 font-sans">
      {/* Header */}
      <div className="flex justify-between items-center bg-[#1e293b] p-4 rounded-xl shadow-lg mb-6 border border-gray-700">
        <div className="flex items-center gap-4">
          <div className="w-10 h-12 relative">
            <Image src="/logo.png" alt="Logo" fill className="object-contain" />
          </div>
          <h1 className="text-xl font-bold tracking-wide text-[#00d2ff]">
            SMAN 3 CIAMIS <span className="text-gray-400 font-normal">| E-Library</span>
          </h1>
        </div>
        <button 
          onClick={handleKeluar}
          className="bg-red-600 hover:bg-red-700 text-white px-5 py-2 rounded-lg font-semibold transition-colors"
        >
          Keluar
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        
        {/* Kolom Kiri: Profil & Tombol Tujuan */}
        <div className="md:col-span-4 flex flex-col gap-6">
          
          {/* Card Profil */}
          <div className="bg-[#1e293b] p-6 rounded-2xl shadow-lg border border-gray-700 text-center">
            <h2 className="text-3xl font-bold mb-1 text-white">{user.namaLengkap}</h2>
            <p className="text-[#00d2ff] font-semibold text-lg">
              {user.role === 'siswa' ? 'Siswa' : 'Tamu / Umum'} 
              {user.username && ` - ${user.username}`}
            </p>
            <p className="text-gray-400 mt-4 text-sm">Pilih tujuan kunjungan Anda hari ini:</p>
          </div>

          {/* 4 Tombol Tujuan */}
          <div className="grid grid-cols-2 gap-4">
            <button onClick={() => catatKunjungan('Membaca')} className="bg-blue-600 hover:bg-blue-500 text-white p-6 rounded-2xl shadow-lg flex flex-col items-center justify-center gap-2 transition-all active:scale-95">
              <span className="text-3xl">📖</span>
              <span className="font-bold">MEMBACA</span>
            </button>
            <button onClick={() => catatKunjungan('Pinjam')} className="bg-yellow-500 hover:bg-yellow-400 text-black p-6 rounded-2xl shadow-lg flex flex-col items-center justify-center gap-2 transition-all active:scale-95">
              <span className="text-3xl">📤</span>
              <span className="font-bold">PINJAM</span>
            </button>
            <button onClick={() => catatKunjungan('Kembali')} className="bg-red-500 hover:bg-red-400 text-white p-6 rounded-2xl shadow-lg flex flex-col items-center justify-center gap-2 transition-all active:scale-95">
              <span className="text-3xl">📥</span>
              <span className="font-bold">KEMBALI</span>
            </button>
            <button onClick={() => catatKunjungan('Belajar')} className="bg-[#00d2ff] hover:bg-cyan-400 text-black p-6 rounded-2xl shadow-lg flex flex-col items-center justify-center gap-2 transition-all active:scale-95">
              <span className="text-3xl">📝</span>
              <span className="font-bold">BELAJAR</span>
            </button>
          </div>
        </div>

        {/* Kolom Kanan: Tabel Riwayat */}
        <div className="md:col-span-8 bg-[#1e293b] p-6 rounded-2xl shadow-lg border border-gray-700">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold flex items-center gap-2">
              <span className="text-[#00d2ff]">👤</span> Riwayat Kunjungan Saya
            </h2>
            <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-gray-600 text-gray-400 text-sm">
                  <th className="py-3 px-4 font-semibold">TANGGAL</th>
                  <th className="py-3 px-4 font-semibold">JAM</th>
                  <th className="py-3 px-4 font-semibold">TUJUAN</th>
                  <th className="py-3 px-4 font-semibold">STATUS</th>
                </tr>
              </thead>
              <tbody>
                {/* Ini data dummy, nanti kita isi dari database */}
                <tr className="border-b border-gray-700/50 hover:bg-white/5 transition-colors">
                  <td className="py-4 px-4 text-white">07 November 2026</td>
                  <td className="py-4 px-4 text-gray-300">08:15 WIB</td>
                  <td className="py-4 px-4 text-white font-medium">MEMBACA</td>
                  <td className="py-4 px-4"><span className="bg-green-500/20 text-green-400 py-1 px-3 rounded-full text-xs font-bold border border-green-500/30">Tercatat</span></td>
                </tr>
              </tbody>
            </table>
            
            {/* Tampilan kalau riwayat kosong */}
            {/* <div className="text-center py-10 text-gray-500">Belum ada riwayat kunjungan.</div> */}
          </div>
        </div>

      </div>
    </div>
  );
}