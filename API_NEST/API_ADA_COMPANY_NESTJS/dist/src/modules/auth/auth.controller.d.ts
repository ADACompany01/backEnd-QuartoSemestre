import { AuthService } from '../auth/auth.service';
import { FuncionarioLoginDto } from './dto/funcionario-login.dto';
import { ClienteLoginDto } from './dto/cliente-login.dto';
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
