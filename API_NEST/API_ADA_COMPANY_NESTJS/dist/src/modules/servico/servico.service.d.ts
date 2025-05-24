import { Servico } from '../../database/models/servico.model';
export declare class ServicoService {
    private servicoModel;
    constructor(servicoModel: typeof Servico);
    findAll(): Promise<Servico[]>;
    findOne(id: string): Promise<Servico>;
    create(servicoData: Partial<Servico>): Promise<Servico>;
    update(id: string, servicoData: Partial<Servico>): Promise<Servico>;
    remove(id: string): Promise<void>;
}
