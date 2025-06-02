import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsuarioRepository } from '../../infrastructure/database/repositories/usuario.repository';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private usuarioRepository: UsuarioRepository,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, senha: string): Promise<any> {
    const usuario = await this.usuarioRepository.findByEmail(email);
    if (usuario && await bcrypt.compare(senha, usuario.senha)) {
      const { senha, ...result } = usuario;
      return result;
    }
    return null;
  }

  async login(email: string, senha: string) {
    const usuario = await this.validateUser(email, senha);
    if (!usuario) {
      throw new UnauthorizedException('Credenciais inválidas');
    }
    
    const payload = { email: usuario.email, sub: usuario.id_usuario };
    return {
      access_token: this.jwtService.sign(payload),
      usuario
    };
  }
} 