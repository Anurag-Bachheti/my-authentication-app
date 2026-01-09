import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String },
  phone: {type: String},
  address: {type: String},
  photo: {type: String},
  provide: { type: String, enum: ["local", "google"], default: "local" },
  providerId: { type: String },
  role: { type: String, enum: ["admin", "user", "employee"] },
  refreshToken: { type: String },
  resetPasswordToken: String,
  resetPasswordExpires: Date,

}, { timestamps: true });

export default mongoose.model('User', userSchema);