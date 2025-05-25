import { Orcamento } from '../../database/entities/orcamento.entity';
export declare class OrcamentoService {
    private orcamentoModel;
    private readonly logger;
    constructor(orcamentoModel: typeof Orcamento);
    findAll(): Promise<Orcamento[]>;
    findOne(id: number): Promise<Orcamento>;
    create(orcamentoData: Partial<Orcamento>): Promise<Orcamento>;
    update(id: number, orcamentoData: Partial<Orcamento>): Promise<Orcamento>;
    remove(id: number): Promise<void>;
}
