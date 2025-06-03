import { Injectable, UnauthorizedException, Logger, Inject } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import * as bcrypt from 'bcrypt';
import { FuncionarioRepository } from '../../domain/repositories/funcionario.repository.interface';
import { FuncionarioLoginDto } from '../../interfaces/http/dtos/requests/funcionario-login.dto';
import { ClienteLoginDto } from '../../interfaces/http/dtos/requests/cliente-login.dto';
import { GetClienteByEmailUseCase } from '../use-cases/cliente/get-cliente-by-email.use-case';
import { InjectModel } from '@nestjs/sequelize';
import { Usuario } from '../../infrastructure/database/entities/usuario.entity';
import { UsuarioRepository } from '../../infrastructure/database/repositories/usuario.repository';
import { FUNCIONARIO_REPOSITORY } from '../../infrastructure/providers/funcionario.provider';

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
    private usuarioRepository: UsuarioRepository,
  ) { }

  gerarTokenValido(): string {
    const payload = { id_usuario: 123, tipo_usuario: 'admin' };
    const secret = this.configService.get<string>('JWT_SECRET') || 'ada_company_secret_key_2025';

    return this.jwtService.sign(payload, {
      secret: secret,
      expiresIn: '1h',
    });
  }

  async loginFuncionario(loginDto: FuncionarioLoginDto) {
    const usuario = await this.usuarioRepository.findByEmail(loginDto.email);



    const isPasswordValid = usuario && usuario.senha ? await bcrypt.compare(loginDto.senha, usuario.senha) : false;


    if (!usuario || !usuario.funcionario || !isPasswordValid) {
      throw new UnauthorizedException('Credenciais inválidas');
    }

    const payload = {
      id_usuario: String(usuario.id_usuario),
      email: usuario.email,
      tipo_usuario: 'funcionario'
    };

    return {
      access_token: this.jwtService.sign(payload, {
        secret: this.jwtSecret,
        expiresIn: '1h'
      }),
      user: {
        id: String(usuario.id_usuario),
        nome: usuario.nome_completo,
        email: usuario.email,
        tipo: 'funcionario'
      }
    };
  }

  async loginCliente(loginDto: ClienteLoginDto) {
    const usuario = await this.usuarioRepository.findByEmail(loginDto.email);



    const isPasswordValid = usuario && usuario.senha ? await bcrypt.compare(loginDto.senha, usuario.senha) : false;


    if (!usuario || !usuario.cliente || !isPasswordValid) {
      throw new UnauthorizedException('Credenciais inválidas');
    }

    const payload = {
      id_usuario: String(usuario.id_usuario),
      email: usuario.email,
      tipo_usuario: 'cliente'
    };

    return {
      access_token: this.jwtService.sign(payload, {
        secret: this.jwtSecret,
        expiresIn: '1h'
      }),
      user: {
        id: String(usuario.id_usuario),
        nome: usuario.nome_completo,
        email: usuario.email,
        tipo: 'cliente'
      }
    };
  }

  async validateUser(payload: any) {
    const usuario = await this.usuarioRepository.findOne(payload.sub);

    if (!usuario) {
      return null;
    }

    // Check for associated entities to determine user type
    if (usuario.funcionario && payload.tipo_usuario === 'funcionario') {
      return {
        id_usuario: String(usuario.id_usuario),
        email: usuario.email,
        tipo_usuario: 'funcionario'
      };
    } else if (usuario.cliente && payload.tipo_usuario === 'cliente') {
      return {
        id_usuario: String(usuario.id_usuario),
        email: usuario.email,
        tipo_usuario: 'cliente'
      };
    }

    return null; // User found but type mismatch or no associated entity
  }
} 