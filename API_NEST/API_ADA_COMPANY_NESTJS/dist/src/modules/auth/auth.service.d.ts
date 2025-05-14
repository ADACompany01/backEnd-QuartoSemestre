import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { FuncionarioService } from '../funcionario/funcionario.service';
import { LoginDto } from './dto/login.dto';
import { ClienteLoginDto } from './dto/cliente-login.dto';
import { ClienteService } from '../cliente/cliente.service';
export declare class AuthService {
    private jwtService;
    private configService;
    private funcionarioService;
    private clienteService;
    constructor(jwtService: JwtService, configService: ConfigService, funcionarioService: FuncionarioService, clienteService: ClienteService);
    gerarTokenValido(): string;
    loginFuncionario(loginDto: LoginDto): Promise<{
        access_token: string;
        funcionario: {
            id: string;
            nome: string;
            email: string;
            cargo: string;
        };
    }>;
    loginCliente(loginDto: ClienteLoginDto): Promise<{
        access_token: string;
        cliente: {
            id: string;
            nome: string;
            email: string;
        };
    }>;
}
