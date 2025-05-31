import { ClienteRepository } from '../../../domain/repositories/cliente.repository.interface';
import { Cliente } from '../../../domain/models/cliente.model';

export class UpdateClienteUseCase {
  constructor(private readonly clienteRepository: ClienteRepository) {}

  async execute(id: string, data: Partial<Cliente>): Promise<[number, Cliente[]]> {
    return this.clienteRepository.update(id, data);
  }
} 