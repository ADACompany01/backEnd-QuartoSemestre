import mongoose, { Document, Schema } from 'mongoose';

// Interface principal para o Serviço
export interface IServico extends Document {
  _id: number;
  nome: string;
  valor: number;
  tipoServico: 'Venda' | 'Serviço';
}

// Schema para o Serviço
const servicoSchema: Schema<IServico> = new Schema({
  _id: {
    type: Number,
    required: [true, "ID é obrigatório e deve ser numérico"]
  },
  nome: {
    type: String,
    required: [true, "Nome é obrigatório"],
    maxlength: [100, "Nome não pode exceder 100 caracteres"]
  },
  valor: {
    type: Number,
    required: [true, "Valor é obrigatório e deve ser numérico"]
  },
  tipoServico: {
    type: String,
    required: [true, "Tipo de serviço é obrigatório"],
    enum: {
      values: ['Venda', 'Serviço'],
      message: "Tipo de serviço deve ser 'Venda' ou 'Serviço'"
    }
  }
});

export default mongoose.model<IServico>('Servico', servicoSchema);
