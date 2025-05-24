import { Orcamento } from '../models/orcamento.model';
export declare class OrcamentoRepository {
    private orcamentoModel;
    constructor(orcamentoModel: typeof Orcamento);
    findAll(): Promise<Orcamento[]>;
    findOne(id: string): Promise<Orcamento>;
    create(data: Partial<Orcamento>): Promise<Orcamento>;
    update(id: string, data: Partial<Orcamento>): Promise<[number, Orcamento[]]>;
    delete(id: string): Promise<number>;
    findByCliente(clienteId: string): Promise<Orcamento[]>;
    findByServico(servicoId: string): Promise<Orcamento[]>;
    findByStatus(status: string): Promise<Orcamento[]>;
    findAtivos(): Promise<Orcamento[]>;
}
