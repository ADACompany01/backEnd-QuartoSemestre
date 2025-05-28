import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { Observable } from 'rxjs';

@Injectable()
export class SelfAccessGuard implements CanActivate {
  async canActivate(
    context: ExecutionContext,
  ): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const user = request.user;
    const id = request.params.id;

    if (!user) {
      throw new UnauthorizedException('Usuário não autenticado');
    }

    // Se o ID do usuário na rota for igual ao ID do usuário autenticado
    if (id === user.id_usuario) {
      return true;
    }

    throw new UnauthorizedException('Você só pode acessar seus próprios dados');
  }
} 