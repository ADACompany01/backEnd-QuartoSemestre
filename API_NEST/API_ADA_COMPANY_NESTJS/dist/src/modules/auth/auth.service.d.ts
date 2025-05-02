import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { FuncionarioService } from '../funcionario/funcionario.service';
import { LoginDto } from './dto/login.dto';
export declare class AuthService {
    private jwtService;
    private configService;
    private funcionarioService;
    constructor(jwtService: JwtService, configService: ConfigService, funcionarioService: FuncionarioService);
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
}
