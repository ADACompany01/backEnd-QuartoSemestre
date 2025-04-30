import { Model } from 'sequelize-typescript';
import { Funcionario } from './funcionario.model';
import { Orcamento } from './orcamento.model';
export declare class Servico extends Model {
    id: string;
    nome: string;
    descricao: string;
    valor: number;
    ativo: boolean;
    dataCriacao: Date;
    funcionarioId: string;
    funcionario: Funcionario;
    orcamentos: Orcamento[];
}
