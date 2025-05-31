import { FuncionarioRepository } from '../../../domain/repositories/funcionario.repository.interface';
import { Funcionario } from '../../../domain/models/funcionario.model';

export class GetFuncionarioUseCase {
  constructor(private readonly funcionarioRepository: FuncionarioRepository) {}

  async execute(id: string): Promise<Funcionario | null> {
    return this.funcionarioRepository.findById(id);
  }
} 