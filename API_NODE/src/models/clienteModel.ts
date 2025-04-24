import mongoose, { Document, Schema } from 'mongoose';
import bcrypt from 'bcryptjs';

// Definindo a interface do Cliente
interface IEndereco {
  cep: string;
  logradouro: string;
  complemento?: string;
  bairro: string;
  localidade: string;
  uf: string;
  estado: string;
  ddd: string;
}

interface ILocalizacao {
  type: 'Point';
  coordinates: [number, number];
}

interface IUsuario {
  email: string;
  senha: string;
  tipoUsuario: 'cliente' | 'admin';
  telefone: string;
  nomeCompleto: string;
}

export interface ICliente extends Document {
  _id: number;
  nomeCliente: string;
  telefone: string;
  endereco: IEndereco;
  localizacao: ILocalizacao;
  cnpj: string;
  usuario: IUsuario;
}

// Definindo o schema do Cliente
const clienteSchema: Schema<ICliente> = new Schema({
  _id: { type: Number, required: true },
  nomeCliente: { type: String, required: true, max: 100 },
  telefone: { type: String, required: true },
  endereco: {
    cep: { type: String, required: true },
    logradouro: { type: String, required: true },
    complemento: { type: String },
    bairro: { type: String, required: true },
    localidade: { type: String, required: true },
    uf: { type: String, required: true },
    estado: { type: String, required: true },
    ddd: { type: String, required: true }
  },
  localizacao: {
    type: {
      type: String,
      enum: ['Point'],
      required: true
    },
    coordinates: {
      type: [Number],
      required: true
    }
  },
  cnpj: { type: String, required: true },
  usuario: {
    email: { type: String, required: true, unique: true },
    senha: { type: String, required: true, minlength: 6, select: false }, //Esconde a senha por padrão
    tipoUsuario: { type: String, required: true, enum: ['cliente', 'admin'] },
    telefone: { type: String, required: true },
    nomeCompleto: { type: String, required: true }
  }
});

// Middleware para hash de senha
clienteSchema.pre<ICliente>('save', async function (next) {
  if (!this.isModified('usuario.senha')) {
    return next();
  }
  const salt = await bcrypt.genSalt(10);
  this.usuario.senha = await bcrypt.hash(this.usuario.senha, salt);
  next();
});

// Exportando o modelo
export default mongoose.model<ICliente>('Cliente', clienteSchema);
