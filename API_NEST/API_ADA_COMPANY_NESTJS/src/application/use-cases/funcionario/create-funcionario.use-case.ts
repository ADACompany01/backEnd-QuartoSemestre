import { Funcionario as FuncionarioModel } from '../../../domain/models/funcionario.model';
import { FuncionarioRepositoryImpl } from '../../../infrastructure/database/repositories/funcionario.repository';
import { CreateFuncionarioDto } from '../../../interfaces/http/dtos/requests/create-funcionario.dto';

export class CreateFuncionarioUseCase {
  constructor(private readonly funcionarioRepository: FuncionarioRepositoryImpl) {}

  async execute(data: CreateFuncionarioDto): Promise<FuncionarioModel> {
    return this.funcionarioRepository.create(data);
  }
} 