import { AuthService } from '../auth/auth.service';
import { FuncionarioLoginDto } from './dto/funcionario-login.dto';
import { ClienteLoginDto } from './dto/cliente-login.dto';
declare class LoginDto {
    email: string;
    senha: string;
}
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    getToken(): {
        token: string;
    };
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
    login(loginDto: LoginDto): Promise<{
        access_token: string;
        usuario: {
            id: number;
            nome: string;
            email: string;
        };
    }>;
}
export {};
