import { AuthService } from '../auth/auth.service';
import { LoginDto } from './dto/login.dto';
import { ClienteLoginDto } from './dto/cliente-login.dto';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    getToken(): {
        token: string;
    };
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
