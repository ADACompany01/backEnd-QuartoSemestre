import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import * as bcrypt from 'bcrypt';
import { FuncionarioService } from '../funcionario/funcionario.service';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private configService: ConfigService,
    private funcionarioService: FuncionarioService,
  ) {}

  gerarTokenValido(): string {
    const payload = { id: '123', role: 'admin' };
    const secret = this.configService.get<string>('JWT_SECRET') || 'ada_company_secret_key_2025';
    
    return this.jwtService.sign(payload, {
      secret: secret,
      expiresIn: '1h',
    });
  }

  async loginFuncionario(loginDto: LoginDto) {
    const funcionario = await this.funcionarioService.findByEmail(loginDto.email);
    
    if (!funcionario) {
      throw new UnauthorizedException('Email ou senha inválidos');
    }

    const isPasswordValid = await bcrypt.compare(loginDto.senha, funcionario.senha);
    
    if (!isPasswordValid) {
      throw new UnauthorizedException('Email ou senha inválidos');
    }

    const payload = { 
      id: funcionario.id,
      email: funcionario.email,
      nome: funcionario.nome,
      role: 'funcionario',
      cargo: funcionario.cargo
    };

    const secret = this.configService.get<string>('JWT_SECRET') || 'ada_company_secret_key_2025';
    
    return {
      access_token: this.jwtService.sign(payload, {
        secret: secret,
        expiresIn: '1h',
      }),
      funcionario: {
        id: funcionario.id,
        nome: funcionario.nome,
        email: funcionario.email,
        cargo: funcionario.cargo
      }
    };
  }
}