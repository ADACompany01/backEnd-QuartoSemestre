import { Model } from 'sequelize-typescript';
import { Servico } from './servico.model';
export declare class Funcionario extends Model {
    id: string;
    nome: string;
    email: string;
    telefone: string;
    cpf: string;
    cargo: string;
    especialidade: string;
    senha: string;
    ativo: boolean;
    dataCriacao: Date;
    servicos: Servico[];
}
