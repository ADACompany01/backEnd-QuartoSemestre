import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { FuncionarioService } from '../funcionario/funcionario.service';
import { FuncionarioLoginDto } from './dto/funcionario-login.dto';
import { ClienteLoginDto } from './dto/cliente-login.dto';
import { ClienteService } from '../cliente/cliente.service';
export declare class AuthService {
    private jwtService;
    private configService;
    private funcionarioService;
    private clienteService;
    private readonly logger;
    constructor(jwtService: JwtService, configService: ConfigService, funcionarioService: FuncionarioService, clienteService: ClienteService);
    gerarTokenValido(): string;
    loginFuncionario(loginDto: FuncionarioLoginDto): Promise<{
        accessToken: string;
        tipo: string;
        usuario: {
            id: any;
            nome: any;
            email: any;
            cargo: any;
        };
    }>;
    loginCliente(loginDto: ClienteLoginDto): Promise<{
        accessToken: string;
        tipo: string;
        usuario: {
            id: any;
            nome: any;
            email: any;
        };
    }>;
}
