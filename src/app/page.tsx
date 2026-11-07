'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';

export default function Home() {
  const router = useRouter();
  const [formData, setFormData] = useState({ username: '', password: '' });
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    const res = await fetch('/api/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData)
    });

    const data = await res.json();
    setIsLoading(false);

    if (res.ok) {
      alert(`Selamat datang, ${data.user.namaLengkap}!`);
      
      // Simpan data user ke browser supaya ingat siapa yang login
      localStorage.setItem('user', JSON.stringify(data.user));
      
      if (data.user.role === 'admin') {
        router.push('/dashboard/admin');
      } else {
        router.push('/dashboard/siswa'); 
      }
    } else {
      alert(data.message);
    }
  };

  return (
    <div 
      className="min-h-screen flex flex-col items-center justify-center bg-cover bg-center bg-no-repeat relative"
      style={{ backgroundImage: "url('/sekolah.jpg')" }} // Pastikan ada sekolah.jpg di folder public/
    >
      <div className="absolute inset-0 bg-[#0a192f]/70 mix-blend-multiply"></div>

      <div className="relative z-10 flex flex-col items-center w-full max-w-md px-4">
        <div className="flex flex-col items-center mb-8 text-center">
          <div className="w-20 h-24 relative mb-4">
            {/* Pastikan ada logo.png di folder public/ */}
            <Image src="/logo.png" alt="Logo SMAN 3 Ciamis" fill className="object-contain" />
          </div>
          <p className="text-white text-lg tracking-wide mb-1">Selamat Datang di</p>
          <h1 className="text-white text-4xl md:text-5xl font-extrabold tracking-wider mb-2">
            PERPUSTAKAAN
          </h1>
          <h2 className="text-[#00d2ff] text-xl md:text-2xl font-bold tracking-widest">
            SMA NEGERI 3 CIAMIS
          </h2>
        </div>

        <div className="bg-[#112240]/80 backdrop-blur-md p-8 rounded-2xl shadow-2xl w-full border border-gray-700">
          <form onSubmit={handleSubmit} className="flex flex-col gap-5">
            <div>
              <label className="text-gray-300 text-sm mb-1 block">NIS / Username</label>
              <input
                type="text"
                className="w-full bg-[#0a192f] border border-gray-600 text-white p-3 rounded-lg focus:outline-none focus:border-[#00d2ff] focus:ring-1 focus:ring-[#00d2ff]"
                value={formData.username}
                onChange={(e) => setFormData({...formData, username: e.target.value})}
                required
              />
            </div>
            
            <div>
              <label className="text-gray-300 text-sm mb-1 block">Password</label>
              <input
                type="password"
                className="w-full bg-[#0a192f] border border-gray-600 text-white p-3 rounded-lg focus:outline-none focus:border-[#00d2ff] focus:ring-1 focus:ring-[#00d2ff]"
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
              {isLoading ? 'MEMPROSES...' : 'LOGIN'}
            </button>
          </form>

          <p className="text-center text-gray-400 text-sm mt-6">
            Belum punya akun? <Link href="/register" className="text-[#00d2ff] hover:underline">Daftar di sini</Link>
          </p>
        </div>
      </div>
    </div>
  );
}