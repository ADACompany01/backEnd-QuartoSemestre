import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { Observable } from 'rxjs';
import { FuncionarioService } from '../../funcionario/funcionario.service';

@Injectable()
export class FuncionarioGuard implements CanActivate {
  constructor(private readonly funcionarioService: FuncionarioService) {}

  async canActivate(
    context: ExecutionContext,
  ): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const user = request.user;

    if (!user) {
      throw new UnauthorizedException('Usuário não autenticado');
    }

    try {
      const funcionario = await this.funcionarioService.findByEmail(user.email);
      if (!funcionario) {
        throw new UnauthorizedException('Acesso permitido apenas para funcionários');
      }
      return true;
    } catch (error) {
      throw new UnauthorizedException('Acesso permitido apenas para funcionários');
    }
  }
} 