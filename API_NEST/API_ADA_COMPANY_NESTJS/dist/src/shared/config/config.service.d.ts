import { ConfigService as NestConfigService } from '@nestjs/config';
export declare class ConfigService {
    private configService;
    constructor(configService: NestConfigService);
    get jwtConfig(): {
        secret: string;
        expiresIn: string;
    };
    get databaseConfig(): {
        host: string;
        port: number;
        username: string;
        password: string;
        database: string;
    };
}
