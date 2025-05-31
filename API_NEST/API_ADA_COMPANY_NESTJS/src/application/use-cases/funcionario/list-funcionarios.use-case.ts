import { FuncionarioRepository } from '../../../domain/repositories/funcionario.repository.interface';
import { Funcionario } from '../../../domain/models/funcionario.model';

export class ListFuncionariosUseCase {
  constructor(private readonly funcionarioRepository: FuncionarioRepository) {}

  async execute(): Promise<Funcionario[]> {
    return this.funcionarioRepository.findAll();
  }
} 