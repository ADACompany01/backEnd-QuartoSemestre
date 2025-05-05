import { Cliente } from '../models/cliente.model';
export declare class ClienteRepository {
    private clienteModel;
    constructor(clienteModel: typeof Cliente);
    findAll(): Promise<Cliente[]>;
    findOne(id: string): Promise<Cliente>;
    create(data: Partial<Cliente>): Promise<Cliente>;
    update(id: string, data: Partial<Cliente>): Promise<[number, Cliente[]]>;
    delete(id: string): Promise<number>;
    findByEmail(email: string): Promise<Cliente>;
    findByCpf(cpf: string): Promise<Cliente>;
}
