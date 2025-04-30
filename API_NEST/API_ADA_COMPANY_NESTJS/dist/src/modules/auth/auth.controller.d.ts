import { AuthService } from '../auth/auth.service';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    getToken(): {
        token: string;
    };
}
