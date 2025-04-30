import { HttpStatus } from '@nestjs/common';
import { FuncionarioService } from './funcionario.service';
import { Funcionario } from '../../database/models/funcionario.model';
export declare class FuncionarioController {
    private readonly funcionarioService;
    constructor(funcionarioService: FuncionarioService);
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
    create(funcionarioData: Partial<Funcionario>): Promise<{
        statusCode: HttpStatus;
        message: string;
        data: any;
    }>;
    update(id: string, funcionarioData: Partial<Funcionario>): Promise<{
        statusCode: HttpStatus;
        message: string;
        data: any;
    }>;
    remove(id: string): Promise<{
        statusCode: HttpStatus;
        message: string;
    }>;
}
