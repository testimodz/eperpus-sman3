import { NextResponse } from 'next/server';
import connectDB from '@/app/lib/mongodb';
import User from '@/app/models/User';
import bcrypt from 'bcryptjs';

export async function POST(req: Request) {
  try {
    const { username, namaLengkap, password, role, kelas } = await req.json();
    
    // Validasi dasar
    if (!username || !namaLengkap || !password || !role) {
      return NextResponse.json({ message: 'Data wajib tidak boleh kosong' }, { status: 400 });
    }

    // Validasi kelas wajib buat siswa
    if (role === 'siswa' && !kelas) {
      return NextResponse.json({ message: 'Kelas wajib diisi untuk siswa' }, { status: 400 });
    }

    await connectDB();

    const userSama = await User.findOne({ username });
    if (userSama) {
      return NextResponse.json({ message: 'NIS / No.HP sudah terdaftar' }, { status: 400 });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      username,
      namaLengkap,
      password: hashedPassword,
      role,
      kelas: role === 'siswa' ? kelas : undefined, // Tamu tidak akan masukin data kelas ke DB
    });

    await newUser.save();
    return NextResponse.json({ message: 'Akun berhasil dibuat!' }, { status: 201 });

  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: 'Terjadi kesalahan server' }, { status: 500 });
  }
}