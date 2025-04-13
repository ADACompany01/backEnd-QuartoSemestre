import mongoose, { Document, Schema } from 'mongoose';

// Interface principal para o Orçamento
export interface IOrcamento extends Document {
  _id: number;
  clienteId: number;
  validadeOrcamento: Date;
  dataCriacao: Date;
  valorTotal: number;
  tipoServico: string[]; // Array de strings para tipos de serviço
  statusOrcamento: string;
  descricao: string;
  emailVendedor: string;
}

// Schema para o Orçamento
const orcamentoSchema: Schema<IOrcamento> = new Schema({
  _id: {
    type: Number,
    required: true
  },
  clienteId: {
    type: Number,
    ref: 'Cliente',
    required: true
  },
  validadeOrcamento: {
    type: Date,
    required: true
  },
  dataCriacao: {
    type: Date,
    required: true
  },
  valorTotal: {
    type: Number,
    required: true
  },
  tipoServico: {
    type: [String], // Array de strings
    required: true
  },
  statusOrcamento: {
    type: String,
    required: true
  },
  descricao: {
    type: String,
    required: true
  },
  emailVendedor: {
    type: String,
    required: true
  }
});

// Exportando o modelo
export default mongoose.model<IOrcamento>('Orcamento', orcamentoSchema);
