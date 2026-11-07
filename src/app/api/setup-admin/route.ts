import { NextResponse } from 'next/server';
import connectDB from '@/app/lib/mongodb';
import User from '@/app/models/User';
import bcrypt from 'bcryptjs';

export async function GET() {
  try {
    await connectDB();

    // Hapus semua akun yang rolenya admin atau usernamenya 'admin' biar bersih
    await User.deleteMany({ role: 'admin' });
    await User.deleteMany({ username: 'admin' });

    // Buat akun admin default yang baru
    const hashedPassword = await bcrypt.hash('admin123', 10);
    const newAdmin = new User({
      username: 'admin',
      namaLengkap: 'Super Admin Perpus',
      password: hashedPassword,
      role: 'admin',
    });

    await newAdmin.save();

    return NextResponse.json({ 
      message: 'Super Admin BERHASIL DI-RESET!', 
      credentials: { username: 'admin', password: 'admin123' } 
    });

  } catch (error) {
    return NextResponse.json({ message: 'Terjadi kesalahan' }, { status: 500 });
  }
}