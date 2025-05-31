import { ClienteRepository } from '../../../domain/repositories/cliente.repository.interface';
import { Cliente } from '../../../domain/models/cliente.model';

export class GetClienteUseCase {
  constructor(private readonly clienteRepository: ClienteRepository) {}

  async execute(id: string): Promise<Cliente | null> {
    return this.clienteRepository.findById(id);
  }
} 