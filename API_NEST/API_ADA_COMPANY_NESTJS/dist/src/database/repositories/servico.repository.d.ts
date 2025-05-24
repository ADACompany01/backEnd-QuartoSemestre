import { Servico } from '../models/servico.model';
export declare class ServicoRepository {
    private servicoModel;
    constructor(servicoModel: typeof Servico);
    findAll(): Promise<Servico[]>;
    findOne(id: string): Promise<Servico>;
    create(data: Partial<Servico>): Promise<Servico>;
    update(id: string, data: Partial<Servico>): Promise<[number, Servico[]]>;
    delete(id: string): Promise<number>;
    findByFuncionario(funcionarioId: string): Promise<Servico[]>;
    findAtivos(): Promise<Servico[]>;
}
