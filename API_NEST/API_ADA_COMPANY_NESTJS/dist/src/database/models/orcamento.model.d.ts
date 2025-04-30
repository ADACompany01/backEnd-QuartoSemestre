import { Model } from 'sequelize-typescript';
export declare class Orcamento extends Model {
    id: string;
    dataServico: Date;
    valorTotal: number;
    status: string;
    observacoes: string;
    ativo: boolean;
    dataCriacao: Date;
    clienteId: string;
    servicoId: string;
}
