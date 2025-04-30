import { HttpStatus } from '@nestjs/common';
import { ClienteService } from './cliente.service';
import { Cliente } from '../../database/models/cliente.model';
export declare class ClienteController {
    private readonly clienteService;
    constructor(clienteService: ClienteService);
    findAll(): Promise<{
        statusCode: HttpStatus;
        message: string;
        data: any[];
    }>;
    findOne(id: string): Promise<{
        statusCode: HttpStatus;
        message: string;
        data: any;
    }>;
    create(clienteData: Partial<Cliente>): Promise<{
        statusCode: HttpStatus;
        message: string;
        data: any;
    }>;
    update(id: string, clienteData: Partial<Cliente>): Promise<{
        statusCode: HttpStatus;
        message: string;
        data: any;
    }>;
    remove(id: string): Promise<{
        statusCode: HttpStatus;
        message: string;
    }>;
}
