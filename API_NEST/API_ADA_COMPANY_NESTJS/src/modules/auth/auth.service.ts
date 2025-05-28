import { Injectable, UnauthorizedException, Logger } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import * as bcrypt from 'bcrypt';
import { FuncionarioService } from '../funcionario/funcionario.service';
import { FuncionarioLoginDto } from './dto/funcionario-login.dto';
import { ClienteLoginDto } from './dto/cliente-login.dto';
import { ClienteService } from '../cliente/cliente.service';
import { InjectModel } from '@nestjs/sequelize';
import { Usuario } from '../../database/entities/usuario.entity';

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);
  
  constructor(
    @InjectModel(Usuario)
    private usuarioModel: typeof Usuario,
    private jwtService: JwtService,
    private configService: ConfigService,
    private funcionarioService: FuncionarioService,
    private clienteService: ClienteService,
  ) {}

  gerarTokenValido(): string {
    const payload = { id_usuario: 123, tipo_usuario: 'admin' };
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

      const payload = { 
        id_usuario: funcionario.id_usuario,
        email: funcionario.email,
        nome_completo: funcionario.nome_completo,
        tipo_usuario: 'funcionario'
      };

      const secret = this.configService.get<string>('JWT_SECRET') || 'ada_company_secret_key_2025';
      
      return {
        accessToken: this.jwtService.sign(payload, {
          secret: secret,
          expiresIn: '1h',
        }),
        tipo: 'funcionario',
        usuario: {
          id_usuario: funcionario.id_usuario,
          nome_completo: funcionario.nome_completo,
          email: funcionario.email
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

      const payload = { 
        id_usuario: cliente.id_usuario,
        email: cliente.email,
        nome_completo: cliente.nome_completo,
        tipo_usuario: 'cliente'
      };

      const secret = this.configService.get<string>('JWT_SECRET') || 'ada_company_secret_key_2025';
      
      return {
        accessToken: this.jwtService.sign(payload, {
          secret: secret,
          expiresIn: '1h',
        }),
        tipo: 'cliente',
        usuario: {
          id_usuario: cliente.id_usuario,
          nome_completo: cliente.nome_completo,
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