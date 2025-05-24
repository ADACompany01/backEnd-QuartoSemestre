import { Injectable, UnauthorizedException, Logger } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import * as bcrypt from 'bcrypt';
import { FuncionarioService } from '../funcionario/funcionario.service';
import { FuncionarioLoginDto } from './dto/funcionario-login.dto';
import { ClienteLoginDto } from './dto/cliente-login.dto';
import { ClienteService } from '../cliente/cliente.service';

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);
  
  constructor(
    private jwtService: JwtService,
    private configService: ConfigService,
    private funcionarioService: FuncionarioService,
    private clienteService: ClienteService,
  ) {}

  gerarTokenValido(): string {
    const payload = { id: '123', role: 'admin' };
    const secret = this.configService.get<string>('JWT_SECRET') || 'ada_company_secret_key_2025';
    
    return this.jwtService.sign(payload, {
      secret: secret,
      expiresIn: '1h',
    });
  }

  async loginFuncionario(loginDto: FuncionarioLoginDto) {
    try {
      const funcionario = await this.funcionarioService.findByEmailWithoutException(loginDto.email);
      
      if (!funcionario) {
        throw new UnauthorizedException('Email ou senha inválidos');
      }

      if (!funcionario.senha) {
        throw new UnauthorizedException('Senha não definida para este funcionário');
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
        accessToken: this.jwtService.sign(payload, {
          secret: secret,
          expiresIn: '1h',
        }),
        tipo: 'funcionario',
        usuario: {
          id: funcionario.id,
          nome: funcionario.nome,
          email: funcionario.email,
          cargo: funcionario.cargo
        }
      };
    } catch (error) {
      this.logger.error(`Erro no login de funcionário: ${error.message}`, error.stack);
      
      if (error instanceof UnauthorizedException) {
        throw error;
      }
      
      throw new UnauthorizedException('Falha na autenticação');
    }
  }

  async loginCliente(loginDto: ClienteLoginDto) {
    try {
      const cliente = await this.clienteService.findByEmailWithoutException(loginDto.email);
      
      if (!cliente) {
        throw new UnauthorizedException('Email ou senha inválidos');
      }

      if (!cliente.senha) {
        throw new UnauthorizedException('Senha não definida para este cliente');
      }

      const isPasswordValid = await bcrypt.compare(loginDto.senha, cliente.senha);
      
      if (!isPasswordValid) {
        throw new UnauthorizedException('Email ou senha inválidos');
      }

      const payload = { 
        id: cliente.id,
        email: cliente.email,
        nome: cliente.nome,
        role: 'cliente'
      };

      const secret = this.configService.get<string>('JWT_SECRET') || 'ada_company_secret_key_2025';
      
      return {
        accessToken: this.jwtService.sign(payload, {
          secret: secret,
          expiresIn: '1h',
        }),
        tipo: 'cliente',
        usuario: {
          id: cliente.id,
          nome: cliente.nome,
          email: cliente.email
        }
      };
    } catch (error) {
      this.logger.error(`Erro no login de cliente: ${error.message}`, error.stack);
      
      if (error instanceof UnauthorizedException) {
        throw error;
      }
      
      throw new UnauthorizedException('Falha na autenticação');
    }
  }
}