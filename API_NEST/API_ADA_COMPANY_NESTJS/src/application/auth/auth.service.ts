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

  private getJwtSecret(): string {
    return process.env.NODE_ENV === 'test'
      ? 'test-secret-key'
      : this.configService.get<string>('JWT_SECRET');
  }

  gerarTokenValido(): string {
    const payload = { id_usuario: 123, tipo_usuario: 'admin' };
    const secret = this.configService.get<string>('JWT_SECRET');

    return this.jwtService.sign(payload, {
      secret: secret,
      expiresIn: '1h',
    });
  }

  async loginFuncionario(loginDto: FuncionarioLoginDto) {
    const usuario = await this.usuarioRepository.findByEmail(loginDto.email);
    const isPasswordValid = usuario && usuario.senha ? await bcrypt.compare(loginDto.senha, usuario.senha) : false;

    if (!usuario || usuario.tipo_usuario !== 'funcionario' || !isPasswordValid) {
      throw new UnauthorizedException('Credenciais inválidas');
    }

    const payload = {
      id_usuario: String(usuario.id_usuario),
      email: usuario.email,
      tipo_usuario: 'funcionario'
    };

    return {
      access_token: this.jwtService.sign(payload, {
        secret: this.getJwtSecret(),
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

    if (!usuario || usuario.tipo_usuario !== 'cliente' || !isPasswordValid) {
      throw new UnauthorizedException('Credenciais inválidas');
    }

    const payload = {
      id_usuario: String(usuario.id_usuario),
      email: usuario.email,
      tipo_usuario: 'cliente'
    };

    return {
      access_token: this.jwtService.sign(payload, {
        secret: this.getJwtSecret(),
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
    const usuario = await this.usuarioRepository.findOne(payload.id_usuario);

    if (!usuario) {
      return null;
    }

    if (usuario.tipo_usuario === payload.tipo_usuario) {
      return {
        id_usuario: String(usuario.id_usuario),
        email: usuario.email,
        tipo_usuario: usuario.tipo_usuario
      };
    }

    return null;
  }
} 