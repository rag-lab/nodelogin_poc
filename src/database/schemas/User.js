import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import uuid from 'node-uuid';

const UserSchema = new mongoose.Schema({

  _id: { type: String, default: uuid.v1() },

  nome: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  telefones: [{
    numero: String,
    ddd: String,
  }],
  senha: {
    type: String,
    required: true,
  },
  senha2: {
    type: String,
  },
  ultimo_login: {
    type: Date,
  },

}, { timestamps: true });

UserSchema.methods.checkSenha = async function (senha) {
  return bcrypt.compare(senha, this.senha);
};

UserSchema.pre('save', async function (next) {
  // cria hash
  if (this.senha) {
    this.senha = await bcrypt.hash(this.senha, 4);
  }
  next();
});


const User = mongoose.model('User', UserSchema);

// module.exports = User;

export default mongoose.model('User', UserSchema);
