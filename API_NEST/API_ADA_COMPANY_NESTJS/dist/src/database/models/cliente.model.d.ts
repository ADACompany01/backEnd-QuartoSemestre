import { Model } from 'sequelize-typescript';
import { Orcamento } from './orcamento.model';
export declare class Cliente extends Model {
    id: string;
    nome: string;
    email: string;
    telefone: string;
    cpf: string;
    endereco: string;
    senha: string;
    ativo: boolean;
    dataCriacao: Date;
    orcamentos: Orcamento[];
}
