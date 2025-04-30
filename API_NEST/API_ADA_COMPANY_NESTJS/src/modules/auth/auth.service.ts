import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}

  gerarTokenValido(): string {
    const payload = { id: '123', role: 'admin' };
    const secret = this.configService.get<string>('JWT_SECRET') || 'ada_company_secret_key_2025';
    
    return this.jwtService.sign(payload, {
      secret: secret,
      expiresIn: '1h',
    });
  }
}