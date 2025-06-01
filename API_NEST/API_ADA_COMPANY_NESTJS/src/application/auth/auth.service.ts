import { Injectable, UnauthorizedException, Logger } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import * as bcrypt from 'bcrypt';
import { Inject } from '@nestjs/common';
import { FUNCIONARIO_REPOSITORY } from '../../infrastructure/providers/funcionario.provider';
import { FuncionarioRepository } from '../../domain/repositories/funcionario.repository.interface';
import { FuncionarioLoginDto } from '../../interfaces/http/dtos/requests/funcionario-login.dto';
import { ClienteLoginDto } from '../../interfaces/http/dtos/requests/cliente-login.dto';
import { GetClienteByEmailUseCase } from '../cliente/get-cliente-by-email.use-case';
import { InjectModel } from '@nestjs/sequelize';
import { Usuario } from '../../infrastructure/database/entities/usuario.entity';
import { Usuario as UsuarioModel } from '../../domain/models/usuario.model';

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);
  private readonly jwtSecret = 'ada_company_secret_key_2025';
  
  constructor(
    @InjectModel(Usuario)
    private usuarioModel: typeof Usuario,
    private jwtService: JwtService,
    private configService: ConfigService,
    @Inject(FUNCIONARIO_REPOSITORY)
    private funcionarioRepository: FuncionarioRepository,
    private getClienteByEmailUseCase: GetClienteByEmailUseCase,
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
    const funcionario = await this.funcionarioRepository.findByEmail(loginDto.email);
    
    if (!funcionario) {
      throw new UnauthorizedException('Credenciais inválidas');
    }

    const senhaValida = await bcrypt.compare(loginDto.senha, (funcionario as any).usuario.senha);
    
    if (!senhaValida) {
      throw new UnauthorizedException('Credenciais inválidas');
    }

    const payload = { 
      id_usuario: (funcionario as any).id_usuario,
      email: (funcionario as any).email,
      tipo_usuario: 'funcionario'
    };

    return {
      access_token: this.jwtService.sign(payload, {
        secret: this.jwtSecret,
        expiresIn: '1h'
      }),
      user: {
        id: (funcionario as any).id_usuario,
        nome: (funcionario as any).nome_completo,
        email: (funcionario as any).email,
        tipo: 'funcionario'
      }
    };
  }

  async loginCliente(loginDto: ClienteLoginDto) {
    const cliente = await this.getClienteByEmailUseCase.execute(loginDto.email);
    
    if (!cliente) {
      throw new UnauthorizedException('Credenciais inválidas');
    }

    const senhaValida = await bcrypt.compare(loginDto.senha, (cliente as any).usuario.senha);
    
    if (!senhaValida) {
      throw new UnauthorizedException('Credenciais inválidas');
    }

    const payload = { 
      id_usuario: String((cliente as any).id_usuario),
      email: (cliente as any).email,
      tipo_usuario: 'cliente'
    };

    return {
      access_token: this.jwtService.sign(payload, {
        secret: this.jwtSecret,
        expiresIn: '1h'
      }),
      user: {
        id: String((cliente as any).id_usuario),
        nome: (cliente as any).nome_completo,
        email: (cliente as any).email,
        tipo: 'cliente'
      }
    };
  }

  async validateUser(payload: any) {
    if (payload.tipo_usuario === 'funcionario') {
      const funcionario = await this.funcionarioRepository.findByEmail(payload.email);
      if (funcionario) {
        return {
          id_usuario: String((funcionario as any).id_usuario),
          email: (funcionario as any).email,
          tipo_usuario: 'funcionario'
        };
      }
    } else if (payload.tipo_usuario === 'cliente') {
      const cliente = await this.getClienteByEmailUseCase.execute(payload.email);
      if (cliente) {
        return {
          id_usuario: String((cliente as any).id_usuario),
          email: (cliente as any).email,
          tipo_usuario: 'cliente'
        };
      }
    }
    return null;
  }
} 