import { Cliente } from '../../database/entities/cliente.entity';
import { Usuario } from '../../database/entities/usuario.entity';
import { CreateClienteDto } from './dto/create-cliente.dto';
export declare class ClienteService {
    private clienteModel;
    private usuarioModel;
    private readonly logger;
    constructor(clienteModel: typeof Cliente, usuarioModel: typeof Usuario);
    findAll(): Promise<Cliente[]>;
    findOne(id: number): Promise<Cliente>;
    findByEmail(email: string): Promise<Cliente>;
    findByEmailWithoutException(email: string): Promise<Cliente | null>;
    create(clienteData: Partial<Cliente>): Promise<Cliente>;
    update(id: number, clienteData: Partial<Cliente>): Promise<Cliente>;
    remove(id: number): Promise<void>;
    cadastro(createClienteDto: CreateClienteDto): Promise<Cliente>;
}
