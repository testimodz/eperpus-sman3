import { NextResponse } from 'next/server';
import connectDB from '@/app/lib/mongodb';
import User from '@/app/models/User';
import bcrypt from 'bcryptjs';

export async function POST(req: Request) {
  try {
    const { username, password } = await req.json();

    if (!username || !password) {
      return NextResponse.json({ message: 'Isi NIS dan password!' }, { status: 400 });
    }

    await connectDB();

    // Cari user berdasarkan username/NIS
    const user = await User.findOne({ username });
    if (!user) {
      return NextResponse.json({ message: 'Akun tidak ditemukan' }, { status: 404 });
    }

    // Cek kecocokan password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return NextResponse.json({ message: 'Password salah' }, { status: 401 });
    }

    // Jika sukses, kembalikan data user (tanpa password)
    return NextResponse.json({
      message: 'Login berhasil',
      user: {
        username: user.username,
        namaLengkap: user.namaLengkap,
        role: user.role
      }
    }, { status: 200 });

  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: 'Terjadi kesalahan server' }, { status: 500 });
  }
}