import { FuncionarioRepository } from '../../../domain/repositories/funcionario.repository.interface';

export class DeleteFuncionarioUseCase {
  constructor(private readonly funcionarioRepository: FuncionarioRepository) {}

  async execute(id: string): Promise<number> {
    return this.funcionarioRepository.delete(id);
  }
} 