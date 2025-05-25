import { Cliente } from '../entities/cliente.entity';
export declare class ClienteRepository {
    private clienteModel;
    constructor(clienteModel: typeof Cliente);
    findAll(): Promise<Cliente[]>;
    findOne(id: number): Promise<Cliente | null>;
    create(data: Partial<Cliente>): Promise<Cliente>;
    update(id: number, data: Partial<Cliente>): Promise<[number, Cliente[]]>;
    delete(id: number): Promise<number>;
    findByEmail(email: string): Promise<Cliente | null>;
}
