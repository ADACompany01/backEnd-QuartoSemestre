import { Cliente } from '../../database/models/cliente.model';
export declare class ClienteService {
    private clienteModel;
    constructor(clienteModel: typeof Cliente);
    findAll(): Promise<Cliente[]>;
    findOne(id: string): Promise<Cliente>;
    findByEmail(email: string): Promise<Cliente>;
    create(clienteData: Partial<Cliente>): Promise<Cliente>;
    update(id: string, clienteData: Partial<Cliente>): Promise<void>;
    remove(id: string): Promise<void>;
}
