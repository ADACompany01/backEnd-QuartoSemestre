import { HttpStatus } from '@nestjs/common';
import { ServicoService } from './servico.service';
import { Servico } from '../../database/models/servico.model';
export declare class ServicoController {
    private readonly servicoService;
    constructor(servicoService: ServicoService);
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
    create(servicoData: Partial<Servico>): Promise<{
        statusCode: HttpStatus;
        message: string;
        data: any;
    }>;
    update(id: string, servicoData: Partial<Servico>): Promise<{
        statusCode: HttpStatus;
        message: string;
        data: any;
    }>;
    remove(id: string): Promise<{
        statusCode: HttpStatus;
        message: string;
    }>;
}
