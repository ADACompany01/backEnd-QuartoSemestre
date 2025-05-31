import { FuncionarioRepository } from '../../../domain/repositories/funcionario.repository.interface';
import { Funcionario } from '../../../domain/models/funcionario.model';

export class UpdateFuncionarioUseCase {
  constructor(private readonly funcionarioRepository: FuncionarioRepository) {}

  async execute(id: string, data: Partial<Funcionario>): Promise<[number, Funcionario[]]> {
    return this.funcionarioRepository.update(id, data);
  }
} 