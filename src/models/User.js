import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

// Evita redefinir el modelo si ya existe
const User = mongoose.models.User || mongoose.model('User', UserSchema);

export default User;
