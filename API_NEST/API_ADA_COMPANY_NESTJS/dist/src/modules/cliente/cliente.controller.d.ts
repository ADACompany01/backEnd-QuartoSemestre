import { HttpStatus } from '@nestjs/common';
import { ClienteService } from './cliente.service';
import { CreateClienteDto } from './dto/create-cliente.dto';
import { UpdateClienteDto } from './dto/update-cliente.dto';
export declare class ClienteController {
    private readonly clienteService;
    private readonly logger;
    constructor(clienteService: ClienteService);
    findAll(): Promise<{
        statusCode: HttpStatus;
        message: string;
        data: import("../../database/entities/cliente.entity").Cliente[];
    }>;
    findOne(id: string): Promise<{
        statusCode: HttpStatus;
        message: string;
        data: import("../../database/entities/cliente.entity").Cliente;
    }>;
    create(createClienteDto: CreateClienteDto): Promise<{
        statusCode: HttpStatus;
        message: string;
        data: import("../../database/entities/cliente.entity").Cliente;
    }>;
    update(id: string, updateClienteDto: UpdateClienteDto): Promise<{
        statusCode: HttpStatus;
        message: string;
        data: import("../../database/entities/cliente.entity").Cliente;
    }>;
    remove(id: string): Promise<{
        statusCode: HttpStatus;
        message: string;
    }>;
    cadastro(createClienteDto: CreateClienteDto): Promise<import("../../database/entities/cliente.entity").Cliente>;
}
