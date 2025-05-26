import { Orcamento } from '../../database/entities/orcamento.entity';
export declare class OrcamentoService {
    private orcamentoModel;
    private readonly logger;
    constructor(orcamentoModel: typeof Orcamento);
    findAll(): Promise<Orcamento[]>;
    findOne(id: string): Promise<Orcamento>;
    create(orcamentoData: Partial<Orcamento>): Promise<Orcamento>;
    update(id: string, orcamentoData: Partial<Orcamento>): Promise<Orcamento>;
    remove(id: string): Promise<void>;
}
