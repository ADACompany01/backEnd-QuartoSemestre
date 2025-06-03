import { Cliente } from '../../../infrastructure/database/entities/cliente.entity';
import { ClienteRepositoryImpl } from '../../../infrastructure/database/repositories/cliente.repository';

export class GetClienteUseCase {
  constructor(private readonly clienteRepository: ClienteRepositoryImpl) {}

  async execute(id: string): Promise<Cliente | null> {
    return this.clienteRepository.findById(id);
  }
} 