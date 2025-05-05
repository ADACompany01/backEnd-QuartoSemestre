import { ClienteRepository } from '../../database/repositories/cliente.repository';
import { Cliente } from '../../database/models/cliente.model';
export declare class ClientesService {
    private readonly clienteRepository;
    constructor(clienteRepository: ClienteRepository);
    findAll(): Promise<Cliente[]>;
    findOne(id: string): Promise<Cliente>;
    create(data: Partial<Cliente>): Promise<Cliente>;
    update(id: string, data: Partial<Cliente>): Promise<[number, Cliente[]]>;
    delete(id: string): Promise<number>;
}
