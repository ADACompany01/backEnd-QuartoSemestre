import { HttpStatus } from '@nestjs/common';
import { OrcamentoService } from './orcamento.service';
import { Orcamento } from '../../database/models/orcamento.model';
export declare class OrcamentoController {
    private readonly orcamentoService;
    constructor(orcamentoService: OrcamentoService);
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
    create(orcamentoData: Partial<Orcamento>): Promise<{
        statusCode: HttpStatus;
        message: string;
        data: any;
    }>;
    update(id: string, orcamentoData: Partial<Orcamento>): Promise<{
        statusCode: HttpStatus;
        message: string;
        data: any;
    }>;
    changeStatus(id: string, status: string): Promise<{
        statusCode: HttpStatus;
        message: string;
        data: any;
    }>;
    remove(id: string): Promise<{
        statusCode: HttpStatus;
        message: string;
    }>;
}
