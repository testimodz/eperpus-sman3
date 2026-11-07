import mongoose, { Schema, models } from 'mongoose';

const userSchema = new Schema(
  {
    username: { 
      type: String, 
      required: true, 
      unique: true // NIS untuk siswa, NIK/No.HP untuk tamu, Username untuk admin
    },
    namaLengkap: { 
      type: String, 
      required: true 
    },
    password: { 
      type: String, 
      required: true 
    },
    role: { 
      type: String, 
      enum: ['admin', 'siswa', 'tamu'], 
      default: 'siswa' 
    },
    kelas: {
      type: String,
      // Field kelas hanya wajib disi kalau role-nya 'siswa'
      required: function(this: any) { return this.role === 'siswa'; }
    }
  },
  { timestamps: true }
);

const User = models.User || mongoose.model('User', userSchema);
export default User;