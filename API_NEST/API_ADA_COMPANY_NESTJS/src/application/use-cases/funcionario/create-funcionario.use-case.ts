import { FuncionarioRepository } from '../../../domain/repositories/funcionario.repository.interface';
import { Funcionario } from '../../../domain/models/funcionario.model';

export class CreateFuncionarioUseCase {
  constructor(private readonly funcionarioRepository: FuncionarioRepository) {}

  async execute(data: Funcionario): Promise<Funcionario> {
    return this.funcionarioRepository.create(data);
  }
} 