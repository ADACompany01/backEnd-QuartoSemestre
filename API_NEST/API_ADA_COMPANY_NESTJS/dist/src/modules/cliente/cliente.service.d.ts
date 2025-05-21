import { Cliente } from '../../database/models/cliente.model';
export declare class ClienteService {
    private clienteModel;
    private readonly logger;
    constructor(clienteModel: typeof Cliente);
    findAll(): Promise<Cliente[]>;
    findOne(id: string): Promise<Cliente>;
    findByEmail(email: string): Promise<Cliente>;
    findByEmailWithoutException(email: string): Promise<Cliente | null>;
    create(clienteData: Partial<Cliente>): Promise<Cliente>;
    update(id: string, clienteData: Partial<Cliente>): Promise<Cliente>;
    remove(id: string): Promise<void>;
}
