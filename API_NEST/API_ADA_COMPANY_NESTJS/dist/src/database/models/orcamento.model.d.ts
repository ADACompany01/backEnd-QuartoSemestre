import { Model } from 'sequelize-typescript';
import { Cliente } from './cliente.model';
import { Servico } from './servico.model';
export declare class Orcamento extends Model {
    id: string;
    dataServico: Date;
    valorTotal: number;
    status: string;
    observacoes: string;
    ativo: boolean;
    dataCriacao: Date;
    clienteId: string;
    cliente: Cliente;
    servicoId: string;
    servico: Servico;
}
