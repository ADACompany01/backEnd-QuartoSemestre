import { Orcamento } from '../entities/orcamento.entity';
export declare class OrcamentoRepository {
    private orcamentoModel;
    constructor(orcamentoModel: typeof Orcamento);
    findAll(): Promise<Orcamento[]>;
    findOne(id: number): Promise<Orcamento | null>;
    create(data: Partial<Orcamento>): Promise<Orcamento>;
    update(id: number, data: Partial<Orcamento>): Promise<[number, Orcamento[]]>;
    delete(id: number): Promise<number>;
    findByCliente(id_cliente: number): Promise<Orcamento[]>;
    findByPacote(id_pacote: number): Promise<Orcamento[]>;
}
