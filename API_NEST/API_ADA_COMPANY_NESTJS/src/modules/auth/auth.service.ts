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
  private readonly jwtSecret = 'ada_company_secret_key_2025';
  
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
    const funcionario = await this.funcionarioService.findByEmail(loginDto.email);
    
    if (!funcionario) {
      throw new UnauthorizedException('Credenciais inválidas');
    }

    const senhaValida = await bcrypt.compare(loginDto.senha, funcionario.usuario.senha);
    
    if (!senhaValida) {
      throw new UnauthorizedException('Credenciais inválidas');
    }

    const payload = { 
      id_usuario: funcionario.id_usuario,
      email: funcionario.email,
      tipo_usuario: 'funcionario'
    };

    return {
      access_token: this.jwtService.sign(payload, {
        secret: this.jwtSecret,
        expiresIn: '1h'
      }),
      user: {
        id: funcionario.id_usuario,
        nome: funcionario.nome_completo,
        email: funcionario.email,
        tipo: 'funcionario'
      }
    };
  }

  async loginCliente(loginDto: ClienteLoginDto) {
    const cliente = await this.clienteService.findByEmail(loginDto.email);
    
    if (!cliente) {
      throw new UnauthorizedException('Credenciais inválidas');
    }

    const senhaValida = await bcrypt.compare(loginDto.senha, cliente.usuario.senha);
    
    if (!senhaValida) {
      throw new UnauthorizedException('Credenciais inválidas');
    }

    const payload = { 
      id_usuario: String(cliente.id_usuario),
      email: cliente.email,
      tipo_usuario: 'cliente'
    };

    return {
      access_token: this.jwtService.sign(payload, {
        secret: this.jwtSecret,
        expiresIn: '1h'
      }),
      user: {
        id: String(cliente.id_usuario),
        nome: cliente.nome_completo,
        email: cliente.email,
        tipo: 'cliente'
      }
    };
  }

  async validateUser(payload: any) {
    if (payload.tipo_usuario === 'funcionario') {
      const funcionario = await this.funcionarioService.findByEmail(payload.email);
      if (funcionario) {
        return {
          id_usuario: String(funcionario.id_usuario),
          email: funcionario.email,
          tipo_usuario: 'funcionario'
        };
      }
    } else if (payload.tipo_usuario === 'cliente') {
      const cliente = await this.clienteService.findByEmail(payload.email);
      if (cliente) {
        return {
          id_usuario: String(cliente.id_usuario),
          email: cliente.email,
          tipo_usuario: 'cliente'
        };
      }
    }
    return null;
  }
}