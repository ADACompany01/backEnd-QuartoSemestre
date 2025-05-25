import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { FuncionarioService } from '../funcionario/funcionario.service';
import { FuncionarioLoginDto } from './dto/funcionario-login.dto';
import { ClienteLoginDto } from './dto/cliente-login.dto';
import { ClienteService } from '../cliente/cliente.service';
import { Usuario } from '../../database/entities/usuario.entity';
export declare class AuthService {
    private usuarioModel;
    private jwtService;
    private configService;
    private funcionarioService;
    private clienteService;
    private readonly logger;
    constructor(usuarioModel: typeof Usuario, jwtService: JwtService, configService: ConfigService, funcionarioService: FuncionarioService, clienteService: ClienteService);
    gerarTokenValido(): string;
    loginFuncionario(loginDto: FuncionarioLoginDto): Promise<{
        accessToken: string;
        tipo: string;
        usuario: {
            id_usuario: number;
            nome_completo: string;
            email: string;
        };
    }>;
    loginCliente(loginDto: ClienteLoginDto): Promise<{
        accessToken: string;
        tipo: string;
        usuario: {
            id_usuario: number;
            nome_completo: string;
            email: string;
        };
    }>;
    login(email: string, senha: string): Promise<{
        access_token: string;
        usuario: {
            id: number;
            nome: string;
            email: string;
        };
    }>;
}
