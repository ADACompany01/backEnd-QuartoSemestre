import { Orcamento } from '../../database/models/orcamento.model';
export declare class OrcamentoService {
    private orcamentoModel;
    constructor(orcamentoModel: typeof Orcamento);
    findAll(): Promise<Orcamento[]>;
    findOne(id: string): Promise<Orcamento>;
    create(orcamentoData: Partial<Orcamento>): Promise<Orcamento>;
    update(id: string, orcamentoData: Partial<Orcamento>): Promise<Orcamento>;
    changeStatus(id: string, status: string): Promise<Orcamento>;
    remove(id: string): Promise<void>;
}
