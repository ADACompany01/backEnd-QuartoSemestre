import { AuthService } from '../auth/auth.service';
import { LoginDto } from './dto/login.dto';
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
}
