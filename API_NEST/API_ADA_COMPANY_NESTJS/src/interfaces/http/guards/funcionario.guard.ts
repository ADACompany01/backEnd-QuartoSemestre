import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { Observable } from 'rxjs';
import { Inject } from '@nestjs/common';
import { FUNCIONARIO_REPOSITORY } from '../../../infrastructure/providers/funcionario.provider';
import { FuncionarioRepository } from '../../../domain/repositories/funcionario.repository.interface';

@Injectable()
export class FuncionarioGuard implements CanActivate {
  constructor(
    @Inject(FUNCIONARIO_REPOSITORY)
    private readonly funcionarioRepository: FuncionarioRepository,
  ) {}

  async canActivate(
    context: ExecutionContext,
  ): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const user = request.user;

    if (!user) {
      throw new UnauthorizedException('Usuário não autenticado');
    }

    try {
      const funcionario = await this.funcionarioRepository.findByEmail(user.email);
      if (!funcionario) {
        throw new UnauthorizedException('Acesso permitido apenas para funcionários');
      }
      return true;
    } catch (error) {
      throw new UnauthorizedException('Acesso permitido apenas para funcionários');
    }
  }
} 