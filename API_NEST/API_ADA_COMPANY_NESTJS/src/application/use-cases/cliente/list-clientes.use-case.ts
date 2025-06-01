import { Cliente } from '../../../infrastructure/database/entities/cliente.entity';
import { ClienteRepositoryImpl } from '../../../infrastructure/database/repositories/cliente.repository';

export class ListClientesUseCase {
  constructor(private readonly clienteRepository: ClienteRepositoryImpl) {}

  async execute(): Promise<Cliente[]> {
    return this.clienteRepository.findAll();
  }
} 