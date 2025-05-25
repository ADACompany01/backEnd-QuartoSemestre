import { HttpStatus } from '@nestjs/common';
import { FuncionarioService } from './funcionario.service';
import { CreateFuncionarioDto } from './dto/create-funcionario.dto';
import { UpdateFuncionarioDto } from './dto/update-funcionario.dto';
export declare class FuncionarioController {
    private readonly funcionarioService;
    private readonly logger;
    constructor(funcionarioService: FuncionarioService);
    findAll(): Promise<{
        statusCode: HttpStatus;
        message: string;
        data: import("../../database/entities/funcionario.entity").Funcionario[];
    }>;
    findOne(id: string): Promise<{
        statusCode: HttpStatus;
        message: string;
        data: import("../../database/entities/funcionario.entity").Funcionario;
    }>;
    create(createFuncionarioDto: CreateFuncionarioDto): Promise<{
        statusCode: HttpStatus;
        message: string;
        data: import("../../database/entities/funcionario.entity").Funcionario;
    }>;
    update(id: string, updateFuncionarioDto: UpdateFuncionarioDto): Promise<{
        statusCode: HttpStatus;
        message: string;
        data: import("../../database/entities/funcionario.entity").Funcionario;
    }>;
    remove(id: string): Promise<{
        statusCode: HttpStatus;
        message: string;
    }>;
}
