import { HttpStatus } from '@nestjs/common';
import { OrcamentoService } from './orcamento.service';
import { CreateOrcamentoDto } from './dto/create-orcamento.dto';
import { UpdateOrcamentoDto } from './dto/update-orcamento.dto';
export declare class OrcamentoController {
    private readonly orcamentoService;
    private readonly logger;
    constructor(orcamentoService: OrcamentoService);
    findAll(): Promise<{
        statusCode: HttpStatus;
        message: string;
        data: import("../../database/entities/orcamento.entity").Orcamento[];
    }>;
    findOne(id: string): Promise<{
        statusCode: HttpStatus;
        message: string;
        data: import("../../database/entities/orcamento.entity").Orcamento;
    }>;
    create(createOrcamentoDto: CreateOrcamentoDto): Promise<{
        statusCode: HttpStatus;
        message: string;
        data: import("../../database/entities/orcamento.entity").Orcamento;
    }>;
    update(id: string, updateOrcamentoDto: UpdateOrcamentoDto): Promise<{
        statusCode: HttpStatus;
        message: string;
        data: import("../../database/entities/orcamento.entity").Orcamento;
    }>;
    remove(id: string): Promise<{
        statusCode: HttpStatus;
        message: string;
    }>;
}
