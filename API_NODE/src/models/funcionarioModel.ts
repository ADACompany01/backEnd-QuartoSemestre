import mongoose, { Document, Schema } from 'mongoose';
import bcrypt from 'bcryptjs';

// Definindo interfaces
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

interface IUsuario {
  email: string;
  senha: string;
  tipoUsuario: 'funcionario' | 'admin';
  telefone: string;
  nomeCompleto: string;
}

interface IChatBot {
  id_chatbot: number;
  texto_chat: string;
  data: Date;
}

// Interface principal para o Funcionario
export interface IFuncionario extends Document {
  _id: number;
  nomeFuncionario: string;
  endereco: IEndereco;
  cargo: string;
  usuario: IUsuario;
  chatBot: IChatBot[];
}

// Schema para o Funcionario
const funcionarioSchema: Schema<IFuncionario> = new Schema({
  _id: { type: Number, required: true },
  nomeFuncionario: { type: String, required: true, max: 100 },
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
  cargo: { type: String, required: true },
  usuario: {
    email: { type: String, required: true, unique: true },
    senha: { type: String, required: true, minlength: 6 },
    tipoUsuario: { type: String, required: true, enum: ['funcionario', 'admin'] },
    telefone: { type: String, required: true },
    nomeCompleto: { type: String, required: true }
  },
  chatBot: [
    {
      id_chatbot: { type: Number, required: true },
      texto_chat: { type: String, required: true },
      data: { type: Date, required: true }
    }
  ]
});

// Middleware para hash de senha
funcionarioSchema.pre<IFuncionario>('save', async function (next) {
  if (!this.isModified('usuario.senha')) {
    return next();
  }
  const salt = await bcrypt.genSalt(10);
  this.usuario.senha = await bcrypt.hash(this.usuario.senha, salt);
  next();
});

// Exportando o modelo
export default mongoose.model<IFuncionario>('Funcionario', funcionarioSchema);
