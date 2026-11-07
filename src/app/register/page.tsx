'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';

export default function Register() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    username: '',
    namaLengkap: '',
    password: '',
    role: 'siswa',
    kelas: ''
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    const res = await fetch('/api/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData)
    });

    const data = await res.json();
    setIsLoading(false);

    if (res.ok) {
      alert('Registrasi sukses! Silakan login.');
      router.push('/'); // Kembali ke halaman utama (Login)
    } else {
      alert(data.message);
    }
  };

  return (
    <div 
      className="min-h-screen flex flex-col items-center justify-center bg-cover bg-center bg-no-repeat relative py-10"
      style={{ backgroundImage: "url('/sekolah.jpg')" }}
    >
      <div className="absolute inset-0 bg-[#0a192f]/70 mix-blend-multiply fixed"></div>

      <div className="relative z-10 flex flex-col items-center w-full max-w-md px-4">
        <div className="flex flex-col items-center mb-6 text-center">
          <div className="w-16 h-20 relative mb-3">
            <Image src="/logo.png" alt="Logo SMAN 3 Ciamis" fill className="object-contain" />
          </div>
          <h1 className="text-white text-3xl font-extrabold tracking-wider">
            BUAT AKUN
          </h1>
        </div>

        <div className="bg-[#112240]/80 backdrop-blur-md p-8 rounded-2xl shadow-2xl w-full border border-gray-700">
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            
            {/* Pilihan Siswa / Tamu */}
            <div>
              <label className="text-gray-300 text-sm mb-1 block">Mendaftar Sebagai</label>
              <select
                className="w-full bg-[#0a192f] border border-gray-600 text-white p-3 rounded-lg focus:outline-none focus:border-[#00d2ff]"
                value={formData.role}
                onChange={(e) => setFormData({...formData, role: e.target.value, kelas: ''})}
              >
                <option value="siswa">Siswa SMAN 3 Ciamis</option>
                <option value="tamu">Tamu / Umum</option>
              </select>
            </div>

            <div>
              {/* Label berubah dinamis menyesuaikan role */}
              <label className="text-gray-300 text-sm mb-1 block">
                {formData.role === 'siswa' ? 'NIS (Nomor Induk Siswa)' : 'NIK / No. HP'}
              </label>
              <input
                type="text"
                className="w-full bg-[#0a192f] border border-gray-600 text-white p-3 rounded-lg focus:outline-none focus:border-[#00d2ff]"
                value={formData.username}
                onChange={(e) => setFormData({...formData, username: e.target.value})}
                required
              />
            </div>
            
            <div>
              <label className="text-gray-300 text-sm mb-1 block">Nama Lengkap</label>
              <input
                type="text"
                className="w-full bg-[#0a192f] border border-gray-600 text-white p-3 rounded-lg focus:outline-none focus:border-[#00d2ff]"
                value={formData.namaLengkap}
                onChange={(e) => setFormData({...formData, namaLengkap: e.target.value})}
                required
              />
            </div>

            {/* Input Kelas INI HANYA MUNCUL kalau milih Siswa */}
            {formData.role === 'siswa' && (
              <div>
                <label className="text-gray-300 text-sm mb-1 block">Kelas (Contoh: X MIPA 1)</label>
                <input
                  type="text"
                  className="w-full bg-[#0a192f] border border-gray-600 text-white p-3 rounded-lg focus:outline-none focus:border-[#00d2ff]"
                  value={formData.kelas}
                  onChange={(e) => setFormData({...formData, kelas: e.target.value.toUpperCase()})}
                  required
                />
              </div>
            )}
            
            <div>
              <label className="text-gray-300 text-sm mb-1 block">Password</label>
              <input
                type="password"
                className="w-full bg-[#0a192f] border border-gray-600 text-white p-3 rounded-lg focus:outline-none focus:border-[#00d2ff]"
                value={formData.password}
                onChange={(e) => setFormData({...formData, password: e.target.value})}
                required
              />
            </div>

            <button 
              type="submit" 
              disabled={isLoading}
              className="w-full bg-[#00d2ff] text-[#0a192f] font-bold py-3 mt-4 rounded-full hover:bg-[#00b8e6] transition-colors disabled:opacity-50"
            >
              {isLoading ? 'MEMPROSES...' : 'DAFTAR SEKARANG'}
            </button>
          </form>

          <p className="text-center text-gray-400 text-sm mt-6">
            Sudah punya akun? <Link href="/" className="text-[#00d2ff] hover:underline">Login di sini</Link>
          </p>
        </div>
      </div>
    </div>
  );
}