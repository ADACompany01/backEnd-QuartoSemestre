import { ClientesService } from './clientes.service';
import { Cliente } from '../../database/models/cliente.model';
export declare class ClientesController {
    private readonly clientesService;
    constructor(clientesService: ClientesService);
    findAll(): Promise<Cliente[]>;
    findOne(id: string): Promise<Cliente>;
    create(data: Partial<Cliente>): Promise<Cliente>;
    update(id: string, data: Partial<Cliente>): Promise<[number, Cliente[]]>;
    delete(id: string): Promise<number>;
}
